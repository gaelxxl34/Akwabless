import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { text } from "../../libs/data/adminContentData";

const AdminLayout = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fas fa-hands-helping text-[#D4AF37] text-xl"></i>
            </div>
            <span className="font-bold text-xl text-[#D4AF37]">Akwabless</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            <Link to="/admin">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "dashboard"
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                <i
                  className={`fas fa-tachometer-alt mr-3 ${
                    activeTab === "dashboard"
                      ? "text-[#D4AF37]"
                      : "text-gray-500"
                  }`}
                ></i>
                <span>
                  {language === "en" ? text.en.dashboard : text.fr.dashboard}
                </span>
              </button>
            </Link>
            <Link to="/admin/members">
              <button
                onClick={() => setActiveTab("members")}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "members"
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                <i
                  className={`fas fa-users mr-3 ${
                    activeTab === "members" ? "text-[#D4AF37]" : "text-gray-500"
                  }`}
                ></i>
                <span>
                  {language === "en" ? text.en.members : text.fr.members}
                </span>
              </button>
            </Link>
            <Link to="/admin/projects">
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "projects"
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                <i
                  className={`fas fa-project-diagram mr-3 ${
                    activeTab === "projects"
                      ? "text-[#D4AF37]"
                      : "text-gray-500"
                  }`}
                ></i>
                <span>
                  {language === "en" ? text.en.projects : text.fr.projects}
                </span>
              </button>
            </Link>

            <Link to="/admin/donations">
              <button
                onClick={() => setActiveTab("donations")}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "donations"
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                <i
                  className={`fas fa-hand-holding-usd mr-3 ${
                    activeTab === "donations"
                      ? "text-[#D4AF37]"
                      : "text-gray-500"
                  }`}
                ></i>
                <span>
                  {language === "en" ? text.en.donations : text.fr.donations}
                </span>
              </button>
            </Link>
            <Link to="/admin/stories">
              <button
                onClick={() => setActiveTab("stories")}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "stories"
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                <i
                  className={`fas fa-quote-right mr-3 ${
                    activeTab === "stories" ? "text-[#D4AF37]" : "text-gray-500"
                  }`}
                ></i>
                <span>
                  {language === "en" ? text.en.stories : text.fr.stories}
                </span>
              </button>
            </Link>
            <Link to="/admin/brochure-generator">
              <button
                onClick={() => setActiveTab("brochure")}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "brochure"
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                <i
                  className={`fas fa-file-pdf mr-3 ${
                    activeTab === "brochure"
                      ? "text-[#D4AF37]"
                      : "text-gray-500"
                  }`}
                ></i>
                <span>
                  {language === "en" ? text.en.brochure : text.fr.brochure}
                </span>
              </button>
            </Link>
            <Link to="/admin/settings">
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "settings"
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                <i
                  className={`fas fa-cog mr-3 ${
                    activeTab === "settings"
                      ? "text-[#D4AF37]"
                      : "text-gray-500"
                  }`}
                ></i>
                <span>
                  {language === "en" ? text.en.settings : text.fr.settings}
                </span>
              </button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center justify-between md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <span className="font-bold text-xl text-[#D4AF37] mr-5 ml-5">
              Akwabless
            </span>
          </div>

          <div className="flex-1 md:flex md:items-center md:justify-between">
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-800 ">
                {language === "en"
                  ? text.en[activeTab as keyof typeof text.en]
                  : text.fr[activeTab as keyof typeof text.fr]}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-bell"></i>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>

              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
              >
                {language === "en" ? "FR" : "EN"}
              </button>

              <div className="relative group">
                <button className="flex items-center space-x-2 cursor-pointer !rounded-button whitespace-nowrap">
                  <div className="h-9 w-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-white">
                    <span className="font-semibold">A</span>
                  </div>
                  <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-user mr-2"></i>
                    {language === "en" ? text.en.profile : text.fr.profile}
                  </a>
                  <Link
                    to="admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-cog mr-2"></i>
                    {language === "en" ? text.en.settings : text.fr.settings}
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    {language === "en" ? text.en.logout : text.fr.logout}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
