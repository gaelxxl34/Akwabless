import React, { useState } from "react";
import * as echarts from "echarts";
import { text } from "../../../libs/data/memberContentData";

const Dashboard: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  // Initialize the community impact chart
  React.useEffect(() => {
    const chartDom = document.getElementById("impact-chart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Donations", "Projects", "Volunteers"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Donations",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            color: "#D4AF37",
            data: [120, 132, 101, 134, 90, 230],
          },
          {
            name: "Projects",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            color: "#228B22",
            data: [220, 182, 191, 234, 290, 330],
          },
          {
            name: "Volunteers",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            color: "#8B4513",
            data: [150, 232, 201, 154, 190, 330],
          },
        ],
      };
      myChart.setOption(option);

      const handleResize = () => {
        myChart.resize();
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, []);

  // Close sidebar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10 h-[70px] flex items-center justify-between px-6">
        <div className="flex items-center">
          <div className="flex items-center mr-10">
            <div className="mr-2">
              <i className="fas fa-hands-helping text-[#D4AF37] text-2xl"></i>
            </div>
            <span className="font-bold text-2xl text-[#D4AF37]">Akwabless</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#dashboard">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`cursor-pointer whitespace-nowrap ${
                  activeTab === "dashboard"
                    ? "text-[#D4AF37] font-semibold"
                    : "text-gray-600"
                }`}
              >
                {language === "en" ? text.en.dashboard : text.fr.dashboard}
              </button>
            </a>
            <a href="#projects">
              <button
                onClick={() => setActiveTab("projects")}
                className={`cursor-pointer whitespace-nowrap ${
                  activeTab === "projects"
                    ? "text-[#D4AF37] font-semibold"
                    : "text-gray-600"
                }`}
              >
                {language === "en" ? text.en.projects : text.fr.projects}
              </button>
            </a>
            <a href="#testimonies">
              <button
                onClick={() => setActiveTab("testimonies")}
                className={` cursor-pointer whitespace-nowrap ${
                  activeTab === "testimonies"
                    ? "text-[#D4AF37] font-semibold"
                    : "text-gray-600"
                }`}
              >
                {language === "en" ? text.en.testimonies : text.fr.testimonies}
              </button>
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
          >
            {language === "en" ? "FR" : "EN"}
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-2 cursor-pointer !rounded-button whitespace-nowrap">
              <div className="h-9 w-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-white">
                <span className="font-semibold">D</span>
              </div>
              <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
            </button>
            <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {language === "en" ? text.en.profile : text.fr.profile}
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {language === "en" ? text.en.settings : text.fr.settings}
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {language === "en" ? text.en.logout : text.fr.logout}
              </a>
            </div>
          </div>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <i className="fas fa-bars text-gray-600"></i>
          </button>
        </div>
      </nav>

      <div className="pt-[70px]">
        {/* Sidebar for mobile */}
        <div
          ref={sidebarRef}
          className={`md:hidden fixed left-0 top-[70px] bottom-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-20 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="py-4 px-6">
            <div className="space-y-4">
              <a
                href="#dashboard"
                onClick={() => setSidebarOpen(false)}
                className="block py-2 text-gray-600 hover:text-[#D4AF37]"
              >
                {language === "en" ? text.en.dashboard : text.fr.dashboard}
              </a>
              <a
                href="#projects"
                onClick={() => setSidebarOpen(false)}
                className="block py-2 text-gray-600 hover:text-[#D4AF37]"
              >
                {language === "en" ? text.en.projects : text.fr.projects}
              </a>
              <a
                href="#testimonies"
                onClick={() => setSidebarOpen(false)}
                className="block py-2 text-gray-600 hover:text-[#D4AF37]"
              >
                {language === "en" ? text.en.testimonies : text.fr.testimonies}
              </a>
              <a
                href="#"
                onClick={() => setSidebarOpen(false)}
                className="block py-2 text-gray-600 hover:text-[#D4AF37]"
              >
                {language === "en" ? text.en.settings : text.fr.settings}
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8" id="dashboard">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#F5F5DC] to-[#F8F8E8] rounded-xl p-8 mb-8 shadow-sm border border-[#D4AF37]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  {language === "en" ? text.en.greeting : text.fr.greeting}
                </h1>
                <p className="text-gray-600 ">
                  {language === "en" ? text.en.subtitle : text.fr.subtitle}
                </p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-2 bg-[#D4AF37] text-white rounded-md font-medium shadow-sm hover:bg-[#C09C30] transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                {language === "en"
                  ? text.en.downloadBrochure
                  : text.fr.downloadBrochure}
              </button>
            </div>
          </div>

          {/* Community Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#228B22]/10 flex items-center justify-center">
                  <i className="fas fa-users text-[#228B22] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">1,245</h3>
              <p className="text-gray-500 ">
                {language === "en"
                  ? text.en.totalMembers
                  : text.fr.totalMembers}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <i className="fas fa-user-plus text-[#D4AF37] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  +5%
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">87</h3>
              <p className="text-gray-500 ">
                {language === "en" ? text.en.newMembers : text.fr.newMembers}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#8B4513]/10 flex items-center justify-center">
                  <i className="fas fa-hand-holding-usd text-[#8B4513] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  +23%
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">$78,350</h3>
              <p className="text-gray-500 ">
                {language === "en" ? text.en.fundsRaised : text.fr.fundsRaised}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#228B22]/10 flex items-center justify-center">
                  <i className="fas fa-heart text-[#228B22] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  +18%
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">3,782</h3>
              <p className="text-gray-500 ">
                {language === "en"
                  ? text.en.livesTouched
                  : text.fr.livesTouched}
              </p>
            </div>
          </div>

          {/* Community Impact Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {language === "en" ? "Community Impact" : "Impact Communautaire"}
            </h2>
            <div id="impact-chart" className="w-full h-[300px]"></div>
          </div>

          {/* Information Center */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === "en" ? text.en.infoCenter : text.fr.infoCenter}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20warm%20and%20welcoming%20orientation%20event%20for%20new%20members%20of%20an%20African%20spiritual%20community%2C%20showing%20diverse%20people%20greeting%20each%20other%20with%20smiles%2C%20in%20a%20bright%20community%20center%20with%20African%20decorations%20and%20patterns%2C%20professional%20photography%20with%20soft%20lighting&width=600&height=400&seq=1&orientation=landscape"
                  alt="New Member Orientation"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-semibold bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-1 rounded-full">
                    {language === "en" ? "Event" : "Événement"}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    May 20, 2025
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {language === "en"
                    ? "New Member Orientation"
                    : "Orientation des Nouveaux Membres"}
                </h3>
                <p className="text-gray-600  text-sm mb-4">
                  {language === "en"
                    ? "Join us for a warm welcome and introduction to our community values and initiatives."
                    : "Rejoignez-nous pour un accueil chaleureux et une introduction à nos valeurs et initiatives communautaires."}
                </p>
                <button className="text-[#D4AF37] font-medium hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.readMore : text.fr.readMore}{" "}
                  <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20vibrant%20community%20event%20in%20Congo%2C%20Africa%20showing%20local%20people%20gathering%20for%20a%20celebration%20with%20colorful%20traditional%20clothing%2C%20under%20trees%20with%20warm%20sunlight%20filtering%20through%2C%20creating%20a%20joyful%20atmosphere%20with%20children%20playing%20nearby&width=600&height=400&seq=2&orientation=landscape"
                  alt="Upcoming Event in Congo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-semibold bg-[#228B22]/20 text-[#228B22] px-2 py-1 rounded-full">
                    {language === "en" ? "Community" : "Communauté"}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    June 15, 2025
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {language === "en"
                    ? "Upcoming Event in Congo"
                    : "Événement à Venir au Congo"}
                </h3>
                <p className="text-gray-600  text-sm mb-4">
                  {language === "en"
                    ? "We are organizing a special gathering in Goma to support local orphanages and distribute supplies."
                    : "Nous organisons un rassemblement spécial à Goma pour soutenir les orphelinats locaux et distribuer des fournitures."}
                </p>
                <button className="text-[#D4AF37] font-medium hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.readMore : text.fr.readMore}{" "}
                  <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20diverse%20group%20of%20volunteers%20working%20together%20on%20a%20community%20project%20in%20Africa%2C%20showing%20people%20of%20different%20ages%20collaborating%20to%20build%20or%20renovate%20a%20structure%2C%20with%20a%20sense%20of%20teamwork%20and%20purpose%2C%20in%20natural%20lighting%20with%20warm%20earth%20tones&width=600&height=400&seq=3&orientation=landscape"
                  alt="How to Get Involved"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-semibold bg-[#8B4513]/20 text-[#8B4513] px-2 py-1 rounded-full">
                    {language === "en" ? "Volunteer" : "Bénévolat"}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    May 10, 2025
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {language === "en"
                    ? "How to Get Involved"
                    : "Comment s'Impliquer"}
                </h3>
                <p className="text-gray-600  text-sm mb-4">
                  {language === "en"
                    ? "Discover various ways you can contribute to our mission, from volunteering to donations and advocacy."
                    : "Découvrez différentes façons de contribuer à notre mission, du bénévolat aux dons et au plaidoyer."}
                </p>
                <button className="text-[#D4AF37] font-medium hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.readMore : text.fr.readMore}{" "}
                  <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6" id="projects">
            {language === "en"
              ? text.en.featuredProjects
              : text.fr.featuredProjects}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20newly%20constructed%20orphanage%20building%20in%20Goma%2C%20Congo%20with%20children%20playing%20outside%2C%20surrounded%20by%20lush%20African%20vegetation%2C%20warm%20sunlight%20creating%20a%20hopeful%20atmosphere%2C%20the%20building%20has%20a%20welcoming%20entrance%20with%20bright%20colors&width=600&height=400&seq=4&orientation=landscape"
                  alt="Orphanage in Goma"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                  Goma, Congo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {language === "en"
                    ? "Orphanage Support in Goma"
                    : "Soutien à l'Orphelinat de Goma"}
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {language === "en" ? "Progress" : "Progrès"}
                    </span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#228B22] h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-600  text-sm mb-4">
                  {language === "en"
                    ? "Providing shelter, education, and care for 45 orphaned children in Goma. We need your support to complete this project."
                    : "Fournir un abri, une éducation et des soins à 45 enfants orphelins à Goma. Nous avons besoin de votre soutien pour compléter ce projet."}
                </p>
                <button className="w-full py-2 bg-[#D4AF37] text-white rounded-md font-medium shadow-sm hover:bg-[#C09C30] transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.support : text.fr.support}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=African%20students%20in%20a%20classroom%20setting%20receiving%20education%2C%20with%20books%20and%20learning%20materials%20on%20desks%2C%20in%20a%20modest%20but%20well-maintained%20school%20building%20with%20natural%20light%20coming%20through%20windows%2C%20showing%20focused%20and%20engaged%20young%20learners&width=600&height=400&seq=5&orientation=landscape"
                  alt="Scholarship Program"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                  Kinshasa, DRC
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {language === "en"
                    ? "Scholarship Program"
                    : "Programme de Bourses d'Études"}
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {language === "en" ? "Progress" : "Progrès"}
                    </span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#228B22] h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-600  text-sm mb-4">
                  {language === "en"
                    ? "Supporting 20 talented students with full scholarships to pursue higher education and develop skills for their communities."
                    : "Soutenir 20 étudiants talentueux avec des bourses complètes pour poursuivre des études supérieures et développer des compétences pour leurs communautés."}
                </p>
                <button className="w-full py-2 bg-[#D4AF37] text-white rounded-md font-medium shadow-sm hover:bg-[#C09C30] transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.support : text.fr.support}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20medical%20outreach%20program%20in%20rural%20Africa%20with%20healthcare%20workers%20providing%20care%20to%20local%20community%20members%2C%20with%20medical%20supplies%20and%20equipment%20visible%2C%20under%20a%20temporary%20tent%20structure%2C%20showing%20compassionate%20interaction%20between%20medical%20staff%20and%20patients&width=600&height=400&seq=6&orientation=landscape"
                  alt="Medical Outreach"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                  Bukavu, South Kivu
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {language === "en"
                    ? "Medical Outreach Program"
                    : "Programme de Sensibilisation Médicale"}
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      {language === "en" ? "Progress" : "Progrès"}
                    </span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#228B22] h-2 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-600  text-sm mb-4">
                  {language === "en"
                    ? "Bringing essential healthcare services to remote communities in South Kivu. Our goal is to serve 500 patients in the next mission."
                    : "Apporter des services de santé essentiels aux communautés éloignées du Sud-Kivu. Notre objectif est de servir 500 patients lors de la prochaine mission."}
                </p>
                <button className="w-full py-2 bg-[#D4AF37] text-white rounded-md font-medium shadow-sm hover:bg-[#C09C30] transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.support : text.fr.support}
                </button>
              </div>
            </div>
          </div>

          {/* Testimonies Section */}
          <h2
            className="text-2xl font-bold text-gray-800 mb-6"
            id="testimonies"
          >
            {language === "en" ? text.en.testimonies : text.fr.testimonies}
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm mb-10 relative">
            <div className="absolute top-6 left-8 text-6xl text-[#D4AF37]/20">
              <i className="fas fa-quote-left"></i>
            </div>

            <div className="relative z-9">
              <div className="flex flex-col md:flex-row items-center mb-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                    <img
                      src="https://readdy.ai/api/search-image?query=Portrait%20of%20a%20smiling%20African%20woman%20in%20her%2030s%20with%20short%20natural%20hair%2C%20wearing%20colorful%20traditional%20clothing%2C%20against%20a%20neutral%20background%2C%20professional%20headshot%20with%20warm%20lighting%20highlighting%20her%20confident%20and%20compassionate%20expression&width=200&height=200&seq=7&orientation=squarish"
                      alt="Marie Kabongo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-gray-600  italic mb-4">
                    {language === "en"
                      ? '"Akwabless has transformed our community. The scholarship program allowed my daughter to attend university - the first in our family to do so. Their support goes beyond financial aid; they truly care about our wellbeing and future."'
                      : "\"Akwabless a transformé notre communauté. Le programme de bourses a permis à ma fille de fréquenter l'université - la première de notre famille à le faire. Leur soutien va au-delà de l'aide financière; ils se soucient vraiment de notre bien-être et de notre avenir.\""}
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-800">Marie Kabongo</h4>
                    <p className="text-sm text-gray-500">
                      {language === "en"
                        ? "Community Member, Kinshasa"
                        : "Membre de la Communauté, Kinshasa"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button className="h-2 w-2 rounded-full bg-[#D4AF37] mx-1 cursor-pointer"></button>
                <button className="h-2 w-2 rounded-full bg-gray-300 mx-1 cursor-pointer"></button>
                <button className="h-2 w-2 rounded-full bg-gray-300 mx-1 cursor-pointer"></button>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === "en" ? text.en.milestones : text.fr.milestones}
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm mb-10">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="space-y-8">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {language === "en"
                      ? "5 Scholarships Awarded"
                      : "5 Bourses d'Études Attribuées"}
                  </h3>
                  <p className="text-gray-600 ">
                    {language === "en"
                      ? "We've helped five talented students pursue higher education with full scholarships."
                      : "Nous avons aidé cinq étudiants talentueux à poursuivre des études supérieures avec des bourses complètes."}
                  </p>
                  <span className="text-sm text-gray-500 mt-1 block">
                    March 2025
                  </span>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[#228B22] flex items-center justify-center text-white">
                    <i className="fas fa-heartbeat"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {language === "en"
                      ? "1st Medical Outreach"
                      : "1ère Sensibilisation Médicale"}
                  </h3>
                  <p className="text-gray-600 ">
                    {language === "en"
                      ? "Our first medical mission provided care to over 200 patients in remote villages."
                      : "Notre première mission médicale a fourni des soins à plus de 200 patients dans des villages éloignés."}
                  </p>
                  <span className="text-sm text-gray-500 mt-1 block">
                    February 2025
                  </span>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[#8B4513] flex items-center justify-center text-white">
                    <i className="fas fa-home"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {language === "en"
                      ? "Orphanage Renovation Completed"
                      : "Rénovation de l'Orphelinat Terminée"}
                  </h3>
                  <p className="text-gray-600 ">
                    {language === "en"
                      ? "Successfully renovated the main building of the Goma orphanage, providing a safe home for 45 children."
                      : "Rénovation réussie du bâtiment principal de l'orphelinat de Goma, offrant un foyer sûr à 45 enfants."}
                  </p>
                  <span className="text-sm text-gray-500 mt-1 block">
                    January 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
