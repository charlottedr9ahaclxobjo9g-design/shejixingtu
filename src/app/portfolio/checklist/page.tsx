import { PortfolioChecklist } from "@/components/portfolio/portfolio-checklist";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "作品集自检清单",
  description: "23项检查要点，确保作品集万无一失",
  alternates: { canonical: "/portfolio/checklist/" },
  openGraph: {
    title: "作品集自检清单",
    description: "23 项检查要点，帮助设计学生在投递前核对作品集。",
    url: "/portfolio/checklist/",
    images: ["/images/og-image.png"],
  },
};

export default function ChecklistPage() {
  return (
    <div>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/portfolio" className="breadcrumb">首页 / 作品集中心</Link>
            <h1>作品集自检清单</h1>
            <p>投递前对照检查，确保作品集万无一失。勾选状态会自动保存在本地。</p>
          </div>
          <span className="tag teal">23 项检查</span>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <PortfolioChecklist />
        </div>
      </section>
    </div>
  );
}
