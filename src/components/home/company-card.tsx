import Link from "next/link";
import { Tag } from "@/components/shared/tag";
import type { Company } from "@/lib/types";

const companyTypeLabels: Record<string, string> = {
  internet: "互联网",
  "smart-hardware": "智能硬件",
  "consumer-brand": "消费品牌",
  "design-agency": "设计工作室",
  ecommerce: "电商",
  game: "游戏",
  other: "其他",
};

const directionLabels: Record<string, string> = {
  "industrial-design": "工业设计",
  "ui-ux": "UI/UX",
  "visual-brand": "视觉/品牌",
  "aigc-design": "AIGC",
};

export function CompanyCard({ company }: { company: Company }) {
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
        <p className="mt-3 text-sm text-[var(--muted)] line-clamp-3">
          {company.whyFollow}
        </p>
        <div className="tag-row mt-3">
          {company.suitableDirections.slice(0, 2).map((dir) => (
            <Tag key={dir} variant="teal">{directionLabels[dir] || dir}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
