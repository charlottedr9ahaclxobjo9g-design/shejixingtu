import { getCompanies } from "@/lib/data/companies";
import CompaniesClient from "./companies-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "公司雷达",
  description: "从公开岗位样本整理公司方向、关注理由和作品集建议。",
  alternates: { canonical: "/companies/" },
  openGraph: {
    title: "公司雷达",
    description: "从公开岗位样本整理公司方向、关注理由和作品集建议。",
    url: "/companies/",
    images: ["/images/og-image.png"],
  },
};

export default function CompaniesPage() {
  const companies = getCompanies();
  return <CompaniesClient companies={companies} />;
}
