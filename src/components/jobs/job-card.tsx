import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tag } from "@/components/shared/tag";
import {
  directionLabels,
  getJobCities,
  getJobDisplayTitle,
  getJobStatus,
  getJobTypeLabel,
} from "@/lib/job-presentation";
import type { Job } from "@/lib/types";

const directionColors: Record<string, "purple" | "orange" | "teal"> = {
  "industrial-design": "purple",
  "ui-ux": "orange",
  "visual-brand": "teal",
  "aigc-design": "purple",
  "product-design": "orange",
  other: "teal",
};

export function JobCard({ job }: { job: Job }) {
  const status = getJobStatus(job);
  const cities = getJobCities(job);

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="job-card"
      data-job-card
      data-kind={job.direction}
      aria-label={`查看 ${job.companyName} ${job.title} 岗位详情`}
    >
      <div className="job-logo" aria-hidden="true">{job.companyName.slice(0, 1)}</div>

      <div className="job-card-body">
        <h3>{getJobDisplayTitle(job)}</h3>
        <p className="job-meta">{job.companyName} · {cities.join(" / ")}</p>
        <p className="job-desc line-clamp-2">{job.studentExplanation}</p>
        <div className="tag-row">
          <Tag variant={directionColors[job.direction] || "purple"}>
            {directionLabels[job.direction] || job.direction}
          </Tag>
          {job.skills.slice(0, 2).map((skill) => (
            <Tag key={skill} variant="default">{skill}</Tag>
          ))}
          <Tag variant="orange">{getJobTypeLabel(job)}</Tag>
        </div>
      </div>

      <div className="job-card-aside">
        <span className={`status-tag status-${status.tone}`}>{status.label}</span>
        <span className="job-difficulty">难度：{job.difficulty}</span>
        <span className="job-card-cta">查看 JD 与解读 <ArrowRight size={15} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
