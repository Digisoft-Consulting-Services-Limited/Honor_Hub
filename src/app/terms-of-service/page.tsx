import Footer from '@/components/global/footer';
import Homepage_Navbar from '@/components/home/homepage_navbar';

const sections = [
  {
    title: '1. About HonorHub',
    body: [
      'HonorHub is a digital memorial platform that allows users to create, view, and share memorial pages for loved ones. Users may post tributes, stories, photos, hymns, programme details, and other remembrance content.',
      'In these Terms, "HonorHub," "we," "us," and "our" refer to HonorHub and its owners or operators.',
    ],
  },
  {
    title: '2. Eligibility',
    body: [
      'You may use HonorHub only if you are legally able to enter into these Terms. If you are under 18 years old, you may use HonorHub only with permission and supervision from a parent or legal guardian.',
    ],
  },
  {
    title: '3. User Accounts and Security',
    body: [
      'You are responsible for keeping your account details secure. You agree to provide accurate information and to update it when necessary.',
      'You are responsible for all activity carried out through your account. If you believe your account has been accessed without permission, contact us immediately.',
    ],
  },
  {
    title: '4. Creating Memorials',
    body: [
      'By creating a memorial page, you confirm that you have a genuine relationship with the person being remembered, that you have the authority or appropriate family permission to create the memorial, and that the information you provide is accurate to the best of your knowledge.',
      'We may remove, restrict, or transfer control of a memorial if there is a family dispute, legal complaint, impersonation issue, abuse, or any other concern we consider serious.',
    ],
  },
  {
    title: '5. User Content',
    body: [
      'You may submit content such as text, tributes, comments, images, hymns, poems, stories, and other material. You remain responsible for the content you submit.',
      'By submitting content to HonorHub, you confirm that you own the content or have permission to use it, and that it does not infringe copyright, privacy, publicity, data protection, or other rights.',
      'You must not submit content that is false, defamatory, abusive, hateful, obscene, threatening, unlawful, or that exposes private information about living persons without consent.',
    ],
  },
  {
    title: '6. Licence to HonorHub',
    body: [
      'You keep ownership of content you submit. However, by submitting content to HonorHub, you grant us a non-exclusive, worldwide, royalty-free licence to host, store, copy, display, publish, resize, format, and distribute that content as necessary to operate and promote the Service.',
      'This licence allows us to show your content on memorial pages, previews, search results, sharing features, and related HonorHub services.',
    ],
  },
  {
    title: '7. Prohibited Content and Conduct',
    body: [
      'You agree not to use HonorHub to post abusive, hateful, discriminatory, sexually explicit, exploitative, violent, false, defamatory, or unlawful content.',
      'You must not upload copyrighted photos, lyrics, poems, or writings without permission, publish private personal information about living persons without consent, create fake or malicious memorials, or use HonorHub for spam, fraud, phishing, malware, or unlawful activity.',
      'You must not attempt to access accounts, systems, APIs, or data without permission, or interfere with the security or availability of the Service.',
    ],
  },
  {
    title: '8. Copyright and Takedown Requests',
    body: [
      'We respect intellectual property rights. If you believe content on HonorHub infringes your copyright or other rights, contact us with your name, contact details, a description of the protected work, the URL or location of the content, and an explanation of why you believe the content is unauthorized.',
      'We may remove or restrict access to disputed content while reviewing a complaint.',
    ],
  },
  {
    title: '9. Privacy and Personal Data',
    body: [
      'We process personal data in accordance with applicable Kenyan data protection law, including the Data Protection Act, 2019.',
      'By using HonorHub, you agree that we may collect and process personal information needed to operate the Service, including account details, memorial content, uploaded media, basic technical and usage data needed to operate, secure, and improve the Service.',
      'You should not submit sensitive personal information about living persons unless you have a lawful basis or consent to do so.',
    ],
  },
  {
    title: '10. Memorial Disputes and Removal Requests',
    body: [
      'Because memorials can involve family members, friends, and sensitive memories, disputes may arise. We may review requests to edit, restrict, transfer, or remove a memorial.',
      'We may ask for proof of identity, relationship, authority, or legal documentation. We are not required to resolve family disputes, but we may take reasonable action where necessary to protect individuals, comply with the law, or preserve respectful use of HonorHub.',
    ],
  },
  {
    title: '11. Availability of the Service',
    body: [
      'We aim to keep HonorHub available, but we do not guarantee uninterrupted or error-free service. We may update, suspend, limit, or discontinue parts of the Service at any time, including for maintenance, security, legal, or operational reasons.',
    ],
  },
  {
    title: '12. Termination',
    body: [
      'We may suspend or terminate your access to HonorHub if you breach these Terms, misuse the Service, create legal or security risk, or if we are required to do so by law.',
      'You may stop using HonorHub at any time. You may also request deletion of your account or memorial content, subject to legal, technical, backup, and dispute-resolution limitations.',
    ],
  },
  {
    title: '13. Disclaimer',
    body: [
      'HonorHub is provided on an "as is" and "as available" basis. We do not guarantee that memorial content is accurate, complete, lawful, or suitable.',
      'To the maximum extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted availability.',
    ],
  },
  {
    title: '15. Limitation of Liability',
    body: [
      'To the maximum extent permitted by Kenyan law, HonorHub will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.',
      'This includes loss of data, emotional distress, reputational harm, service interruption, unauthorized access, or disputes between users.',
    ],
  },
  {
    title: '16. Indemnity',
    body: [
      'You agree to indemnify and hold HonorHub harmless from claims, losses, damages, liabilities, costs, and expenses arising from your use of the Service, content you submit, breach of these Terms, violation of another person\'s rights, or violation of applicable law.',
    ],
  },
  {
    title: '17. Changes to These Terms',
    body: [
      'We may update these Terms from time to time. If we make significant changes, we may notify users through the Service or by other reasonable means. Your continued use of HonorHub after changes are posted means you accept the updated Terms.',
    ],
  },
  {
    title: '18. Governing Law',
    body: [
      'These Terms are governed by the laws of Kenya. Any disputes arising from or relating to these Terms or HonorHub shall be handled under the laws and courts of Kenya, unless another dispute-resolution process is agreed in writing.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-primary-light text-primary-text_black">
      <Homepage_Navbar name="Guest" imageUrl="/img/honorhub_logo.jpg" />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-10 border-b border-primary/15 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            HonorHub
          </p>
          <h1 className="mb-4 text-4xl font-bold text-primary sm:text-5xl">
            Terms of Service
          </h1>
          <p className="max-w-3xl text-base leading-7 text-primary-text_black/80">
            Welcome to HonorHub. These Terms of Service govern your access to
            and use of HonorHub, including our website, memorial pages, tribute
            features, media uploads, and related services. By accessing or using
            HonorHub, you agree to these Terms. If you do not agree, please do
            not use the Service.
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
          <h2 className="mb-4 text-2xl font-semibold text-primary">19. Contact Us</h2>
          <p className="text-sm leading-7 text-primary-text_black/80 sm:text-base">
            If you have questions, complaints, copyright notices, takedown
            requests, or privacy concerns, contact us at{' '}
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
