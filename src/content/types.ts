export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "phrases"; title?: string; items: string[] }
  | { type: "callout"; tone?: "info" | "warning" | "success"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "imageGrid"; images: { src: string; alt: string; caption?: string }[] }
  | { type: "diagram"; name: string; caption?: string }
  | { type: "video"; src: string; caption?: string; poster?: string };

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  ready: boolean;
  source?: string;
  blocks?: ContentBlock[];
  quiz?: QuizQuestion[];
};

export type Section = {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  lessons: Lesson[];
};
