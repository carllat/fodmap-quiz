import { createFileRoute } from "@tanstack/react-router";
import FodmapQuiz from "@/components/FodmapQuiz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lowfod — Your personalised 7-day low-FODMAP plan" },
      { name: "description", content: "Answer 5 short questions and get a free, tailored low-FODMAP meal plan with recipes, grocery list and gut-care tips." },
      { property: "og:title", content: "Lowfod — Personalised low-FODMAP meal plan" },
      { property: "og:description", content: "A free, tailored 7-day low-FODMAP plan delivered instantly." },
    ],
  }),
  component: () => <FodmapQuiz />,
});
