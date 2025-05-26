import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseHtmlString(htmlString: string) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(htmlString, "text/html");
  let decoded = doc.body.textContent;

  return decoded;
}

export function shortenServerName(serverName: string) {
  return serverName.slice(9, -1);
}
