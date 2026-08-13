"use client";

import { useEffect, useMemo, useState } from "react";
import { JobCard } from "@/components/jobs/job-card";
import { getJobCities } from "@/lib/job-presentation";
import type { Job, JobDirection, JobVerificationStatus } from "@/lib/types";

const directionOptions: { key: "all" | JobDirection; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "industrial-design", label: "工业设计" },
  { key: "ui-ux", label: "UI/UX" },
  { key: "visual-brand", label: "视觉/品牌" },
  { key: "aigc-design", label: "AIGC" },
  { key: "product-design", label: "产品设计" },
  { key: "other", label: "其他设计" },
];

const typeOptions = [
  { key: "all", label: "全部" },
  { key: "internship", label: "实习" },
  { key: "campus", label: "校招" },
  { key: "full-time", label: "全职" },
];

const statusOptions: { key: "all" | JobVerificationStatus; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "verified-active", label: "已核验在招" },
  { key: "needs-review", label: "待复核" },
  { key: "needs-source", label: "待补出处" },
  { key: "expired", label: "已截止" },
  { key: "reference", label: "历史参考" },
];

const difficultyOptions = ["全部", "入门", "中等", "中高", "高级"];

function cityOptions(jobs: Job[]) {
  return Array.from(new Set(jobs.flatMap(getJobCities))).sort();
}

function FilterButtons<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="chip-list">
      {options.map((option) => (
        <button
          key={option.key}
          className={`chip ${value === option.key ? "active" : ""}`}
          type="button"
          aria-pressed={value === option.key}
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function ClientJobPage({ jobs }: { jobs: Job[] }) {
  const [activeDirection, setActiveDirection] = useState<"all" | JobDirection>("all");
  const [activeType, setActiveType] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [activeCity, setActiveCity] = useState("all");
  const [activeStatus, setActiveStatus] = useState<"all" | JobVerificationStatus>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("q");
    if (!query) return;
    const timer = window.setTimeout(() => setSearch(query), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const cities = useMemo(() => cityOptions(jobs), [jobs]);
  const filtered = useMemo(() => jobs.filter((job) => {
    if (activeDirection !== "all" && job.direction !== activeDirection) return false;
    if (activeType !== "all" && job.jobType !== activeType) return false;
    if (activeDifficulty !== "all" && job.difficulty !== activeDifficulty) return false;
    if (activeCity !== "all" && !getJobCities(job).includes(activeCity)) return false;
    if (activeStatus !== "all" && job.verificationStatus !== activeStatus) return false;
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return [job.title, job.companyName, job.city, job.focusArea || "", ...job.skills, ...job.tools]
      .some((value) => value.toLowerCase().includes(term));
  }), [jobs, activeDirection, activeType, activeDifficulty, activeCity, activeStatus, search]);

  const reset = () => {
    setActiveDirection("all");
    setActiveType("all");
    setActiveDifficulty("all");
    setActiveCity("all");
    setActiveStatus("all");
    setSearch("");
  };

  return (
    <div>
      <div className="search-row">
        <label className="search-box" htmlFor="jobSearch">
          <span>搜索</span>
          <input
            id="jobSearch"
            type="search"
            placeholder="岗位、公司、城市、工具、技能"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <button className="btn btn-light" type="button" onClick={reset}>重置筛选</button>
      </div>

      <div className="jobs-layout">
        <aside className="filter-panel" aria-label="岗位筛选">
          <div className="filter-group">
            <h3>核验状态</h3>
            <FilterButtons options={statusOptions} value={activeStatus} onChange={setActiveStatus} />
          </div>
          <div className="filter-group">
            <h3>设计方向</h3>
            <FilterButtons options={directionOptions} value={activeDirection} onChange={setActiveDirection} />
          </div>
          <div className="filter-group">
            <h3>城市</h3>
            <FilterButtons
              options={[{ key: "all", label: "全部" }, ...cities.map((city) => ({ key: city, label: city }))]}
              value={activeCity}
              onChange={setActiveCity}
            />
          </div>
          <div className="filter-group">
            <h3>岗位类型</h3>
            <FilterButtons options={typeOptions} value={activeType} onChange={setActiveType} />
          </div>
          <div className="filter-group">
            <h3>难度</h3>
            <FilterButtons
              options={difficultyOptions.map((label) => ({ key: label === "全部" ? "all" : label, label }))}
              value={activeDifficulty}
              onChange={setActiveDifficulty}
            />
          </div>
        </aside>

        <div>
          <div className="result-bar">
            <p id="resultCount" aria-live="polite">找到 {filtered.length} 条岗位情报</p>
            <p>进入详情可先看公开 JD 信息，再看学生版翻译。</p>
          </div>
          {filtered.length ? (
            <div className="job-list">
              {filtered.map((job) => <JobCard key={job.slug} job={job} />)}
            </div>
          ) : (
            <div className="empty show"><p>暂无符合条件的岗位情报，请调整筛选条件。</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
