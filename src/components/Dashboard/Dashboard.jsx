import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import MetricsCards from "./MetricsCards";
import InteractiveHospitalRiskMap from "./InteractiveHospitalRiskMap";
import LiveAlertFeed from "./LiveAlertFeed";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";

const Dashboard = () => {
  const dashboardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".dashboard-card", { opacity: 0, y: 30 });
      gsap.to(".dashboard-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={dashboardRef} className="space-y-6">
      <div className="dashboard-card">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Infection Control Overview
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span>Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <QuickActions />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <MetricsCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 dashboard-card">
          <InteractiveHospitalRiskMap />
        </div>

        <div className="dashboard-card">
          <LiveAlertFeed />
        </div>
      </div>

      <div className="dashboard-card">
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
