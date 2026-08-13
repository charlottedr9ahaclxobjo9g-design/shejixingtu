import { Tag } from "@/components/shared/tag";
import type { SkillMap } from "@/lib/types";

interface SkillSectionProps {
  skill: SkillMap;
}

export function SkillSection({ skill }: SkillSectionProps) {
  return (
    <div className="detail-main">
      {/* 基础能力 */}
      <article className="detail-card">
        <h2>基础能力</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {skill.baseSkills.map((item, i) => (
            <div key={i} className="p-3 rounded-lg border border-[var(--line)] bg-[var(--panel)]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-[var(--ink)]">{item.name}</span>
                {item.level && <Tag variant="default">{item.level}</Tag>}
              </div>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </article>

      {/* 求职能力 */}
      <article className="detail-card">
        <h2>求职能力要求</h2>
        <div className="analysis-list">
          {skill.jobReadySkills.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <strong>{item.name}</strong>
                {item.importance && (
                  <span className="text-xs text-[var(--orange)] font-medium">{item.importance}</span>
                )}
              </div>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </article>

      {/* 加分能力 */}
      <article className="detail-card">
        <h2>加分能力</h2>
        <div className="tag-row mt-3">
          {skill.bonusSkills.map((s, i) => (
            <Tag key={i} variant="teal">{s}</Tag>
          ))}
        </div>
      </article>

      {/* 工具要求 */}
      <article className="detail-card">
        <h2>工具清单</h2>
        <div className="space-y-4 mt-3">
          {skill.tools.map((category, i) => (
            <div key={i}>
              <h3>{category.category}</h3>
              <div className="tag-row mt-2">
                {category.items.map((tool, j) => (
                  <span key={j} className="inline-flex items-center gap-1">
                    <Tag variant={tool.priority === "必学" ? "orange" : "default"}>
                      {tool.name}
                    </Tag>
                    <span className="text-xs text-[var(--muted)]">({tool.priority})</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* 作品集要求 */}
      <article className="detail-card">
        <h2>作品集要求</h2>
        <ul className="fit-list">
          {skill.portfolioRequirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </article>

      {/* 学习路线 */}
      <article className="detail-card">
        <h2>学习路线</h2>
        <div className="space-y-4 mt-4">
          {skill.learningPath.map((stage, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="timeline-number">
                  {i + 1}
                </div>
                {i < skill.learningPath.length - 1 && (
                  <div className="timeline-line" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="!mt-0">{stage.stage}</h3>
                  {stage.duration && (
                    <span className="text-xs text-[var(--muted)]">({stage.duration})</span>
                  )}
                </div>
                <ul className="clean-list">
                  {stage.goals.map((goal, j) => (
                    <li key={j}>{goal}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* 常见误区 */}
      <article className="detail-card">
        <h2>常见误区</h2>
        <div className="warning-card">
          <ul className="space-y-2">
            {skill.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2">
                <span>✗</span>
                <p className="!mt-0 text-sm">{mistake}</p>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
