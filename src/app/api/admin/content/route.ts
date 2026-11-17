import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkServerSession } from "@/lib/auth";
import { fetchFileFromGitHub, commitFileToGitHub, getGitHubConfig } from "@/lib/github";
import localContent from "@/lib/content";
import fs from "fs";
import path from "path";

export async function GET() {
  const isAuthenticated = await checkServerSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const config = getGitHubConfig();

  // If no PAT provided, return local fallback with helpful warning
  if (!config.pat) {
    return NextResponse.json({
      success: true,
      source: "local",
      content: localContent,
      sha: null,
      owner: config.owner,
      repo: config.repo,
      branch: config.branch,
      contentPath: config.contentPath,
      warning:
        "GITHUB_PAT is not configured in .env. Showing local data. To sync with GitHub, set GITHUB_PAT with repo permissions.",
    });
  }

  try {
    const gitHubFile = await fetchFileFromGitHub(config.contentPath);

    if (!gitHubFile) {
      // File not found on GitHub yet - use local initial content
      return NextResponse.json({
        success: true,
        source: "local_init",
        content: localContent,
        sha: null,
        owner: config.owner,
        repo: config.repo,
        branch: config.branch,
        contentPath: config.contentPath,
        message: `${config.contentPath} not yet found on GitHub. Ready to make initial commit.`,
      });
    }

    const parsed = JSON.parse(gitHubFile.content);

    return NextResponse.json({
      success: true,
      source: "github",
      content: parsed,
      sha: gitHubFile.sha,
      owner: config.owner,
      repo: config.repo,
      branch: config.branch,
      contentPath: config.contentPath,
      lastSynced: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Error fetching content from GitHub:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch content from GitHub",
        fallbackContent: localContent,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuthenticated = await checkServerSession();
  if (!isAuthenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { content, sha, commitMessage } = body;

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content payload is required" },
        { status: 400 }
      );
    }

    const config = getGitHubConfig();
    const jsonString = JSON.stringify(content, null, 2);
    const base64Content = Buffer.from(jsonString, "utf-8").toString("base64");
    const message = commitMessage?.trim() || "Update website content via PawCab CMS";

    // If PAT is provided, commit directly to GitHub repository
    if (config.pat) {
      const result = await commitFileToGitHub({
        filePath: config.contentPath,
        contentBase64: base64Content,
        message,
        sha: sha || undefined,
      });

      // Best effort update local files if writable (ignored if in read-only environment)
      try {
        const rootContentPath = path.join(/*turbopackIgnore: true*/ process.cwd(), "content.json");
        fs.writeFileSync(rootContentPath, jsonString, "utf-8");
        const srcDataPath = path.join(/*turbopackIgnore: true*/ process.cwd(), "src", "data", "content.json");
        if (fs.existsSync(path.dirname(srcDataPath))) {
          fs.writeFileSync(srcDataPath, jsonString, "utf-8");
        }
      } catch {
        // Silently ignore in read-only / serverless runtime
      }

      try {
        revalidatePath("/", "layout");
      } catch {
        // Silently ignore
      }

      return NextResponse.json({
        success: true,
        source: "github",
        sha: result.sha,
        commit: result.commit,
        message: "Content successfully committed to GitHub repository!",
      });
    }

    // If no PAT, save locally if possible
    try {
      const rootContentPath = path.join(/*turbopackIgnore: true*/ process.cwd(), "content.json");
      fs.writeFileSync(rootContentPath, jsonString, "utf-8");
      const srcDataPath = path.join(/*turbopackIgnore: true*/ process.cwd(), "src", "data", "content.json");
      if (fs.existsSync(path.dirname(srcDataPath))) {
        fs.writeFileSync(srcDataPath, jsonString, "utf-8");
      }
      return NextResponse.json({
        success: true,
        source: "local",
        sha: null,
        message: "Saved locally (GitHub PAT not configured).",
      });
    } catch {
      return NextResponse.json({
        success: false,
        error: "Filesystem is read-only and GITHUB_PAT is not set. Please provide GITHUB_PAT in .env.",
      }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error("Error committing content to GitHub:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to commit content to GitHub";
    const status = errorMessage.includes("Conflict") ? 409 : 500;
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status }
    );
  }
}

