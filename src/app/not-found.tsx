import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-[120px] font-black text-[var(--line)] leading-none mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">页面未找到</h2>
        <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
          抱歉，你访问的页面不存在。可能是因为链接错误或页面已过期。
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn btn-dark gap-2">
            <Home className="w-4 h-4" />
            返回首页
          </Link>
          <Link href="/jobs" className="btn btn-light gap-2">
            <Search className="w-4 h-4" />
            浏览岗位
          </Link>
        </div>
      </div>
    </div>
  );
}
