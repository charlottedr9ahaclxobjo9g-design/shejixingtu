interface SectionHeaderProps {
  title: string;
  label?: string;
  description?: string;
  action?: React.ReactNode;
  actionAlign?: "right" | "bottom";
}

export function SectionHeader({ title, label, description, action, actionAlign = "right" }: SectionHeaderProps) {
  if (actionAlign === "bottom") {
    return (
      <div className="section-head mb-6">
        <div>
          {label && <p className="label">{label}</p>}
          <h2>{title}</h2>
          {description && <p className="section-copy">{description}</p>}
        </div>
        {action && <div className="self-end">{action}</div>}
      </div>
    );
  }

  return (
    <div className="section-head mb-6">
      <div>
        {label && <p className="label">{label}</p>}
        <h2>{title}</h2>
        {description && <p className="section-copy">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
