import React, { useState } from "react";
import { Bell, AlertTriangle, Filter, Settings } from "lucide-react";

const Alerts = () => {
  const [filter, setFilter] = useState("all");

  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "High-Risk MDR Patient Movement",
      description:
        "Patient P-2031 with confirmed MRSA has been moved to Ward A. Immediate isolation protocols required.",
      location: "Ward A, Room 205",
      timestamp: "2024-03-20T14:30:00Z",
      status: "active",
      assignedTo: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      type: "warning",
      title: "Potential Cross-Contamination",
      description:
        "Multiple patients in Surgery Suite 3 may have been exposed to contaminated equipment.",
      location: "Surgery Suite 3",
      timestamp: "2024-03-20T11:45:00Z",
      status: "investigating",
      assignedTo: "Infection Control Team",
    },
    {
      id: 3,
      type: "info",
      title: "Scheduled Screening Overdue",
      description:
        "15 patients in Ward C are overdue for their weekly MDR screening.",
      location: "Ward C",
      timestamp: "2024-03-20T09:00:00Z",
      status: "pending",
      assignedTo: "Nurse Mary Wilson",
    },
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case "critical":
        return "border-danger-500 bg-danger-50";
      case "warning":
        return "border-warning-500 bg-warning-50";
      case "info":
        return "border-primary-500 bg-primary-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "badge badge-danger";
      case "investigating":
        return "badge badge-warning";
      case "pending":
        return "badge badge-warning";
      case "resolved":
        return "badge badge-success";
      default:
        return "badge";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Alerts & Notifications
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage infection control alerts
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <Bell className="h-4 w-4 mr-2" />
            Create Alert
          </button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex space-x-2">
              {["all", "critical", "warning", "info"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    filter === filterType
                      ? "bg-primary-100 text-primary-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Alert Settings
            </button>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {alerts
          .filter((alert) => filter === "all" || alert.type === filter)
          .map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 p-6 rounded-r-lg ${getAlertColor(
                alert.type
              )}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <AlertTriangle
                      className={`h-6 w-6 ${
                        alert.type === "critical"
                          ? "text-danger-600"
                          : alert.type === "warning"
                          ? "text-warning-600"
                          : "text-primary-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <span className={getStatusBadge(alert.status)}>
                        {alert.status.charAt(0).toUpperCase() +
                          alert.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      {alert.description}
                    </p>
                    <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                      <div>
                        <strong>Location:</strong> {alert.location}
                      </div>
                      <div>
                        <strong>Assigned to:</strong> {alert.assignedTo}
                      </div>
                      <div>
                        <strong>Time:</strong>{" "}
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-primary text-sm">
                    Investigate
                  </button>
                  <button className="btn btn-secondary text-sm">Resolve</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Alerts;