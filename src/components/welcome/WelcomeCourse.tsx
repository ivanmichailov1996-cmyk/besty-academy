"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Quiz } from "@/components/Quiz";
import { welcomeFinalQuiz } from "@/content/lessons/welcome";
import { BASE_PATH } from "@/lib/basePath";

const STORAGE_KEY = "besty-academy:welcome-progress";

const NAV = [
  { id: "restaurant", number: "01", label: "О ресторане" },
  { id: "team", number: "02", label: "Команда" },
  { id: "principles", number: "03", label: "6 принципов сервиса" },
  { id: "quality", number: "04", label: "Наше качество" },
  { id: "appearance", number: "05", label: "Внешний вид и данные" },
  { id: "duties", number: "06", label: "Обязанности" },
  { id: "worktime", number: "07", label: "Время и перерывы" },
  { id: "pay", number: "08", label: "Выплаты и возможности" },
  { id: "safety", number: "09", label: "Правила безопасности" },
  { id: "equipment", number: "10", label: "Охрана труда" },
  { id: "fire", number: "11", label: "Пожарная безопасность" },
  { id: "electrical", number: "12", label: "Электробезопасность" },
] as const;

function useProgress() {
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
        setDone(new Set(arr));
      }
    } catch {
      // ignore
    }
  }, []);

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  }

  return { done, toggle };
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="label-eyebrow flex items-center gap-2 text-xs text-accent mb-2">
      <span className="w-6 h-1.5 rounded-full bg-accent inline-block" />
      {children}
    </div>
  );
}

function SectionHeader({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h2 className="font-display text-3xl sm:text-4xl text-brand-ink">{children}</h2>
      <span className="text-5xl sm:text-6xl font-black text-neutral-200 leading-none select-none">
        {number}
      </span>
    </div>
  );
}

