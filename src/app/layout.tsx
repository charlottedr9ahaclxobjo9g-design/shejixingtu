import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shejixingtu.cn"),
  title: {
    default: "设计星图 | 设计学生就业导航系统",
    template: "%s | 设计星图",
  },
  description:
    "把岗位、公司、能力、作品集准备放进同一张地图里。面向设计类学生的就业情报与求职准备网站。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "设计星图",
    title: "设计星图 | 设计学生就业导航系统",
    description:
      "把岗位、公司、能力、作品集准备放进同一张地图里。面向设计类学生的就业情报与求职准备网站。",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "设计星图",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "设计星图 | 设计学生就业导航系统",
    description:
      "把岗位、公司、能力、作品集准备放进同一张地图里。面向设计类学生的就业情报与求职准备网站。",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/" },
  other: { "application-version": "2026.08.13" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "设计星图",
              alternateName: "Design Star Map",
              url: "https://www.shejixingtu.cn",
              description:
                "面向设计类学生的就业情报与求职准备网站。提供岗位情报、能力地图、公司雷达、作品集指南等求职准备工具。",
              inLanguage: "zh-CN",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.shejixingtu.cn/jobs?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)]">
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <SiteFooter />
        <Script id="la-collect" src="https://sdk.51.la/js-sdk-pro.min.js" strategy="afterInteractive" />
        <Script id="la-init" strategy="afterInteractive">
          {`(() => {
            let attempts = 0;
            const start = () => {
              if (window.LA) {
                window.LA.init({ id: "3QeudFURAbVu5UxO", ck: "3QeudFURAbVu5UxO" });
                return;
              }
              attempts += 1;
              if (attempts < 20) window.setTimeout(start, 250);
            };
            start();
          })();`}
        </Script>
      </body>
    </html>
  );
}
