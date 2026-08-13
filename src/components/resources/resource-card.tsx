import type { Resource } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

const categoryLabels: Record<string, string> = {
  route: "职业路线",
  portfolio: "作品集",
  jd: "JD解析",
  company: "公司情报",
  interview: "面试准备",
  "skill-map": "技能图谱",
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const subtitle = resource.subtitle || resource.description || "";
  const includes = resource.includes || resource.previewPoints || [];
  const audience = resource.targetAudience || resource.suitableUsers || "";
  const formUrl = resource.formUrl || "https://my.feishu.cn/share/base/form/shrcnI7IY8GJMtFU5N4AO7aMEyS";
  const howToGet = resource.howToGet;
  const guideCopy = resource.guideCopy;

  return (
    <article className="resource-card">
      {/* 分类标签 */}
      <span className="tag purple">
        {categoryLabels[resource.category] || resource.category}
      </span>

      {/* 标题 */}
      <h3>{resource.title}</h3>

      {/* 副标题 */}
      {subtitle && (
        <p className="text-[var(--muted)] text-sm mt-1">{subtitle}</p>
      )}

      {guideCopy && (
        <div className="resource-summary">
          <p className="text-[var(--muted)] text-sm leading-relaxed">{guideCopy.body}</p>
        </div>
      )}

      {/* 适合人群 */}
      {audience && (
        <div className="resource-audience">
          <strong className="text-[var(--purple)] text-sm">适合人群</strong>
          <p className="text-[var(--ink)] text-sm mt-1 font-medium">{audience}</p>
        </div>
      )}

      {/* 包含内容 */}
      {includes.length > 0 && (
        <div className="mt-4">
          <h4 className="text-[var(--ink)] text-sm font-bold mb-2">包含内容</h4>
          <ul className="clean-list check-list">
            {includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="resource-action mt-auto pt-4 border-t border-[var(--line)]">
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark w-full text-center"
        >
          填写一次，选择领取资料 <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        {howToGet && (
          <p className="text-center text-xs text-[var(--muted)] mt-2">
            统一表单提交后选择所需资料
          </p>
        )}
      </div>
    </article>
  );
}
