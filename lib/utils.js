import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function resolveItemUrl(item) {
  if (item.type == 'page' && item.page) {
    return `${item.page.permalink}`;
  }
  if (item.type === 'post' && item.post) {
    return `/posts/${item.post}`;
  }
  if (item.type === 'url' && item.url) {
    return item.url;
  }
  return '#';
}