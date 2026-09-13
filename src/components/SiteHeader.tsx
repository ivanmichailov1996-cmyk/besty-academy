import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-white/90 backdrop-blur sticky top-0 z-10 shadow-[0_1px_0_0_rgba(36,28,0,0.06)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="brand-logo text-2xl text-brand">besty</span>
          <span className="text-neutral-400 font-medium text-sm hidden sm:inline">Academy</span>
        </Link>
        <nav className="text-sm font-semibold text-neutral-600">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:text-brand-ink transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden />
            Все разделы
          </Link>
        </nav>
      </div>
    </header>
  );
}
