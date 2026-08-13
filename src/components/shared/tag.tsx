interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "orange" | "teal" | "secondary" | "outline";
  className?: string;
}

export function Tag({ children, variant = "default", className = "" }: TagProps) {
  const base = "inline-flex items-center min-h-[25px] rounded-full px-[9px] text-[12px] font-black";

  const variants: Record<string, string> = {
    default: "bg-[var(--panel-2)] text-[#62656e]",
    secondary: "bg-[var(--panel-2)] text-[#62656e]",
    outline: "bg-[var(--panel-2)] text-[#62656e] border border-[var(--line)]",
    purple: "bg-[var(--purple-soft)] text-[var(--purple)]",
    orange: "bg-[var(--orange-soft)] text-[var(--orange)]",
    teal: "bg-[var(--teal-soft)] text-[var(--teal)]",
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
