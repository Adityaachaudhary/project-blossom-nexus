
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-xl p-6 md:p-8 shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last Updated: May 15, 2025
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            FreelanceHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p className="mb-4">
            Please read this privacy policy carefully. By accessing and using our platform, you acknowledge that you have read, understood, and agree to be bound by all the terms of this privacy policy.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">2. Information We Collect</h2>
          <h3 className="text-lg font-semibold mt-6 mb-3">Personal Information</h3>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our services, or otherwise contact us. The personal information we collect may include:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Name, email address, and contact details</li>
            <li>Username and password</li>
            <li>Profile information (such as your skills, education, work experience)</li>
            <li>Payment information</li>
            <li>Communication between freelancers and clients</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Automatically Collected Information</h3>
          <p className="mb-4">
            When you access our platform, we may automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Referral source</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">
            We may use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Facilitating and processing transactions</li>
            <li>Managing your account and providing you with customer support</li>
            <li>Responding to your inquiries, comments, or questions</li>
            <li>Sending you administrative information, such as updates to our terms, conditions, and policies</li>
            <li>Personalizing your experience on our platform</li>
            <li>Delivering targeted advertising, newsletters, and other information regarding promotions and our platform</li>
            <li>Analyzing and improving the effectiveness of our website and marketing efforts</li>
            <li>Protecting our platform, addressing fraud, security, or technical issues</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">4. Sharing Your Information</h2>
          <p className="mb-4">
            We may share your information with the following parties:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
            <li><strong>Business Partners:</strong> Companies with whom we partner to offer products or services.</li>
            <li><strong>Other Users:</strong> Certain information about you may be visible to other users of our platform as part of the functionality of our services.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">5. Your Privacy Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have rights concerning your personal information, such as:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Right to access the personal information we hold about you</li>
            <li>Right to request correction of your personal information</li>
            <li>Right to request deletion of your personal information</li>
            <li>Right to object to processing of your personal information</li>
            <li>Right to data portability</li>
            <li>Right to withdraw consent</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">6. Security of Your Information</h2>
          <p className="mb-4">
            We use administrative, technical, and physical security measures designed to safeguard your personal information. However, despite our efforts, no security measures are perfect or impenetrable. We cannot guarantee the security of your information.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-4">
            If you have questions or concerns about this Privacy Policy or our practices, please contact us at:
          </p>
          <p className="mb-4">
            Email: privacy@freelancehub.com<br />
            Address: 123 Main Street, San Francisco, CA 94105<br />
            Phone: +1 (555) 123-4567
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
