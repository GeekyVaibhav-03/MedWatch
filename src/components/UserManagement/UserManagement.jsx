import React, { useState } from "react";
import { Plus, Users, Shield, Lock, Edit, Trash2, User } from "lucide-react";

const UserManagement = () => {
  const [users] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      role: "Infection Control Specialist",
      department: "Infection Control",
      status: "Active",
      lastLogin: "2024-03-20T10:30:00Z",
      permissions: [
        "Dashboard",
        "Patient Tracing",
        "Alerts",
        "Reports",
        "User Management",
      ],
    },
    {
      id: 2,
      name: "Nurse Mary Wilson",
      email: "mary.wilson@hospital.com",
      role: "Ward Nurse",
      department: "Ward A",
      status: "Active",
      lastLogin: "2024-03-20T14:15:00Z",
      permissions: ["Dashboard", "Patient Tracing", "Alerts"],
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      email: "michael.chen@hospital.com",
      role: "Chief Medical Officer",
      department: "Administration",
      status: "Active",
      lastLogin: "2024-03-19T16:45:00Z",
      permissions: ["Dashboard", "Reports", "User Management"],
    },
    {
      id: 4,
      name: "Lab Tech Jennifer Davis",
      email: "jennifer.davis@hospital.com",
      role: "Laboratory Technician",
      department: "Laboratory",
      status: "Inactive",
      lastLogin: "2024-03-18T09:00:00Z",
      permissions: ["Dashboard", "Alerts"],
    },
  ]);

  const getRoleBadge = (role) => {
    switch (role) {
      case "Infection Control Specialist":
        return "badge badge-danger";
      case "Chief Medical Officer":
        return "badge badge-warning";
      case "Ward Nurse":
        return "badge badge-success";
      case "Laboratory Technician":
        return "badge";
      default:
        return "badge";
    }
  };

  const getStatusBadge = (status) => {
    return status === "Active" ? "badge badge-success" : "badge";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            User Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage user accounts and access permissions
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "24", icon: Users },
          { label: "Active Sessions", value: "18", icon: Shield },
          { label: "Admin Users", value: "3", icon: Lock },
          { label: "Pending Approvals", value: "2", icon: Plus },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">System Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getRoleBadge(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-danger-600 hover:text-danger-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Activity Log</h3>
        </div>
        <div className="space-y-3">
          {[
            {
              user: "Dr. Sarah Johnson",
              action: "Updated patient P-2031 isolation status",
              time: "5 minutes ago",
            },
            {
              user: "Nurse Mary Wilson",
              action: "Generated contact tracing report",
              time: "12 minutes ago",
            },
            {
              user: "Dr. Michael Chen",
              action: "Modified user permissions for Lab Team",
              time: "1 hour ago",
            },
            {
              user: "System",
              action: "Automated MDR screening reminder sent",
              time: "2 hours ago",
            },
          ].map((log, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{log.user}</p>
                <p className="text-sm text-gray-600">{log.action}</p>
              </div>
              <p className="text-xs text-gray-500">{log.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;