import { getCompanyBySlug, getCompanies } from "@/lib/data/companies";
import { getJobs } from "@/lib/data/jobs";
import { notFound } from "next/navigation";
import { ExternalFormButton } from "@/components/shared/external-form-button";
import { JobCard } from "@/components/jobs/job-card";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCompanies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return { title: "公司未找到" };
  return {
    title: `${company.name} · 公司雷达`,
    description: company.whyFollow,
    alternates: { canonical: `/companies/${company.slug}/` },
    openGraph: {
      title: `${company.name} · 公司雷达`,
      description: company.whyFollow,
      url: `/companies/${company.slug}/`,
      images: ["/images/og-image.png"],
    },
  };
}

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
  "aigc-design": "AIGC设计",
  "product-design": "产品设计",
  other: "其他设计",
};

export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  // 关联岗位：同公司或同 slug 前缀
  const relatedJobs = getJobs()
    .filter((j) => j.companyName === company.name || j.companySlug === company.slug)
    .slice(0, 6);

  return (
    <div>
      {/* 面包屑 */}
      <div className="bg-white border-b border-[var(--line)]">
        <div className="shell py-4">
          <Link href="/companies" className="breadcrumb">首页 / 公司雷达</Link>
        </div>
      </div>

      {/* 详情英雄区 */}
      <section className="detail-hero">
        <div className="shell">
          <div className="detail-hero-card">
            <div className="detail-hero-top">
              <span className="tag teal">{companyTypeLabels[company.type] || company.type}</span>
              {company.featured && <span className="tag orange">重点关注</span>}
            </div>
            <h1>{company.name}</h1>
            <div className="hero-meta-row">
              <span>{company.city}</span>
              <span>
                适合方向：
                {company.suitableDirections.map((d) => directionLabels[d] || d).join(" / ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 详情主体 */}
      <section className="section">
        <div className="shell detail-layout">
          {/* 左侧主内容 */}
          <div className="detail-main">
            <article className="detail-card">
              <h2>为什么值得关注</h2>
              <p>{company.whyFollow}</p>
            </article>

            <article className="detail-card">
              <h2>设计岗位特点</h2>
              <p>{company.designJobFeatures}</p>
            </article>

            <article className="detail-card">
              <h2>作品集准备建议</h2>
              <div className="note-warm">{company.portfolioAdvice}</div>
            </article>

            {company.interviewNotes && company.interviewNotes.length > 0 && (
              <article className="detail-card">
                <h2>面试提示</h2>
                <ul className="clean-list">
                  {company.interviewNotes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </article>
            )}

            {/* 该公司相关岗位 */}
            {relatedJobs.length > 0 && (
              <section className="related-section">
                <h2>该公司相关岗位情报（{relatedJobs.length}）</h2>
                <div className="job-list mt-4">
                  {relatedJobs.map((job) => (
                    <JobCard key={job.slug} job={job} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* 右侧边栏 */}
          <aside className="detail-side">
            <div className="side-panel">
              <h3>适合哪些同学？</h3>
              <ul className="clean-list check-list">
                <li>{company.suitableStudents}</li>
              </ul>
            </div>

            <div className="side-panel">
              <h3>关注渠道</h3>
              <ul className="clean-list">
                {company.attentionChannels.map((ch, i) => (
                  <li key={i}>{ch}</li>
                ))}
              </ul>
            </div>

            <div className="side-panel dark">
              <h3>准备公司投递资料</h3>
              <p>
                通过统一表单选择公司清单、投递节奏和作品集建议。
              </p>
              <div className="side-actions">
                <ExternalFormButton
                  href="https://my.feishu.cn/share/base/form/shrcnI7IY8GJMtFU5N4AO7aMEyS"
                  label="填写表单选择资料"
                  className="btn btn-inverse w-full"
                />
              </div>
            </div>

            <div className="text-center">
              <Link href="/companies" className="btn btn-link text-sm">
                ← 返回公司雷达
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
