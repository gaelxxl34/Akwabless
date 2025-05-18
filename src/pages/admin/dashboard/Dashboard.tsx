// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";
import React, { useState } from "react";
import * as echarts from "echarts";
import { text } from "../../../libs/data/adminContentData";

const AdminDashboard: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Initialize donation chart
  React.useEffect(() => {
    const chartDom = document.getElementById("donations-chart");
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May"],
            axisLabel: {
              color: "#666",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#666",
              formatter: "${value}k",
            },
            splitLine: {
              lineStyle: {
                color: "#eee",
              },
            },
          },
        ],
        series: [
          {
            name: language === "en" ? "Donations" : "Dons",
            type: "bar",
            barWidth: "60%",
            data: [25, 32, 28, 36, 42],
            itemStyle: {
              color: "#D4AF37",
            },
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
  }, [language]);

  // Initialize project status chart
  React.useEffect(() => {
    const chartDom = document.getElementById("project-status-chart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
          data: [
            language === "en" ? "On Track" : "En Bonne Voie",
            language === "en" ? "At Risk" : "À Risque",
            language === "en" ? "Delayed" : "Retardé",
            language === "en" ? "Completed" : "Terminé",
          ],
          textStyle: {
            color: "#666",
          },
        },
        series: [
          {
            name: language === "en" ? "Project Status" : "État des Projets",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 8,
                name: language === "en" ? "On Track" : "En Bonne Voie",
                itemStyle: { color: "#228B22" },
              },
              {
                value: 2,
                name: language === "en" ? "At Risk" : "À Risque",
                itemStyle: { color: "#D4AF37" },
              },
              {
                value: 1,
                name: language === "en" ? "Delayed" : "Retardé",
                itemStyle: { color: "#CD5C5C" },
              },
              {
                value: 4,
                name: language === "en" ? "Completed" : "Terminé",
                itemStyle: { color: "#4682B4" },
              },
            ],
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
  }, [language]);

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
                  activeTab === "dashboard" ? "text-[#D4AF37]" : "text-gray-500"
                }`}
              ></i>
              <span>
                {language === "en" ? text.en.dashboard : text.fr.dashboard}
              </span>
            </button>

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
                  activeTab === "projects" ? "text-[#D4AF37]" : "text-gray-500"
                }`}
              ></i>
              <span>
                {language === "en" ? text.en.projects : text.fr.projects}
              </span>
            </button>

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
                  activeTab === "donations" ? "text-[#D4AF37]" : "text-gray-500"
                }`}
              ></i>
              <span>
                {language === "en" ? text.en.donations : text.fr.donations}
              </span>
            </button>

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
                  activeTab === "brochure" ? "text-[#D4AF37]" : "text-gray-500"
                }`}
              ></i>
              <span>
                {language === "en" ? text.en.brochure : text.fr.brochure}
              </span>
            </button>

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
                  activeTab === "settings" ? "text-[#D4AF37]" : "text-gray-500"
                }`}
              ></i>
              <span>
                {language === "en" ? text.en.settings : text.fr.settings}
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
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
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#F5F5DC] to-[#F8F8E8] rounded-xl p-6 mb-8 shadow-sm border border-[#D4AF37]/20">
            <h1 className="text-2xl font-bold  text-gray-800 mb-2">
              {language === "en" ? text.en.welcome : text.fr.welcome}
            </h1>
            <p className="text-gray-600 font-['Open_Sans']">
              {language === "en" ? text.en.subtitle : text.fr.subtitle}
            </p>
          </div>

          {/* Quick Stats */}
          <h2 className="text-xl font-bold  text-gray-800 mb-4">
            {language === "en" ? text.en.quickStats : text.fr.quickStats}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#228B22]/10 flex items-center justify-center">
                  <i className="fas fa-users text-[#228B22] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +15%
                </span>
              </div>
              <h3 className="text-xl font-bold  text-gray-800 mb-1">1,245</h3>
              <p className="text-gray-500 font-['Open_Sans']">
                {language === "en" ? text.en.totalUsers : text.fr.totalUsers}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <i className="fas fa-project-diagram text-[#D4AF37] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +3
                </span>
              </div>
              <h3 className="text-xl font-bold  text-gray-800 mb-1">12</h3>
              <p className="text-gray-500 font-['Open_Sans']">
                {language === "en"
                  ? text.en.activeProjects
                  : text.fr.activeProjects}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#8B4513]/10 flex items-center justify-center">
                  <i className="fas fa-hand-holding-usd text-[#8B4513] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +28%
                </span>
              </div>
              <h3 className="text-xl font-bold  text-gray-800 mb-1">
                $178,350
              </h3>
              <p className="text-gray-500 font-['Open_Sans']">
                {language === "en"
                  ? text.en.totalDonations
                  : text.fr.totalDonations}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-[#228B22]/10 flex items-center justify-center">
                  <i className="fas fa-heart text-[#228B22] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +32%
                </span>
              </div>
              <h3 className="text-xl font-bold  text-gray-800 mb-1">3,782</h3>
              <p className="text-gray-500 font-['Open_Sans']">
                {language === "en"
                  ? text.en.livesImpacted
                  : text.fr.livesImpacted}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-xl font-bold  text-gray-800 mb-4">
            {language === "en" ? text.en.quickActions : text.fr.quickActions}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer !rounded-button whitespace-nowrap">
              <div className="h-16 w-16 rounded-full bg-[#228B22]/10 flex items-center justify-center mb-4">
                <i className="fas fa-plus text-[#228B22] text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold  text-gray-800 mb-1">
                {language === "en" ? text.en.addProject : text.fr.addProject}
              </h3>
              <p className="text-gray-500 font-['Open_Sans'] text-sm">
                {language === "en"
                  ? "Create a new project"
                  : "Créer un nouveau projet"}
              </p>
            </button>

            <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer !rounded-button whitespace-nowrap">
              <div className="h-16 w-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                <i className="fas fa-quote-right text-[#D4AF37] text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold  text-gray-800 mb-1">
                {language === "en"
                  ? text.en.addTestimony
                  : text.fr.addTestimony}
              </h3>
              <p className="text-gray-500 font-['Open_Sans'] text-sm">
                {language === "en"
                  ? "Add a new testimony"
                  : "Ajouter un nouveau témoignage"}
              </p>
            </button>

            <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer !rounded-button whitespace-nowrap">
              <div className="h-16 w-16 rounded-full bg-[#8B4513]/10 flex items-center justify-center mb-4">
                <i className="fas fa-hand-holding-usd text-[#8B4513] text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold  text-gray-800 mb-1">
                {language === "en" ? text.en.logDonation : text.fr.logDonation}
              </h3>
              <p className="text-gray-500 font-['Open_Sans'] text-sm">
                {language === "en"
                  ? "Record a new donation"
                  : "Enregistrer un nouveau don"}
              </p>
            </button>
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Project Status Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold  text-gray-800">
                  {language === "en"
                    ? text.en.projectStatus
                    : text.fr.projectStatus}
                </h3>
                <button className="text-sm text-[#D4AF37] hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.viewAll : text.fr.viewAll}
                </button>
              </div>
              <div id="project-status-chart" className="w-full h-[300px]"></div>
            </div>

            {/* Monthly Donations Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold  text-gray-800">
                  {language === "en"
                    ? text.en.monthlyDonations
                    : text.fr.monthlyDonations}
                </h3>
                <button className="text-sm text-[#D4AF37] hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                  {language === "en" ? text.en.viewAll : text.fr.viewAll}
                </button>
              </div>
              <div id="donations-chart" className="w-full h-[300px]"></div>
            </div>
          </div>

          {/* Recent Activity */}
          <h2 className="text-xl font-bold  text-gray-800 mb-4 flex justify-between items-center">
            <span>
              {language === "en"
                ? text.en.recentActivity
                : text.fr.recentActivity}
            </span>
            <button className="text-sm text-[#D4AF37] hover:underline cursor-pointer !rounded-button whitespace-nowrap">
              {language === "en" ? text.en.viewAll : text.fr.viewAll}
            </button>
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? "Activity" : "Activité"}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? "User" : "Utilisateur"}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? text.en.date : text.fr.date}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? text.en.status : text.fr.status}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? text.en.action : text.fr.action}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <i className="fas fa-user-plus text-blue-500"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            New member registered
                          </div>
                          <div className="text-sm text-gray-500">
                            Jean Mutombo
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Admin</div>
                      <div className="text-sm text-gray-500">
                        admin@akwabless.org
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">May 15, 2025</div>
                      <div className="text-sm text-gray-500">09:41 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {language === "en" ? "Completed" : "Terminé"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#D4AF37] hover:text-[#C09C30] cursor-pointer !rounded-button whitespace-nowrap">
                        {language === "en" ? text.en.view : text.fr.view}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <i className="fas fa-hand-holding-usd text-green-500"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            New donation received
                          </div>
                          <div className="text-sm text-gray-500">
                            $1,500 - Orphanage in Goma
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">
                        sarah@example.com
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">May 14, 2025</div>
                      <div className="text-sm text-gray-500">03:22 PM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {language === "en" ? "Processed" : "Traité"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#D4AF37] hover:text-[#C09C30] cursor-pointer !rounded-button whitespace-nowrap">
                        {language === "en" ? text.en.view : text.fr.view}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <i className="fas fa-project-diagram text-purple-500"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Project status updated
                          </div>
                          <div className="text-sm text-gray-500">
                            Medical Outreach in Bukavu
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">David Mukendi</div>
                      <div className="text-sm text-gray-500">
                        david@akwabless.org
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">May 13, 2025</div>
                      <div className="text-sm text-gray-500">11:15 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {language === "en" ? "In Progress" : "En Cours"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#D4AF37] hover:text-[#C09C30] cursor-pointer !rounded-button whitespace-nowrap">
                        {language === "en" ? text.en.view : text.fr.view}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <i className="fas fa-exclamation-triangle text-red-500"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Project needs attention
                          </div>
                          <div className="text-sm text-gray-500">
                            Community Center in Kinshasa
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">System</div>
                      <div className="text-sm text-gray-500">
                        alerts@akwabless.org
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">May 12, 2025</div>
                      <div className="text-sm text-gray-500">08:30 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {language === "en" ? "Urgent" : "Urgent"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#D4AF37] hover:text-[#C09C30] cursor-pointer !rounded-button whitespace-nowrap">
                        {language === "en" ? text.en.view : text.fr.view}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Events */}
          <h2 className="text-xl font-bold  text-gray-800 mb-4">
            {language === "en"
              ? text.en.upcomingEvents
              : text.fr.upcomingEvents}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%2520warm%2520and%2520welcoming%2520orientation%2520event%2520for%2520new%2520members%2520of%2520an%2520African%2520spiritual%2520community%252C%2520showing%2520diverse%2520people%2520greeting%2520each%2520other%2520with%2520smiles%252C%2520in%2520a%2520bright%2520community%2520center%2520with%2520African%2520decorations%2520and%2520patterns%252C%2520professional%2520photography%2520with%2520soft%2520lighting&width=600&height=400&seq=1&orientation=landscape"
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
                <h3 className="text-lg font-bold  text-gray-800 mb-2">
                  {language === "en"
                    ? "New Member Orientation"
                    : "Orientation des Nouveaux Membres"}
                </h3>
                <p className="text-gray-600 font-['Open_Sans'] text-sm mb-4">
                  {language === "en"
                    ? "Welcome and introduction to our community values and initiatives."
                    : "Accueil et introduction à nos valeurs et initiatives communautaires."}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-map-marker-alt mr-1 text-red-500"></i>
                    <span>Kinshasa, DRC</span>
                  </div>
                  <button className="text-[#D4AF37] font-medium hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                    {language === "en" ? "Manage" : "Gérer"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%2520vibrant%2520community%2520event%2520in%2520Congo%252C%2520Africa%2520showing%2520local%2520people%2520gathering%2520for%2520a%2520celebration%2520with%2520colorful%2520traditional%2520clothing%252C%2520under%2520trees%2520with%2520warm%2520sunlight%2520filtering%2520through%252C%2520creating%2520a%2520joyful%2520atmosphere%2520with%2520children%2520playing%2520nearby&width=600&height=400&seq=2&orientation=landscape"
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
                <h3 className="text-lg font-bold  text-gray-800 mb-2">
                  {language === "en"
                    ? "Orphanage Support Event"
                    : "Événement de Soutien à l'Orphelinat"}
                </h3>
                <p className="text-gray-600 font-['Open_Sans'] text-sm mb-4">
                  {language === "en"
                    ? "Special gathering to support local orphanages and distribute supplies."
                    : "Rassemblement spécial pour soutenir les orphelinats locaux et distribuer des fournitures."}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-map-marker-alt mr-1 text-red-500"></i>
                    <span>Goma, DRC</span>
                  </div>
                  <button className="text-[#D4AF37] font-medium hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                    {language === "en" ? "Manage" : "Gérer"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[#F5F5DC] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%2520diverse%2520group%2520of%2520volunteers%2520working%2520together%2520on%2520a%2520community%2520project%2520in%2520Africa%252C%2520showing%2520people%2520of%2520different%2520ages%2520collaborating%2520to%2520build%2520or%2520renovate%2520a%2520structure%252C%2520with%2520a%2520sense%2520of%2520teamwork%2520and%2520purpose%252C%2520in%2520natural%2520lighting%2520with%2520warm%2520earth%2520tones&width=600&height=400&seq=3&orientation=landscape"
                  alt="Volunteer Training"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-semibold bg-[#8B4513]/20 text-[#8B4513] px-2 py-1 rounded-full">
                    {language === "en" ? "Training" : "Formation"}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    July 5, 2025
                  </span>
                </div>
                <h3 className="text-lg font-bold  text-gray-800 mb-2">
                  {language === "en"
                    ? "Volunteer Training Workshop"
                    : "Atelier de Formation des Bénévoles"}
                </h3>
                <p className="text-gray-600 font-['Open_Sans'] text-sm mb-4">
                  {language === "en"
                    ? "Training session for new volunteers on community engagement principles."
                    : "Session de formation pour les nouveaux bénévoles sur les principes d'engagement communautaire."}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-map-marker-alt mr-1 text-red-500"></i>
                    <span>Bukavu, DRC</span>
                  </div>
                  <button className="text-[#D4AF37] font-medium hover:underline cursor-pointer !rounded-button whitespace-nowrap">
                    {language === "en" ? "Manage" : "Gérer"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
