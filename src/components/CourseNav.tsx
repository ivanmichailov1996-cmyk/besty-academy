import Link from "next/link";
import { sections } from "@/content/sections";

/**
 * Persistent left-hand tree of the whole platform: every section, with the
 * current section's lessons expanded underneath it (like the sidebar on the
 * Welcome course, generalized to the full site). Desktop only — on narrow
 * screens the existing "← Section" back-link and mobile breadcrumbs already
 * cover quick navigation, and a 60+ item tree would just be noise there.
 */
export function CourseNav({
  currentSection,
  currentLesson,
}: {
  currentSection: string;
  currentLesson?: string;
}) {
  return (
    <nav className="space-y-1.5">
      {sections.map((section) => {
        const isActive = section.slug === currentSection;
        return (
          <div key={section.slug} className={isActive ? "bg-surface-amber rounded-2xl p-3" : "p-3"}>
            <Link
              href={`/${section.slug}`}
              className={`flex items-center gap-2 text-sm font-bold leading-snug transition-colors ${
                isActive ? "text-brand-ink" : "text-neutral-600 hover:text-brand-ink"
              }`}
            >
              <span className="flex-none">{section.emoji}</span>
              {section.title}
            </Link>
            {isActive && (
              <ul className="mt-2 space-y-0.5 border-l-2 border-brand/40 pl-3">
                {section.lessons
                  .filter((l) => l.ready)
                  .map((lesson) => {
                    const isCurrentLesson = lesson.slug === currentLesson;
                    return (
                      <li key={lesson.slug}>
                        <Link
                          href={`/${section.slug}/${lesson.slug}`}
                          className={`block text-xs leading-snug py-1 rounded transition-colors ${
                            isCurrentLesson
                              ? "font-bold text-brand-dark"
                              : "text-neutral-600 hover:text-brand-ink"
                          }`}
                        >
                          {lesson.title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
