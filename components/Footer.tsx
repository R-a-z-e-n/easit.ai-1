import React, { useState } from 'react';
import { TermsOfService } from './TermsOfService';
import { PrivacyPolicy } from './PrivacyPolicy';

export const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 text-sm py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">About Easit.ai</h4>
              <p className="text-gray-500">
                Easit.ai is an advanced AI assistant powered by Google's Gemini technology, designed to help you with conversations, information, and more.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Get API Key
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs">
              © 2025 Easit.ai. All rights reserved. | Powered by Google Gemini AI
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>

      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </>
  );
};
