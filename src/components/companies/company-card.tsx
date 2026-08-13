import Link from "next/link";
import { Tag } from "@/components/shared/tag";
import type { Company } from "@/lib/types";
import { ArrowRight, ExternalLink } from "lucide-react";

const companyTypeLabels: Record<string, string> = {
  internet: "互联网",
  "smart-hardware": "智能硬件",
  "consumer-brand": "消费品牌",
  "design-agency": "设计工作室",
  "design-consulting": "设计咨询",
  ecommerce: "电商",
  game: "游戏",
  manufacturing: "制造业",
  "culture-creativity": "文创",
  other: "其他",
};

const directionLabels: Record<string, string> = {
  "industrial-design": "工业设计",
  "ui-ux": "UI/UX",
  "visual-brand": "视觉/品牌",
  "aigc-design": "AIGC",
  "product-design": "产品设计",
};

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className="company-card card-base"
      data-company-card
    >
      <div>
        <h3>{company.name}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {companyTypeLabels[company.type] || company.type} · {company.city}
        </p>
        <p className="mt-3 text-sm text-[var(--muted)] line-clamp-3 company-summary">
          {company.whyFollow}
        </p>
        <div className="tag-row mt-3">
          {company.suitableDirections.map((dir) => (
            <Tag key={dir} variant="purple">{directionLabels[dir] || dir}</Tag>
          ))}
        </div>
        <div className="company-card-footer">
          <span className="card-cta">查看公司与在招岗位 <ArrowRight size={15} aria-hidden="true" /></span>
          {company.careerUrl && (
            <span className="company-source-hint">官方招聘 <ExternalLink size={13} aria-hidden="true" /></span>
          )}
        </div>
      </div>
    </Link>
  );
}
