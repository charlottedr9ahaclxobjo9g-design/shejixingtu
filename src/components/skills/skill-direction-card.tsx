import Link from "next/link";
import type { SkillMap } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface SkillDirectionCardProps {
  skill: SkillMap;
}

export function SkillDirectionCard({ skill }: SkillDirectionCardProps) {
  return (
    <Link href={`/skills/${skill.direction}`} className="skill-card card-base">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-[var(--ink)]">{skill.title}</h3>
        <span className="tag">方向地图</span>
      </div>
      <p className="text-[var(--muted)] text-sm mb-4">{skill.description}</p>

      {skill.suitableUsers && (
        <p className="text-xs text-[var(--muted)] mb-4 line-clamp-2">
          适合：{skill.suitableUsers}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <span className="tag purple">基础技能 {skill.baseSkills.length}</span>
        <span className="tag orange">求职技能 {skill.jobReadySkills.length}</span>
      </div>
      <span className="card-cta">查看能力阶梯与学习路线 <ArrowRight size={15} aria-hidden="true" /></span>
    </Link>
  );
}
