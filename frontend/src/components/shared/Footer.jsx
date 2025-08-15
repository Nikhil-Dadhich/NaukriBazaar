import React from 'react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#6A38C2]">NaukriBazaar</h2>
            <p className="text-sm text-gray-500 mt-2">
              Empowering talent. Connecting opportunities.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Quick Links</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><a href="/" className="hover:text-[#6A38C2]">Home</a></li>
              <li><a href="/jobs" className="hover:text-[#6A38C2]">Browse Jobs</a></li>
              <li><a href="/about" className="hover:text-[#6A38C2]">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#6A38C2]">Contact</a></li>
            </ul>
          </div>

          {/* Social Icons with Lucide */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-[#6A38C2]">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-[#6A38C2]">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-500 hover:text-[#6A38C2]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com" aria-label="GitHub" className="text-gray-500 hover:text-[#6A38C2]">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} NaukriBazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
