import { useState } from "react";
import { Link } from "react-router-dom";
// import { content } from "../../libs/data/visitorContentData";

const Header = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  //   const t = content[language];
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fas fa-hands-helping text-[#D4AF37] text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-[#D4AF37]">Akwabless</h1>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {language === "en" ? (
            <button
              onClick={() => setLanguage("fr")}
              className="px-2 py-1 rounded-full cursor-pointer whitespace-nowrap bg-[#F5F5DC] text-[#228B22] "
            >
              🇫🇷 FR
            </button>
          ) : (
            <button
              onClick={() => setLanguage("en")}
              className="px-2 py-1 rounded-full cursor-pointer whitespace-nowrap bg-[#F5F5DC] text-[#228B22] "
            >
              🇬🇧 EN
            </button>
          )}

          <button className="md:hidden text-[#228B22]">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
