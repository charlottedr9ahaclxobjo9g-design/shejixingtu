"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { CompanyCard } from "@/components/companies/company-card";
import type { Company, JobDirection } from "@/lib/types";

const typeOptions: { value: string; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "smart-hardware", label: "智能硬件" },
  { value: "manufacturing", label: "制造业" },
  { value: "culture-creativity", label: "内容创意" },
];

const directionOptions: { value: "all" | JobDirection; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "industrial-design", label: "工业设计" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "visual-brand", label: "视觉/品牌" },
  { value: "aigc-design", label: "AIGC" },
  { value: "product-design", label: "产品设计" },
];

/** 将 city 字段按 "/" 拆分成独立城市，然后去重排序 */
function splitCities(companies: Company[]): string[] {
  const set = new Set<string>();
  for (const c of companies) {
    for (const part of c.city.split(/[\/、,，]/)) {
      const trimmed = part.trim();
      if (trimmed) set.add(trimmed);
    }
  }
  return Array.from(set).sort();
}

/** 检查某个 company 的 city 字段是否包含指定城市 */
function matchesCity(c: Company, city: string): boolean {
  return c.city.split(/[\/、,，]/).some((part) => part.trim() === city);
}

export default function CompaniesClient({ companies }: { companies: Company[] }) {
  const [activeType, setActiveType] = useState("all");
  const [activeDirection, setActiveDirection] = useState<"all" | JobDirection>("all");
  const [activeCity, setActiveCity] = useState("all");
  const [search, setSearch] = useState("");

  // 拆分城市去重
  const cityOptions = useMemo(() => {
    const cities = splitCities(companies);
    return [{ value: "all", label: "全部" }, ...cities.map((c) => ({ value: c, label: c }))];
  }, [companies]);

  const filtered = companies.filter((c) => {
    if (activeType !== "all" && c.type !== activeType) return false;
    if (activeDirection !== "all" && !c.suitableDirections.includes(activeDirection)) return false;
    if (activeCity !== "all" && !matchesCity(c, activeCity)) return false;
    if (search.trim()) {
      const t = search.toLowerCase();
      if (
        !c.name.toLowerCase().includes(t) &&
        !c.whyFollow.toLowerCase().includes(t) &&
        !c.city.toLowerCase().includes(t)
      ) return false;
    }
    return true;
  });

  return (
    <div>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/" className="breadcrumb">首页 / 公司雷达</Link>
            <h1>公司与岗位观察</h1>
            <p>只展示已有可追溯公开岗位的公司，按方向和城市找到值得继续研究的目标。</p>
          </div>
          <span className="tag teal">{companies.length} 家有来源公司</span>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          {/* 搜索 */}
          <div className="search-row mb-6">
            <label className="search-box">
              <span>搜索</span>
              <input
                id="companySearch"
                type="search"
                placeholder="搜索公司、城市或岗位特点"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          {/* 筛选标签 */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <p className="text-xs font-bold text-[var(--muted)] mb-2">公司类型</p>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`chip ${activeType === opt.value ? "active" : ""}`}
                    type="button"
                    aria-pressed={activeType === opt.value}
                    onClick={() => setActiveType(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted)] mb-2">设计方向</p>
              <div className="flex flex-wrap gap-2">
                {directionOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`chip ${activeDirection === opt.value ? "active" : ""}`}
                    type="button"
                    aria-pressed={activeDirection === opt.value}
                    onClick={() => setActiveDirection(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted)] mb-2">城市</p>
              <div className="flex flex-wrap gap-2">
                {cityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`chip ${activeCity === opt.value ? "active" : ""}`}
                    type="button"
                    aria-pressed={activeCity === opt.value}
                    onClick={() => setActiveCity(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 结果统计 */}
          <p className="muted-small mb-4" id="companyCount" aria-live="polite">
            {filtered.length} 家公司
          </p>

          {/* 公司网格 */}
          <div className="company-grid">
            {filtered.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--muted)]">
              暂无符合条件的公司
            </div>
          )}
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="section soft">
        <div className="shell text-center">
          <h2 className="section-title mb-3">从公司观察进入具体岗位准备</h2>
          <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
            先查看对应岗位原文和学生版解读，再按目标方向整理作品集证据。
          </p>
          <Link href="/jobs" className="btn btn-dark">查看全部岗位</Link>
        </div>
      </section>
    </div>
  );
}
