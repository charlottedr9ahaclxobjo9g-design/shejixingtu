"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { CompanyCard } from "@/components/companies/company-card";
import type { Company, JobDirection } from "@/lib/types";

const typeOptions: { value: string; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "internet", label: "互联网" },
  { value: "smart-hardware", label: "智能硬件" },
  { value: "consumer-brand", label: "消费品牌" },
  { value: "design-agency", label: "设计工作室" },
  { value: "design-consulting", label: "设计咨询" },
  { value: "ecommerce", label: "电商" },
  { value: "game", label: "游戏" },
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
            <h1>公司雷达</h1>
            <p>从公开岗位样本整理公司方向、关注理由和作品集建议；是否在招请以企业官方渠道为准。</p>
          </div>
          <span className="tag teal">{companies.length} 家公司</span>
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
                placeholder="搜索公司、城市、类型"
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
          <h2 className="section-title mb-3">继续准备目标公司投递材料</h2>
          <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
            通过统一表单选择公司投递指南、面试准备和作品集资料。
          </p>
          <a
            href="https://my.feishu.cn/share/base/form/shrcnI7IY8GJMtFU5N4AO7aMEyS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
          >
            填写表单选择资料
          </a>
        </div>
      </section>
    </div>
  );
}
