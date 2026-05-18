import Footer from '@/components/global/footer';
import Homepage_Navbar from '@/components/home/homepage_navbar';

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'We collect information you provide when using HonorHub, such as names, email addresses, memorial details, tributes, stories, photos, hymns, programme details, and other content you choose to submit.',
      'We may also process basic technical and usage data needed to operate, secure, and improve the Service, such as request logs, pages visited, timestamps, browser information, and IP address where this is automatically processed by our hosting or backend providers.',
    ],
  },
  {
    title: '2. How We Use Information',
    body: [
      'We use information to provide and manage memorial pages, display user-submitted content, respond to support requests, secure the Service, troubleshoot issues, and comply with legal obligations.',
      'We do not sell your personal information.',
    ],
  },
  {
    title: '3. Public Memorial Content',
    body: [
      'Memorial pages and tributes may be visible to other users or the public depending on how the page is made available. Please avoid submitting private information about living persons unless you have permission or another lawful basis to do so.',
    ],
  },
  {
    title: '4. Sharing Information',
    body: [
      'We may share information with service providers who help us host, maintain, secure, or operate HonorHub. We may also disclose information if required by law, court order, lawful request, or where necessary to protect users, the public, our rights, or the security of the Service.',
    ],
  },
  {
    title: '5. Data Protection and Security',
    body: [
      'We process personal data in accordance with applicable Kenyan data protection law, including the Data Protection Act, 2019. We use reasonable technical and organisational measures to protect personal data, but no online service can be guaranteed to be completely secure.',
    ],
  },
  {
    title: '6. Your Rights and Requests',
    body: [
      'You may contact us to request access, correction, restriction, or deletion of personal information connected to you, subject to legal, technical, backup, and dispute-resolution limitations.',
    ],
  },
  {
    title: '7. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. If we make significant changes, we may notify users through the Service or by other reasonable means.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-primary-light text-primary-text_black">
      <Homepage_Navbar name="Guest" imageUrl="/img/honorhub_logo.jpg" />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-10 border-b border-primary/15 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            HonorHub
          </p>
          <h1 className="mb-4 text-4xl font-bold text-primary sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="max-w-3xl text-base leading-7 text-primary-text_black/80">
            This Privacy Policy explains how we at HonorHub collect, use, share,
            and protect personal information when you use our website, memorial
            pages, tribute features, media uploads, and related services.
          </p>
          <p className="mt-4 text-sm font-medium text-primary">
            Last updated: May 18, 2026
          </p>
        </section>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-primary">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-primary-text_black/80 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-lg bg-primary-light_yellow p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-primary">9. Contact Us</h2>
          <p className="text-sm leading-7 text-primary-text_black/80 sm:text-base">
            If you have questions, privacy requests, complaints, or concerns,
            contact us at{' '}
            <a href="mailto:info@digisoftke.com" className="font-semibold text-primary hover:underline">
              info@digisoftke.com
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
