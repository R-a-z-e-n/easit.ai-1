import React from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
  onClose: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Service</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Easit.ai ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Easit.ai for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on Easit.ai</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Attempt to gain unauthorized access to any portion or feature of the Service</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Disclaimer</h3>
            <p>
              The materials on Easit.ai are provided on an 'as is' basis. Easit.ai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Limitations</h3>
            <p>
              In no event shall Easit.ai or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Easit.ai, even if Easit.ai or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Accuracy of Materials</h3>
            <p>
              The materials appearing on Easit.ai could include technical, typographical, or photographic errors. Easit.ai does not warrant that any of the materials on its website are accurate, complete, or current. Easit.ai may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Links</h3>
            <p>
              Easit.ai has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Easit.ai of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Modifications</h3>
            <p>
              Easit.ai may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Easit.ai operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact Information</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us at support@easit.ai
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
