"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import {
  readSavedJobs,
  SAVED_JOBS_EVENT,
  writeSavedJobs,
} from "@/lib/saved-jobs";

interface SaveJobButtonProps {
  slug: string;
  showLabel?: boolean;
}

export function SaveJobButton({ slug, showLabel = false }: SaveJobButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readSavedJobs().has(slug));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(SAVED_JOBS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(SAVED_JOBS_EVENT, sync);
    };
  }, [slug]);

  const toggle = () => {
    const savedJobs = readSavedJobs();
    if (savedJobs.has(slug)) savedJobs.delete(slug);
    else savedJobs.add(slug);
    writeSavedJobs(savedJobs);
  };

  const label = saved ? "取消收藏" : "收藏岗位";

  return (
    <button
      type="button"
      className={`save-job-button ${saved ? "is-saved" : ""} ${showLabel ? "with-label" : ""}`}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      onClick={toggle}
    >
      <Bookmark size={17} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
      {showLabel && <span>{saved ? "已收藏" : "收藏岗位"}</span>}
    </button>
  );
}
