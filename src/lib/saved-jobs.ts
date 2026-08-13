export const SAVED_JOBS_KEY = "design-star-map-saved-jobs";
export const SAVED_JOBS_EVENT = "design-star-map-saved-jobs-updated";

export function readSavedJobs(): Set<string> {
  if (typeof window === "undefined") return new Set();

  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(SAVED_JOBS_KEY) || "[]");
    if (!Array.isArray(value)) return new Set();
    return new Set(value.filter((item): item is string => typeof item === "string"));
  } catch {
    return new Set();
  }
}

export function writeSavedJobs(slugs: Set<string>): void {
  window.localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify([...slugs]));
  window.dispatchEvent(new Event(SAVED_JOBS_EVENT));
}
