import { readFileSync } from 'fs';
import { join } from 'path';
import { Job, JobsDataWrapper } from '@/lib/types';

const DATA_PATH = join(process.cwd(), 'data', 'jobs.json');

function readJobsData(): Job[] {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    const data: JobsDataWrapper = JSON.parse(raw);
    return data.jobs || [];
  } catch {
    return [];
  }
}

function newestFirst(left: Job, right: Job): number {
  const leftDate = left.sourceCheckedAt || left.publishedDate || "";
  const rightDate = right.sourceCheckedAt || right.publishedDate || "";
  return rightDate.localeCompare(leftDate);
}

export function getJobs(): Job[] {
  return readJobsData()
    .filter((job) => job.publicVisible && job.sourceUrl && job.sourceCheckedAt)
    .sort(newestFirst);
}

export function getJobBySlug(slug: string): Job | null {
  const jobs = getJobs();
  return jobs.find((job) => job.slug === slug) || null;
}

export function getFeaturedJobs(limit?: number): Job[] {
  const jobs = getJobs();
  const featured = jobs.filter((job) => job.featured);
  const selected = featured.length ? featured : jobs;
  return limit ? selected.slice(0, limit) : selected;
}
