# 设计星图 Design Star Map

面向设计类学生的就业情报与求职准备网站。站内内容用于理解岗位、公司、能力和作品集准备，不提供招聘投递、中介或就业承诺。

## 技术栈

- Next.js 16.3 + App Router
- TypeScript + Tailwind CSS
- JSON 静态数据
- Next.js static export + Vercel

## 本地开发

```bash
npm ci
npm run dev
```

## 上线前核验

```bash
npm run verify
```

`verify` 会依次检查岗位数据协议、ESLint、TypeScript 和静态导出构建。提交到 `main` 前还需要在 360、390、768、1440 像素视口核验首页、岗位列表、岗位详情、作品集清单和资料入口。

生产依赖安全检查：

```bash
npm audit --omit=dev --audit-level=high
```

## 岗位数据维护

岗位源数据位于 `data/jobs.json`，只在构建阶段读取，不会作为静态文件公开。`verificationStatus` 仅供内部维护，前台不展示。

- `verified-active`：有可访问出处、可核对 JD 内容和 `verifiedAt`
- `needs-review`：已有出处，待最新一轮人工复核
- `needs-source`：待补可追溯出处
- `expired`：原记录截止日期已过
- `reference`：历史参考

只有同时满足以下条件的记录会进入岗位列表、详情路由和 sitemap：

- `publicVisible: true`
- 包含可访问的 `sourceUrl`
- 包含最近检查日期 `sourceCheckedAt`
- 未超过明确的 `deadline`
- 包含学生解读、作品集建议和准备清单

更新数据后运行：

```bash
npm run data:normalize
npm run data:check
```

不要仅根据未来截止日期自动标记“已核验在招”。

## 部署

生产站点由 Vercel 关联 GitHub `main` 分支自动部署。`vercel.json` 固定使用 `npm ci`、`npm run build` 和 `out/` 静态输出，避免控制台旧设置绕过构建。合并前先通过本地核验；推送后再检查 Vercel 构建状态和 `https://www.shejixingtu.cn/` 线上回归。
