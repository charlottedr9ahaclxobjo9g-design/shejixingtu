import { getSkillByDirection } from "@/lib/data/skills";
import { SkillSection } from "@/components/skills/skill-section";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "industrial-design" },
    { slug: "ui-ux" },
    { slug: "visual-brand" },
    { slug: "aigc-design" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillByDirection(slug);
  if (!skill) return { title: "技能未找到" };
  return {
    title: skill.title,
    description: skill.description,
    alternates: { canonical: `/skills/${slug}/` },
    openGraph: {
      title: skill.title,
      description: skill.description,
      url: `/skills/${slug}/`,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = getSkillByDirection(slug);
  if (!skill) notFound();

  return (
    <div>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/skills" className="breadcrumb">首页 / 能力地图</Link>
            <h1>{skill.title}</h1>
            <p>{skill.description}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              <span className="font-bold text-[var(--ink)]">适合人群：</span>
              {skill.suitableUsers}
            </p>
          </div>
          <span className="tag orange">能力地图</span>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <SkillSection skill={skill} />
        </div>
      </section>
    </div>
  );
}
