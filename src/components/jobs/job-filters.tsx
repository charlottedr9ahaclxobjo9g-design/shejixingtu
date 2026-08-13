"use client";
import { useState, useMemo } from "react";
import type { Job } from "@/lib/types";
import type { JobDirection } from "@/lib/types";

const directionOptions: { key: "all" | JobDirection; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "industrial-design", label: "工业设计" },
  { key: "ui-ux", label: "UI/UX" },
  { key: "visual-brand", label: "视觉/品牌" },
  { key: "aigc-design", label: "AIGC" },
  { key: "product-design", label: "产品设计" },
  { key: "other", label: "其他设计" },
];

const typeOptions: { key: string; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "internship", label: "实习" },
  { key: "campus", label: "校招" },
  { key: "full-time", label: "全职" },
];

const difficultyOptions: { key: string; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "入门", label: "入门" },
  { key: "中等", label: "中等" },
  { key: "中高", label: "中高" },
  { key: "高级", label: "高级" },
];

interface JobFiltersProps {
  jobs: Job[];
  onFilter: (filtered: Job[]) => void;
  totalCount?: number;
}

/** 将 city 字段按 "/" 拆分成独立城市，然后去重 */
function splitCities(jobs: Job[]): string[] {
  const set = new Set<string>();
  for (const j of jobs) {
    for (const c of j.city.split("/")) {
      const trimmed = c.trim();
      if (trimmed) set.add(trimmed);
    }
  }
  return Array.from(set).sort();
}

/** 检查某个 job 的 city 字段是否包含指定城市 */
function matchesCity(job: Job, city: string): boolean {
  return job.city.split("/").some((c) => c.trim() === city);
}

export function JobFilters({ jobs, onFilter, totalCount = 0 }: JobFiltersProps) {
  const [activeDirection, setActiveDirection] = useState<"all" | JobDirection>("all");
  const [activeType, setActiveType] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [activeCity, setActiveCity] = useState("all");
  const [search, setSearch] = useState("");

  const cityOptions = useMemo(() => {
    const cities = splitCities(jobs);
    return [{ key: "all", label: "全部" }, ...cities.map((c) => ({ key: c, label: c }))];
  }, [jobs]);

  const applyFilters = () => {
    let filtered = jobs;
    if (activeDirection !== "all") {
      filtered = filtered.filter((j) => j.direction === activeDirection);
    }
    if (activeType !== "all") {
      filtered = filtered.filter((j) => j.jobType === activeType);
    }
    if (activeDifficulty !== "all") {
      filtered = filtered.filter((j) => j.difficulty === activeDifficulty);
    }
    if (activeCity !== "all") {
      filtered = filtered.filter((j) => matchesCity(j, activeCity));
    }
    if (search.trim()) {
      const t = search.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(t) ||
          j.companyName.toLowerCase().includes(t) ||
          j.skills.some((s) => s.toLowerCase().includes(t)) ||
          j.city.toLowerCase().includes(t)
      );
    }
    onFilter(filtered);
  };

  const handleReset = () => {
    setActiveDirection("all");
    setActiveType("all");
    setActiveDifficulty("all");
    setActiveCity("all");
    setSearch("");
    onFilter(jobs);
  };

  return (
    <>
      {/* 搜索 + 重置 */}
      <div className="search-row">
        <label className="search-box">
          <span>搜索</span>
          <input
            id="jobSearch"
            type="search"
            placeholder="岗位、公司、城市、工具、技能"
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
            onBlur={applyFilters}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </label>
        <button className="btn btn-light" type="button" onClick={handleReset}>
          重置
        </button>
      </div>

      {/* 筛选面板 + 结果区域 */}
      <div className="jobs-layout">
        <aside className="filter-panel">
          {/* 设计方向 */}
          <div className="filter-group">
            <h3>设计方向</h3>
            <div className="chip-list">
              {directionOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`chip ${activeDirection === opt.key ? "active" : ""}`}
                  type="button"
                  onClick={() => { setActiveDirection(opt.key); setTimeout(applyFilters, 0); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 城市 — 拆分后去重 */}
          <div className="filter-group">
            <h3>城市</h3>
            <div className="chip-list">
              {cityOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`chip ${activeCity === opt.key ? "active" : ""}`}
                  type="button"
                  onClick={() => { setActiveCity(opt.key); setTimeout(applyFilters, 0); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 岗位类型 */}
          <div className="filter-group">
            <h3>岗位类型</h3>
            <div className="chip-list">
              {typeOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`chip ${activeType === opt.key ? "active" : ""}`}
                  type="button"
                  onClick={() => { setActiveType(opt.key); setTimeout(applyFilters, 0); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 难度 */}
          <div className="filter-group">
            <h3>难度</h3>
            <div className="chip-list">
              {difficultyOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`chip ${activeDifficulty === opt.key ? "active" : ""}`}
                  type="button"
                  onClick={() => { setActiveDifficulty(opt.key); setTimeout(applyFilters, 0); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>页面说明</h3>
            <p className="muted-small">点击任意岗位进入完整详情。卡片第一层是岗位名称，第二层是公司和城市。</p>
            <p className="muted-small" id="resultCount">{totalCount || jobs.length} 个岗位</p>
          </div>
        </aside>

        {/* 右侧：岗位列表占位——由父组件渲染 */}
        <div id="filter-result-slot" />
      </div>
    </>
  );
}
