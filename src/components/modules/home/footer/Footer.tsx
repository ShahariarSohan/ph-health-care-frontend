import AddressIcon from "@/assets/icon/AddressIcon";
import EmailIcon from "@/assets/icon/EmailIcon";
import FacebookIcon from "@/assets/icon/FacebookIcon";
import InstagramIcon from "@/assets/icon/InstagramIcon";
import LinkedInIcon from "@/assets/icon/LinkedInIcon";
import PhoneIcon from "@/assets/icon/PhoneIcon";
import TwitterIcon from "@/assets/icon/TwitterIcon";

export default function Footer() {
  return (
    <footer className="bg-gray-900 w-full py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="w-70">
            {/* Logo */}
            <div className="h-8 mb-6">
              <div className="flex items-center">
                <span className="text-white text-xl">HealthCare</span>
                <span className="text-teal-400 text-xl">AI</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 text-gray-400 text-sm space-y-1">
              <p>Your trusted partner in finding the right</p>
              <p>healthcare professionals using AI</p>
              <p>technology.</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <FacebookIcon></FacebookIcon>
              <TwitterIcon></TwitterIcon>
              <LinkedInIcon></LinkedInIcon>
              <InstagramIcon></InstagramIcon>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-70">
            <h3 className="text-white text-sm mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Find Doctors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="w-70">
            <h3 className="text-white text-sm mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="w-70">
            <h3 className="text-white text-sm mb-6">Contact Info</h3>
            <div className="space-y-6">
              {/* Address */}
              <AddressIcon></AddressIcon>
              <PhoneIcon></PhoneIcon>
              <EmailIcon></EmailIcon>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2024 Ph Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
