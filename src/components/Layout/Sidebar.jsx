import React from "react";
import { NavLink } from "react-router-dom";
import {
  Activity,
  Users,
  AlertTriangle,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

const Sidebar = ({ isOpen, onToggle }) => {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Activity, current: true },
    { name: "Patient Tracing", href: "/patient-tracing", icon: Users },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "User Management", href: "/users", icon: Settings },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white shadow-lg transition-all duration-300 ease-in-out animate-on-load`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                MedWatch
              </span>
            </div>
          )}
          {!isOpen && <Shield className="h-8 w-8 text-primary-600 mx-auto" />}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-100 text-primary-700 border-r-2 border-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <Icon
                  className={`${
                    isOpen ? "mr-3" : "mx-auto"
                  } h-5 w-5 flex-shrink-0`}
                />
                {isOpen && item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              MedWatch v2.0
              <br />
              Infection Control System
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
