import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your access to and use of the YuDevelopment website.",
};

export default async function TermsOfServicePage() {
  const { brand } = await getContent();
  const email = brand.email || "info@yudevelopment.com";

  return (
    <LegalLayout title="Terms of Service" effectiveDate="June 2, 2026">
      <div className="space-y-4">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
          YuDevelopment website located at yudevelopment.com (the &ldquo;Site&rdquo;), operated by
          YuDevelopment, a subsidiary of YGCCC (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;). By accessing or using the Site, you agree to be bound by these Terms.
        </p>
      </div>

      <LegalSection heading="1. Use of the Site">
        <p>
          The Site is provided for informational purposes only. You may use the Site solely for
          lawful purposes and in accordance with these Terms. You agree not to:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Use the Site in any way that violates applicable federal, state, or local laws or
            regulations
          </li>
          <li>Attempt to gain unauthorized access to any part of the Site or its related systems</li>
          <li>Transmit any harmful, offensive, or disruptive content through the Site</li>
          <li>
            Use the Site to impersonate any person or entity or misrepresent your affiliation with
            any person or entity
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. No Investment Offer">
        <p>
          Nothing on this Site constitutes an offer to sell, a solicitation of an offer to buy, or a
          recommendation of any security or investment product. Any discussion of investment
          opportunities on this Site is for informational purposes only. All investments involve
          risk, including the potential loss of principal. You should consult with a qualified
          financial, legal, and tax advisor before making any investment decision.
        </p>
        <p>
          YuDevelopment and YGCCC do not provide investment advice. Expressions of interest submitted
          through the Site do not create any obligation on the part of either party.
        </p>
      </LegalSection>

      <LegalSection heading="3. No Professional Advice">
        <p>
          The content on this Site does not constitute legal, financial, architectural, engineering,
          or professional advice of any kind. Information provided is general in nature and should
          not be relied upon as a substitute for consultation with qualified professionals.
        </p>
      </LegalSection>

      <LegalSection heading="4. Intellectual Property">
        <p>
          All content on this Site, including text, graphics, logos, and design elements, is the
          property of YuDevelopment or its affiliates and is protected by applicable intellectual
          property laws. You may not reproduce, distribute, modify, or create derivative works from
          any content on this Site without our prior written consent.
        </p>
      </LegalSection>

      <LegalSection heading="5. Disclaimer of Warranties">
        <p>
          The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
          warranties of any kind, either express or implied. We do not warrant that the Site will be
          uninterrupted, error-free, or free of viruses or other harmful components. We make no
          representations or warranties regarding the accuracy, completeness, or timeliness of any
          content on the Site.
        </p>
      </LegalSection>

      <LegalSection heading="6. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, YuDevelopment and YGCCC shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising from your use of
          or inability to use the Site, even if we have been advised of the possibility of such
          damages. Our total liability to you for any claims arising from your use of the Site shall
          not exceed $100.
        </p>
      </LegalSection>

      <LegalSection heading="7. Third-Party Links">
        <p>
          The Site may contain links to third-party websites. These links are provided for
          convenience only. We have no control over the content of third-party sites and accept no
          responsibility for them or for any loss or damage that may arise from your use of them.
        </p>
      </LegalSection>

      <LegalSection heading="8. Contact Form Submissions">
        <p>
          By submitting a message through our contact form, you acknowledge that your submission does
          not create any contractual relationship, confidentiality obligation, or duty of any kind on
          the part of YuDevelopment or YGCCC. Do not submit confidential or proprietary information
          through the contact form.
        </p>
      </LegalSection>

      <LegalSection heading="9. Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the state in
          which YGCCC is incorporated, without regard to its conflict of law provisions. Any disputes
          arising under these Terms shall be subject to the exclusive jurisdiction of the courts
          located in that state.
        </p>
      </LegalSection>

      <LegalSection heading="10. Changes to These Terms">
        <p>
          We reserve the right to update or modify these Terms at any time. Changes will be effective
          upon posting to the Site with a revised Effective Date. Your continued use of the Site
          after any changes constitutes your acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection heading="11. Contact Us">
        <p>If you have any questions about these Terms, please contact us at:</p>
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
