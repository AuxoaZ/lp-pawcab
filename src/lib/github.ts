export interface GitHubConfig {
  pat: string;
  owner: string;
  repo: string;
  branch: string;
  contentPath: string;
}

export function getGitHubConfig(): GitHubConfig {
  return {
    pat: process.env.GITHUB_PAT || "",
    owner: process.env.GITHUB_OWNER || "AuxoaZ",
    repo: process.env.GITHUB_REPO || "lp-pawcab",
    branch: process.env.GITHUB_BRANCH || "main",
    contentPath: process.env.GITHUB_CONTENT_PATH || "content.json",
  };
}

export async function fetchFileFromGitHub(filePath: string) {
  const config = getGitHubConfig();

  if (!config.pat) {
    throw new Error(
      "GITHUB_PAT is not set in environment variables. Please configure your GitHub Personal Access Token."
    );
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}?ref=${encodeURIComponent(
    config.branch
  )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${config.pat}`,
      "User-Agent": "PawCab-CMS/1.0",
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GitHub API error (${response.status} ${response.statusText}): ${errorBody}`
    );
  }

  const data = await response.json();
  const rawContent = Buffer.from(data.content, "base64").toString("utf-8");
  return {
    content: rawContent,
    sha: data.sha as string,
    size: data.size,
    path: data.path,
  };
}

export async function commitFileToGitHub({
  filePath,
  contentBase64,
  message,
  sha,
}: {
  filePath: string;
  contentBase64: string;
  message: string;
  sha?: string | null;
}) {
  const config = getGitHubConfig();

  if (!config.pat) {
    throw new Error("GITHUB_PAT is not set in environment variables.");
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;

  const payload: Record<string, unknown> = {
    message,
    content: contentBase64,
    branch: config.branch,
  };

  if (sha) {
    payload.sha = sha;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${config.pat}`,
      "Content-Type": "application/json",
      "User-Agent": "PawCab-CMS/1.0",
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 409) {
    throw new Error(
      "Conflict error (409): The repository has a newer version of this file. Please refresh data first to merge your changes."
    );
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GitHub API error (${response.status} ${response.statusText}): ${errorBody}`
    );
  }

  const data = await response.json();
  return {
    sha: data.content?.sha as string,
    commit: data.commit,
  };
}

