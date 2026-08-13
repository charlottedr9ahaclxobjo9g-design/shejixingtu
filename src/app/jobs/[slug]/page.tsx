import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { ExternalFormButton } from "@/components/shared/external-form-button";
import { getJobBySlug, getJobs } from "@/lib/data/jobs";
import {
  directionLabels,
  getJobCities,
  getJobDisplayTitle,
  getJobStatus,
  getJobTypeLabel,
} from "@/lib/job-presentation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "岗位未找到" };
  return {
    title: `${job.title} · ${job.companyName}`,
    description: job.studentExplanation,
    alternates: { canonical: `/jobs/${job.slug}/` },
    openGraph: {
      title: `${job.title} · ${job.companyName}`,
      description: job.studentExplanation,
      url: `/jobs/${job.slug}/`,
      images: ["/images/og-image.png"],
    },
  };
}

const difficultyLabels: Record<string, string> = {
  entry: "入门",
  medium: "中等",
  high: "高级",
};

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const status = getJobStatus(job);
  const cities = getJobCities(job);
  const hasOriginalJd = Boolean(
    job.originalJd?.rawText ||
    job.originalJd?.responsibilities?.length ||
    job.originalJd?.requirements?.length,
  );

  return (
    <div>
      <div className="subnav-row">
        <div className="shell">
          <Link href="/jobs" className="breadcrumb">首页 / 岗位情报 / 岗位详情</Link>
        </div>
      </div>

      <section className="detail-hero">
        <div className="shell">
          <div className="detail-hero-card">
            <div className="detail-hero-top">
              <span className="tag purple">{directionLabels[job.direction] || job.direction}</span>
              <span className={`status-tag status-${status.tone}`}>{status.label}</span>
              <span className="track-date">收录日期：{job.publishedDate || "未标注"}</span>
            </div>

            <h1>{getJobDisplayTitle(job)}</h1>
            <div className="hero-meta-row">
              <span>{job.companyName}</span>
              <span>{cities.join(" / ")}</span>
              <span>{getJobTypeLabel(job)}</span>
            </div>

            <div className="source-note">
              <div>
                <strong>信息来源：</strong>{" "}
                {job.sourceName || "公开信息整理"}。{status.description}
              </div>
              {job.sourceUrl ? (
                <a href={job.sourceUrl} target="_blank" rel="nofollow noopener noreferrer">
                  查看公开出处 <ExternalLink size={14} aria-hidden="true" />
                </a>
              ) : (
                <span className="source-missing">出处待补</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell detail-layout">
          <div className="detail-main">
            <article className="detail-card">
              <div className="content-heading">
                <p className="section-index">01 / PUBLIC JD</p>
                <h2>公开 JD 信息</h2>
                <p>先核对公开招聘内容，再阅读站内解读。</p>
              </div>

              {hasOriginalJd ? (
                <div className="jd-content">
                  {job.originalJd?.rawText && <p className="jd-raw">{job.originalJd.rawText}</p>}
                  {job.originalJd?.responsibilities?.length ? (
                    <>
                      <h3>岗位职责</h3>
                      <ul>{job.originalJd.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                    </>
                  ) : null}
                  {job.originalJd?.requirements?.length ? (
                    <>
                      <h3>任职要求</h3>
                      <ul>{job.originalJd.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
                    </>
                  ) : null}
                </div>
              ) : (
                <div className="data-gap">
                  <strong>原始 JD 待补充</strong>
                  <p>当前记录只包含岗位名称、公司、城市、技能标签和整理说明，尚没有可逐条核对的原始职责与任职要求，因此不展示推测性 JD。</p>
                </div>
              )}

              <dl className="fact-grid">
                <div><dt>公司</dt><dd>{job.companyName}</dd></div>
                <div><dt>城市</dt><dd>{cities.join(" / ")}</dd></div>
                <div><dt>类型</dt><dd>{getJobTypeLabel(job)}</dd></div>
                <div><dt>原标注截止</dt><dd>{job.deadline || "未标注"}</dd></div>
              </dl>
            </article>

            <article className="detail-card">
              <div className="content-heading">
                <p className="section-index orange-text">02 / STUDENT TRANSLATION</p>
                <h2>学生版翻译</h2>
                <p>这是对岗位准备重点的解释，不替代企业原始 JD。</p>
              </div>
              <div className="translation-callout">
                <p>{job.studentExplanation}</p>
              </div>
            </article>

            <article className="detail-card">
              <div className="content-heading">
                <p className="section-index">03 / PREPARATION</p>
                <h2>能力与作品集准备</h2>
              </div>

              {job.skills.length > 0 && (
                <>
                  <h3>能力关键词</h3>
                  <div className="stack-list">
                    {job.skills.map((skill) => (
                      <div key={skill}>
                        <strong>{skill}</strong>
                        <p>在作品集中给出过程、取舍或结果证据，不要只写在技能栏。</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {job.tools.length > 0 && (
                <>
                  <h3>工具链</h3>
                  <div className="tool-grid">
                    {job.tools.map((tool) => (
                      <div key={tool} className="tool-grid-item"><strong>{tool}</strong><small>岗位关键词</small></div>
                    ))}
                  </div>
                </>
              )}

              {job.portfolioAdvice && (
                <>
                  <h3>作品集建议</h3>
                  <div className="note-warm">{job.portfolioAdvice}</div>
                </>
              )}

              {job.preparationChecklist.length > 0 && (
                <>
                  <h3>投递前检查</h3>
                  <ul className="clean-list">
                    {job.preparationChecklist.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </>
              )}
            </article>
          </div>

          <aside className="detail-side">
            <div className="side-panel verification-panel">
              <p className="mini-label">数据状态</p>
              <h3>{status.label}</h3>
              <p>{status.description}</p>
              {job.verificationNote && <p className="verification-note">{job.verificationNote}</p>}
              {job.verifiedAt && <p className="muted-small">最近核验：{job.verifiedAt}</p>}
            </div>

            <div className="side-panel">
              <h3>适合哪些同学？</h3>
              <ul className="clean-list check-list">
                {job.targetStudents && <li>{job.targetStudents}</li>}
                <li>能用项目证据说明相关技能与设计取舍的学生</li>
              </ul>
              <div className="rule" />
              <p className="muted-small">初筛挑战难度</p>
              <strong className="difficulty">{difficultyLabels[job.difficulty] || job.difficulty}</strong>
            </div>

            <div className="side-panel dark">
              <h3>投递前再检查一次</h3>
              <p>先按岗位关键词检查作品集证据，再回到公开出处确认最新状态。</p>
              <div className="side-actions">
                <Link href="/portfolio/checklist" className="btn btn-inverse">进入作品集自检</Link>
                <ExternalFormButton
                  href="https://my.feishu.cn/share/base/form/shrcnI7IY8GJMtFU5N4AO7aMEyS"
                  label="填写表单领取通用资料"
                  className="btn btn-outline-dark"
                />
              </div>
            </div>

            <Link href="/jobs" className="back-link">← 返回全部岗位</Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
