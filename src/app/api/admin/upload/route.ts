import { NextResponse } from "next/server";
import { checkServerSession } from "@/lib/auth";
import { commitFileToGitHub, getGitHubConfig } from "@/lib/github";
import fs from "fs";
import path from "path";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB strict limit

export async function POST(request: Request) {
  const isAuthenticated = await checkServerSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // 1. Strict size validation (<= 1MB)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds 1 MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)} MB.`,
        },
        { status: 400 }
      );
    }

    // 2. Strict MIME type validation
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only image files are allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Content = buffer.toString("base64");

    // 3. Clean and sanitize filename
    const cleanOriginalName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "_")
      .replace(/_{2,}/g, "_");
    const filename = `${Date.now()}-${cleanOriginalName}`;
    const repoFilePath = `public/images/uploads/${filename}`;
    const webPath = `/images/uploads/${filename}`;

    const config = getGitHubConfig();

    // 4. If GITHUB_PAT is set, commit directly to GitHub repository via GitHub API
    // NO local file system writes, preventing ENOENT /var/task/... error in serverless!
    if (config.pat) {
      const result = await commitFileToGitHub({
        filePath: repoFilePath,
        contentBase64: base64Content,
        message: `Upload image: ${filename} via PawCab CMS`,
      });

      // Best effort local save if writable (never throws)
      try {
        const localUploadsDir = path.join(process.cwd(), "public", "images", "uploads");
        if (!fs.existsSync(localUploadsDir)) {
          fs.mkdirSync(localUploadsDir, { recursive: true });
        }
        fs.writeFileSync(path.join(localUploadsDir, filename), buffer);
      } catch {
        // Silently ignore in read-only / serverless runtime
      }

      const rawGitHubUrl = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${repoFilePath}`;

      return NextResponse.json({
        success: true,
        url: webPath,
        rawUrl: rawGitHubUrl,
        filename,
        size: file.size,
        sha: result.sha,
        message: "Image uploaded and committed to GitHub repository!",
      });
    }

    // Fallback if GITHUB_PAT is not set (offline local dev testing)
    try {
      const localUploadsDir = path.join(process.cwd(), "public", "images", "uploads");
      if (!fs.existsSync(localUploadsDir)) {
        fs.mkdirSync(localUploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(localUploadsDir, filename), buffer);

      return NextResponse.json({
        success: true,
        url: webPath,
        rawUrl: webPath,
        filename,
        size: file.size,
        sha: null,
        message: "Image saved locally (GITHUB_PAT is not configured).",
      });
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cannot write to local disk (serverless runtime) and GITHUB_PAT is not set. Please set GITHUB_PAT in .env to upload images directly to GitHub.",
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to upload image" },
      { status: 500 }
    );
  }
}
