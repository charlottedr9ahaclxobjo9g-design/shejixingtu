import { readFileSync } from 'fs';
import { join } from 'path';
import { Job, JobsDataWrapper } from '@/lib/types';

const DATA_PATH = join(process.cwd(), 'public', 'data', 'jobs.json');

function readJobsData(): Job[] {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    const data: JobsDataWrapper = JSON.parse(raw);
    return data.jobs || [];
  } catch {
    return [];
  }
}

export function getJobs(): Job[] {
  return readJobsData();
}

export function getJobBySlug(slug: string): Job | null {
  const jobs = readJobsData();
  return jobs.find((job) => job.slug === slug) || null;
}

export function getFeaturedJobs(limit?: number): Job[] {
  const jobs = readJobsData();
  const featured = jobs.filter((job) => job.featured);
  return limit ? featured.slice(0, limit) : featured;
}
