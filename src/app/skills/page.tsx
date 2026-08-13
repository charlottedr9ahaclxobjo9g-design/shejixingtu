import { getAllSkills } from "@/lib/data/skills";
import { SkillDirectionCard } from "@/components/skills/skill-direction-card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "能力地图",
  description: "覆盖 4 个设计方向，从基础能力到求职加分项，确定要补哪些能力。",
  alternates: { canonical: "/skills/" },
  openGraph: {
    title: "能力地图",
    description: "覆盖 4 个设计方向，从基础能力到求职加分项，确定要补哪些能力。",
    url: "/skills/",
    images: ["/images/og-image.png"],
  },
};

export default function SkillsPage() {
  const skills = getAllSkills();

  return (
    <div>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/" className="breadcrumb">首页 / 能力地图</Link>
            <h1>能力地图</h1>
            <p>确定要补哪些能力，覆盖 4 个设计方向，从基础能力到求职加分项。</p>
          </div>
          <span className="tag orange">{skills.length} 个方向</span>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <div className="skill-overview-grid">
            {skills.map((skill) => (
              <SkillDirectionCard key={skill.slug} skill={skill} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
