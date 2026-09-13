import Image from "next/image";
import Link from "next/link";
import { sections } from "@/content/sections";
import { BASE_PATH } from "@/lib/basePath";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/*
        The big warm radial "bloom" from the mymind reference's homepage —
        pure color-as-atmosphere rather than a photo, built from Besty's own
        brand orange. Sits behind the (real, photographic) hero card, so it
        shows mainly as a warm glow in the page margins above/around it
        rather than replacing the restaurant photo.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 left-1/2 -translate-x-1/2 w-[1100px] max-w-[160vw] aspect-square rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, #ff9d1f 0%, #ffc35c 28%, #ffe9b0 48%, rgba(255,253,245,0) 72%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <section className="pop-in mb-14 overflow-hidden rounded-3xl relative">
        <Image
          src={`${BASE_PATH}/images/welcome/restaurant-exterior.jpg`}
          alt="Ресторан Besty"
          fill
          priority
          className="object-cover"
        />
        {/*
          Warm burgundy-to-amber wash instead of a flat neutral scrim — a nod
          to mymind's "warm light flooding in" hero atmosphere, built from
          Besty's own accent/brand colors rather than an unrelated palette.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0f]/88 via-[#4a1524]/50 to-[#ffb800]/10" />
        {/*
          The text sits in normal flow (not absolutely stretched to match the
          image), so the box always grows to fit however many lines the
          headline/paragraph wrap to on a given screen width. Previously the
          overlay was pinned to the image's fixed height, so on narrow phones
          the wrapped text overflowed upward and got sliced off by
          overflow-hidden, making the "besty academy" label collide with the
          headline. min-h keeps a decent amount of photo visible above that.
        */}
        <div className="relative flex flex-col items-center justify-end text-center px-4 sm:px-6 pt-16 pb-8 sm:pb-10 min-h-[280px] sm:min-h-[360px]">
          <p className="label-eyebrow text-brand text-xs sm:text-sm mb-3">besty academy</p>
          <h1 className="font-display text-3xl sm:text-6xl text-white mb-4 max-w-2xl leading-[1.05]">
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
        style={{ animationDelay: "80ms" }}
        className="pop-in group flex flex-wrap sm:flex-nowrap items-center gap-5 rounded-3xl bg-brand p-6 sm:p-8 mb-4 hover:brightness-95 hover:scale-[1.01] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden"
      >
        <div className="flex-1 min-w-[200px]">
          <span className="label-eyebrow text-xs text-brand-ink/70">Начни здесь</span>
          <h2 className="font-display text-3xl text-brand-ink mt-1">👋 Welcome-курс</h2>
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
          className="hidden sm:block w-28 h-28 rounded-2xl object-cover flex-none"
        />
        <span className="text-2xl font-bold text-brand-ink group-hover:translate-x-1 transition-transform">
          →
        </span>
      </Link>

      <div className="stagger grid sm:grid-cols-2 gap-4">
        {sections.map((section, i) => {
          const readyCount = section.lessons.filter((l) => l.ready).length;
          const surfaces = ["bg-surface-amber", "bg-surface-blush", "bg-surface-sage"];
          const surface = surfaces[i % surfaces.length];
          return (
            <Link
              key={section.slug}
              href={`/${section.slug}`}
              className={`group rounded-2xl ${surface} p-6 sm:p-7 hover:brightness-[0.97] hover:scale-[1.015] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl">{section.emoji}</span>
                <span className="label-eyebrow text-[11px] text-neutral-500 mt-1.5">
                  {readyCount}/{section.lessons.length} готово
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl text-brand-ink">{section.title}</h2>
              <p className="mt-1 text-sm text-neutral-700 leading-relaxed">{section.description}</p>
            </Link>
          );
        })}
        </div>
      </div>
    </div>
  );
}
