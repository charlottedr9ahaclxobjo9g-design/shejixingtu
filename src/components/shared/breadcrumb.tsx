import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
      <Link href="/" className="hover:text-[var(--ink)]">首页</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--ink)]">{item.label}</Link>
          ) : (
            <span className="text-[var(--ink)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
