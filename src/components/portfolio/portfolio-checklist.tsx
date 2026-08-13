"use client";
import { useState, useEffect } from "react";
import { ExternalFormButton } from "@/components/shared/external-form-button";

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
}

const defaultChecklist: ChecklistItem[] = [
  // 内容质量
  { id: "c-1", text: "每个项目都有明确的问题定义", category: "内容质量" },
  { id: "c-2", text: "展示了设计思维过程，不只是结果", category: "内容质量" },
  { id: "c-3", text: "项目之间有区分度，展示多样性", category: "内容质量" },
  { id: "c-4", text: "所有作品都是原创或明确标注团队角色", category: "内容质量" },
  { id: "c-5", text: "没有明显的技术错误（如透视错误、比例失调）", category: "内容质量" },
  // 叙事逻辑
  { id: "n-1", text: "每个项目有清晰的开头（问题）和结尾（成果）", category: "叙事逻辑" },
  { id: "n-2", text: "设计决策有依据（用户研究/数据/原则）", category: "叙事逻辑" },
  { id: "n-3", text: "项目之间有逻辑顺序（最相关→最完整→最多样）", category: "叙事逻辑" },
  { id: "n-4", text: "文字说明简洁有力，没有空话", category: "叙事逻辑" },
  // 视觉呈现
  { id: "v-1", text: "排版统一，有网格系统", category: "视觉呈现" },
  { id: "v-2", text: "配色协调，不超过3种主色", category: "视觉呈现" },
  { id: "v-3", text: "字体选择专业，层级清晰", category: "视觉呈现" },
  { id: "v-4", text: "图片质量高，没有模糊或压缩失真", category: "视觉呈现" },
  { id: "v-5", text: "视觉风格一致，体现个人审美", category: "视觉呈现" },
  // 格式与链接
  { id: "f-1", text: "PDF格式，文件大小小于20MB", category: "格式与链接" },
  { id: "f-2", text: "所有链接有效（网站/Figma/Behance）", category: "格式与链接" },
  { id: "f-3", text: "文件名规范（姓名-作品集-2026.pdf）", category: "格式与链接" },
  { id: "f-4", text: "简历与作品集风格一致", category: "格式与链接" },
  { id: "f-5", text: "自我介绍简洁有特色，不超过200字", category: "格式与链接" },
  // 投递检查
  { id: "s-1", text: "根据目标岗位调整了项目顺序", category: "投递检查" },
  { id: "s-2", text: "检查了所有错别字和语法错误", category: "投递检查" },
  { id: "s-3", text: "在不同设备上测试了显示效果", category: "投递检查" },
  { id: "s-4", text: "邮件主题/文件名包含姓名和岗位", category: "投递检查" },
];

export function PortfolioChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-checklist-v2");
    const restored = saved ? JSON.parse(saved) : {};
    const timer = window.setTimeout(() => {
      setChecked(restored);
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleItem = (id: string) => {
    const newChecked = { ...checked, [id]: !checked[id] };
    setChecked(newChecked);
    localStorage.setItem("portfolio-checklist-v2", JSON.stringify(newChecked));
  };

  const handleClear = () => {
    setChecked({});
    localStorage.removeItem("portfolio-checklist-v2");
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const totalCount = defaultChecklist.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (!mounted) return null;

  return (
    <div>
      {/* 进度框 */}
      <div className="progress-box">
        <strong><span id="progressText">{percent}</span>%</strong>
        <div className="w-full h-[8px] bg-[var(--panel-2)] rounded-full overflow-hidden mt-2">
          <div
            id="progressBar"
            style={{ width: `${percent}%` }}
            className="h-full bg-[var(--purple)] transition-all duration-300 rounded-full"
          />
        </div>
        <button
          id="clearChecks"
          className="btn btn-light mt-3"
          type="button"
          onClick={handleClear}
        >
          重置勾选
        </button>
      </div>

      {/* 勾选卡片网格 */}
      <div className="check-grid">
        {defaultChecklist.map((item) => (
          <label key={item.id} className="check-card" data-check>
            <input
              type="checkbox"
              checked={!!checked[item.id]}
              onChange={() => toggleItem(item.id)}
            />
            <span>
              <strong>{item.category}</strong>
              <span>{item.text}</span>
            </span>
          </label>
        ))}
      </div>

      {/* 底部 CTA */}
      <div className="mt-8 p-6 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)] text-center">
        <h3 className="text-lg font-bold text-[var(--ink)]">准备好投递了吗？</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          领取包含简历模板、面试题库和投递清单的完整求职资料包
        </p>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <ExternalFormButton
            href="https://my.feishu.cn/share/base/form/shrcnI7IY8GJMtFU5N4AO7aMEyS"
            className="btn btn-dark"
            label="去领取资料"
          />
        </div>
      </div>
    </div>
  );
}
