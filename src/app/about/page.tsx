import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于设计星图",
  description: "了解设计星图是什么，我们做什么，不做什么",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "关于设计星图",
    description: "了解设计星图是什么，我们做什么，不做什么。",
    url: "/about/",
    images: ["/images/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* 页面英雄 */}
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/" className="breadcrumb">首页 / 关于</Link>
            <h1>关于设计星图</h1>
            <p>帮设计学生看懂就业市场，找到职业坐标。</p>
          </div>
          <span className="tag purple">内容型项目</span>
        </div>
      </div>

      <section className="section">
        <div className="shell detail-layout">
          {/* 主内容 */}
          <div className="detail-main">
            <article className="detail-card">
              <h2>设计星图是什么？</h2>
              <p>
                设计星图是一个面向设计专业学生的就业情报平台。我们致力于帮助设计学生更好地了解就业市场，明确职业方向，提升求职竞争力。
              </p>
              <p className="mt-3">在这里，你可以：</p>
              <ul className="fit-list">
                <li>浏览设计岗位公开信息样本，理解企业常见能力要求</li>
                <li>查看公司雷达，找到适合自己发展的公司</li>
                <li>学习能力地图，规划自己的学习路径</li>
                <li>获取求职资料，包括简历模板、面试指南等</li>
              </ul>
            </article>

            {/* 重要声明 */}
            <article className="detail-card" id="data-policy">
              <h2>重要声明</h2>
              <div className="warning-card">
                <strong>设计星图不是招聘平台。</strong>
                <p>我们不提供以下服务：</p>
                <p>
                  · 在线简历投递　· 企业招聘中介　· 就业承诺或就业保证　· 任何形式的付费就业服务
                </p>
                <p>
                  设计星图仅提供就业情报和求职资料，所有信息仅供参考。我们与任何招聘平台、企业均无合作关系。
                </p>
                <p>
                  站内岗位与公司信息整理自企业官网、公开招聘平台等公开渠道，仅用于帮助设计学生理解就业市场；岗位可能已截止或发生变化，不代表企业当前正在招聘，请以企业官方渠道为准。
                </p>
              </div>
            </article>

            <article className="detail-card">
              <h2>数据核验口径</h2>
              <ul className="clean-list">
                <li>“已核验在招”：同时包含可访问的公开出处、可核对的 JD 内容和最近核验日期。</li>
                <li>“待复核”：已有公开出处，但尚未完成最新一轮人工核验。</li>
                <li>“待补出处”：只有整理记录，尚未补齐可直接追溯的公开页面。</li>
                <li>“已截止 / 历史参考”：只用于理解岗位要求，不表示企业当前正在招聘。</li>
              </ul>
            </article>

            <article className="detail-card" id="privacy">
              <h2>隐私与第三方服务</h2>
              <p>本站使用 51.la 进行基础访问统计，并通过飞书表单承接资料领取。打开第三方链接后，其数据处理规则以对应服务的隐私政策为准。</p>
              <p className="mt-3">本站页面本身不提供账号注册、在线简历投递或就业中介服务。请不要在公开页面提交身份证、银行卡、账号密码等敏感信息。</p>
            </article>

            {/* 免责声明 */}
            <article className="detail-card">
              <h2>免责声明</h2>
              <ul className="clean-list">
                <li>
                  1. 设计星图上的所有内容（包括但不限于岗位信息、公司信息、技能图谱等）均来自公开信息，我们尽力确保信息的准确性，但不对信息的完整性和时效性负责。
                </li>
                <li>
                  2. 岗位信息可能随时变化，请以企业官方招聘渠道为准。设计星图不对因使用本网站信息而导致的任何直接或间接损失负责。
                </li>
                <li>
                  3. 本网站包含外部链接，这些链接指向第三方网站。我们不对第三方网站的内容、准确性或可用性负责。
                </li>
                <li>
                  4. 用户在使用本网站时应遵守当地法律法规，不得利用本网站从事任何违法活动。
                </li>
              </ul>
            </article>
          </div>

          {/* 侧边栏 */}
          <aside className="detail-side">
            <div className="side-panel">
              <h3>联系我们</h3>
              <ul className="clean-list">
                <li>资料与社群：通过资料领取表单查看当前可领取内容与后续说明</li>
                <li>运营方式：纯线上内容项目，无线下办公地址</li>
              </ul>
            </div>

            <div className="side-panel dark">
              <h3>领取求职资料</h3>
              <p>
                通过统一表单选择实习、作品集、工具、面试和薪资资料。
              </p>
              <div className="side-actions">
                <Link href="/resources/download" className="btn btn-inverse w-full">
                  去领取资料
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Link href="/" className="btn btn-link text-sm">
                ← 返回首页
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
