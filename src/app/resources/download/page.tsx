import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";

const FORM_URL = "https://my.feishu.cn/share/base/form/shrcnI7IY8GJMtFU5N4AO7aMEyS";

export const metadata: Metadata = {
  title: "领取求职资料",
  description: "通过统一表单选择所需的设计求职资料。",
  alternates: { canonical: "/resources/download/" },
  openGraph: {
    title: "领取求职资料",
    description: "通过统一表单选择所需的设计求职资料。",
    url: "/resources/download/",
    images: ["/images/og-image.png"],
  },
};

export default function DownloadPage() {
  return (
    <div>
      <div className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <Link href="/resources" className="breadcrumb">首页 / 求职资料 / 领取资料</Link>
            <h1>领取求职资料</h1>
            <p>填写一次统一表单，在表单中选择需要的资料。</p>
          </div>
          <span className="tag purple">免费领取</span>
        </div>
      </div>

      <section className="section">
        <div className="shell narrow">
          <div className="download-layout">
            <div>
              <p className="label">统一领取入口</p>
              <h2>先选资料，再留下接收方式</h2>
              <p className="section-copy">不同资料卡片都指向同一份表单，这是正常流程。提交前可在表单中核对具体资料、用途和接收方式。</p>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark download-cta">
                打开飞书资料表单 <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="download-steps" aria-label="资料领取步骤">
              <div><Check size={18} aria-hidden="true" /><span><strong>选择资料</strong>按当前求职阶段勾选所需内容。</span></div>
              <div><Check size={18} aria-hidden="true" /><span><strong>填写接收方式</strong>只提交完成资料发送所需的信息。</span></div>
              <div><Check size={18} aria-hidden="true" /><span><strong>核对说明</strong>以表单中的最新交付说明为准。</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
