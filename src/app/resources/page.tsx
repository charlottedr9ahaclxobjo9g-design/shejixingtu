import { getResources } from "@/lib/data/resources";
import { ResourceCard } from "@/components/resources/resource-card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "求职资料",
  description: "把散落的求职准备材料变成可领取、可执行的资料包，覆盖实习、作品集、工具、面试和薪资。",
  alternates: { canonical: "/resources/" },
  openGraph: {
    title: "求职资料",
    description: "把散落的求职准备材料变成可领取、可执行的资料包。",
    url: "/resources/",
    images: ["/images/og-image.png"],
  },
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <div>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/" className="breadcrumb">首页 / 求职资料</Link>
            <h1>求职资料</h1>
            <p>把散落的求职准备材料变成可领取、可执行的资料包。</p>
          </div>
          <span className="tag purple">{resources.length} 份资料</span>
        </div>
      </div>

      {/* 资源网格 */}
      <section className="section">
        <div className="shell">
          <div className="resource-grid">
            {resources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
          {resources.length === 0 && (
            <div className="text-center py-16 text-[var(--muted)]">
              暂无资料
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
