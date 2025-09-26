import React, { useState } from "react";
import { Calendar, Download, FileText, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Reports = () => {
  const [dateRange, setDateRange] = useState("7d");

  // Mock data for charts
  const weeklyData = [
    { day: "Mon", cases: 4, alerts: 12 },
    { day: "Tue", cases: 3, alerts: 8 },
    { day: "Wed", cases: 6, alerts: 15 },
    { day: "Thu", cases: 2, alerts: 6 },
    { day: "Fri", cases: 8, alerts: 20 },
    { day: "Sat", cases: 1, alerts: 4 },
    { day: "Sun", cases: 3, alerts: 9 },
  ];

  const containmentData = [
    { week: "Week 1", rate: 89 },
    { week: "Week 2", rate: 92 },
    { week: "Week 3", rate: 85 },
    { week: "Week 4", rate: 94 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Reports & Analytics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Analyze infection control trends and generate compliance reports
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 space-x-2">
          <button className="btn btn-secondary">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </button>
          <button className="btn btn-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Cases This Month", value: "34", change: "+12%" },
          { label: "Average Response Time", value: "8.5 min", change: "-23%" },
          {
            label: "Containment Success Rate",
            value: "94.2%",
            change: "+2.1%",
          },
          { label: "Active Protocols", value: "12", change: "0%" },
        ].map((stat, index) => (
          <div key={index} className="card text-center">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p
              className={`text-xs ${
                stat.change.startsWith("+")
                  ? "text-success-600"
                  : stat.change.startsWith("-")
                  ? "text-danger-600"
                  : "text-gray-500"
              }`}
            >
              {stat.change} from last period
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Cases and Alerts */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Daily Cases & Alerts</h3>
          </div>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="New Cases"
                />
                <Line
                  type="monotone"
                  dataKey="alerts"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="Alerts"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Containment Rate */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weekly Containment Rate</h3>
          </div>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={containmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Report Templates</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Weekly Outbreak Summary",
              description: "Comprehensive weekly infection control report",
              icon: FileText,
            },
            {
              title: "Contact Tracing Analysis",
              description: "Detailed contact tracing efficiency metrics",
              icon: BarChart3,
            },
            {
              title: "Compliance Audit",
              description: "Protocol compliance and adherence report",
              icon: FileText,
            },
          ].map((template, index) => {
            const Icon = template.icon;
            return (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <Icon className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {template.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {template.description}
                    </p>
                    <button className="btn btn-primary text-xs mt-3">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;