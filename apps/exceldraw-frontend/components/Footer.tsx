import React from 'react';
import { Zap, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium">Shapify</span>
            </div>
            <p className="text-gray-400 mb-6 font-light">
              The future of data analysis and visualization. Where spreadsheets meet visual design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Templates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Press Kit</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Partners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">System Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 font-light">
              © 2025 ExcelDraw. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400 font-light">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}