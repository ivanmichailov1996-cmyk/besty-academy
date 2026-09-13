import Image from "next/image";
import Link from "next/link";
import { sections } from "@/content/sections";
import { BASE_PATH } from "@/lib/basePath";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-14 overflow-hidden rounded-3xl relative">
        <Image
          src={`${BASE_PATH}/images/welcome/restaurant-exterior.jpg`}
          alt="Ресторан Besty"
          width={1600}
          height={700}
          priority
          className="w-full h-[220px] sm:h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0f]/80 via-[#1a0a0f]/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 sm:px-6 pb-6 sm:pb-8">
          <p className="brand-logo text-brand text-lg mb-2">besty academy</p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 max-w-2xl">
            Обучающая платформа команды Besty
          </h1>
          <p className="text-white/85 text-sm sm:text-lg leading-relaxed max-w-xl">
            Все стандарты, скрипты и обучающие материалы — в одном месте. Выберите раздел,
            изучите урок и проверьте себя тестом.
          </p>
        </div>
      </section>

      <Link
        href="/welcome"
        className="group flex flex-wrap sm:flex-nowrap items-center gap-5 rounded-3xl bg-brand p-6 sm:p-8 mb-4 hover:brightness-95 transition-all overflow-hidden"
      >
        <div className="flex-1 min-w-[200px]">
          <span className="text-xs font-bold uppercase tracking-wide text-brand-ink/70">
            Начни здесь
          </span>
          <h2 className="text-2xl font-extrabold text-brand-ink mt-1">👋 Welcome-курс</h2>
          <p className="text-brand-ink/80 text-sm mt-1 max-w-lg">
            Первый шаг в команде Besty: ресторан, команда, стандарты и безопасность — перед
            первой сменой.
          </p>
        </div>
        <Image
          src={`${BASE_PATH}/images/welcome/burger.jpg`}
          alt=""
          width={140}
          height={140}
          className="hidden sm:block w-28 h-28 rounded-2xl object-cover flex-none shadow-md"
        />
        <span className="text-2xl font-bold text-brand-ink group-hover:translate-x-1 transition-transform">
          →
        </span>
      </Link>

      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((section) => {
          const readyCount = section.lessons.filter((l) => l.ready).length;
          return (
            <Link
              key={section.slug}
              href={`/${section.slug}`}
              className="group rounded-3xl border border-neutral-200 bg-white p-6 hover:border-brand hover:shadow-[0_4px_0_0_var(--brand)] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl">{section.emoji}</span>
                <span className="text-xs font-semibold text-neutral-400 mt-1">
                  {readyCount}/{section.lessons.length} уроков готово
                </span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-brand-ink group-hover:text-brand-dark">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
