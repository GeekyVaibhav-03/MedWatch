import React from "react";
import { Activity, Users, AlertTriangle, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const metrics = [
    { name: "Active MDR Cases", value: "23", icon: Activity, color: "red" },
    {
      name: "Patients Under Watch",
      value: "147",
      icon: Users,
      color: "yellow",
    },
    { name: "Critical Alerts", value: "8", icon: AlertTriangle, color: "red" },
    {
      name: "Containment Rate",
      value: "94.2%",
      icon: TrendingUp,
      color: "green",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      title: "MDR Patient Movement",
      message: "Patient P-2031 moved to Ward A",
      time: "5 min ago",
      severity: "high",
    },
    {
      id: 2,
      title: "Lab Result Ready",
      message: "Positive screening for P-2045",
      time: "15 min ago",
      severity: "medium",
    },
    {
      id: 3,
      title: "Contact Tracing Done",
      message: "8 contacts traced for P-1987",
      time: "30 min ago",
      severity: "low",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Healthcare Dashboard
        </h1>
        <p className="text-gray-600">Monitor infection control in real-time</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="flex items-center">
                <div
                  className={`p-3 rounded-lg ${
                    metric.color === "red"
                      ? "bg-red-100"
                      : metric.color === "yellow"
                      ? "bg-yellow-100"
                      : metric.color === "green"
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      metric.color === "red"
                        ? "text-red-600"
                        : metric.color === "yellow"
                        ? "text-yellow-600"
                        : metric.color === "green"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hospital Map */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Hospital Risk Map</h3>
          <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🏥</div>
              <p>Interactive hospital floor plan</p>
              <p className="text-sm">Risk zones and patient locations</p>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === "high"
                    ? "border-l-red-500 bg-red-50"
                    : alert.severity === "medium"
                    ? "border-l-yellow-500 bg-yellow-50"
                    : "border-l-green-500 bg-green-50"
                }`}
              >
                <h4 className="font-medium text-gray-900">{alert.title}</h4>
                <p className="text-sm text-gray-600">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            New Alert
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Search Patient
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Generate Report
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Contact Tracing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
