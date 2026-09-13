export function SiteFooter() {
  return (
    <footer className="bg-surface-blush mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Besty Academy — обучающая платформа для команды.</span>
        <a href="https://besty.ru" target="_blank" rel="noreferrer" className="hover:text-brand-dark">
          besty.ru
        </a>
      </div>
    </footer>
  );
}
