import Link from "next/link";
import { getFeaturedJobs, getJobs } from "@/lib/data/jobs";
import { JobCard } from "@/components/jobs/job-card";
import { SkillDirectionCards } from "@/components/home/skill-direction-cards";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { getJobStatus } from "@/lib/job-presentation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "设计星图 | 设计学生就业导航系统" },
  description: "把岗位、公司、能力、作品集准备放进同一张地图里。帮设计学生看懂就业市场，找到职业坐标。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "设计星图 | 设计学生就业导航系统",
    description: "把岗位、公司、能力、作品集准备放进同一张地图里。帮设计学生看懂就业市场，找到职业坐标。",
    url: "/",
    images: ["/images/og-image.png"],
  },
};

export default function HomePage() {
  const featuredJobs = getFeaturedJobs(5);
  const jobCount = getJobs().length;
  const boardJobs = featuredJobs.slice(0, 3);

  return (
    <div className="flex-1">
      {/* ===== Hero 区 ===== */}
      <section className="hero">
        <div className="shell hero-inner">
          {/* 左栏：文案 */}
          <div>
            <p className="eyebrow">Design Career Intelligence</p>
            <h1>
              <span>设计学生的</span>
              <span>就业导航系统</span>
            </h1>
            <p className="lead">
              先看公开岗位信息，再理解能力要求，最后用作品集证据完成准备。每个模块都有独立页面，信息路径更清楚。
            </p>

            {/* 搜索框 */}
            <form className="hero-search" action="/jobs" method="get" role="search">
              <input
                name="q"
                type="search"
                aria-label="搜索岗位、公司、城市、工具或技能"
                placeholder="试试搜索：Figma、工业设计、AIGC、深圳"
              />
              <button type="submit">开始探索 <ArrowRight size={16} aria-hidden="true" /></button>
            </form>

            {/* 双按钮 */}
            <div className="hero-actions">
              <Link href="/jobs" className="btn btn-dark">进入岗位情报 <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/portfolio/checklist" className="btn btn-light"><ClipboardCheck size={16} aria-hidden="true" />作品集自检</Link>
            </div>

            {/* 数据条 */}
            <div className="metric-strip">
              <div className="metric">
                <strong>{jobCount}</strong>
                <span>岗位情报样本</span>
              </div>
              <div className="metric">
                <strong>4</strong>
                <span>设计能力方向</span>
              </div>
              <div className="metric">
                <strong>23</strong>
                <span>作品集自检项</span>
              </div>
            </div>
          </div>

          {/* 右栏：星图示意 */}
          <div className="atlas" aria-hidden="true">
            <div className="atlas-board">
              <div className="board-kicker">LIVE MAP</div>
              <div className="board-title">从岗位要求反推作品集证据</div>
              <div className="board-list">
                {boardJobs.map((job) => (
                  <div className="board-row" key={job.slug}>
                    <div className="row-icon">{job.companyName.slice(0, 1)}</div>
                    <div>
                      <strong>{job.title}</strong>
                      <span>{job.skills.slice(0, 3).join(" / ")}</span>
                    </div>
                    <span className="score">{getJobStatus(job).label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="route-card">
              <h3>推荐使用路径</h3>
              <p>从可追溯信息出发，把岗位要求变成行动清单。</p>
              <div>
                <span>岗位筛选 <b>01</b></span>
                <span>能力补齐 <b>02</b></span>
                <span>作品集自检 <b>03</b></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 功能模块 Bento Grid ===== */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="label">功能模块</p>
              <h2>每个模块独立成页，首页只做清晰入口</h2>
              <p className="section-copy">岗位、公司、能力、作品集和资料各自独立，入口和下一步都保持明确。</p>
            </div>
          </div>
          <SkillDirectionCards />
        </div>
      </section>

      {/* ===== 精选岗位 ===== */}
      <section className="section soft">
        <div className="shell">
          <div className="section-head mb-6">
            <div>
              <p className="label">岗位样本</p>
              <h2>先核对信息，再拆解准备重点</h2>
              <p className="section-copy">每条卡片都显示核验状态；没有公开出处的内容不会标记为在招。</p>
            </div>
            <Link href="/jobs" className="btn btn-light">查看全部岗位 <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="job-list official-home-jobs">
            {featuredJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
