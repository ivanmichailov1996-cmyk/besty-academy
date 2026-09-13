import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, getSection } from "@/content/sections";

export function generateStaticParams() {
  return sections.map((s) => ({ section: s.slug }));
}

export default async function SectionPage(props: PageProps<"/[section]">) {
  const { section: sectionSlug } = await props.params;
  const section = getSection(sectionSlug);
  if (!section) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <Link href="/" className="text-sm font-semibold text-neutral-500 hover:text-brand-dark">
        ← Все разделы
      </Link>

      <div className="mt-4 mb-10">
        <span className="text-4xl">{section.emoji}</span>
        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-brand-ink">{section.title}</h1>
        <p className="mt-2 text-neutral-600">{section.description}</p>
      </div>

      <ul className="space-y-3">
        {section.lessons.map((lesson) => (
          <li key={lesson.slug}>
            {lesson.ready ? (
              <Link
                href={`/${section.slug}/${lesson.slug}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 hover:border-brand transition-colors"
              >
                <div>
                  <p className="font-bold text-brand-ink">{lesson.title}</p>
                  <p className="text-sm text-neutral-600 mt-0.5">{lesson.summary}</p>
                </div>
                <span className="flex-none text-brand-ink font-bold text-xl">→</span>
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-neutral-300 p-4 sm:p-5 opacity-70">
                <div>
                  <p className="font-bold text-neutral-500">{lesson.title}</p>
                  <p className="text-sm text-neutral-500 mt-0.5">{lesson.summary}</p>
                </div>
                <span className="flex-none text-xs font-semibold text-neutral-400 bg-neutral-100 rounded-full px-3 py-1">
                  скоро
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
