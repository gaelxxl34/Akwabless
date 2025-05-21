// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import * as echarts from "echarts";
import {
  memberDonation,
  translations,
} from "../../../libs/data/adminContentData";

const DonationDirector = () => {
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtrer les membres en fonction de la recherche et des filtres
  const filteredMembers = memberDonation.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.name.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesRole = roleFilter === "" || member.role === roleFilter;
    // const matchesStatus = statusFilter === "" || member.status === statusFilter;

    // return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const t = translations[language];

  React.useEffect(() => {
    // Initialize donation trends chart
    const trendChartDom = document.getElementById("donation-trends-chart");
    if (trendChartDom) {
      const trendChart = echarts.init(trendChartDom);
      const trendOption = {
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
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: language === "EN" ? "Donations" : "Dons",
            type: "line",
            data: [5000, 7500, 6800, 9200, 8700, 12000],
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
      trendChart.setOption(trendOption);

      window.addEventListener("resize", () => {
        trendChart.resize();
      });
    }

    // Initialize donor distribution chart
    const distributionChartDom = document.getElementById(
      "donor-distribution-chart"
    );
    if (distributionChartDom) {
      const distributionChart = echarts.init(distributionChartDom);
      const distributionOption = {
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
            name: language === "EN" ? "Donation Type" : "Type de Don",
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
                name: language === "EN" ? "Individual" : "Individuel",
                itemStyle: { color: "#D4AF37" },
              },
              {
                value: 32,
                name: language === "EN" ? "Corporate" : "Entreprise",
                itemStyle: { color: "#228B22" },
              },
              {
                value: 20,
                name: language === "EN" ? "Foundation" : "Fondation",
                itemStyle: { color: "#4682B4" },
              },
            ],
          },
        ],
      };
      distributionChart.setOption(distributionOption);

      window.addEventListener("resize", () => {
        distributionChart.resize();
      });
    }

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [language]);

  return (
    <main
      className="p-6 xl:max-w-[calc(100vw-256px)]"
      style={{ width: "100vw" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">{t.totalDonations}</p>
              <h3 className="text-xl font-bold text-gray-800">$128,540</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
              <i className="fas fa-dollar-sign text-xl"></i>
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
              <p className="text-gray-500 text-sm mb-1">{t.donors}</p>
              <h3 className="text-xl font-bold text-gray-800">1,482</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
              <i className="fas fa-users text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 8.2%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">{t.avgDonation}</p>
              <h3 className="text-xl font-bold text-gray-800">$86.73</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <i className="fas fa-chart-line text-xl"></i>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 3.7%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">{t.monthlyGrowth}</p>
              <h3 className="text-xl font-bold text-gray-800">+9.4%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
              <i className="fas fa-chart-bar text-xl"></i>
            </div>
          </div>
          <p className="text-red-500 text-sm mt-2">
            <i className="fas fa-arrow-down mr-1"></i> 1.2%{" "}
            {language === "EN" ? "from last month" : "depuis le mois dernier"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.donationTrends}
          </h3>
          <div id="donation-trends-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.donorDistribution}
          </h3>
          <div id="donor-distribution-chart" className="h-64"></div>
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
                <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer">
                  <option>{t.dateRange}</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>

              <div className="relative">
                <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer">
                  <option>
                    {t.status}: {t.all}
                  </option>
                  <option>
                    {t.status}: {t.pending}
                  </option>
                  <option>
                    {t.status}: {t.completed}
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>

              <div className="relative">
                <select className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent cursor-pointer">
                  <option>{t.amountRange}</option>
                  <option>$0 - $100</option>
                  <option>$100 - $500</option>
                  <option>$500+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div>
            <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-center shadow-sm cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-file-export mr-2"></i>
              {t.exportReport}
            </button>
          </div>

          {/* <div>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 whitespace-nowrap !rounded-button cursor-pointer">
              <i className="fas fa-plus mr-2"></i>
              {t.addNewDonation}
            </button>
          </div> */}
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  {t.donorName}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t.amount}
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
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t.actions}
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberDonation.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {donation.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {donation.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{donation.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {donation.project}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        donation.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {donation.status === "completed"
                        ? language === "EN"
                          ? "Completed"
                          : "Complété"
                        : language === "EN"
                        ? "Pending"
                        : "En attente"}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-gray-700 mx-1 cursor-pointer">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-500 hover:text-red-700 mx-1 cursor-pointer">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            {t.showing} 1 {t.of} 8 {t.entries}
          </div>

          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                } !rounded-button whitespace-nowrap`}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === currentPage
                        ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]"
                        : "text-gray-700 hover:bg-gray-50"
                    } cursor-pointer !rounded-button whitespace-nowrap`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                } !rounded-button whitespace-nowrap`}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DonationDirector;