function MarkDoneButton({ done, onClick }: { done: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
        done
          ? "border-green-600 bg-green-50 text-green-700"
          : "border-neutral-300 text-neutral-600 hover:border-brand-ink"
      }`}
    >
      <span>{done ? "✓" : ""}</span>
      {done ? "Раздел пройден" : "Отметить раздел пройденным"}
    </button>
  );
}

function Card({ tone = "light", children }: { tone?: "light" | "brand" | "accent" | "dark"; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    light: "bg-surface-sage",
    brand: "bg-brand text-brand-ink",
    accent: "bg-accent text-white",
    dark: "bg-neutral-900 text-white",
  };
  return <div className={`rounded-2xl p-5 sm:p-6 ${styles[tone]}`}>{children}</div>;
}

const PRINCIPLES = [
  {
    tone: "light" as const,
    title: "1. Замечаем и приветствуем",
    text: "Сразу замечаем гостей в радиусе 3 метров, приветствуем их и создаём хорошее настроение.",
    phrase: "Здравствуйте! Рады видеть вас в Besty! Хорошего вам отдыха!",
  },
  {
    tone: "brand" as const,
    title: "2. Помогаем с выбором",
    text: "Знаем преимущества продуктов и умеем красиво о них рассказывать, помогаем гостю выбрать блюдо.",
    phrase: "Попробуйте наш хрустящий, золотистый картофель с фермерским говяжьим беконом. Вам понравится!",
  },
  {
    tone: "accent" as const,
    title: "3. Открыты к общению",
    text: "Компетентно отвечаем на вопросы. Через 10–15 минут интересуемся впечатлениями от визита и качеством блюд.",
    phrase: "Добрый день! Могу ли я узнать, как вам у нас сегодня? Вам понравился Стейк Хаус?",
  },
  {
    tone: "light" as const,
    title: "4. Исправляем ошибки сразу",
    text: "Предвосхищаем ожидания гостей и действуем немедленно, чтобы гость остался доволен визитом.",
    phrase: "Извините, что огорчили вас. Сейчас мы приготовим бургер, который вам обязательно понравится, а также угостим десертом!",
  },
  {
    tone: "brand" as const,
    title: "5. Чистота — наше отличие",
    text: "Ресторан идеально чистый внутри и снаружи. Подносы убираются сразу, как гость поел.",
    phrase: "Здравствуйте! Позвольте, я уберу поднос, чтобы вы могли отдохнуть с комфортом!",
  },
  {
    tone: "accent" as const,
    title: "6. Запрашиваем обратную связь",
    text: "Нам важно мнение гостей — мы сами запрашиваем обратную связь и улучшаем сервис.",
    phrase: "Мы рады, что вы остались довольны! У нас есть страница на Яндекс, будем рады вашему отзыву!",
  },
];

const TEAM = [
  { role: "Управляющий рестораном", text: "Руководит и контролирует все процессы в ресторане." },
  { role: "Ассистенты управляющего", text: "Управляют сменами и поддерживают работу по всем направлениям." },
  { role: "Менеджер ресторана", text: "Управляет участком, обеспечивая качество блюд и обслуживания." },
  { role: "Работники ресторана", text: "Работают на участках производства и обслуживания гостей." },
  { role: "Инструкторы ресторана", text: "Проводят обучение и помогают новичкам адаптироваться." },
  { role: "Хостес и бариста", text: "Хостес создают уют для гостя. Бариста готовят напитки и десерты." },
];

const QUALITY_FACTS = [
  "Особые булочки, приправленные сливочным маслом",
  "Бифштексы из 100% говядины специального отбора",
  "Оригинальный рецепт с прижаркой лука на гриле",
  "Besty первыми начали использовать говяжий бекон в бургерах",
  "Свеженарезанные овощи и отборные фермерские помидоры",
  "Премиальный кетчуп",
  "Отборный кофе специального бленда",
  "Премиальный чай, собранный вручную на плантациях",
  "Авторские десерты от кондитерского дома Александра Селезнёва",
];

const EQUIPMENT_TAGS = [
  "Гриль",
  "Томаторезка",
  "Пропариватель",
  "Тепловой шкаф",
  "Картофельный бин",
  "Слайсер",
  "Фритюр",
  "Тостер",
];

export function WelcomeCourse() {
  const { done, toggle } = useProgress();
  const progressPct = useMemo(() => Math.round((done.size / NAV.length) * 100), [done]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <div className="rounded-[2rem] bg-brand overflow-hidden grid lg:grid-cols-2 gap-0 mb-8">
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <p className="label-eyebrow text-xs text-brand-ink/70 mb-3">Курс для новых сотрудников</p>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-ink leading-[1.05] mb-4">
            Твой старт в Besty
          </h1>
          <p className="text-brand-ink/80 text-base leading-relaxed mb-6">
            Сегодня твой первый день, и мы знаем, как это волнительно. Познакомься с рестораном,
            командой и главными правилами работы — а самое интересное будет на практике.
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-2">
            {[
              ["12", "разделов"],
              ["6", "принципов"],
              ["5", "начислений"],
              ["8", "видов оборудования"],
            ].map(([n, label]) => (
              <div key={label} className="bg-white/70 rounded-2xl px-2 py-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-brand-ink">{n}</p>
                <p className="text-[11px] leading-tight text-brand-ink/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[220px]">
          <Image
            src={`${BASE_PATH}/images/welcome/restaurant-exterior.jpg`}
            alt="Ресторан Besty вечером"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-500 mb-1">
                <span>Прогресс курса</span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-brand transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                {done.size} из {NAV.length} разделов
              </p>
            </div>
            <nav className="space-y-1 text-sm">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-neutral-600 hover:bg-neutral-100"
                >
                  <span
                    className={`flex-none w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      done.has(item.id)
                        ? "bg-green-600 text-white"
                        : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {done.has(item.id) ? "✓" : item.number}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-16 min-w-0">
          {/* Mobile progress */}
          <div className="lg:hidden -mt-4">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-500 mb-1">
              <span>Прогресс курса</span>
              <span>
                {done.size} из {NAV.length} · {progressPct}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
              <div className="h-full bg-brand transition-all" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* 01 О ресторане */}
          <section id="restaurant" className="scroll-mt-24">
            <Eyebrow>Знакомство</Eyebrow>
            <SectionHeader number="01">О ресторане</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <div className="relative rounded-3xl overflow-hidden min-h-[200px]">
                <Image
                  src={`${BASE_PATH}/images/welcome/restaurant-exterior.jpg`}
                  alt="Besty вечером"
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <Card tone="accent">
                <p className="text-4xl font-black mb-2">27.01.2023</p>
                <p className="font-bold mb-1">С этой даты началась история Besty</p>
                <p className="text-white/85 text-sm leading-relaxed">
                  Besty — команда единомышленников с огромным опытом в индустрии ресторанного
                  бизнеса. Besty — новый, яркий и современный ресторан быстрого обслуживания.
                </p>
              </Card>
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("restaurant")} onClick={() => toggle("restaurant")} />
            </div>
          </section>

          {/* 02 Команда */}
          <section id="team" className="scroll-mt-24">
            <Eyebrow>Люди Besty</Eyebrow>
            <SectionHeader number="02">Команда ресторана</SectionHeader>
            <div className="grid sm:grid-cols-3 gap-3 mt-5">
              {TEAM.map((t) => (
                <Card key={t.role}>
                  <p className="font-bold text-brand-ink mb-1">{t.role}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{t.text}</p>
                </Card>
              ))}
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("team")} onClick={() => toggle("team")} />
            </div>
          </section>

          {/* 03 6 принципов */}
          <section id="principles" className="scroll-mt-24">
            <Eyebrow>Гость в центре</Eyebrow>
            <SectionHeader number="03">6 принципов сервиса Besty</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {PRINCIPLES.map((p) => (
                <Card key={p.title} tone={p.tone}>
                  <p className="font-bold mb-1.5">{p.title}</p>
                  <p className={`text-sm leading-relaxed mb-3 ${p.tone === "light" ? "text-neutral-700" : "opacity-90"}`}>
                    {p.text}
                  </p>
                  <p
                    className={`text-sm italic rounded-xl px-3 py-2 ${
                      p.tone === "light" ? "bg-neutral-50 text-neutral-700" : "bg-black/10"
                    }`}
                  >
                    «{p.phrase}»
                  </p>
                </Card>
              ))}
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("principles")} onClick={() => toggle("principles")} />
            </div>
          </section>

          {/* 04 Факты о качестве */}
          <section id="quality" className="scroll-mt-24">
            <Eyebrow>Наш продукт</Eyebrow>
            <SectionHeader number="04">Факты о нашем качестве</SectionHeader>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="relative rounded-3xl overflow-hidden aspect-square col-span-1">
                <Image src={`${BASE_PATH}/images/welcome/burger.jpg`} alt="Бургер Besty" fill className="object-cover" sizes="200px" />
              </div>
              <div className="relative rounded-3xl overflow-hidden aspect-square col-span-1">
                <Image src={`${BASE_PATH}/images/welcome/fries.jpg`} alt="Картофель фри Besty" fill className="object-cover" sizes="200px" />
              </div>
              <div className="relative rounded-3xl overflow-hidden aspect-square col-span-1">
                <Image src={`${BASE_PATH}/images/welcome/tomato.jpg`} alt="Свежие томаты" fill className="object-cover" sizes="200px" />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-2 mt-4">
              {QUALITY_FACTS.map((fact) => (
                <div
                  key={fact}
                  className="text-sm rounded-2xl bg-surface-sage px-4 py-3 text-neutral-700"
                >
                  {fact}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("quality")} onClick={() => toggle("quality")} />
            </div>
          </section>

          {/* 05 Внешний вид и данные */}
          <section id="appearance" className="scroll-mt-24">
            <Eyebrow>Трудовой распорядок</Eyebrow>
            <SectionHeader number="05">Внешний вид, гигиена и данные</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Card>
                <p className="font-bold text-brand-ink mb-2">Внешний вид и личная гигиена</p>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4">
                  <li>Душ, дезодорант, чистые руки и ногти, умеренная косметика.</li>
                  <li>Украшения и часы сняты, кроме обручальных колец без камней.</li>
                  <li>Волосы чистые и аккуратно причёсаны; для мужчин — без щетины.</li>
                  <li>Ногти коротко пострижены, лак не разрешён.</li>
                  <li>Униформа чистая, опрятная и выглаженная.</li>
                  <li>Обувь закрытая, тёмная, на низком каблуке, с нескользкой подошвой.</li>
                  <li>На смене нельзя пользоваться телефоном и камерой.</li>
                </ul>
              </Card>
              <Card tone="dark">
                <p className="font-bold mb-2">Персональные данные сотрудника</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  Персональные данные — любая информация, относящаяся прямо или косвенно к
                  определённому физическому лицу. При изменении данных сотрудник должен сообщить в
                  отдел кадров в течение 7 календарных дней и принести подтверждающие документы.
                </p>
              </Card>
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("appearance")} onClick={() => toggle("appearance")} />
            </div>
          </section>

          {/* 06 Обязанности */}
          <section id="duties" className="scroll-mt-24">
            <Eyebrow>Работа на позиции</Eyebrow>
            <SectionHeader number="06">Должностные обязанности</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Card tone="brand">
                <p className="font-bold mb-2">Обслуживание посетителей</p>
                <ul className="text-sm space-y-1.5 list-disc pl-4">
                  <li>Индивидуальный подход, помощь в выборе блюд, расчёт с гостем.</li>
                  <li>Комплектация и выдача заказов, знание меню и акций.</li>
                  <li>Помощь на соседних станциях, пополнение запасов.</li>
                  <li>Чистота на рабочем месте, в зале и снаружи; дезинфекция подносов.</li>
                  <li>Соблюдение техники безопасности и пищевой безопасности.</li>
                </ul>
              </Card>
              <Card>
                <p className="font-bold text-brand-ink mb-2">Производство</p>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4">
                  <li>Приготовление, упаковка и хранение всех продуктов.</li>
                  <li>Правильная доготовка полуфабрикатов и готовых продуктов.</li>
                  <li>Соблюдение сроков и технологии хранения, производственного режима.</li>
                  <li>Пополнение запасов продуктов и полуфабрикатов.</li>
                  <li>Помощь на соседних станциях, чистота рабочего места.</li>
                </ul>
              </Card>
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("duties")} onClick={() => toggle("duties")} />
            </div>
          </section>

          {/* 07 Рабочее время */}
          <section id="worktime" className="scroll-mt-24">
            <Eyebrow>Расписание</Eyebrow>
            <SectionHeader number="07">Рабочее время и перерывы</SectionHeader>
            <Card>
              <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4 mb-4">
                <li>Рабочее время отмечается путём авторизации в системе Iiko.</li>
                <li>Начало — не ранее чем за 5 минут до начала смены по расписанию.</li>
                <li>Окончание работы — сразу после окончания смены. Опоздания с перерывов не допускаются.</li>
              </ul>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-neutral-500">
                      <th className="py-1.5 pr-4 font-bold">Смена</th>
                      <th className="py-1.5 font-bold">Перерывы на отдых</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-800">
                    {[
                      ["3:30 – 5:29", "30 минут"],
                      ["5:30 – 7:29", "30 + 15 минут"],
                      ["7:30 – 9:00", "30 + 15 + 15 минут"],
                      ["9:01 – 12:00", "30 + 15 + 15 + 15 минут"],
                    ].map(([shift, breaks]) => (
                      <tr key={shift} className="border-t border-neutral-100">
                        <td className="py-1.5 pr-4 font-semibold">{shift}</td>
                        <td className="py-1.5">{breaks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="mt-4">
              <MarkDoneButton done={done.has("worktime")} onClick={() => toggle("worktime")} />
            </div>
          </section>

          {/* 08 Выплаты и возможности */}
          <section id="pay" className="scroll-mt-24">
            <Eyebrow>Мотивация</Eyebrow>
            <SectionHeader number="08">Выплаты, начисления и возможности</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Card tone="dark">
                <p className="font-bold mb-2">Когда приходят выплаты</p>
                <ul className="text-sm text-white/85 space-y-1.5 list-disc pl-4">
                  <li>25 числа — аванс за отработанное время с 1 по 15 число.</li>
                  <li>10 числа — зарплата за отработанное время с 16 по последний день месяца.</li>
                </ul>
              </Card>
              <Card tone="accent">
                <p className="font-bold mb-2">Виды начислений</p>
                <ul className="text-sm text-white/90 space-y-1.5 list-disc pl-4">
                  <li>Часовой тариф — базовая ставка.</li>
                  <li>Ночная смена (22:00–06:00) — +20%.</li>
                  <li>Надбавка за удалённость — +30%.</li>
                  <li>Государственный праздник — ×2.</li>
                  <li>Премии — +20%.</li>
                </ul>
              </Card>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Card>
                <p className="font-bold text-brand-ink mb-2">Возможности для сотрудников</p>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4">
                  <li>Программа премирования, премия «Лучший работник месяца».</li>
                  <li>Бесплатные обеды и бесплатная стильная униформа.</li>
                  <li>Программа «Приведи друга», гибкий график, обучение и развитие.</li>
                </ul>
              </Card>
              <Card>
                <p className="font-bold text-brand-ink mb-2">Отпуска</p>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4">
                  <li>28 дней (для несовершеннолетних — 31 день).</li>
                  <li>Право на отпуск за первый год — после 6 месяцев непрерывной работы.</li>
                  <li>Учебные отпуска — с сохранением зарплаты.</li>
                </ul>
              </Card>
            </div>
            <div className="mt-4 bg-amber-50 border-l-4 border-brand rounded-2xl p-4 text-sm text-brand-ink">
              Если по болезни не можешь выйти на смену — предупреди менеджера смены не позднее чем
              за 2 часа. Телефон для связи: <strong>8-495-846-75-79</strong>.
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("pay")} onClick={() => toggle("pay")} />
            </div>
          </section>

          {/* 09 Правила безопасности */}
          <section id="safety" className="scroll-mt-24">
            <Eyebrow>Общие правила</Eyebrow>
            <SectionHeader number="09">Правила безопасности</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {[
                ["Задняя дверь", "Нельзя использовать заднюю дверь ресторана и впускать посторонних в служебные помещения."],
                ["Тревожная кнопка", "Используется только в случае ограбления, нападения или другой экстренной необходимости."],
                ["Контролируемые отходы", "Вся нереализованная продукция поступает в учитываемые отходы."],
                ["Конфиденциальность", "Вся информация, полученная в процессе работы, является конфиденциальной."],
              ].map(([title, text]) => (
                <Card key={title}>
                  <p className="font-bold text-brand-ink mb-1">{title}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
                </Card>
              ))}
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("safety")} onClick={() => toggle("safety")} />
            </div>
          </section>

          {/* 10 Охрана труда / оборудование */}
          <section id="equipment" className="scroll-mt-24">
            <Eyebrow>Оборудование</Eyebrow>
            <SectionHeader number="10">Охрана труда</SectionHeader>
            <p className="text-neutral-600 mt-2 mb-4">
              Раскрой карточку, чтобы увидеть правила безопасной работы с оборудованием.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {EQUIPMENT_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold bg-neutral-900 text-white rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              <details className="group rounded-2xl bg-surface-sage p-4 open:pb-5">
                <summary className="cursor-pointer font-bold text-brand-ink list-none flex items-center justify-between">
                  Гриль, томаторезка, пропариватель
                  <span className="text-neutral-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4 mt-3">
                  <li>Гриль: соблюдать осторожность, беречь руки от порезов; не держать руки у движущихся частей.</li>
                  <li>Томаторезка: ручку для резки толкать по направлению к лезвиям плавно, без лишних усилий.</li>
                  <li>Пропариватель: запрещается вставлять посторонние предметы, руки или пальцы в отверстия; избегать контакта с паром.</li>
                </ul>
              </details>
              <details className="group rounded-2xl bg-surface-sage p-4 open:pb-5">
                <summary className="cursor-pointer font-bold text-brand-ink list-none flex items-center justify-between">
                  Тепловой шкаф и картофельный бин
                  <span className="text-neutral-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4 mt-3">
                  <li>Не касаться нагревательной лампы и греющих поверхностей.</li>
                  <li>Продукцию укладывать только на специально предназначенные пластиковые лотки.</li>
                </ul>
              </details>
              <details className="group rounded-2xl bg-surface-sage p-4 open:pb-5">
                <summary className="cursor-pointer font-bold text-brand-ink list-none flex items-center justify-between">
                  Слайсер
                  <span className="text-neutral-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4 mt-3">
                  <li>Запрещается засовывать пальцы при включённом оборудовании.</li>
                  <li>Соблюдать осторожность при установке/смене насадок.</li>
                  <li>Незамедлительно выключать после окончания работ.</li>
                </ul>
              </details>
              <details className="group rounded-2xl bg-surface-sage p-4 open:pb-5">
                <summary className="cursor-pointer font-bold text-brand-ink list-none flex items-center justify-between">
                  Фритюр и тостер
                  <span className="text-neutral-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4 mt-3">
                  <li>Фритюр: погружать/вынимать корзину аккуратно и медленно, без рывков; не опускать руки во фритюр; избегать попадания воды в масло.</li>
                  <li>Тостер: соблюдать осторожность при закладывании булочек; не доставать застрявшие булочки руками; не прикасаться мокрыми руками.</li>
                </ul>
              </details>
            </div>
            <div className="mt-4 bg-amber-50 border-l-4 border-brand rounded-2xl p-4 text-sm text-brand-ink">
              На рабочем месте: используй специальные инструменты для оборудования, носи обувь без
              каблука и с нескользящей подошвой. К компактору допускаются только сотрудники,
              прошедшие инструктаж.
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("equipment")} onClick={() => toggle("equipment")} />
            </div>
          </section>

          {/* 11 Пожарная безопасность */}
          <section id="fire" className="scroll-mt-24">
            <Eyebrow>Экстренная ситуация</Eyebrow>
            <SectionHeader number="11">Пожарная безопасность</SectionHeader>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <Card tone="accent">
                <p className="font-bold mb-2">Действия при пожаре</p>
                <ol className="text-sm space-y-1.5 list-decimal pl-4">
                  <li>Сохраняй спокойствие!</li>
                  <li>Сообщи по телефону 101 или 112: адрес, место возникновения пожара, свою фамилию.</li>
                  <li>Эвакуируй людей, ориентируясь по знакам направления движения.</li>
                  <li>По возможности прими меры к тушению: используй средства защиты, при необходимости обесточь помещение.</li>
                </ol>
              </Card>
              <Card>
                <p className="font-bold text-brand-ink mb-2">При эвакуации</p>
                <ul className="text-sm text-neutral-700 space-y-1.5 list-disc pl-4">
                  <li>Сохраняй спокойствие.</li>
                  <li>Задымлённые места проходи быстро, защитив рот и нос влажной тканью.</li>
                  <li>В сильном дыму передвигайся ползком или пригнувшись — у пола воздух чище.</li>
                  <li>Если на человеке загорелась одежда — помоги сбросить её, не давай бежать.</li>
                  <li>При сильном задымлении путей эвакуации — закройся в помещении и будь видимым в окне.</li>
                </ul>
              </Card>
            </div>
            <div className="mt-4">
              <MarkDoneButton done={done.has("fire")} onClick={() => toggle("fire")} />
            </div>
          </section>

          {/* 12 Электробезопасность */}
          <section id="electrical" className="scroll-mt-24">
            <Eyebrow>Основные правила</Eyebrow>
            <SectionHeader number="12">Электробезопасность</SectionHeader>
            <Card tone="dark">
              <ul className="text-sm text-white/85 space-y-2 list-disc pl-4">
                <li>Не прикасаться к проводам, неизолированным и не огражденным токоведущим частям оборудования.</li>
                <li>Не наступать на переносные провода на полу; не снимать защитные кожухи; не открывать электрораспределительные шкафы.</li>
                <li>Не производить самостоятельно ремонт оборудования (гриля, фритюрниц, тостеров) и замену электроламп.</li>
                <li>О любом, даже незначительном ударе током немедленно сообщить старшему смены.</li>
              </ul>
            </Card>
            <div className="mt-4">
              <MarkDoneButton done={done.has("electrical")} onClick={() => toggle("electrical")} />
            </div>
          </section>

          <section id="welcome-video" className="scroll-mt-24">
            <Eyebrow>Видео</Eyebrow>
            <SectionHeader number="✓">Приветственное видео</SectionHeader>
            <Card tone="light">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900">
                <video controls preload="none" className="w-full h-auto">
                  <source src={`${BASE_PATH}/videos/welcome.mp4`} type="video/mp4" />
                </video>
              </div>
            </Card>
          </section>

          {/* Финальный тест */}
          <section id="final-quiz" className="scroll-mt-24">
            <Eyebrow>Итоги</Eyebrow>
            <SectionHeader number="✓">Проверь себя по всему курсу</SectionHeader>
            <Quiz sectionSlug="welcome" lessonSlug="final-quiz" questions={welcomeFinalQuiz} />
          </section>

          <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 text-center">
            <p className="text-lg font-bold mb-1">Теория пройдена!</p>
            <p className="text-white/70 text-sm max-w-md mx-auto">
              Самое интересное будет на практике. Спасибо за уделённое время — до встречи в Besty!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
