import masterContent from "../../content.json";
import { AppContent } from "@/types/content";

export function getContent(): AppContent {
  return masterContent as unknown as AppContent;
}

export default masterContent as unknown as AppContent;

