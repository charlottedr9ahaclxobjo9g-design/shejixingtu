interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="w-full border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)]">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-[var(--muted)] mb-2">{title}</p>
        {description && <p className="text-sm text-[var(--muted)] mb-4">{description}</p>}
        {action && (
          action.href ? (
            <a href={action.href} className="btn btn-light">
              {action.label}
            </a>
          ) : (
            <button type="button" onClick={action.onClick} className="btn btn-light">
              {action.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
