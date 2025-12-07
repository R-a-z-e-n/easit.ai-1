import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Introduction</h3>
            <p>
              Easit.ai ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Information We Collect</h3>
            <p className="font-semibold">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Personal Data:</strong> Name, email address, and other information you voluntarily provide</li>
              <li><strong>Conversation Data:</strong> Messages and voice interactions within the chat service</li>
              <li><strong>Usage Data:</strong> Information about how you use our Service, including timestamps and interaction patterns</li>
              <li><strong>Device Information:</strong> Browser type, IP address, operating system, and other technical details</li>
              <li><strong>Cookies and Tracking:</strong> Information collected through cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Use of Your Information</h3>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process your requests and provide customer support</li>
              <li>Send administrative information and updates</li>
              <li>Respond to your inquiries and offer assistance</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve the Service</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Disclosure of Your Information</h3>
            <p>
              We may share your information in the following situations:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>By Law or to Protect Rights:</strong> When we believe the release of information is necessary to comply with the law</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services on our behalf, including payment processors and cloud service providers</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              <li><strong>With Your Consent:</strong> We may share your information when you give us explicit permission</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Security of Your Information</h3>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information. However, perfect security does not exist on the Internet. We cannot guarantee the absolute security of your information.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Contact us About Google API Services</h3>
            <p>
              This application uses Google's Generative Language API. Your conversations with the AI assistant may be processed by Google's servers. Please review Google's privacy policy at https://policies.google.com/privacy for information about how Google handles your data.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Contact Us</h3>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@easit.ai<br/>
              <strong>Website:</strong> https://easit.ai
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Changes to This Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by updating the "Last Updated" date of this Privacy Policy.
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: December 7, 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
