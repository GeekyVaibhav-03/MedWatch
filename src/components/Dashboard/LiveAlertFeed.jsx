import React, { useState, useEffect } from "react";
import { AlertTriangle, Clock, CheckCircle, X } from "lucide-react";

const LiveAlertFeed = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "MDR Patient Movement",
      message: "Patient ID: P-2031 moved from ICU to Ward A",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isNew: true,
    },
    {
      id: 2,
      type: "warning",
      title: "Potential Exposure",
      message: "5 patients may have been exposed in Surgery Suite 3",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      isNew: true,
    },
    {
      id: 3,
      type: "info",
      title: "Contact Tracing Complete",
      message: "Completed tracing for Patient ID: P-1987",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isNew: false,
    },
    {
      id: 4,
      type: "critical",
      title: "Lab Results Available",
      message: "Positive MDR result for Patient ID: P-2045",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isNew: false,
    },
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-danger-600" />;
      case "warning":
        return <Clock className="h-5 w-5 text-warning-600" />;
      case "info":
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertBorder = (type) => {
    switch (type) {
      case "critical":
        return "border-l-danger-500";
      case "warning":
        return "border-l-warning-500";
      case "info":
        return "border-l-success-500";
      default:
        return "border-l-gray-500";
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
  };

  useEffect(() => {
    // Simulate new alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: ["critical", "warning", "info"][Math.floor(Math.random() * 3)],
        title: "New Alert",
        message: "This is a simulated alert for demo purposes",
        timestamp: new Date(),
        isNew: true,
      };

      setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 alerts
    }, 30000); // New alert every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Live Alerts</h3>
        <span className="bg-danger-100 text-danger-800 text-xs px-2 py-1 rounded-full">
          {alerts.filter((alert) => alert.isNew).length} new
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 bg-white border-l-4 rounded-r-md shadow-sm hover:shadow-md transition-shadow duration-200 ${getAlertBorder(
              alert.type
            )} ${alert.isNew ? "ring-2 ring-primary-100" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </p>
                    {alert.isNew && (
                      <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {formatTimeAgo(alert.timestamp)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAlertFeed;