import { getCompanyBySlug, getCompanies } from "@/lib/data/companies";
import { getJobs } from "@/lib/data/jobs";
import { notFound } from "next/navigation";
import { ExternalFormButton } from "@/components/shared/external-form-button";
import { JobCard } from "@/components/jobs/job-card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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
              {company.featured && <span className="tag orange">当前有官方岗位</span>}
            </div>
            <h1>{company.name}</h1>
            <div className="hero-meta-row">
              <span>{company.city}</span>
              <span>
                适合方向：
                {company.suitableDirections.map((d) => directionLabels[d] || d).join(" / ")}
              </span>
              {company.sourceCheckedAt && <span>{company.sourceCheckedAt} 更新</span>}
            </div>
            {company.careerUrl && (
              <div className="detail-hero-actions">
                <a className="btn btn-dark" href={company.careerUrl} target="_blank" rel="nofollow noopener noreferrer">
                  打开官方招聘 <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 详情主体 */}
      <section className="section">
        <div className="shell detail-layout">
          {/* 左侧主内容 */}
          <div className="detail-main">
            <article className="detail-card">
              <h2>当前岗位观察</h2>
              <p>{company.whyFollow}</p>
            </article>

            <article className="detail-card">
              <h2>公开岗位呈现出的能力重点</h2>
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
                <h2>该公司当前收录岗位（{relatedJobs.length}）</h2>
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
              <h3>招聘关注渠道</h3>
              <ul className="clean-list">
                {company.attentionChannels.map((ch, i) => (
                  <li key={i}>{ch}</li>
                ))}
              </ul>
            </div>

            <div className="side-panel dark">
              <h3>按目标岗位准备投递材料</h3>
              <p>
                先看岗位原文，再把对应能力转成作品集里的过程和结果证据。
              </p>
              <div className="side-actions">
                <Link href="/jobs" className="btn btn-inverse w-full">查看全部岗位</Link>
                <ExternalFormButton
                  href="https://my.feishu.cn/share/base/form/shrcnI7IY8GJMtFU5N4AO7aMEyS"
                  label="领取通用求职资料"
                  className="btn btn-outline-dark w-full"
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
