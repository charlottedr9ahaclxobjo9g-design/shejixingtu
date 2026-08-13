interface ExternalFormButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function ExternalFormButton({ href, label = "领取资料", className }: ExternalFormButtonProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}
