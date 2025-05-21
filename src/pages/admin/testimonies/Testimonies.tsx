import React, { useState } from "react";
import * as echarts from "echarts";
import { testimonials } from "../../../libs/data/adminContentData";

const Testimonies = () => {
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "list">("gallery");
  const [selectedType, setSelectedType] = useState("Tous");

  const translations = {
    EN: {
      dashboard: "Dashboard",
      members: "Members",
      projects: "Projects",
      donations: "Donations",
      stories: "Stories",
      brochure: "Brochure",
      settings: "Settings",
      totalTestimonials: "Total Testimonials",
      videoTestimonials: "Video Testimonials",
      writtenTestimonials: "Written Testimonials",
      engagementRate: "Engagement Rate",
      search: "Search testimonials...",
      type: "Type",
      date: "Date",
      project: "Project",
      exportReport: "Export Report",
      addNewTestimonial: "Add New Testimonial",
      beneficiaryName: "Beneficiary Name",
      testimonialType: "Type",
      actions: "Actions",
      all: "All",
      video: "Video",
      written: "Written",
      showing: "Showing",
      of: "of",
      entries: "entries",
      status: "Status",
      published: "Published",
      draft: "Draft",
      gallery: "Gallery",
      list: "List",
      viewDetails: "View Details",
      edit: "Edit",
      delete: "Delete",
    },
    FR: {
      dashboard: "Tableau de bord",
      members: "Membres",
      projects: "Projets",
      donations: "Dons",
      stories: "Témoignages",
      brochure: "Brochure",
      settings: "Paramètres",
      totalTestimonials: "Total des Témoignages",
      videoTestimonials: "Témoignages Vidéo",
      writtenTestimonials: "Témoignages Écrits",
      engagementRate: "Taux d'Engagement",
      search: "Rechercher des témoignages...",
      type: "Type",
      date: "Date",
      project: "Projet",
      exportReport: "Exporter le Rapport",
      addNewTestimonial: "Ajouter un Témoignage",
      beneficiaryName: "Nom du Bénéficiaire",
      testimonialType: "Type",
      actions: "Actions",
      all: "Tous",
      video: "Vidéo",
      written: "Écrit",
      showing: "Affichage de",
      of: "sur",
      entries: "entrées",
      status: "Statut",
      published: "Publié",
      draft: "Brouillon",
      gallery: "Galerie",
      list: "Liste",
      viewDetails: "Voir Détails",
      edit: "Modifier",
      delete: "Supprimer",
    },
  };

  const t = translations[language];

  React.useEffect(() => {
    // Initialize engagement chart
    const engagementChartDom = document.getElementById("engagement-chart");
    if (engagementChartDom) {
      const engagementChart = echarts.init(engagementChartDom);
      const engagementOption = {
        animation: false,
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: language === "EN" ? "Engagement" : "Engagement",
            type: "line",
            data: [65, 78, 72, 85, 82, 90],
            smooth: true,
            lineStyle: {
              color: "#D4AF37",
            },
            itemStyle: {
              color: "#D4AF37",
            },
          },
        ],
      };
      engagementChart.setOption(engagementOption);
      window.addEventListener("resize", () => {
        engagementChart.resize();
      });
    }

    // Initialize testimonial types chart
    const typesChartDom = document.getElementById("testimonial-types-chart");
    if (typesChartDom) {
      const typesChart = echarts.init(typesChartDom);
      const typesOption = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
        },
        series: [
          {
            name: language === "EN" ? "Testimonial Type" : "Type de Témoignage",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
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
                value: 42,
                name: language === "EN" ? "Video" : "Vidéo",
                itemStyle: { color: "#D4AF37" },
              },
              {
                value: 58,
                name: language === "EN" ? "Written" : "Écrit",
                itemStyle: { color: "#4682B4" },
              },
            ],
          },
        ],
      };
      typesChart.setOption(typesOption);
      window.addEventListener("resize", () => {
        typesChart.resize();
      });
    }

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [language]);

  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (selectedType === "Tous") return true;
    if (selectedType === "Vidéo") return testimonial.type === "video";
    if (selectedType === "Écrit") return testimonial.type === "written";
    return true;
  });
  return (
    <main
      className="p-6 xl:max-w-[calc(100vw-256px)]"
      style={{ width: "100vw" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.totalTestimonials}</p>
              <h3 className="text-2xl font-bold text-gray-800">48</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
              <i className="fas fa-comment-dots text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 15.2%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.videoTestimonials}</p>
              <h3 className="text-2xl font-bold text-gray-800">21</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
              <i className="fas fa-video text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 12.8%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.writtenTestimonials}</p>
              <h3 className="text-2xl font-bold text-gray-800">27</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <i className="fas fa-file-alt text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 17.5%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.engagementRate}</p>
              <h3 className="text-2xl font-bold text-gray-800">78%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
              <i className="fas fa-heart text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 5.3%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.engagementRate}
          </h3>
          <div id="engagement-chart" className="h-64"></div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.testimonialType}
          </h3>
          <div id="testimonial-types-chart" className="h-64"></div>
        </div>
      </div>
      {/* Control Panel */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-5 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder={t.search}
                className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option>
                    {t.type}: {t.all}
                  </option>
                  <option>
                    {t.type}: {t.video}
                  </option>
                  <option>
                    {t.type}: {t.written}
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer">
                  <option>{t.date}</option>
                  <option>7 derniers jours</option>
                  <option>30 derniers jours</option>
                  <option>90 derniers jours</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer">
                  <option>{t.project}</option>
                  <option>Centre Communautaire à Kinshasa</option>
                  <option>Programme de Formation Agricole</option>
                  <option>Soutien aux Orphelinats</option>
                  <option>Projet d'Accès à l'Eau</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex space-x-3">
            <button
              className={`px-4 py-2 rounded-md focus:outline-none whitespace-nowrap !rounded-button cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg"
              }`}
              onClick={() => setActiveTab("gallery")}
            >
              <i className="fas fa-th-large mr-2"></i>
              {t.gallery}
            </button>
            <button
              className={`px-4 py-2 rounded-md focus:outline-none whitespace-nowrap !rounded-button cursor-pointer ${
                activeTab === "list"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg"
              }`}
              onClick={() => setActiveTab("list")}
            >
              <i className="fas fa-list mr-2"></i>
              {t.list}
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-center shadow-sm cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-file-export mr-2"></i>
              {t.exportReport}
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 whitespace-nowrap !rounded-button cursor-pointer">
              <i className="fas fa-plus mr-2"></i>
              {t.addNewTestimonial}
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Content */}
      {activeTab === "gallery" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      testimonial.type === "video"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {testimonial.type === "video" ? t.video : t.written}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {testimonial.content}
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  <div className="flex items-center mb-1">
                    <i className="fas fa-folder-open mr-2"></i>
                    <span>{testimonial.project}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      testimonial.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {testimonial.status === "published" ? t.published : t.draft}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-500 hover:text-red-700 cursor-pointer">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.beneficiaryName}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.testimonialType}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.date}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.project}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.status}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {testimonial.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          testimonial.type === "video"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {testimonial.type === "video" ? t.video : t.written}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {testimonial.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {testimonial.project}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          testimonial.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {testimonial.status === "published"
                          ? t.published
                          : t.draft}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-gray-500 hover:text-gray-700 mx-1 cursor-pointer"
                        title={t.viewDetails}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer"
                        title={t.edit}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
                        title={t.delete}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              {t.showing} 1 {t.of} {filteredTestimonials.length} {t.entries}
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="px-3 py-1 border bg-yellow-500 text-white rounded-md cursor-pointer whitespace-nowrap !rounded-button">
                1
              </button>
              <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                2
              </button>
              <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Testimonies;
