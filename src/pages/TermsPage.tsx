
import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-xl p-6 md:p-8 shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last Updated: May 15, 2025
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            These Terms of Service ("Terms") constitute a legally binding agreement between you and FreelanceHub ("we", "our", or "us") governing your access to and use of our website, services, and applications (collectively, the "Platform").
          </p>
          <p className="mb-4">
            By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Platform.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">2. Eligibility</h2>
          <p className="mb-4">
            By agreeing to these Terms, you represent and warrant that:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>You are at least 18 years of age;</li>
            <li>You have the legal capacity to enter into binding contracts;</li>
            <li>You are not prohibited from using the Platform under applicable laws;</li>
            <li>You are not a competitor of FreelanceHub or using our Platform for reasons that are in competition with us;</li>
            <li>Your use of the Platform does not violate any applicable law or regulation.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">3. Account Registration and Security</h2>
          <p className="mb-4">
            To access certain features of the Platform, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information and to keep this information up-to-date.
          </p>
          <p className="mb-4">
            You are solely responsible for:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Maintaining the confidentiality of your account credentials;</li>
            <li>All activities that occur under your account;</li>
            <li>Notifying us immediately of any unauthorized use of your account or any other breach of security.</li>
          </ul>
          <p className="mb-4">
            We reserve the right to suspend or terminate your account if any information provided during registration or thereafter is inaccurate, not current, or incomplete.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">4. User Conduct</h2>
          <p className="mb-4">
            You agree not to:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Use the Platform in any way that violates any applicable law or regulation;</li>
            <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity;</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Platform;</li>
            <li>Post or transmit any content that is unlawful, fraudulent, threatening, abusive, defamatory, obscene, or otherwise objectionable;</li>
            <li>Attempt to gain unauthorized access to any part of the Platform;</li>
            <li>Use any robot, spider, or other automatic device to access the Platform for any purpose without our express written permission;</li>
            <li>Introduce any malware, virus, or other harmful code to the Platform.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">5. Project Terms</h2>
          <p className="mb-4">
            For Clients posting projects:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>You are solely responsible for the content of your project postings;</li>
            <li>You agree to provide clear project descriptions, requirements, and expectations;</li>
            <li>You agree to pay the agreed-upon amount for completed work that meets the requirements;</li>
            <li>You understand that FreelanceHub charges service fees on payments made through the platform.</li>
          </ul>
          
          <p className="mb-4">
            For Freelancers accepting projects:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>You agree to deliver work as described in the project agreement and within the agreed timeframe;</li>
            <li>You are responsible for the quality of work you deliver;</li>
            <li>You understand that FreelanceHub charges service fees on payments received through the platform;</li>
            <li>You grant clients a license to use the work product you deliver as part of the project.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">6. Payment Terms</h2>
          <p className="mb-4">
            FreelanceHub may charge fees for the use of certain features of the Platform. You agree to pay all fees and taxes associated with your use of the Platform. All fees are non-refundable unless expressly stated otherwise.
          </p>
          <p className="mb-4">
            For transactions between clients and freelancers:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Clients agree to pay the full amount for completed work that meets requirements;</li>
            <li>FreelanceHub may hold funds in escrow until project completion;</li>
            <li>Service fees will be deducted from payments processed through the platform;</li>
            <li>All payment disputes will be resolved according to our Dispute Resolution Policy.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
          <p className="mb-4">
            The Platform and its contents, features, and functionality are owned by FreelanceHub and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mb-4">
            For work products created by freelancers for clients:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Unless otherwise agreed in writing, freelancers grant clients a non-exclusive, worldwide license to use the work product upon full payment;</li>
            <li>Freelancers retain ownership of pre-existing work and general skills, knowledge, and techniques developed during the project;</li>
            <li>Clients are responsible for ensuring they have proper rights to any materials they provide to freelancers.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, FreelanceHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or in connection with these Terms or your use of the Platform.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">9. Dispute Resolution</h2>
          <p className="mb-4">
            Any dispute arising out of or relating to these Terms or the Platform shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in San Francisco, California, and the language of the arbitration shall be English.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">10. Modifications to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our Platform. Your continued use of the Platform after such modifications constitutes your acceptance of the modified Terms.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">11. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: legal@freelancehub.com<br />
            Address: 123 Main Street, San Francisco, CA 94105<br />
            Phone: +1 (555) 123-4567
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsPage;
