import React from "react";
import { MapPin, Activity, User, Clock } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "patient_movement",
      icon: MapPin,
      title: "Patient Movement",
      description: "P-2031 transferred from ICU to Ward A",
      user: "Dr. Sarah Johnson",
      timestamp: "5 minutes ago",
      color: "warning",
    },
    {
      id: 2,
      type: "lab_result",
      icon: Activity,
      title: "Lab Result Received",
      description: "MDR screening positive for P-2045",
      user: "Lab System",
      timestamp: "12 minutes ago",
      color: "danger",
    },
    {
      id: 3,
      type: "contact_trace",
      icon: User,
      title: "Contact Tracing Completed",
      description: "Traced 8 contacts for P-1987",
      user: "Nurse Mary Wilson",
      timestamp: "28 minutes ago",
      color: "success",
    },
    {
      id: 4,
      type: "alert_created",
      icon: Activity,
      title: "Alert Created",
      description: "High-risk exposure alert for Surgery Suite 3",
      user: "System",
      timestamp: "45 minutes ago",
      color: "warning",
    },
    {
      id: 5,
      type: "protocol_updated",
      icon: Activity,
      title: "Protocol Updated",
      description: "Isolation procedures updated for Ward C",
      user: "Dr. Michael Chen",
      timestamp: "1 hour ago",
      color: "primary",
    },
  ];

  const getIconColor = (color) => {
    switch (color) {
      case "danger":
        return "text-danger-600 bg-danger-100";
      case "warning":
        return "text-warning-600 bg-warning-100";
      case "success":
        return "text-success-600 bg-success-100";
      case "primary":
        return "text-primary-600 bg-primary-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
          View all
        </button>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => {
            const Icon = activity.icon;
            return (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getIconColor(
                          activity.color
                        )}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          by {activity.user}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;