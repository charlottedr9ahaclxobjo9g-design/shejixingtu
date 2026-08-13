import Link from "next/link";

const directions = [
  {
    href: "/jobs",
    label: "岗位情报",
    color: "purple",
    title: "先看公开信息，再读学生版翻译",
    description: "按方向、城市和类型筛选；查看招聘原文、学生解读，并收藏重点岗位。",
    cta: "进入岗位情报",
    wide: true,
  },
  {
    href: "/skills",
    label: "能力地图",
    color: "orange",
    title: "确定要补哪些能力",
    description: "覆盖 4 个设计方向，从基础能力到求职加分项。",
    cta: "进入能力页面",
    wide: false,
  },
  {
    href: "/companies",
    label: "公司雷达",
    color: "teal",
    title: "找到值得关注的公司",
    description: "按公司类型、设计方向和城市浏览，了解岗位特点与作品集偏好。",
    cta: "进入公司雷达",
    wide: false,
  },
  {
    href: "/portfolio",
    label: "作品集中心",
    color: "purple",
    title: "检查作品集是否能投",
    description: "按结构、方向、常见错误和面试讲解完成投递前自检。",
    cta: "进入作品集中心",
    wide: true,
  },
  {
    href: "/resources",
    label: "求职资料",
    color: "orange",
    title: "领取可执行的准备包",
    description: "覆盖实习、作品集、工具、面试和薪资；统一通过资料表单选择领取。",
    cta: "进入资料中心",
    wide: false,
  },
  {
    href: "/about",
    label: "项目说明",
    color: "teal",
    title: "了解设计星图的边界",
    description: "明确本站不是招聘平台，只做公开信息整理与求职准备。",
    cta: "查看项目说明",
    wide: false,
  },
];

export function SkillDirectionCards() {
  return (
    <div className="bento-grid">
      {directions.map((dir) => (
        <Link
          key={dir.href + dir.label}
          href={dir.href}
          className={`module-card card-base ${dir.wide ? "col-span-2" : ""}`}
        >
          <span className={`card-accent tag ${dir.color}`}>{dir.label}</span>
          <h3>{dir.title}</h3>
          <p>{dir.description}</p>
          <span className="card-cta">{dir.cta}</span>
        </Link>
      ))}
    </div>
  );
}
