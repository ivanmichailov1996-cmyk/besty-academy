import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, getLesson, getNextLesson } from "@/content/sections";
import { LessonBlocks } from "@/components/LessonBlocks";
import { Quiz } from "@/components/Quiz";
import { CourseNav } from "@/components/CourseNav";

export function generateStaticParams() {
  return sections.flatMap((s) =>
    s.lessons.filter((l) => l.ready).map((l) => ({ section: s.slug, lesson: l.slug }))
  );
}

export default async function LessonPage(props: PageProps<"/[section]/[lesson]">) {
  const { section: sectionSlug, lesson: lessonSlug } = await props.params;
  const { section, lesson } = getLesson(sectionSlug, lessonSlug);
  if (!section || !lesson || !lesson.ready || !lesson.blocks) notFound();

  const next = getNextLesson(section.slug, lesson.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 grid lg:grid-cols-[260px_1fr] gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <CourseNav currentSection={section.slug} currentLesson={lesson.slug} />
        </div>
      </aside>

      <div className="min-w-0">
        <Link
          href={`/${section.slug}`}
          className="text-sm font-semibold text-neutral-500 hover:text-brand-dark"
        >
          ← {section.title}
        </Link>

        <article className="pop-in mt-4">
          <h1 className="font-display text-3xl sm:text-4xl text-brand-ink leading-tight">
            {lesson.title}
          </h1>
          <p className="mt-2 text-neutral-600">{lesson.summary}</p>

          <div className="mt-8">
            <LessonBlocks blocks={lesson.blocks} />
          </div>

          {lesson.quiz && lesson.quiz.length > 0 && (
            <Quiz sectionSlug={section.slug} lessonSlug={lesson.slug} questions={lesson.quiz} />
          )}

          {next && (
            <Link
              href={`/${next.section.slug}/${next.lesson.slug}`}
              className="group mt-10 flex items-center justify-between gap-4 rounded-2xl bg-surface-blush p-5 hover:brightness-[0.97] hover:scale-[1.01] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              <div>
                <span className="label-eyebrow text-[11px] text-accent">Следующий урок</span>
                <p className="mt-1 font-bold text-brand-ink">{next.lesson.title}</p>
                {next.section.slug !== section.slug && (
                  <p className="text-xs text-neutral-500 mt-0.5">{next.section.title}</p>
                )}
              </div>
              <span className="flex-none text-brand-ink font-bold text-xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          )}
        </article>
      </div>
    </div>
  );
}
