import type { Metadata } from "next";
import QualificationPage from "@/components/sections/qualification-page";

export const metadata: Metadata = {
  title: "Request a Consultation | La Vida Regenerative Medicine",
  description:
    "Request a private consultation with La Vida's medical team. Share a few details about your case and we'll reach out to confirm your Zoom or phone appointment.",
  openGraph: {
    title: "Request a Consultation | La Vida Regenerative Medicine",
    description:
      "Share a few details and our medical team will reach out to confirm your private consultation.",
    url: "https://lavidastemcells.com/consultation",
    images: [{ url: "/images/hero-home.jpg", width: 1200, height: 630 }],
  },
};

export default function ConsultationRoute() {
  return (
    <QualificationPage
      imageSrc="/images/punta-cana-lifestyle.webp"
      imageAlt="Sunset poolside view of a luxury resort in Punta Cana, Dominican Republic"
      imageObjectClass="object-[70%_center] md:object-center"
      headline="Treatment Designed Around You"
      pageSource="consultation"
      subCopy="Every patient deserves a tailored approach to care. Tell us about your condition and our team will prepare a personalized path toward relief, recovery, and long-term wellness."
      tile4={{
        iconName: "award",
        title: "Premium Care. Exceptional Value.",
        subtitle: "Concierge service, transparent pricing",
      }}
    />
  );
}
