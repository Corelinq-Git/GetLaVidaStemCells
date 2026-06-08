import { ShieldAlert } from "lucide-react";

export default function Disclaimer() {
  return (
    <section className="bg-gray-50 border-t border-gray-200 py-8 px-6">
      <div className="max-w-4xl mx-auto flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="font-semibold text-gray-500">
            Important Notice:
          </span>{" "}
          Stem cell therapies offered at La Vida Regenerative Medicine are not
          FDA-approved. These treatments are performed in the Dominican Republic
          and are not intended to diagnose, treat, cure, or prevent any disease.
          Individual results may vary. All medical decisions should be made in
          consultation with your qualified healthcare provider.
        </p>
      </div>
    </section>
  );
}
