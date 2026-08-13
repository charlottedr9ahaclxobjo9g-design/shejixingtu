export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell py-12">
      {children}
    </div>
  );
}
