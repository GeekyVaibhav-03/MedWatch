import React from "react";
import {
  Activity,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const MetricsCards = () => {
  const metrics = [
    {
      name: "Active MDR Cases",
      value: "23",
      change: "+2",
      changeType: "increase",
      icon: Activity,
      color: "danger",
    },
    {
      name: "Patients Under Observation",
      value: "147",
      change: "+12",
      changeType: "increase",
      icon: Users,
      color: "warning",
    },
    {
      name: "Critical Alerts (24h)",
      value: "8",
      change: "-3",
      changeType: "decrease",
      icon: AlertTriangle,
      color: "success",
    },
    {
      name: "Containment Rate",
      value: "94.2%",
      change: "+1.2%",
      changeType: "increase",
      icon: TrendingUp,
      color: "success",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-md bg-${metric.color}-100`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {metric.name}
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">
                      {metric.value}
                    </p>
                    <div
                      className={`ml-2 flex items-center text-sm ${
                        metric.changeType === "increase"
                          ? metric.color === "success"
                            ? "text-success-600"
                            : "text-danger-600"
                          : "text-success-600"
                      }`}
                    >
                      {metric.changeType === "increase" ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsCards;
