// ============================================================
// 设计星图 MVP 1.0 - 类型定义（对齐 deliverables 数据结构）
// ============================================================

export type JobDirection =
  | 'industrial-design'
  | 'ui-ux'
  | 'visual-brand'
  | 'aigc-design'
  | 'product-design'
  | 'service-design'
  | 'packaging-design'
  | 'other';

export type JobType = 'internship' | 'campus' | 'full-time' | 'contract';

export type Difficulty = '入门' | '中等' | '中高' | '高级';

export type JobVerificationStatus =
  | 'verified-active'
  | 'needs-review'
  | 'needs-source'
  | 'expired'
  | 'reference';

export interface OriginalJd {
  responsibilities?: string[];
  requirements?: string[];
  rawText?: string;
}

export interface Job {
  id?: string;
  slug: string;
  title: string;
  companyName: string;
  companySlug?: string;
  city: string;
  cities?: string[];
  focusArea?: string;
  direction: JobDirection;
  jobType: JobType;
  targetStudents: string; // string（deliverables 用法），非数组
  skills: string[];
  tools: string[];
  difficulty: Difficulty;
  studentFit: string;
  studentExplanation: string; // deliverables 用 studentExplanation
  portfolioAdvice: string; // deliverables 用 portfolioAdvice（string）
  preparationChecklist: string[]; // deliverables 用 preparationChecklist
  sourceNote?: string;
  // 以下字段来自 deliverables，可选
  featured?: boolean;
  publishedDate?: string;
  deadline?: string | null; // 原招聘信息标注的截止时间（YYYY-MM-DD），可能已过期
  sourceName?: string;
  sourceUrl?: string;
  publicVisible?: boolean;
  sourceCheckedAt?: string;
  originalJd?: OriginalJd;
  verificationStatus?: JobVerificationStatus;
  verifiedAt?: string;
  verificationNote?: string;
}

export type CompanyType =
  | 'internet'
  | 'smart-hardware'
  | 'consumer-brand'
  | 'design-consulting'
  | 'ecommerce'
  | 'game'
  | 'manufacturing'
  | 'culture-creativity'
  | 'other';

export interface Company {
  id?: string;
  slug: string;
  name: string;
  type: CompanyType;
  city: string;
  suitableDirections: JobDirection[];
  suitableStudents: string; // string（deliverables 用法）
  whyFollow: string; // deliverables 推荐理由字段
  designJobFeatures: string;
  attentionChannels: string[]; // deliverables 用 attentionChannels
  portfolioAdvice: string;
  interviewNotes?: string[];
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level?: string;
  description?: string;
  importance?: string;
}

export interface SkillMap {
  slug: string;
  title: string;
  direction: JobDirection;
  description: string;
  suitableUsers: string;
  baseSkills: SkillItem[];
  jobReadySkills: SkillItem[];
  bonusSkills: string[];
  tools: { category: string; items: { name: string; priority: string }[] }[];
  portfolioRequirements: string[];
  commonMistakes: string[];
  learningPath: { stage: string; goals: string[]; duration?: string }[];
}

export type ResourceCategory = 'route' | 'portfolio' | 'jd' | 'company' | 'interview' | 'skill-map';

export interface Resource {
  id?: string;
  slug: string;
  title: string;
  category: ResourceCategory;
  description: string;
  subtitle?: string;          // 副标题（数据中实际使用）
  intro?: string;             // 详细介绍
  targetAudience?: string;    // 适合人群（数据中实际使用）
  suitableUsers: string;
  previewPoints: string[];
  includes?: string[];        // 包含内容列表（数据中实际使用）
  downloadUrl?: string;
  formUrl?: string;
  qrCodeImage?: string;
  active: boolean;
  howToGet?: {                // 获取方式（数据中实际使用）
    method: string;
    detail: string;
    note?: string;
  };
  guideCopy?: {               // 引导文案
    headline: string;
    body: string;
    cta: string;
  };
}

export interface PortfolioGuide {
  structure: {
    step: number;
    title: string;
    description: string;
    details: string[];
  }[];
  directionRequirements: {
    direction: JobDirection;
    title: string;
    requirements: string[];
  }[];
  commonMistakes: {
    title: string;
    description: string;
  }[];
  checklist: {
    category: string;
    items: string[];
  }[];
}

export interface PortfolioArticle {
  slug: string;
  title: string;
  direction: JobDirection;
  summary: string;
  tags: string[];
  contentPath: string;
  publishedDate: string;
  featured?: boolean;
}

// ============================================================
// 统一数据包装类型（deliverables JSON 外层格式）
// ============================================================

export interface JobsDataWrapper {
  version: string;
  updatedAt: string;
  description: string;
  jobs: Job[];
}

export interface CompaniesDataWrapper {
  version: string;
  updatedAt: string;
  description: string;
  companies: Company[];
}

export interface ResourcesDataWrapper {
  version: string;
  updatedAt: string;
  description: string;
  resources: Resource[];
}

export interface PortfolioDataWrapper {
  version: string;
  updatedAt: string;
  description: string;
  portfolioGuide: PortfolioGuide;
}

export interface SkillsDataWrapper {
  version: string;
  updatedAt: string;
  description: string;
  skillsMap: SkillMap[];
}
