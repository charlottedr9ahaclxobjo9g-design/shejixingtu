"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/jobs", label: "岗位" },
  { href: "/skills", label: "能力" },
  { href: "/companies", label: "公司" },
  { href: "/portfolio", label: "作品集" },
  { href: "/resources", label: "资料" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="site-nav">
      <nav className="nav-inner" aria-label="主导航">
        {/* Brand */}
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>设计星图</span>
        </Link>

        {/* Desktop nav — pill capsule style */}
        <div className="nav-links hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/resources" className="nav-action hidden md:inline-flex">
          领取资料 <ArrowRight size={16} aria-hidden="true" />
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[var(--ink)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div id="mobile-navigation" className="mobile-navigation md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-link ${
                  isActive(item.href)
                    ? "bg-[var(--ink)] text-white"
                    : "text-[var(--text)] hover:bg-[var(--panel)]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/resources"
              className="mobile-nav-action"
              onClick={() => setMobileOpen(false)}
            >
              领取资料 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
