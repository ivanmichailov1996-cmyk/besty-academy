import type { Metadata } from "next";
import { WelcomeCourse } from "@/components/welcome/WelcomeCourse";

export const metadata: Metadata = {
  title: "Welcome-курс — Besty Academy",
  description: "Вводный курс для новых сотрудников Besty: ресторан, команда, стандарты и безопасность.",
};

export default function WelcomePage() {
  return <WelcomeCourse />;
}
