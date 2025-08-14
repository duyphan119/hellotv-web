import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseHtmlString(htmlString: string) {
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(htmlString, "text/html");
  // const decoded = doc.body.textContent;

  // return decoded;

  return htmlString;
}

export function shortenServerName(serverName: string) {
  return shortenVideoLanguage(
    serverName.replace("#Hà Nội (", "").replace(")", "")
  );
}

export function shortenVideoLanguage(videoLanguage: string) {
  return videoLanguage.replace("Thuyết Minh", "TM").replace("Lồng Tiếng", "LT");
}
