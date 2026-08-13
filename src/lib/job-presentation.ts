import type { Job } from "@/lib/types";

export const directionLabels: Record<string, string> = {
  "industrial-design": "工业设计",
  "ui-ux": "UI/UX",
  "visual-brand": "视觉/品牌",
  "aigc-design": "AIGC",
  "product-design": "产品设计",
  "service-design": "服务设计",
  "packaging-design": "包装设计",
  other: "其他设计",
};

export function getJobCities(job: Job): string[] {
  if (job.cities?.length) return job.cities;
  return job.city
    .split(/[\/、,，]/)
    .map((city) => city.trim())
    .filter(Boolean);
}

export function getJobDisplayTitle(job: Job): string {
  if (!job.focusArea || job.title.includes(job.focusArea)) return job.title;
  return `${job.title}（${job.focusArea}）`;
}

export function getJobTypeLabel(job: Job): string {
  if (job.jobType === "internship") return "实习";
  if (job.jobType === "campus") return "校招";
  if (job.jobType === "contract") return "项目制";
  return "全职";
}

function formatMonthDay(value?: string | null): string | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  return `${Number(match[2])}月${Number(match[3])}日`;
}

export function getJobTimingLabel(job: Job): string {
  const deadline = formatMonthDay(job.deadline);
  if (deadline) return `${deadline}截止`;

  const checkedAt = formatMonthDay(job.sourceCheckedAt || job.publishedDate);
  return checkedAt ? `${checkedAt}更新` : "近期收录";
}
