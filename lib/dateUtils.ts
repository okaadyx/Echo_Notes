/**
 * Formats a date string into a relative human-readable string (e.g., "5 mins ago", "2 hours ago").
 * @param dateStr ISO date string or date string
 * @returns Human readable relative time string
 */
export const formatTimeAgo = (dateStr?: string): string => {
  if (!dateStr) return "Just now";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;

  if (diffInHours < 24) {
    let result = `${diffInHours} hour${diffInHours !== 1 ? "s" : ""}`;
    if (remainingMinutes > 0) {
      result += ` ${remainingMinutes} min${remainingMinutes !== 1 ? "s" : ""}`;
    }
    return result + " ago";
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  // Fallback to formatted date for older items
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
