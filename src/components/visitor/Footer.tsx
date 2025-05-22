import React, { useState } from "react";
import { content } from "../../libs/data/visitorContentData";

const Footer = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const t = content[language];
  return (
    <footer className="bg-[#228B22] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About & Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.about}</h3>
            <p className="mb-4">{t.footer.aboutText}</p>
            <h4 className="font-bold mt-6 mb-2">{t.footer.contact}</h4>
            <p className="flex items-center mb-2">
              <i className="fas fa-phone mr-2"></i> {t.footer.phone}
            </p>
            <p className="flex items-center">
              <i className="fas fa-envelope mr-2"></i> {t.footer.email}
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.links}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.impact}
                </a>
              </li>
              <li>
                <a
                  href="#join"
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {t.nav.joinUs}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-[#D4AF37] cursor-pointer"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-[#D4AF37] cursor-pointer"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-[#D4AF37] cursor-pointer"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-[#D4AF37] cursor-pointer"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.newsletter}</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder={t.footer.newsletterPlaceholder}
                  className="w-full px-4 py-2 rounded-button text-gray-800 border-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#C09B2D] text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.footer.subscribe}
              </button>
            </form>
            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                  language === "en"
                    ? "bg-white text-[#228B22]"
                    : "bg-[#228B22] border border-white"
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                  language === "fr"
                    ? "bg-white text-[#228B22]"
                    : "bg-[#228B22] border border-white"
                }`}
              >
                🇫🇷 FR
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
