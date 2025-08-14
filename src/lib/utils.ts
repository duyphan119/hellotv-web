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
  return serverName.slice(9, -1);
}
