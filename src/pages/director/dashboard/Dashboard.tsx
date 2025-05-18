// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";
import { members, text } from "../../../libs/data/directorContentData";

const DirectorDashboard: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "fr">("fr");
  const [activeTab, setActiveTab] = useState<string>("members");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showRoleFilter, setShowRoleFilter] = useState<boolean>(false);
  const [showStatusFilter, setShowStatusFilter] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDeleteClick = (id: number) => {
    setMemberToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Logique de suppression à implémenter
    setShowDeleteModal(false);
    setMemberToDelete(null);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map((member) => member.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectMember = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  // Filtrer les membres en fonction de la recherche et des filtres
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "" || member.role === roleFilter;
    const matchesStatus = statusFilter === "" || member.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800";
      case "Inactif":
        return "bg-red-100 text-red-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            className="md:hidden text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
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
            <a
              href="https://readdy.ai/home/4ffb360f-2508-4942-b389-1a2d730a2d10/7089fe0f-61de-4f18-b215-132234aef6eb"
              data-readdy="true"
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
            </a>
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
      <div className="flex-1 md:ml-64 min-h-screen">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
          <div className="flex-1 md:flex md:items-center md:justify-between">
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-800 ">
                {language === "en" ? text.en.members : text.fr.members}
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
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

        {/* Members Content */}
        <main className="p-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <button className="bg-[#228B22] hover:bg-[#1F7A1F] text-white px-4 py-2 rounded-lg flex items-center justify-center shadow-sm cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-plus mr-2"></i>
                {language === "en" ? text.en.addMember : text.fr.addMember}
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-center shadow-sm cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-file-export mr-2"></i>
                {language === "en" ? text.en.export : text.fr.export}
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  placeholder={
                    language === "en" ? text.en.search : text.fr.search
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <button
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-between shadow-sm w-full md:w-auto cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowRoleFilter(!showRoleFilter)}
                >
                  <span>
                    {language === "en"
                      ? text.en.filterByRole
                      : text.fr.filterByRole}
                  </span>
                  <i className="fas fa-chevron-down ml-2 text-gray-500 text-xs"></i>
                </button>
                {showRoleFilter && (
                  <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setRoleFilter("");
                        setShowRoleFilter(false);
                      }}
                    >
                      Tous
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setRoleFilter("Administrateur");
                        setShowRoleFilter(false);
                      }}
                    >
                      {language === "en"
                        ? text.en.administrator
                        : text.fr.administrator}
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setRoleFilter("Bénévole");
                        setShowRoleFilter(false);
                      }}
                    >
                      {language === "en"
                        ? text.en.volunteer
                        : text.fr.volunteer}
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setRoleFilter("Coordinateur");
                        setShowRoleFilter(false);
                      }}
                    >
                      {language === "en"
                        ? text.en.coordinator
                        : text.fr.coordinator}
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setRoleFilter("Donateur");
                        setShowRoleFilter(false);
                      }}
                    >
                      {language === "en" ? text.en.donor : text.fr.donor}
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-between shadow-sm w-full md:w-auto cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                >
                  <span>
                    {language === "en"
                      ? text.en.filterByStatus
                      : text.fr.filterByStatus}
                  </span>
                  <i className="fas fa-chevron-down ml-2 text-gray-500 text-xs"></i>
                </button>
                {showStatusFilter && (
                  <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setStatusFilter("");
                        setShowStatusFilter(false);
                      }}
                    >
                      Tous
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setStatusFilter("Actif");
                        setShowStatusFilter(false);
                      }}
                    >
                      {language === "en" ? text.en.active : text.fr.active}
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setStatusFilter("Inactif");
                        setShowStatusFilter(false);
                      }}
                    >
                      {language === "en" ? text.en.inactive : text.fr.inactive}
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => {
                        setStatusFilter("En attente");
                        setShowStatusFilter(false);
                      }}
                    >
                      {language === "en" ? text.en.pending : text.fr.pending}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                        <span className="ml-2">
                          {language === "en"
                            ? text.en.selectAll
                            : text.fr.selectAll}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? text.en.name : text.fr.name}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? text.en.email : text.fr.email}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en" ? text.en.role : text.fr.role}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {language === "en"
                        ? text.en.registrationDate
                        : text.fr.registrationDate}
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
                      {language === "en" ? text.en.actions : text.fr.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-[#D4AF37] rounded border-gray-300 focus:ring-[#D4AF37]"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => handleSelectMember(member.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-semibold">
                            {member.avatar}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.role}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            member.status
                          )}`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="text-[#D4AF37] hover:text-[#C09C30] cursor-pointer !rounded-button whitespace-nowrap">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 cursor-pointer !rounded-button whitespace-nowrap"
                            onClick={() => handleDeleteClick(member.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    {language === "en" ? text.en.showing : text.fr.showing}{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    {language === "en" ? "to" : "à"}{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredMembers.length
                      )}
                    </span>{" "}
                    {language === "en" ? text.en.of : text.fr.of}{" "}
                    <span className="font-medium">
                      {filteredMembers.length}
                    </span>{" "}
                    {language === "en" ? text.en.entries : text.fr.entries}
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
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
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-exclamation-triangle text-red-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {language === "en"
                        ? text.en.confirmDelete
                        : text.fr.confirmDelete}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {language === "en"
                          ? text.en.confirmDeleteMessage
                          : text.fr.confirmDeleteMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={confirmDelete}
                >
                  {language === "en" ? text.en.confirm : text.fr.confirm}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowDeleteModal(false)}
                >
                  {language === "en" ? text.en.cancel : text.fr.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorDashboard;
