import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | La Vida Stem Cells",
  description:
    "What information we collect, how we use it, how we protect it, and your choices.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="h-full overflow-y-auto bg-white text-gray-800">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link href="/" className="text-sm font-medium text-ocean hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ocean-deepest">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">Effective Date: June 21, 2026</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-gray-700">
          <p>
            Welcome to getlavidastemcells.com (&ldquo;Website&rdquo;), operated by
            La Vida Stem Cells (&ldquo;La Vida,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
          </p>
          <p>
            We respect your privacy and are committed to protecting the personal
            information you provide through our Website. This Privacy Policy
            explains what information we collect, how we use it, how we protect
            it, and the choices available to you regarding your information.
          </p>

          <Section title="Information We Collect">
            <p>
              When you visit our Website, submit a consultation request, schedule
              an appointment, or communicate with us, we may collect:
            </p>
            <h3 className="font-semibold text-ocean-deepest">Personal Information</h3>
            <List
              items={[
                "Name",
                "Email address",
                "Telephone number",
                "Mailing address",
                "Date of birth",
                "Emergency contact information (if provided)",
              ]}
            />
            <h3 className="font-semibold text-ocean-deepest">Health Information</h3>
            <p>You may voluntarily provide information regarding:</p>
            <List
              items={[
                "Medical conditions",
                "Symptoms",
                "Prior treatments",
                "Medications",
                "Medical history",
                "Treatment goals",
              ]}
            />
            <h3 className="font-semibold text-ocean-deepest">
              Website Usage Information
            </h3>
            <p>We may automatically collect:</p>
            <List
              items={[
                "IP address",
                "Browser type",
                "Device information",
                "Pages visited",
                "Date and time of visits",
                "Referring websites",
                "Cookies and analytics data",
              ]}
            />
          </Section>

          <Section title="How We Use Your Information">
            <p>We may use your information to:</p>
            <List
              items={[
                "Respond to inquiries and consultation requests",
                "Schedule appointments and consultations",
                "Evaluate whether our services may be appropriate for you",
                "Communicate regarding treatment options and educational materials",
                "Send appointment reminders and follow-up communications",
                "Improve our Website and services",
                "Provide customer support",
                "Comply with legal and regulatory obligations",
              ]}
            />
          </Section>

          <Section title="No Physician-Patient Relationship">
            <p>
              Submitting information through this Website does not create a
              physician-patient relationship.
            </p>
            <p>
              Information provided on this Website is for informational and
              consultation purposes only and should not be considered medical
              advice. Any treatment recommendations can only be made by a
              qualified healthcare provider after an appropriate medical
              evaluation.
            </p>
          </Section>

          <Section title="Communications">
            <p>
              By submitting your information, you consent to receive
              communications from La Vida Stem Cells and its representatives,
              including:
            </p>
            <List
              items={[
                "Telephone calls",
                "Text messages (SMS)",
                "Emails",
                "Appointment reminders",
                "Consultation follow-ups",
                "Educational information regarding regenerative medicine and related services",
              ]}
            />
            <p>You may opt out of marketing communications at any time.</p>
            <p>
              Message and data rates may apply. Message frequency may vary.
              Consent is not a condition of purchase. Reply STOP to opt out of
              text communications.
            </p>
          </Section>

          <Section title="How We Share Information">
            <p>We do not sell, rent, or trade your personal information.</p>
            <p>We may share information with:</p>
            <h3 className="font-semibold text-ocean-deepest">Healthcare Providers</h3>
            <p>
              Licensed physicians and healthcare professionals involved in
              evaluating your consultation request or treatment inquiry.
            </p>
            <h3 className="font-semibold text-ocean-deepest">Service Providers</h3>
            <p>Third-party vendors who assist with:</p>
            <List
              items={[
                "Appointment scheduling",
                "Customer communications",
                "Website hosting",
                "CRM systems",
                "Technical support",
                "Analytics services",
              ]}
            />
            <p>
              These providers are required to maintain appropriate safeguards for
              your information.
            </p>
            <h3 className="font-semibold text-ocean-deepest">Legal Requirements</h3>
            <p>
              We may disclose information if required by law, court order, legal
              process, or governmental request.
            </p>
            <h3 className="font-semibold text-ocean-deepest">Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, sale, or transfer of assets,
              information may be transferred as part of that transaction.
            </p>
          </Section>

          <Section title="Cookies and Analytics">
            <p>
              Our Website may use cookies, pixels, analytics tools, and similar
              technologies to:
            </p>
            <List
              items={[
                "Improve Website functionality",
                "Analyze visitor behavior",
                "Measure advertising effectiveness",
                "Enhance user experience",
              ]}
            />
            <p>
              You may disable cookies through your browser settings; however,
              certain Website features may not function properly.
            </p>
          </Section>

          <Section title="Data Security">
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards designed to protect your information against unauthorized
              access, disclosure, alteration, or destruction.
            </p>
            <p>
              While we strive to protect your information, no method of internet
              transmission or electronic storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>We retain information only for as long as reasonably necessary to:</p>
            <List
              items={[
                "Provide requested services",
                "Maintain business records",
                "Comply with legal obligations",
                "Resolve disputes",
                "Enforce our agreements",
              ]}
            />
          </Section>

          <Section title="Your Rights">
            <p>Subject to applicable laws, you may request to:</p>
            <List
              items={[
                "Access your personal information",
                "Correct inaccurate information",
                "Request deletion of your information",
                "Withdraw consent for future communications",
                "Request information regarding how your data is used",
              ]}
            />
            <p>To exercise these rights, contact us using the information below.</p>
          </Section>

          <Section title="Third-Party Websites">
            <p>
              This Website may contain links to third-party websites. We are not
              responsible for the privacy practices, security, or content of those
              websites. We encourage you to review their privacy policies before
              providing any information.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              This Website is intended for adults seeking information regarding
              regenerative medicine services. We do not knowingly collect personal
              information from individuals under the age of 18 without appropriate
              parental or guardian consent.
            </p>
          </Section>

          <Section title="Changes to This Privacy Policy">
            <p>
              We reserve the right to update or modify this Privacy Policy at any
              time. Any changes will become effective upon posting on this Website.
              Continued use of the Website after changes are posted constitutes
              acceptance of the revised policy.
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
              If you have questions regarding this Privacy Policy or how your
              information is handled, please contact us.
            </p>
          </Section>

          <Section title="Consultation Form Consent">
            <p>
              By submitting a consultation request through this Website, you
              acknowledge that you have read and agree to this Privacy Policy and
              consent to the collection, use, and disclosure of your information as
              described herein.
            </p>
          </Section>

          <p className="border-t border-gray-200 pt-6 text-sm">
            See also our{" "}
            <Link
              href="/notice-of-privacy-practices"
              className="text-ocean hover:underline"
            >
              Notice of Privacy Practices
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
