import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const footerLinks = [
  [
    { label: 'Home', path: "/" },
    { label: 'About Us', path: "/about-us" },
    { label: 'Consultation', path: "/consultation" },
    { label: 'Training Programs', path: "/training-programs" },
    { label: 'Ayurveda Treatment', path: "/ayurveda-treatment" },
    { label: 'Tourism', path: "/tourism" },
    { label: 'Refund Policy', path: "/refund-policy" },
    { label: 'Contact Us', path: "/contact-us" }
  ],
  [
    { label: 'News / Events', path: "/news-events" },
    { label: 'Testimonials', path: "/testimonials" },
    { label: 'Video Testimonials', path: "/video-testimonials" },
    { label: 'Blogs', path: "/blogs" },
    { label: 'Research Collaboration', path: "/research-collaboration" },
    { label: 'Photo Gallery', path: "/photo-gallery" },
    { label: 'FAQ', path: "/faq" },
  ]
];

const socialLinks = [
  { Icon: FaFacebook,  href: "https://www.facebook.com",   label: "Facebook",  hoverColor: "#3b5998" },
  { Icon: FaInstagram, href: "https://www.instagram.com",  label: "Instagram", hoverColor: "#E1306C" },
  { Icon: FaTwitter,   href: "https://www.twitter.com",    label: "Twitter",   hoverColor: "#1DA1F2" },
  { Icon: FaYoutube,   href: "https://www.youtube.com/@DrManojChaudhariAyurveda", label: "YouTube", hoverColor: "#FF0000" },
];

function Footer() {
  return (
    <div className="font-serif bg-[#f8f5f0] overflow-hidden">
      {/* Disclaimer */}
      <div className="py-10 px-4 sm:px-6 bg-gradient-to-r from-[#e8f0e4] to-[#f0e8d8] border-t border-[#d6c7b0]">
        <div className="max-w-6xl mx-auto space-y-6">
          <h3 className="text-lg font-medium text-[#5a4a3a] text-center">Disclaimer</h3>
          <p className="text-sm text-[#5a4a3a] text-justify leading-relaxed tracking-wide">
            The information presented at this page is not intended to replace the services of a health practitioner licensed in the diagnosis or treatment of illness or disease. Any application of the material in this text is at the reader's discretion and sole responsibility. If you have a persistent medical condition or your symptoms are severe please consult a physician. Statements on this web site about health conditions and remedies have not been evaluated by the U.S. Food and Drug Administration and neither is it intended to diagnose, treat, cure or prevent any disease or disorder in any way or form.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-gradient-to-r from-[#e8d9c5] to-[#d9c5a8]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-6">
            {/* Branding */}
            <div className="space-y-3 max-w-xs w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3a5c40] tracking-tight">
                Bhagirathi Ayurveda Panchakarma Clinic &amp; Research Centre
              </h2>
              <p className="text-sm text-[#6b5344] italic leading-relaxed">"Where Ancient Wisdom Meets Modern Healing"</p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
              {footerLinks.map((column, index) => (
                <div key={index} className="space-y-3">
                  <p className="text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider">
                    {index === 0 ? 'Quick Links' : 'More Links'}
                  </p>
                  <ul className="space-y-2">
                    {column.map((link) => (
                      <li key={link.label}>
                        <Link to={link.path} className="text-sm text-[#3a5c40] hover:text-[#2d3250] transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider">Contact Info</p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-[#5a4a3a] text-lg mt-0.5" />
                  <a href="https://maps.google.com/?q=Bhagirathi+Ayurveda+Pune" target="_blank" rel="noopener noreferrer" className="text-sm text-[#3a5c40] hover:text-[#2d3250] transition-colors leading-relaxed">
                    Bhagirathi Ayurveda Panchakarma Clinic &amp; Research Centre
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-[#5a4a3a] text-lg" />
                  <a href="mailto:bhagirathiayurveda@gmail.com" className="text-sm text-[#3a5c40] hover:text-[#2d3250] transition-colors">
                    bhagirathiayurveda@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-[#5a4a3a] text-lg" />
                  <a href="tel:+919021255057" className="text-sm text-[#3a5c40] hover:text-[#2d3250] transition-colors">
                    +91 9021255057
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaClock className="text-[#5a4a3a] text-lg" />
                  <p className="text-xs text-[#6b5344]">Mon-Sat: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-8 border-t border-[#d6c7b0] text-center">
            <p className="text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-4">Follow Us</p>
            <div className="flex justify-center space-x-6">
              {socialLinks.map(({ Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#6b5344] text-xl transition-all duration-200 hover:-translate-y-1"
                  style={{ '--hover-color': hoverColor }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = hoverColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-[#d6c7b0] text-center space-y-2">
            <p className="text-xs text-[#6b5344]">
              © {new Date().getFullYear()} Bhagirathi Ayurveda Panchakarma Clinic &amp; Research Centre. All rights reserved.
            </p>
            <p className="text-[10px] text-[#6b5344]">
              Proudly preserving the 5,000 year old Ayurvedic tradition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;