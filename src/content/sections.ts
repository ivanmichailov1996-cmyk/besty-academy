import type { Lesson, Section } from "./types";
import { serviceCardLessons } from "./lessons/serviceCard";
import { sixPrinciplesLesson } from "./lessons/sixPrinciples";
import { serviceExtraLessons } from "./lessons/serviceExtra";
import { productionLessons } from "./lessons/production";
import { managerLessons } from "./lessons/managers";
import { mentorLessons } from "./lessons/mentors";
import { generalLessons } from "./lessons/general";
import { checklistLessons } from "./lessons/checklists";
import { cardsExtraLessons } from "./lessons/cardsExtra";

// serviceExtraLessons is authored in source-file order; this reorders it to
// follow the actual onboarding flow (see "Карта обучений", лист "Сервис"):
// День 2 — картофельная станция, День 3 — сервис как культура + сервировка
// + практика по сбору и выдаче заказов на прилавке, День 5 — приём заказов
// и оплата + техники продаж, День 6 — психология гостей + сертификация.
const serviceOrder = [
  "potato-station-full",
  "service-culture",
  "tableware",
  "counter-collection",
  "counter-payment",
  "auto-dispensing",
  "sales-techniques",
  "cashier-memo",
  "loyalty-program",
  "guest-psychology",
  "guest-scripts",
  "go-list",
];
const orderedServiceExtraLessons: Lesson[] = serviceOrder
  .map((slug) => serviceExtraLessons.find((l) => l.slug === slug))
  .filter((l): l is Lesson => Boolean(l));

export const sections: Section[] = [
  {
    slug: "general",
    title: "Общие модули для всех",
    description: "Базовые материалы, обязательные для всех сотрудников независимо от позиции.",
    emoji: "📋",
    lessons: [...generalLessons],
  },
  {
    slug: "service",
    title: "Модули сервис",
    description: "Стандарты гостевого сервиса: от приветствия до работы со сложными ситуациями.",
    emoji: "🙌",
    lessons: [sixPrinciplesLesson, ...orderedServiceExtraLessons],
  },
  {
    slug: "production",
    title: "Модули производство",
    description: "Технологические стандарты кухни: сборка, выдача и приготовление блюд.",
    emoji: "🍔",
    lessons: [...productionLessons],
  },
  {
    slug: "managers",
    title: "Обучение менеджеров",
    description: "Материалы для развития управляющих и менеджеров смены.",
    emoji: "🧑‍💼",
    lessons: [...managerLessons],
  },
  {
    slug: "cards",
    title: "Обучающие карточки",
    description:
      "Пошаговые карточки наставника по позициям: детальные блоки обучения новичка на рабочем месте.",
    emoji: "🗂️",
    lessons: [...serviceCardLessons, ...cardsExtraLessons],
  },
  {
    slug: "mentors",
    title: "Наставники",
    description: "Методология наставничества: роль наставника, этапы обучения новичка и работа с обратной связью.",
    emoji: "🎓",
    lessons: [...mentorLessons],
  },
  {
    slug: "checklists",
    title: "КЛН — контрольные листы наблюдения",
    description: "Чек-листы для аттестации и проверки соблюдения стандартов по каждой позиции.",
    emoji: "✅",
    lessons: [...checklistLessons],
  },
];

export function getSection(slug: string) {
  return sections.find((s) => s.slug === slug);
}

export function getLesson(sectionSlug: string, lessonSlug: string) {
  const section = getSection(sectionSlug);
  const lesson = section?.lessons.find((l) => l.slug === lessonSlug);
  return { section, lesson };
}

// Flattened, ready-only (section, lesson) pairs in the order sections and
// their lessons are defined above — the same order the site's navigation
// presents them in. Used to compute "next lesson" links so learners can
// move through a whole section (and on into the next one) without
// backtracking to the section list each time.
const readyLessonSequence: { section: Section; lesson: Lesson }[] = sections.flatMap((section) =>
  section.lessons.filter((l) => l.ready).map((lesson) => ({ section, lesson }))
);

export function getNextLesson(sectionSlug: string, lessonSlug: string) {
  const index = readyLessonSequence.findIndex(
    (entry) => entry.section.slug === sectionSlug && entry.lesson.slug === lessonSlug
  );
  if (index === -1 || index === readyLessonSequence.length - 1) return null;
  return readyLessonSequence[index + 1];
}
