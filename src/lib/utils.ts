import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseHtmlString(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const decoded = doc.body.textContent;
  if (!decoded) return htmlString;
  return decoded;
}

export function shortenServerName(serverName: string) {
  return serverName?.replace("#Hà Nội (", "").replace(")", "") || serverName;
}

export function shortenVideoLanguage(videoLanguage: string) {
  return (
    videoLanguage?.replace("Thuyết Minh", "TM").replace("Lồng Tiếng", "LT") ||
    videoLanguage
  );
}
