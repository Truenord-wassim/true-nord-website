import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | True Nord",
  description:
    "How True Nord collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Privacy Policy</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="text-lg font-medium text-white/90">
          How True Nord collects, uses, and protects your personal information.
        </p>
        <p className="mt-3 text-sm text-white/60">Last updated: June 2026</p>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">

          {/* §1 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            1. Who We Are
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            True Nord is a Canadian food trading company that sources Canadian
            grocery products and distributes them to retail partners across the
            GCC and MENA region. We operate at{" "}
            <a
              href="https://www.true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              www.true-nord.ca
            </a>
            .
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            For any questions about this policy, contact us at:{" "}
            <a
              href="mailto:info@true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              info@true-nord.ca
            </a>
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §2 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            2. What Information We Collect
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            When you use our website, we may collect the following personal
            information — but only when you choose to provide it through one of
            our contact forms:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
            <li>Company name, country, and website (if provided)</li>
            <li>The message or request you submit</li>
            <li>
              Any files you choose to attach (for example, product photos or
              product materials)
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-navy/80">
            We do not collect payment information, and we do not require you to
            create an account to use this website.
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            We also use a privacy-friendly analytics tool (Vercel Web Analytics)
            that collects limited, anonymous information when you visit our site,
            including:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>The pages you view on our site</li>
            <li>The website or link that referred you to us</li>
            <li>
              Your approximate location (country only), determined without
              storing your IP address
            </li>
            <li>Your general device and browser type</li>
          </ul>
          <p className="mb-4 leading-relaxed text-navy/80">
            This analytics data is collected without cookies. It is not used to
            identify you personally or to build a profile of you.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §3 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            3. Why We Collect It
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We use your information only for the following purposes:
          </p>
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-navy/80">
              <thead>
                <tr>
                  <th className="border border-navy/20 bg-navy/5 px-4 py-2 text-left font-semibold text-navy">
                    Purpose
                  </th>
                  <th className="border border-navy/20 bg-navy/5 px-4 py-2 text-left font-semibold text-navy">
                    Basis
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-navy/20 px-4 py-2">
                    To respond to your inquiry or sourcing request
                  </td>
                  <td className="border border-navy/20 px-4 py-2">
                    Your consent (submitting the form)
                  </td>
                </tr>
                <tr>
                  <td className="border border-navy/20 px-4 py-2">
                    To follow up on a business partnership inquiry
                  </td>
                  <td className="border border-navy/20 px-4 py-2">
                    Your consent
                  </td>
                </tr>
                <tr>
                  <td className="border border-navy/20 px-4 py-2">
                    To improve our website using anonymized analytics
                  </td>
                  <td className="border border-navy/20 px-4 py-2">
                    Implied consent (anonymous, non-identifying data)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 leading-relaxed text-navy/80">
            We do not use your information for advertising, we do not sell it
            to third parties, and we do not add you to a mailing list without
            your explicit consent.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §4 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            4. How Long We Keep Your Data
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We keep your inquiry only as long as we reasonably need it — to
            respond to your request, follow up, and manage any business
            relationship that results from it. When it is no longer needed for
            those purposes, we delete it.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §5 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            5. Who We Share It With
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We do not sell or rent your personal information. We may share it
            only with:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>
              <strong>Our internal team</strong> — to process and respond to
              your inquiry
            </li>
            <li>
              <strong>Email delivery service</strong> — to send you an
              acknowledgment email when you submit a form (e.g. Resend). These
              services act as processors and do not use your data for their own
              purposes.
            </li>
            <li>
              <strong>Website &amp; analytics provider (Vercel)</strong> — hosts
              our website and provides the cookieless, anonymous visitor
              analytics described above.
            </li>
          </ul>
          <hr className="my-8 border-navy/10" />

          {/* §6 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            6. Your Rights
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            Depending on your country, you may have the right to:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>
              <strong>Access</strong> the personal information we hold about
              you
            </li>
            <li>
              <strong>Correct</strong> any information that is inaccurate
            </li>
            <li>
              <strong>Request deletion</strong> of your information
            </li>
            <li>
              <strong>Withdraw consent</strong> at any time
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-navy/80">
            To exercise any of these rights, email us at:{" "}
            <a
              href="mailto:info@true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              info@true-nord.ca
            </a>
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            We will respond within 30 days.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §7 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            7. Cookies
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            Our website does not use cookies. The analytics tool we use (Vercel
            Web Analytics) is cookieless — it does not store cookies on your
            device and does not track you across other websites.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §8 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            8. International Transfers
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            True Nord is based in Canada. When you submit a form, your
            information is delivered to us by email through Resend, and our
            website and analytics run on Vercel. These service providers may
            process or store data on servers located outside Canada, including
            in the United States. We only use providers that apply recognized
            data-protection safeguards.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §9 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            9. Security
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We take reasonable precautions to protect your data, including
            encrypted connections (HTTPS) and access controls on our systems.
            No system is 100% secure, and we encourage you not to share
            sensitive financial or trade information through a website contact
            form.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §10 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            10. Changes to This Policy
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            If we update this policy, we will post the revised version on this
            page with an updated date. We encourage you to review it
            periodically.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §11 */}
          <h2 className="mt-10 mb-3 font-heading text-xl font-semibold text-navy">
            11. Contact
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We have designated a privacy officer who is accountable for True
            Nord&apos;s handling of personal information. For any
            privacy-related questions, or to exercise your rights, you can reach
            us at:
          </p>
          <p className="mb-1 leading-relaxed text-navy/80">
            <strong>True Nord Inc.</strong>
          </p>
          <p className="mb-1 leading-relaxed text-navy/80">
            Attn: Fouad El Dib, Privacy Officer
          </p>
          <p className="mb-1 leading-relaxed text-navy/80">
            Unit C18, 724 Caledonia Rd
            <br />
            North York, ON, Canada M6B 3X7
          </p>
          <p className="mb-1 leading-relaxed text-navy/80">
            Email:{" "}
            <a
              href="mailto:info@true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              info@true-nord.ca
            </a>
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            Website:{" "}
            <a
              href="https://www.true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              www.true-nord.ca
            </a>
          </p>

        </div>
      </section>
    </>
  );
}
