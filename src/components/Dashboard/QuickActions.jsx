import React from "react";
import { Plus, Search, FileText, Users } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      name: "New Alert",
      icon: Plus,
      onClick: () => console.log("New Alert"),
      className: "btn-primary",
    },
    {
      name: "Search Patient",
      icon: Search,
      onClick: () => console.log("Search Patient"),
      className: "btn-secondary",
    },
    {
      name: "Generate Report",
      icon: FileText,
      onClick: () => console.log("Generate Report"),
      className: "btn-secondary",
    },
    {
      name: "Contact Tracing",
      icon: Users,
      onClick: () => console.log("Contact Tracing"),
      className: "btn-secondary",
    },
  ];

  return (
    <div className="flex space-x-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.name}
            onClick={action.onClick}
            className={`btn ${action.className} flex items-center space-x-2`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{action.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;