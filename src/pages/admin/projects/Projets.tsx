import { useState } from "react";
import { projects } from "../../../libs/data/adminContentData";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return (
    <main
      className="p-6 xl:max-w-[calc(100vw-256px)]"
      style={{ width: "100vw" }}
    >
      {/* Project Controls */}
      <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none text-sm cursor-pointer whitespace-nowrap !rounded-button"
              >
                <i className="fas fa-filter mr-2"></i>
                Filter
                <i className="fas fa-chevron-down ml-2 text-xs"></i>
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-medium text-sm">Filter by Status</h3>
                  </div>
                  <div className="p-2">
                    {["All", "Ongoing", "Completed"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md cursor-pointer whitespace-nowrap !rounded-button ${
                          statusFilter === status
                            ? "bg-[#F5F5DC] text-[#D4AF37]"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#C09A30] transition-colors duration-200 flex items-center text-sm cursor-pointer whitespace-nowrap !rounded-button">
              <i className="fas fa-plus mr-2"></i>
              Add New Project
            </button>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          {statusFilter !== "All" && (
            <div className="ml-2 px-2 py-1 bg-gray-100 rounded-full flex items-center">
              {statusFilter}
              <button
                onClick={() => setStatusFilter("All")}
                className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap !rounded-button"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">{project.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "Ongoing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                <span>{project.location}</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      project.status === "Completed"
                        ? "bg-green-500"
                        : "bg-[#D4AF37]"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="text-sm font-medium">{project.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Timeline</p>
                  <p className="text-sm font-medium">{project.timeline}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Team</p>
                  <p className="text-sm font-medium">
                    {project.teamSize} members
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <a
                  href="#"
                  data-readdy="true"
                  className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#C09A30] transition-colors duration-200 text-sm cursor-pointer whitespace-nowrap !rounded-button"
                >
                  <i className="fas fa-eye mr-2"></i>
                  View Details
                </a>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer whitespace-nowrap !rounded-button">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer whitespace-nowrap !rounded-button">
                    <i className="fas fa-users"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 text-5xl mb-4">
            <i className="fas fa-search"></i>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </main>
  );
};

export default Projects;
