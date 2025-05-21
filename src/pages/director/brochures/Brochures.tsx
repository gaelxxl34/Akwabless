import React, { useState } from "react";
import * as echarts from "echarts";
import { brochures, testimonials } from "../../../libs/data/adminContentData";

const BrochuresDirector = () => {
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<"grid" | "list">("grid");
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
      totalBrochures: "Total Brochures",
      activeBrochures: "Active Brochures",
      totalDownloads: "Total Downloads",
      engagementRate: "Engagement Rate",
      search: "Search brochures...",
      type: "Type",
      date: "Date",
      category: "Category",
      exportReport: "Export Report",
      addNewBrochure: "Add New Brochure",
      title: "Title",
      actions: "Actions",
      all: "All",
      flyer: "Flyer",
      catalog: "Catalog",
      report: "Report",
      showing: "Showing",
      of: "of",
      entries: "entries",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      grid: "Grid",
      list: "List",
      view: "View",
      download: "Download",
      edit: "Edit",
      delete: "Delete",
      downloadTrends: "Download Trends",
      brochureTypes: "Brochure Types",
    },
    FR: {
      dashboard: "Tableau de bord",
      members: "Membres",
      projects: "Projets",
      donations: "Dons",
      stories: "Témoignages",
      brochure: "Brochure",
      settings: "Paramètres",
      totalBrochures: "Total des Brochures",
      activeBrochures: "Brochures Actives",
      totalDownloads: "Téléchargements Totaux",
      engagementRate: "Taux d'Engagement",
      search: "Rechercher des brochures...",
      type: "Type",
      date: "Date",
      category: "Catégorie",
      exportReport: "Exporter le Rapport",
      addNewBrochure: "Ajouter une Brochure",
      title: "Titre",
      actions: "Actions",
      all: "Tous",
      flyer: "Flyer",
      catalog: "Catalogue",
      report: "Rapport",
      showing: "Affichage de",
      of: "sur",
      entries: "entrées",
      status: "Statut",
      active: "Actif",
      inactive: "Inactif",
      grid: "Grille",
      list: "Liste",
      view: "Voir",
      download: "Télécharger",
      edit: "Modifier",
      delete: "Supprimer",
      downloadTrends: "Tendances des Téléchargements",
      brochureTypes: "Types de Brochures",
    },
  };

  const t = translations[language];

  React.useEffect(() => {
    // Initialize download trends chart
    const downloadChartDom = document.getElementById("download-trends-chart");
    if (downloadChartDom) {
      const downloadChart = echarts.init(downloadChartDom);
      const downloadOption = {
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
            name: language === "EN" ? "Downloads" : "Téléchargements",
            type: "line",
            data: [120, 132, 101, 134, 90, 230],
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
      downloadChart.setOption(downloadOption);
      window.addEventListener("resize", () => {
        downloadChart.resize();
      });
    }

    // Initialize brochure types chart
    const typesChartDom = document.getElementById("brochure-types-chart");
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
            name: language === "EN" ? "Brochure Type" : "Type de Brochure",
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
                value: 48,
                name: language === "EN" ? "Flyers" : "Flyers",
                itemStyle: { color: "#D4AF37" },
              },
              {
                value: 32,
                name: language === "EN" ? "Catalogs" : "Catalogues",
                itemStyle: { color: "#4682B4" },
              },
              {
                value: 20,
                name: language === "EN" ? "Reports" : "Rapports",
                itemStyle: { color: "#20B2AA" },
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

  const filteredBrochures = brochures.filter((brochure) => {
    if (selectedType === "Tous") return true;
    if (selectedType === "Flyer") return brochure.type === "flyer";
    if (selectedType === "Catalogue") return brochure.type === "catalogue";
    if (selectedType === "Rapport") return brochure.type === "rapport";
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
              <p className="text-gray-500 text-sm">{t.totalBrochures}</p>
              <h3 className="text-2xl font-bold text-gray-800">32</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
              <i className="fas fa-file-alt text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 12.5%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.activeBrochures}</p>
              <h3 className="text-2xl font-bold text-gray-800">26</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 8.3%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.totalDownloads}</p>
              <h3 className="text-2xl font-bold text-gray-800">1,258</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <i className="fas fa-download text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 18.7%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t.engagementRate}</p>
              <h3 className="text-2xl font-bold text-gray-800">64%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
              <i className="fas fa-chart-line text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 5.2%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.downloadTrends}
          </h3>
          <div id="download-trends-chart" className="h-64"></div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.brochureTypes}
          </h3>
          <div id="brochure-types-chart" className="h-64"></div>
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
                    {t.type}: {t.flyer}
                  </option>
                  <option>
                    {t.type}: {t.catalog}
                  </option>
                  <option>
                    {t.type}: {t.report}
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
                  <option>{t.category}</option>
                  <option>Rapports Annuels</option>
                  <option>Programmes</option>
                  <option>Catalogues</option>
                  <option>Initiatives</option>
                  <option>Éducation</option>
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
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 whitespace-nowrap !rounded-button cursor-pointer ${
                activeTab === "grid"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("grid")}
            >
              <i className="fas fa-th-large mr-2"></i>
              {t.grid}
            </button>
            <button
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 whitespace-nowrap !rounded-button cursor-pointer ${
                activeTab === "list"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
              onClick={() => setActiveTab("list")}
            >
              <i className="fas fa-list mr-2"></i>
              {t.list}
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none border border-gray-300 whitespace-nowrap !rounded-button cursor-pointer">
              <i className="fas fa-file-export mr-2"></i>
              {t.exportReport}
            </button>
          </div>
          {/* <div>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 whitespace-nowrap !rounded-button cursor-pointer">
              <i className="fas fa-plus mr-2"></i>
              {t.addNewBrochure}
            </button>
          </div> */}
        </div>
      </div>
      {/* Brochures Content */}
      {activeTab === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {filteredBrochures.map((brochure) => (
            <div
              key={brochure.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={brochure.imageUrl}
                  alt={brochure.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {brochure.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      brochure.type === "flyer"
                        ? "bg-green-100 text-green-800"
                        : brochure.type === "catalogue"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {brochure.type === "flyer"
                      ? t.flyer
                      : brochure.type === "catalogue"
                      ? t.catalog
                      : t.report}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {brochure.description}
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  <div className="flex items-center mb-1">
                    <i className="fas fa-folder-open mr-2"></i>
                    <span>{brochure.category}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span>{brochure.date}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-download mr-2"></i>
                    <span>{brochure.downloads} téléchargements</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      brochure.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {brochure.status === "active" ? t.active : t.inactive}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      title={t.view}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      title={t.download}
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    {/* <button
                      className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                      title={t.edit}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      title={t.delete}
                    >
                      <i className="fas fa-trash"></i>
                    </button> */}
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
                    {t.title}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.type}
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
                    {t.category}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t.status}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Downloads
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
                {filteredBrochures.map((brochure) => (
                  <tr key={brochure.id} className="hover:bg-gray-50">
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
                        <div className="h-10 w-8 overflow-hidden mr-3">
                          <img
                            src={brochure.imageUrl}
                            alt={brochure.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {brochure.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          brochure.type === "flyer"
                            ? "bg-green-100 text-green-800"
                            : brochure.type === "catalogue"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {brochure.type === "flyer"
                          ? t.flyer
                          : brochure.type === "catalogue"
                          ? t.catalog
                          : t.report}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {brochure.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {brochure.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          brochure.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {brochure.status === "active" ? t.active : t.inactive}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {brochure.downloads}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-gray-500 hover:text-gray-700 mx-1 cursor-pointer"
                        title={t.view}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer"
                        title={t.download}
                      >
                        <i className="fas fa-download"></i>
                      </button>
                      {/* <button
                        className="text-yellow-500 hover:text-yellow-700 mx-1 cursor-pointer"
                        title={t.edit}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
                        title={t.delete}
                      >
                        <i className="fas fa-trash"></i>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              {t.showing} 1 {t.of} {filteredBrochures.length} {t.entries}
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

export default BrochuresDirector;
