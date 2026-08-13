import type { Job, JobVerificationStatus } from "@/lib/types";

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

export const statusPresentation: Record<
  JobVerificationStatus,
  { label: string; tone: "teal" | "orange" | "purple" | "neutral"; description: string }
> = {
  "verified-active": {
    label: "已核验在招",
    tone: "teal",
    description: "已核对可访问的招聘出处、岗位信息和核验日期。",
  },
  "needs-review": {
    label: "待复核",
    tone: "purple",
    description: "已有公开出处，但尚未完成最新一轮人工核验。",
  },
  "needs-source": {
    label: "待补出处",
    tone: "orange",
    description: "当前为整理记录，仍需补充可追溯的公开招聘出处。",
  },
  expired: {
    label: "已截止",
    tone: "neutral",
    description: "原记录的招聘截止日期已过，仅作为岗位要求参考。",
  },
  reference: {
    label: "历史参考",
    tone: "neutral",
    description: "用于理解岗位要求，不代表企业当前正在招聘。",
  },
};

export function getJobStatus(job: Job) {
  return statusPresentation[job.verificationStatus || "reference"];
}

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
