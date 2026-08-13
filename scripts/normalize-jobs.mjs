import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "public", "data", "jobs.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const automotive = ["比亚迪", "东风", "奇瑞", "小鹏", "蔚来", "理想", "雅迪"];
const consumerHardware = ["OPPO", "海尔", "美的", "格力", "追觅", "科沃斯", "康冠", "海能达"];
const gameAndMedia = ["游戏", "动画", "影视", "AIGC", "AI美术", "视频后期"];

function citiesFrom(value = "") {
  return [...new Set(value.split(/[\/、,，]/).map((item) => item.trim()).filter(Boolean))];
}

function focusArea(job) {
  const haystack = `${job.companyName} ${job.title}`;
  if (/HMI|座舱|车机/i.test(haystack)) return "智能座舱方向";
  if (automotive.some((name) => haystack.includes(name))) return "汽车与出行方向";
  if (consumerHardware.some((name) => haystack.includes(name))) return "消费电子方向";
  if (gameAndMedia.some((name) => haystack.includes(name))) return "游戏与数字内容方向";
  if (/包装|品牌|视觉|平面/.test(haystack)) return "品牌与视觉方向";
  if (/工业设计|产品设计|CMF/.test(haystack)) return "产品与硬件方向";
  if (/UI|UX|交互|体验/.test(haystack)) return "数字产品方向";
  return undefined;
}

function verificationStatus(job) {
  if (job.deadline && job.deadline < "2026-08-13") return "expired";
  if (job.sourceUrl) return "needs-review";
  if (job.deadline || job.sourceNote) return "needs-source";
  return "reference";
}

data.version = "3.0";
data.updatedAt = "2026-08-13";
data.description = "设计岗位公开信息样本与学生版解读。核验状态由数据字段维护；未标记为已核验在招的记录仅供求职准备参考。";
data.jobs = data.jobs.map((job) => ({
  ...job,
  cities: citiesFrom(job.city),
  focusArea: focusArea(job),
  verificationStatus: verificationStatus(job),
  verificationNote: job.sourceUrl
    ? "已收录公开出处，尚待人工确认页面可访问、岗位仍有效且信息一致。"
    : "尚未收录可直接追溯的公开出处，不代表企业当前正在招聘。",
}));

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Normalized ${data.jobs.length} job records.`);
