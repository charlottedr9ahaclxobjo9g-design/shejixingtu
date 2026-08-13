import { getJobs } from "@/lib/data/jobs";
import { ClientJobPage } from "@/components/jobs/client-job-page";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "岗位情报",
  description: "用筛选和搜索快速找到方向，再进入详情页看学生版 JD 翻译、作品集要求和准备建议。",
  alternates: { canonical: "/jobs/" },
  openGraph: {
    title: "岗位情报",
    description: "用筛选和搜索快速找到方向，再进入详情页看学生版 JD 翻译、作品集要求和准备建议。",
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
            <p>用筛选和搜索快速找到方向，再进入详情页看学生版 JD 翻译、作品集要求和准备建议。</p>
          </div>
          <span className="tag purple">{jobs.length} 条情报样本</span>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <div className="data-policy-note" role="note">
            <strong>核验口径</strong>
            <p>只有同时核对公开出处、岗位内容和核验日期的记录才标记为“已核验在招”；其他记录用于理解岗位要求，不等同于招聘中。</p>
            <Link href="/about#data-policy">查看数据说明</Link>
          </div>
          <ClientJobPage jobs={jobs} />
        </div>
      </section>
    </div>
  );
}
