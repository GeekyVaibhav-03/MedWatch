import React from "react";
import { Network, Users, Activity, Shield, AlertTriangle } from "lucide-react";

const NetworkGraphDemo = () => {
  const features = [
    {
      icon: Network,
      title: "Interactive Network Visualization",
      description: "View patient contact networks with drag-and-drop nodes, zoom controls, and real-time updates."
    },
    {
      icon: Users,
      title: "Patient & Healthcare Worker Tracking",
      description: "Track contacts between patients, staff, and visitors with detailed interaction history."
    },
    {
      icon: Activity,
      title: "Risk Level Analysis", 
      description: "Color-coded nodes show risk levels: red (high), yellow (medium), green (low), purple (staff)."
    },
    {
      icon: Shield,
      title: "Advanced Filtering",
      description: "Filter by risk level, time range, department, and patient status for focused analysis."
    },
    {
      icon: AlertTriangle,
      title: "Contact Tracing Intelligence",
      description: "Identify infection spread patterns and high-risk contact chains automatically."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-lg border border-primary-200 mb-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
          <Network className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Hospital Risk Management Contact Network
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Interactive visualization system for tracking patient contacts, analyzing infection spread patterns, 
          and managing hospital-wide risk assessment in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-lg border border-primary-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border border-primary-200">
        <h3 className="font-semibold text-gray-900 mb-2">How to Use:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Navigate:</strong> Click and drag to pan, scroll to zoom in/out</li>
          <li>• <strong>Select:</strong> Click on any node to view detailed patient or staff information</li>
          <li>• <strong>Filter:</strong> Use the filter controls above to focus on specific risk levels or departments</li>
          <li>• <strong>Analyze:</strong> Hover over connections to see contact details and risk assessments</li>
          <li>• <strong>Monitor:</strong> Watch real-time updates as new contacts are detected</li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkGraphDemo;