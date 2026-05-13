import type { Metadata } from "next";
import SqueezePage from "@/components/sections/squeeze-page";

export const metadata: Metadata = {
  title: "La Vida Regenerative Medicine | Stem Cell Therapy in Punta Cana",
  description:
    "World-class stem cell therapy in Punta Cana. Fresh UC-MSC cells, expert physicians, and a luxury healing experience. Chat, call, or text our concierge — Ariana — anytime.",
  openGraph: {
    title: "La Vida Regenerative Medicine | Stem Cell Therapy in Punta Cana",
    description:
      "World-class stem cell therapy in Punta Cana. Fresh cells, expert physicians, luxury recovery.",
    url: "https://lavidastemcells.com",
    images: [{ url: "/images/hero-home.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return <SqueezePage />;
}
