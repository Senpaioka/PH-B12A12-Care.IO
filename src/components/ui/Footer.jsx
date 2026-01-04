import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 rounded-3xl overflow-hidden">
      <div className="footer p-10 sm:footer-horizontal">
        <aside className="space-y-3">
          <h3 className="text-2xl font-bold text-white">Care.IO</h3>
          <p className="text-gray-400 max-w-xs">
            Compassionate Care, Right When You Need It.
            <br />
            Connecting families with trusted caregivers since 2024.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>
        </aside>

        <nav>
          <h6 className="footer-title text-white opacity-100">Services</h6>
          <Link href="#" className="link link-hover hover:text-white">Baby Care</Link>
          <Link href="#" className="link link-hover hover:text-white">Elderly Care</Link>
          <Link href="#" className="link link-hover hover:text-white">Special Needs</Link>
          <Link href="#" className="link link-hover hover:text-white">24/7 Support</Link>
        </nav>

        <nav>
          <h6 className="footer-title text-white opacity-100">Company</h6>
          <Link href="#" className="link link-hover hover:text-white">About Us</Link>
          <Link href="/find" className="link link-hover hover:text-white">Find Caregiver</Link>
          <Link href="/caregiver" className="link link-hover hover:text-white">Join as Pro</Link>
          <Link href="#" className="link link-hover hover:text-white">Contact</Link>
        </nav>

        <nav>
          <h6 className="footer-title text-white opacity-100">Legal</h6>
          <Link href="#" className="link link-hover hover:text-white">Terms of Service</Link>
          <Link href="#" className="link link-hover hover:text-white">Privacy Policy</Link>
          <Link href="#" className="link link-hover hover:text-white">Cookie Policy</Link>
        </nav>
      </div>

      <div className="border-t border-gray-800 py-6 px-10">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Care.IO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;