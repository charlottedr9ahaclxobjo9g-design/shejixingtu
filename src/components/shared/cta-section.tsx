import Link from "next/link";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
}: CTASectionProps) {
  return (
    <section className="section soft">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="label">精选岗位</p>
            <h2>{title}</h2>
            {description && <p className="section-copy">{description}</p>}
          </div>
          {primaryLabel && primaryHref && (
            <Link href={primaryHref} className="btn btn-light">{primaryLabel}</Link>
          )}
        </div>
      </div>
    </section>
  );
}
