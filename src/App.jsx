import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import PatientTracing from "./components/PatientTracing/PatientTracing";
import Alerts from "./components/Alerts/Alerts";
import Reports from "./components/Reports/Reports";
import UserManagement from "./components/UserManagement/UserManagement";
import { gsap } from "gsap";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Dr. Sarah Johnson",
    role: "Infection Control Specialist",
    avatar: "/avatar-placeholder.jpg",
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Initialize GSAP animations
    gsap.set(".animate-on-load", { opacity: 0, y: 20 });
    gsap.to(".animate-on-load", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  return (
    <Router>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header
            user={currentUser}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Page Content */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/patient-tracing" element={<PatientTracing />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/users" element={<UserManagement />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
