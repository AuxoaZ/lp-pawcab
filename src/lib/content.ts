import defaultContent from "@/data/content.json";
import { AppContent } from "@/types/content";

export function getContent(): AppContent {
  // Returns the master typed content. In Next.js, this is bundled at build time.
  // When CMS commits to GitHub, repo rebuilds/redeploys will automatically serve latest content.json.
  return defaultContent as unknown as AppContent;
}

