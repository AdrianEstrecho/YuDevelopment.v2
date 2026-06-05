import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How YuDevelopment collects, uses, and protects information submitted through our website.",
};

export default async function PrivacyPolicyPage() {
  const { brand } = await getContent();
  const email = brand.email || "info@yudevelopment.com";

  return (
    <LegalLayout title="Privacy Policy" effectiveDate="June 2, 2026">
      <div className="space-y-4">
        <p>
          YuDevelopment, a subsidiary of YGCCC (&ldquo;YuDevelopment,&rdquo; &ldquo;we,&rdquo;
          &ldquo;our,&rdquo; or &ldquo;us&rdquo;), is committed to protecting the privacy of
          individuals who visit our website at yudevelopment.com (the &ldquo;Site&rdquo;). This
          Privacy Policy explains what information we collect, how we use it, and your rights with
          respect to that information.
        </p>
        <p>
          Please read this policy carefully. By using our Site, you agree to the practices described
          below.
        </p>
      </div>

      <LegalSection heading="1. Information We Collect">
        <p>
          We collect only the information you voluntarily provide to us through our contact form.
          This includes:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            <span className="font-medium text-gray-900">Name:</span> Your first and/or last name, as
            entered by you.
          </li>
          <li>
            <span className="font-medium text-gray-900">Email address:</span> The email address you
            provide for us to respond to your inquiry.
          </li>
          <li>
            <span className="font-medium text-gray-900">Message:</span> The content of your message
            or inquiry.
          </li>
        </ul>
        <p>
          We do not collect any other personal information, and we do not automatically collect data
          such as cookies, tracking pixels, IP addresses, or browsing behavior unless otherwise
          stated in a future update to this policy.
        </p>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <p>We use the information you submit solely to:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li>Respond to your inquiry or message</li>
          <li>Follow up on potential business or investment conversations</li>
          <li>Maintain records of communications for internal business purposes</li>
        </ul>
        <p>
          We do not use your information for marketing purposes without your consent, and we do not
          sell, rent, or trade your personal information to any third party.
        </p>
      </LegalSection>

      <LegalSection heading="3. How We Store and Protect Your Information">
        <p>
          Submitted contact form data is received and stored through our website platform and email
          systems. We take reasonable precautions to protect your information from unauthorized
          access, loss, or misuse. However, no transmission of data over the internet is completely
          secure, and we cannot guarantee absolute security.
        </p>
        <p>
          We retain your information only as long as necessary to respond to your inquiry and for
          legitimate business recordkeeping purposes.
        </p>
      </LegalSection>

      <LegalSection heading="4. Sharing of Information">
        <p>
          We do not sell or share your personal information with third parties, except in the
          following limited circumstances:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            With service providers who assist in operating our website or communications (e.g.,
            email hosting), who are bound to handle your information securely and only as directed
          </li>
          <li>When required by law, regulation, or legal process</li>
          <li>
            To protect the rights, property, or safety of YuDevelopment, YGCCC, or others
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Third-Party Links">
        <p>
          Our Site may contain links to third-party websites. We are not responsible for the privacy
          practices of those sites and encourage you to review their privacy policies independently.
        </p>
      </LegalSection>

      <LegalSection heading="6. Children's Privacy">
        <p>
          Our Site is not directed to individuals under the age of 18. We do not knowingly collect
          personal information from minors. If you believe we have inadvertently collected
          information from a minor, please contact us and we will promptly delete it.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your Rights">
        <p>
          You have the right to request access to, correction of, or deletion of the personal
          information you have submitted to us. To make such a request, please contact us using the
          information below.
        </p>
      </LegalSection>

      <LegalSection heading="8. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the
          Effective Date at the top of this page. Continued use of the Site after any changes
          constitutes your acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection heading="9. Contact Us">
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <div className="text-gray-700">
          <p className="font-medium text-gray-900">YuDevelopment / YGCCC</p>
          <p>
            Email:{" "}
            <a href={`mailto:${email}`} className="text-navy-600 hover:text-navy-800 transition-colors">
              {email}
            </a>
          </p>
          <p>Website: yudevelopment.com</p>
        </div>
      </LegalSection>
    </LegalLayout>
  );
}
