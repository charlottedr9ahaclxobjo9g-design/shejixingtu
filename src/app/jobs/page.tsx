import { getJobs } from "@/lib/data/jobs";
import { ClientJobPage } from "@/components/jobs/client-job-page";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "岗位情报",
  description: "搜索设计岗位，查看公开招聘原文、学生版解读、作品集要求和准备建议。",
  alternates: { canonical: "/jobs/" },
  openGraph: {
    title: "岗位情报",
    description: "搜索设计岗位，查看公开招聘原文、学生版解读、作品集要求和准备建议。",
    url: "/jobs/",
    images: ["/images/og-image.png"],
  },
};

export default function JobsPage() {
  const jobs = getJobs();

  return (
    <div>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/" className="breadcrumb">首页 / 岗位情报</Link>
            <h1>岗位情报</h1>
            <p>当前只展示可打开招聘原文的岗位。先筛选方向与城市，再查看学生版解读和作品集准备建议。</p>
          </div>
          <span className="tag purple">{jobs.length} 条可查岗位</span>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <ClientJobPage jobs={jobs} />
        </div>
      </section>
    </div>
  );
}
