import type { Metadata } from "next";
import QualificationPage from "@/components/sections/qualification-page";

export const metadata: Metadata = {
  title: "Qualify for Treatment | La Vida Regenerative Medicine",
  description:
    "See if regenerative medicine in Punta Cana is right for you. Share a few details about your case and our medical team will review your information and reach out to design a personalized plan.",
  openGraph: {
    title: "Qualify for Treatment | La Vida Regenerative Medicine",
    description:
      "Share a few details and our medical team will review your information and reach out to design a personalized plan.",
    url: "https://lavidastemcells.com/qualify",
    images: [{ url: "/images/hero-home.jpg", width: 1200, height: 630 }],
  },
};

export default function QualifyRoute() {
  return (
    <QualificationPage
      imageSrc="/images/treatment-room.webp"
      imageAlt="Modern treatment room with a Caribbean ocean view in Punta Cana, Dominican Republic"
      imageObjectClass="object-center"
      headline="See If You Qualify"
      pageSource="qualify"
      subCopy="Discover whether you may be a candidate for our personalized treatment programs and advanced care options. Complete the brief consultation form to receive expert guidance tailored to your needs."
      tile4={{
        iconName: "target",
        title: "Tailored Treatment Plans",
        subtitle: "Built around your condition and goals",
      }}
    />
  );
}
