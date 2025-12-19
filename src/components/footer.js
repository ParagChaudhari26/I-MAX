import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Navigation links organized in two columns
  const footerLinks = [
    [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about-us" },
      { name: "Consultation", path: "/consultation" },
      { name: "Training Programs", path: "/training-programs" },
      { name: "Ayurveda Treatment", path: "/ayurveda-treatment" },
      { name: "Tourism", path: "/tourism" },
      { name: "Refund Policy", path: "/refund-policy" },
      { name: "Contact Us", path: "/contact-us" }
    ],
    [
      { name: "News / Events", path: "/news-events" },
      { name: "Testimonials", path: "/testimonials" },
      { name: "Video Testimonials", path: "/video-testimonials" },
      { name: "Blogs", path: "/blogs" },
      { name: "Research Collaboration", path: "/research-collaboration" },
      { name: "Photo Gallery", path: "/photo-gallery" },
      { name: "FAQ", path: "/faq" },
      // { name: "Request a Call", path: "/request-call" }
    ]
  ];

  return (
    <div className="font-serif bg-[#f8f5f0] overflow-hidden">
      {/* Disclaimer Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-10 px-4 sm:px-6 bg-gradient-to-r from-[#e8f0e4] to-[#f0e8d8] border-t border-[#d6c7b0]"
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <h3 className="text-lg font-medium text-[#5a4a3a] text-center">Disclaimer</h3>
          <p className="text-sm text-[#5a4a3a] text-justify leading-relaxed tracking-wide">
            The information presented at this page is not intended to replace the services of a health practitioner licensed in the diagnosis or treatment of illness or disease. Any application of the material in this text is at the reader's discretion and sole responsibility. If you have a persistent medical condition or your symptoms are severe please consult a physician. Statements on this web site about health conditions and remedies have not been evaluated by the U.S. Food and Drug Administration and neither is it intended to diagnose, treat, cure or prevent any disease or disorder in any way or form.
          </p>
        </div>
      </motion.div>

      {/* Main Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-gradient-to-r from-[#e8d9c5] to-[#d9c5a8]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-6">
            {/* Branding */}
            <motion.div 
              variants={itemVariants}
              className="space-y-3 max-w-xs w-full"
            >
              <h1 className="text-xl sm:text-2xl font-bold text-[#3a5c40] tracking-tight">Bhagirathi Ayurveda Panchakarma Clinic & Research Centre</h1>
              <p className="text-sm text-[#6b5344] italic leading-relaxed">"Where Ancient Wisdom Meets Modern Healing"</p>
            </motion.div>
            
            {/* Quick Links - Two Columns */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-8 sm:gap-16"
            >
              {footerLinks.map((column, index) => (
                <div key={index} className="space-y-3">
                  <p className="text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider">
                    {index === 0 ? "Quick Links" : "More Links"}
                  </p>
                  <ul className="space-y-2">
                    {column.map((link) => (
                      <li key={link.name}>
                        <Link 
                          to={link.path} 
                          className="text-sm text-[#3a5c40] hover:text-[#2d3250] transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              variants={itemVariants}
              className="space-y-3"
            >
              <p className="text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider">Contact Info</p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-[#5a4a3a] text-lg mt-0.5" />
                  <a 
                    href="https://maps.google.com/?q=Bhagirathi Ayurveda Panchakarma Clinic & Research Centre" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#3a5c40] hover:text-[#2d3250] transition-colors leading-relaxed"
                  >
                    Bhagirathi Ayurveda Panchakarma Clinic & Research Centre
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
            </motion.div>
          </div>
          
          {/* Social Media */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-[#d6c7b0] text-center"
          >
            <p className="text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-4">Follow Us</p>
            <div className="flex justify-center space-x-6">
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://www.youtube.com/@DrManojChaudhariAyurveda"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6b5344] hover:text-[#3b5998] transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://www.youtube.com/@DrManojChaudhariAyurveda"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#6b5344] hover:text-[#E1306C] transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://www.youtube.com/@DrManojChaudhariAyurveda"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#6b5344] hover:text-[#1DA1F2] transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://www.youtube.com/@DrManojChaudhariAyurveda"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#6b5344] hover:text-[#FF0000] transition-colors text-xl"
                aria-label="YouTube"
              >
                <FaYoutube />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Copyright */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-[#d6c7b0] text-center space-y-2"
          >
            <p className="text-xs text-[#6b5344]">
              © {new Date().getFullYear()} Bhagirathi Ayurveda Panchakarma Clinic & Research Centre. All rights reserved.
            </p>
            <p className="text-[10px] text-[#6b5344]">
              Proudly preserving the 5,000 year old Ayurvedic tradition
            </p>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}

export default Footer;