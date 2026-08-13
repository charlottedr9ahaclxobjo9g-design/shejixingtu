import { getCompanies } from "@/lib/data/companies";
import CompaniesClient from "./companies-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "公司雷达",
  description: "按设计方向了解值得关注的公司、岗位特点和作品集建议。",
  alternates: { canonical: "/companies/" },
  openGraph: {
    title: "公司雷达",
    description: "按设计方向了解值得关注的公司、岗位特点和作品集建议。",
    url: "/companies/",
    images: ["/images/og-image.png"],
  },
};

export default function CompaniesPage() {
  const companies = getCompanies();
  return <CompaniesClient companies={companies} />;
}
