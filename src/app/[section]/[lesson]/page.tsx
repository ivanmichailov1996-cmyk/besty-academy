import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, getLesson } from "@/content/sections";
import { LessonBlocks } from "@/components/LessonBlocks";
import { Quiz } from "@/components/Quiz";

export function generateStaticParams() {
  return sections.flatMap((s) =>
    s.lessons.filter((l) => l.ready).map((l) => ({ section: s.slug, lesson: l.slug }))
  );
}

export default async function LessonPage(props: PageProps<"/[section]/[lesson]">) {
  const { section: sectionSlug, lesson: lessonSlug } = await props.params;
  const { section, lesson } = getLesson(sectionSlug, lessonSlug);
  if (!section || !lesson || !lesson.ready || !lesson.blocks) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href={`/${section.slug}`}
        className="text-sm font-semibold text-neutral-500 hover:text-brand-dark"
      >
        ← {section.title}
      </Link>

      <article className="mt-4">
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
      </article>
    </div>
  );
}
