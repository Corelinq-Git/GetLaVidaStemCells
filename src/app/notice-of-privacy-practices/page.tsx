import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices | La Vida Stem Cells",
  description:
    "How medical information about you may be used and disclosed, and how you can access it.",
  robots: { index: true, follow: true },
};

export default function NoticeOfPrivacyPracticesPage() {
  return (
    <div className="bg-white text-gray-800">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link href="/" className="text-sm font-medium text-ocean hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ocean-deepest">
          Notice of Privacy Practices
        </h1>
        <p className="mt-2 text-sm text-gray-500">Effective Date: June 21, 2026</p>

        <p className="mt-6 rounded-lg bg-gray-50 p-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          This notice describes how medical information about you may be used and
          disclosed and how you can access this information. Please review it
          carefully.
        </p>

        <div className="prose-legal mt-8 space-y-6 text-[15px] leading-relaxed text-gray-700">
          <p>
            La Vida Stem Cells (&ldquo;La Vida,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the
            privacy and confidentiality of your personal and health information.
            This Notice explains how information you provide through our
            consultation forms, communications, and interactions may be used and
            disclosed, and outlines your rights regarding that information.
          </p>

          <Section title="Our Commitment to Your Privacy">
            <p>
              We understand the importance of safeguarding your personal and
              health-related information. We maintain administrative, technical,
              and physical safeguards designed to protect the confidentiality and
              security of information you provide to us.
            </p>
          </Section>

          <Section title="Information We May Collect">
            <p>As part of your inquiry or consultation request, we may collect:</p>
            <List
              items={[
                "Name",
                "Address",
                "Telephone number",
                "Email address",
                "Date of birth",
                "Medical history",
                "Health conditions",
                "Treatment interests",
                "Physician records voluntarily provided by you",
                "Information related to consultations and treatment inquiries",
              ]}
            />
          </Section>

          <Section title="How We May Use and Disclose Your Information">
            <h3 className="font-semibold text-ocean-deepest">
              Treatment and Consultation Purposes
            </h3>
            <p>We may use and disclose information you provide to:</p>
            <List
              items={[
                "Evaluate your inquiry",
                "Determine whether our services may be appropriate for you",
                "Coordinate consultations with healthcare providers",
                "Facilitate communication regarding treatment options",
                "Assist with scheduling appointments",
              ]}
            />
            <h3 className="font-semibold text-ocean-deepest">
              Payment and Administrative Activities
            </h3>
            <p>We may use information as necessary for:</p>
            <List
              items={[
                "Appointment scheduling",
                "Customer support",
                "Billing administration",
                "Business operations and quality improvement",
              ]}
            />
            <h3 className="font-semibold text-ocean-deepest">Service Providers</h3>
            <p>
              We may share information with trusted service providers who assist
              us in operating our business, including:
            </p>
            <List
              items={[
                "Scheduling systems",
                "Customer relationship management platforms",
                "Secure communication providers",
                "Technology and hosting providers",
              ]}
            />
            <p>
              Such providers are expected to maintain appropriate confidentiality
              and security protections.
            </p>
            <h3 className="font-semibold text-ocean-deepest">Legal Requirements</h3>
            <p>We may disclose information when required by law, including:</p>
            <List
              items={[
                "Court orders",
                "Legal proceedings",
                "Government investigations",
                "Public health reporting obligations",
              ]}
            />
            <h3 className="font-semibold text-ocean-deepest">Business Transfers</h3>
            <p>
              If La Vida undergoes a merger, acquisition, restructuring, or sale
              of assets, information may be transferred as part of that
              transaction.
            </p>
          </Section>

          <Section title="Uses Requiring Your Authorization">
            <p>
              Except as described in this Notice, we will not disclose your
              health-related information without your authorization.
            </p>
            <p>
              You may revoke an authorization at any time by providing written
              notice, except to the extent action has already been taken based
              upon your authorization.
            </p>
          </Section>

          <Section title="Your Rights Regarding Your Information">
            <h3 className="font-semibold text-ocean-deepest">Right to Access</h3>
            <p>You may request access to information you have provided to us.</p>
            <h3 className="font-semibold text-ocean-deepest">
              Right to Request Correction
            </h3>
            <p>
              If you believe information is inaccurate or incomplete, you may
              request corrections.
            </p>
            <h3 className="font-semibold text-ocean-deepest">
              Right to Request Restrictions
            </h3>
            <p>
              You may request limitations on certain uses or disclosures of your
              information. While we will consider all requests, we may not be able
              to accommodate every restriction request.
            </p>
            <h3 className="font-semibold text-ocean-deepest">
              Right to Confidential Communications
            </h3>
            <p>
              You may request that we communicate with you through specific
              methods or at specific locations. Examples include:
            </p>
            <List
              items={[
                "Email only",
                "Phone only",
                "Alternate phone number",
                "Alternate mailing address",
              ]}
            />
            <h3 className="font-semibold text-ocean-deepest">
              Right to Request Deletion
            </h3>
            <p>
              Subject to applicable legal and regulatory requirements, you may
              request deletion of information maintained by us.
            </p>
            <h3 className="font-semibold text-ocean-deepest">
              Right to Receive a Copy of This Notice
            </h3>
            <p>
              You may request a paper or electronic copy of this Notice at any
              time.
            </p>
          </Section>

          <Section title="Communications">
            <p>
              By voluntarily providing your contact information, you authorize La
              Vida Stem Cells and its representatives to communicate with you
              regarding your inquiry, appointments, treatment information,
              educational materials, and service-related updates through:
            </p>
            <List
              items={["Telephone", "SMS/Text Message", "Email", "Voicemail"]}
            />
            <p>You may opt out of marketing communications at any time.</p>
            <p>
              Message and data rates may apply. Message frequency may vary.
              Consent is not a condition of purchase. Reply STOP to opt out of
              text communications.
            </p>
          </Section>

          <Section title="Security of Information">
            <p>
              We employ reasonable safeguards intended to protect information from
              unauthorized access, use, alteration, or disclosure. However, no
              method of electronic transmission or storage can be guaranteed to be
              completely secure.
            </p>
          </Section>

          <Section title="Complaints">
            <p>
              If you believe your privacy rights have been violated, you may
              submit a complaint to:
            </p>
            <p>
              Privacy Officer
              <br />
              La Vida Stem Cells
              <br />
              Email:{" "}
              <a
                href="mailto:care@lavidastemcells.com"
                className="text-ocean hover:underline"
              >
                care@lavidastemcells.com
              </a>
            </p>
            <p>You may also file a complaint with the:</p>
            <p>
              U.S. Department of Health and Human Services Office for Civil Rights
            </p>
            <p>We will not retaliate against you for filing a complaint.</p>
          </Section>

          <Section title="Changes to This Notice">
            <p>
              We reserve the right to revise this Notice at any time. Any revised
              Notice will become effective upon posting to our website and will
              apply to all information maintained by us.
            </p>
          </Section>

          <Section title="Contact Information">
            <p>
              La Vida Stem Cells
              <br />
              Website: getlavidastemcells.com
              <br />
              Email:{" "}
              <a
                href="mailto:care@lavidastemcells.com"
                className="text-ocean hover:underline"
              >
                care@lavidastemcells.com
              </a>
            </p>
            <p>
              If you have questions regarding this Notice or your privacy rights,
              please contact us using the information above.
            </p>
          </Section>

          <Section title="Consultation Form Acknowledgment">
            <p>
              By submitting a consultation request, you acknowledge that you have
              reviewed and understand this Notice of Privacy Practices and consent
              to the collection, use, and disclosure of your information as
              described herein.
            </p>
          </Section>

          <p className="border-t border-gray-200 pt-6 text-sm">
            See also our{" "}
            <Link href="/privacy-policy" className="text-ocean hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-bold text-ocean-deepest">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
