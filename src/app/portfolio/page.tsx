import { PageContainer } from "@/components/layout/page-container";
import { PortfolioChecklist } from "@/components/portfolio/portfolio-checklist";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "作品集中心",
  description: "把作品集从'好看'推进到'能解释、能证明、能投递'。23项自检清单，覆盖结构、叙事、视觉三大维度。",
  alternates: { canonical: "/portfolio/" },
  openGraph: {
    title: "作品集中心",
    description: "把作品集从好看推进到能解释、能证明、能投递。",
    url: "/portfolio/",
    images: ["/images/og-image.png"],
  },
};

export default function PortfolioPage() {
  return (
    <PageContainer>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/" className="breadcrumb">首页 / 作品集中心</Link>
            <h1>作品集结构建议</h1>
            <p>把作品集从“好看”推进到“能解释、能证明、能投递”。</p>
          </div>
          <span className="tag purple">23 项自检</span>
        </div>
      </div>

      <section className="section">
        <div className="shell detail-layout">
          <div className="detail-main">
            {/* 作品集结构原则 */}
            <article className="detail-card">
              <h2>作品集结构原则</h2>
              <div className="mini-block">
                <strong>少即是多：3-4个完整项目远好于10个半成品</strong>
              </div>
              <div className="mini-block">
                <strong>叙事优先：每个项目是一个故事，有起承转合</strong>
              </div>
              <div className="mini-block">
                <strong>用户视角：作品集是给招聘官看的，不是给自己看的</strong>
              </div>
              <div className="mini-block">
                <strong>一致性：视觉风格、排版、信息结构要统一</strong>
              </div>
            </article>

            {/* 推荐结构 */}
            <article className="detail-card">
              <h2>推荐作品集结构</h2>
              <div className="mini-block">
                <strong>1. 封面/首页</strong>
                <p>第一印象决定招聘官是否继续看，要简洁有力</p>
              </div>
              <div className="mini-block">
                <strong>2. 关于我</strong>
                <p>不要写空话，要体现你的设计观点和独特之处</p>
              </div>
              <div className="mini-block">
                <strong>3. 项目1（最相关）</strong>
                <p>放在最前面，展示你最强的能力</p>
              </div>
              <div className="mini-block">
                <strong>4. 项目2（最完整）</strong>
                <p>体现你的设计思维和方法论</p>
              </div>
              <div className="mini-block">
                <strong>5. 项目3（最多样）</strong>
                <p>可以是不同方向或不同媒介的项目</p>
              </div>
              <div className="mini-block">
                <strong>6. 其他作品（可选）</strong>
                <p>控制数量，只放高质量的</p>
              </div>
              <div className="mini-block">
                <strong>7. 联系方式</strong>
                <p>确保所有链接有效</p>
              </div>
            </article>

            {/* 不同方向要求 — 横向卡片排列 */}
            <article className="detail-card">
              <h2>不同方向作品集要求</h2>
              <div className="portfolio-direction-grid">
                <div className="portfolio-direction-item">
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-2">工业设计</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    <strong>建议格式：</strong>PDF（20-40页）+ 个人网站/Behance<br />
                    <strong>必须包含：</strong>完整产品设计流程、手绘草图、3D渲染图、设计调研、结构/工艺思考<br />
                    <strong>加分：</strong>实物模型照片、CMF方案、使用场景图<br />
                    <strong>常见问题：</strong>只有效果图没过程、手绘质量低、忽视结构可行性
                  </p>
                </div>
                <div className="portfolio-direction-item">
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-2">UI/UX</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    <strong>建议格式：</strong>个人网站（Framer/Webflow）+ Figma文件<br />
                    <strong>必须包含：</strong>问题出发、用户研究、流程图、交互原型、设计决策<br />
                    <strong>加分：</strong>可用性测试记录、数据反馈、设计系统<br />
                    <strong>常见问题：</strong>只有界面截图、不说明决策依据、作品集本身体验差
                  </p>
                </div>
                <div className="portfolio-direction-item">
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-2">视觉/品牌</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    <strong>建议格式：</strong>PDF（横向）+ Behance/站酷<br />
                    <strong>必须包含：</strong>完整品牌全案、Logo设计过程、VI应用展示<br />
                    <strong>加分：</strong>品牌策略说明、动态视觉、3D渲染<br />
                    <strong>常见问题：</strong>风格混乱、只有Logo没应用、排版质量差
                  </p>
                </div>
                <div className="portfolio-direction-item">
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-2">AIGC设计</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    <strong>建议格式：</strong>个人网站 + 社交媒体展示<br />
                    <strong>必须包含：</strong>创意方向说明、Prompt策略、AI→后期→最终对比<br />
                    <strong>加分：</strong>工作流展示、ControlNet训练、AI视频<br />
                    <strong>常见问题：</strong>只有AI直出没后期、不说明创意方向、忽视版权
                  </p>
                </div>
                <div className="portfolio-direction-item">
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-2">电商设计</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    <strong>建议格式：</strong>PDF + 站酷/Behance<br />
                    <strong>必须包含：</strong>多套电商页面设计、不同品类适配、营销卖点提炼<br />
                    <strong>加分：</strong>数据思维体现、C4D渲染、动态视觉<br />
                    <strong>常见问题：</strong>只有视觉没商业思维、忽视移动端、风格单一
                  </p>
                </div>
              </div>
            </article>

            {/* 自检清单 */}
            <article className="detail-card">
              <h2>作品集自检清单</h2>
              <PortfolioChecklist />
            </article>
          </div>

          {/* 右侧 */}
          <aside className="detail-side">
            <div className="side-panel">
              <h3>作品集常见错误</h3>
              <ol className="numbered-list">
                <li>
                  <strong>项目数量太多</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">招聘官时间有限，太多项目反而稀释重点。建议精选3-4个最完整的项目。</span>
                </li>
                <li>
                  <strong>只有最终效果图</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">看不到你的设计思维和解决问题的能力。每个项目展示：问题→研究→概念→发展→最终方案。</span>
                </li>
                <li>
                  <strong>排版混乱</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">排版是设计师的基本功。建立网格系统，统一字体和配色，控制信息密度。</span>
                </li>
                <li>
                  <strong>文字太多或太少</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">用图文结合，关键信息突出，详细说明可放附录。</span>
                </li>
                <li>
                  <strong>忽视作品集本身的设计</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">作品集是你最重要的设计作品，把作品集当作一个产品设计。</span>
                </li>
                <li>
                  <strong>项目描述空话套话</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">用具体数据和事实说话，说明你的独特贡献。</span>
                </li>
                <li>
                  <strong>格式和链接失效</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">投递前检查所有链接，PDF是最安全的格式。</span>
                </li>
                <li>
                  <strong>没有针对性</strong><br />
                  <span className="text-[var(--muted)] text-[13px]">根据目标岗位调整项目顺序和重点，突出相关能力。</span>
                </li>
              </ol>
            </div>
            <div className="side-panel">
              <h3>面试讲解建议</h3>
              <ul className="clean-list check-list">
                <li>控制时间：每个项目5-8分钟，整体15-20分钟</li>
                <li>先讲问题：让面试官理解背景和挑战</li>
                <li>再讲过程：展示你的思考和方法</li>
                <li>最后讲结果：用数据或反馈支撑</li>
                <li>准备Q&amp;A：预判面试官可能问的问题</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageContainer>
  );
}
