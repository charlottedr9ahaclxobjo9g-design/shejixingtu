import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SaveJobButton } from "@/components/jobs/save-job-button";
import { Tag } from "@/components/shared/tag";
import {
  directionLabels,
  getJobCities,
  getJobDisplayTitle,
  getJobTimingLabel,
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
  const cities = getJobCities(job);
  const titleId = `job-title-${job.slug}`;

  return (
    <article
      className="job-card"
      data-job-card
      data-kind={job.direction}
      aria-labelledby={titleId}
    >
      <div className="job-logo" aria-hidden="true">{job.companyName.slice(0, 1)}</div>

      <div className="job-card-body">
        <h3 id={titleId}>
          <Link href={`/jobs/${job.slug}`}>{getJobDisplayTitle(job)}</Link>
        </h3>
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
        <div className="job-card-utility">
          <span className="job-timing">{getJobTimingLabel(job)}</span>
          <SaveJobButton slug={job.slug} />
        </div>
        <span className="job-difficulty">难度：{job.difficulty}</span>
        <div className="job-card-actions">
          {job.sourceUrl && (
            <a href={job.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className="job-source-link">
              招聘原文 <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          <Link href={`/jobs/${job.slug}`} className="job-card-cta">
            查看解读 <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
