"use client";

import { useEffect, useMemo, useState } from "react";
import { Bookmark, ChevronDown, SlidersHorizontal } from "lucide-react";
import { JobCard } from "@/components/jobs/job-card";
import { getJobCities } from "@/lib/job-presentation";
import { readSavedJobs, SAVED_JOBS_EVENT } from "@/lib/saved-jobs";
import type { Job, JobDirection } from "@/lib/types";

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
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("q");
    if (!query) return;
    const timer = window.setTimeout(() => setSearch(query), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sync = () => setSavedJobs(readSavedJobs());
    const timer = window.setTimeout(sync, 0);
    window.addEventListener("storage", sync);
    window.addEventListener(SAVED_JOBS_EVENT, sync);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", sync);
      window.removeEventListener(SAVED_JOBS_EVENT, sync);
    };
  }, []);

  const cities = useMemo(() => cityOptions(jobs), [jobs]);
  const activeFilterCount = [
    activeDirection !== "all",
    activeType !== "all",
    activeDifficulty !== "all",
    activeCity !== "all",
    savedOnly,
  ].filter(Boolean).length;
  const filtered = useMemo(() => jobs.filter((job) => {
    if (activeDirection !== "all" && job.direction !== activeDirection) return false;
    if (activeType !== "all" && job.jobType !== activeType) return false;
    if (activeDifficulty !== "all" && job.difficulty !== activeDifficulty) return false;
    if (activeCity !== "all" && !getJobCities(job).includes(activeCity)) return false;
    if (savedOnly && !savedJobs.has(job.slug)) return false;
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return [job.title, job.companyName, job.city, job.focusArea || "", ...job.skills, ...job.tools]
      .some((value) => value.toLowerCase().includes(term));
  }), [jobs, activeDirection, activeType, activeDifficulty, activeCity, savedOnly, savedJobs, search]);

  const reset = () => {
    setActiveDirection("all");
    setActiveType("all");
    setActiveDifficulty("all");
    setActiveCity("all");
    setSavedOnly(false);
    setFiltersOpen(false);
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

      <button
        className="mobile-filter-toggle"
        type="button"
        aria-expanded={filtersOpen}
        aria-controls="jobFilters"
        onClick={() => setFiltersOpen((value) => !value)}
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        <span>筛选条件{activeFilterCount ? `（${activeFilterCount}）` : ""}</span>
        <ChevronDown className={filtersOpen ? "is-open" : ""} size={16} aria-hidden="true" />
      </button>

      <div className="jobs-layout">
        <aside id="jobFilters" className={`filter-panel ${filtersOpen ? "mobile-open" : ""}`} aria-label="岗位筛选">
          <div className="filter-group">
            <h3>我的岗位</h3>
            <button
              className={`chip saved-jobs-filter ${savedOnly ? "active" : ""}`}
              type="button"
              aria-pressed={savedOnly}
              onClick={() => setSavedOnly((value) => !value)}
            >
              <Bookmark size={14} fill={savedOnly ? "currentColor" : "none"} aria-hidden="true" />
              只看收藏（{savedJobs.size}）
            </button>
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
            <p id="resultCount" aria-live="polite">找到 {filtered.length} 条可查岗位</p>
            <p>可查看招聘原文、学生解读和作品集准备建议。</p>
          </div>
          {filtered.length ? (
            <div className="job-list">
              {filtered.map((job) => <JobCard key={job.slug} job={job} />)}
            </div>
          ) : (
            <div className="empty show">
              <p>{savedOnly && savedJobs.size === 0 ? "还没有收藏岗位，点击岗位卡片上的书签即可加入。" : "暂无符合条件的岗位，请调整筛选条件。"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
