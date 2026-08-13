import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "data", "jobs.json"), "utf8"));
const allowedStatuses = new Set(["verified-active", "needs-review", "needs-source", "expired", "reference"]);
const errors = [];
const slugs = new Set();
const today = new Date().toISOString().slice(0, 10);

for (const [index, job] of data.jobs.entries()) {
  const ref = `jobs[${index}] (${job.slug || "missing-slug"})`;
  if (!job.slug || slugs.has(job.slug)) errors.push(`${ref}: slug 缺失或重复`);
  slugs.add(job.slug);
  if (!job.title || !job.companyName) errors.push(`${ref}: 岗位名称或公司缺失`);
  if (!Array.isArray(job.cities) || job.cities.length === 0) errors.push(`${ref}: cities 不能为空`);
  if (!allowedStatuses.has(job.verificationStatus)) errors.push(`${ref}: verificationStatus 无效`);
  if (job.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(job.deadline)) errors.push(`${ref}: deadline 格式错误`);
  if (job.publicVisible) {
    if (!/^https?:\/\//.test(job.sourceUrl || "")) errors.push(`${ref}: 公开岗位必须包含有效 sourceUrl`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(job.sourceCheckedAt || "")) {
      errors.push(`${ref}: 公开岗位必须包含 sourceCheckedAt`);
    }
    if (job.deadline && job.deadline < today) errors.push(`${ref}: 已过截止日期的岗位不能继续公开`);
    if (!job.studentExplanation || !job.portfolioAdvice || !job.preparationChecklist?.length) {
      errors.push(`${ref}: 公开岗位必须包含学生解读、作品集建议和准备清单`);
    }
  }
  if (job.verificationStatus === "verified-active") {
    if (!job.sourceUrl || !job.verifiedAt) errors.push(`${ref}: 已核验在招必须包含 sourceUrl 和 verifiedAt`);
    if (!job.originalJd?.requirements?.length && !job.originalJd?.rawText) {
      errors.push(`${ref}: 已核验在招必须包含可追溯的 JD 内容`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const counts = data.jobs.reduce((result, job) => {
  result[job.verificationStatus] = (result[job.verificationStatus] || 0) + 1;
  return result;
}, {});
const publicCount = data.jobs.filter((job) => job.publicVisible).length;
console.log(`Validated ${data.jobs.length} internal jobs, ${publicCount} public jobs: ${JSON.stringify(counts)}`);
