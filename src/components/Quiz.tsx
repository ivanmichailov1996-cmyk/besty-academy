"use client";

import { useEffect, useMemo, useState } from "react";
import type { QuizQuestion } from "@/content/types";

function storageKey(sectionSlug: string, lessonSlug: string) {
  return `besty-academy:quiz:${sectionSlug}/${lessonSlug}`;
}

export function Quiz({
  sectionSlug,
  lessonSlug,
  questions,
}: {
  sectionSlug: string;
  lessonSlug: string;
  questions: QuizQuestion[];
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(sectionSlug, lessonSlug));
      if (raw) {
        const parsed = JSON.parse(raw) as { score: number; total: number };
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, an external store
        setBestScore(parsed.score);
      }
    } catch {
      // localStorage may be unavailable — ignore silently
    }
  }, [sectionSlug, lessonSlug]);

  const score = useMemo(
    () => answers.filter((a, i) => a === questions[i].correctIndex).length,
    [answers, questions]
  );

  const allAnswered = answers.every((a) => a !== null);

  function selectAnswer(qIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
    try {
      window.localStorage.setItem(
        storageKey(sectionSlug, lessonSlug),
        JSON.stringify({ score, total: questions.length, completedAt: Date.now() })
      );
    } catch {
      // ignore
    }
    setBestScore((prev) => (prev === null ? score : Math.max(prev, score)));
  }

  function handleRetry() {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="mt-10 rounded-2xl bg-surface-amber p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-display text-xl text-brand-ink">Проверь себя</h3>
        {bestScore !== null && (
          <span className="label-eyebrow text-[11px] text-brand-dark bg-white/70 rounded-full px-3 py-1.5">
            Лучший результат: {bestScore} из {questions.length}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selected = answers[qIndex];
          return (
            <div key={qIndex}>
              <p className="font-semibold text-neutral-900 mb-2">
                {qIndex + 1}. {q.question}
              </p>
              <div className="grid gap-2">
                {q.options.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex;
                  const isCorrect = optionIndex === q.correctIndex;
                  let cls =
                    "text-left rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 ease-out cursor-pointer hover:scale-[1.01]";
                  if (submitted) {
                    if (isCorrect) cls += " border-green-500 bg-green-50 text-green-900";
                    else if (isSelected && !isCorrect) cls += " border-red-400 bg-red-50 text-red-800";
                    else cls += " border-neutral-200 text-neutral-500";
                  } else if (isSelected) {
                    cls += " border-brand bg-brand/10 text-brand-ink";
                  } else {
                    cls += " border-neutral-200 hover:border-brand/50";
                  }
                  return (
                    <button
                      key={optionIndex}
                      type="button"
                      className={cls}
                      onClick={() => selectAnswer(qIndex, optionIndex)}
                      disabled={submitted}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4">
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="rounded-full bg-brand text-brand-ink font-bold px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-95 hover:scale-[1.02] transition-all duration-200 ease-out"
          >
            Проверить ответы
          </button>
        ) : (
          <>
            <p className="font-bold text-brand-ink">
              Результат: {score} из {questions.length}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-full border-2 border-brand text-brand-ink font-bold px-5 py-2 hover:bg-brand/10 hover:scale-[1.02] transition-all duration-200 ease-out"
            >
              Пройти ещё раз
            </button>
          </>
        )}
      </div>
    </div>
  );
}
