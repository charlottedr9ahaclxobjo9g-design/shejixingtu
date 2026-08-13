import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <h3>设计星图</h3>
          <p>面向设计类学生的就业情报与求职准备网站。本站不是招聘平台，不提供投递、中介或就业承诺。</p>
        </div>
        <div>
          <h4>看情报</h4>
          <Link href="/jobs">岗位情报</Link>
          <Link href="/companies">公司雷达</Link>
          <Link href="/skills">能力地图</Link>
        </div>
        <div>
          <h4>做准备</h4>
          <Link href="/portfolio">作品集中心</Link>
          <Link href="/portfolio/checklist">作品集自检</Link>
          <Link href="/resources">求职资料</Link>
        </div>
        <div>
          <h4>项目说明</h4>
          <Link href="/about#data-policy">数据来源与更新</Link>
          <Link href="/about#privacy">隐私与第三方服务</Link>
          <Link href="/about">免责声明</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© 2026 设计星图 Design Star Map</p>
        <p>公开信息整理 · 非招聘服务</p>
      </div>
    </footer>
  );
}
