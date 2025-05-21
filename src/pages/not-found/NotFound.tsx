// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { content } from "../../libs/data/visitorContentData";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [openJoin, setopenJoin] = useState<Boolean>(false);
  const t = content[language];

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fas fa-hands-helping text-[#D4AF37] text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-[#D4AF37]">Akwabless</h1>
          </div>
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
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <img
              src="https://readdy.ai/api/search-image?query=illustration%20of%20a%20confused%20character%20looking%20at%20a%20map%20or%20compass%2C%20lost%20in%20a%20stylized%20landscape%20with%20question%20marks%20floating%20around%2C%20warm%20colors%2C%20minimalist%20design%2C%20clean%20background%2C%20professional%20illustration%20style%20for%20404%20error%20page&width=400&height=300&seq=404image&orientation=landscape"
              alt="404 Illustration"
              className="mx-auto h-64 object-contain object-top"
            />
          </div>

          <h1 className="text-6xl font-bold text-[#D4AF37] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#228B22] mb-4">
            {language === "en" ? "Page Not Found" : "Page Non Trouvée"}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === "en"
              ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
              : "La page que vous recherchez a peut-être été supprimée, son nom a changé ou elle est temporairement indisponible."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/">
              <button className="px-6 py-3 bg-[#D4AF37] text-white rounded-md font-medium hover:bg-[#C09B2F] cursor-pointer whitespace-nowrap !rounded-button">
                <i className="fas fa-home mr-2"></i>
                {language === "en" ? "Back to Home" : "Retour à l'Accueil"}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default NotFound;
