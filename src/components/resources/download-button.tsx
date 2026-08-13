import { ExternalFormButton } from "@/components/shared/external-form-button";

interface DownloadButtonProps {
  href: string;
  label?: string;
  variant?: "default" | "outline";
  className?: string;
}

export function DownloadButton({ href, label = "领取资料", variant = "default", className }: DownloadButtonProps) {
  if (variant === "outline") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <button className={`h-10 px-4 py-2 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors ${className || ""}`}>
          {label}
        </button>
      </a>
    );
  }
  return <ExternalFormButton href={href} label={label} className={className} />;
}
