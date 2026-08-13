import { JobCard } from "./job-card";
import type { Job } from "@/lib/types";

export function JobList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return (
      <div id="emptyJobs" className="empty show">
        <p>暂无符合条件的岗位</p>
      </div>
    );
  }
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.slug} job={job} />
      ))}
    </div>
  );
}
