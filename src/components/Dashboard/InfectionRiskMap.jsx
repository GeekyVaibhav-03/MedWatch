import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const InfectionRiskMap = () => {
  const mapRef = useRef(null);

  // Mock hospital floor data
  const zones = [
    {
      id: "icu",
      name: "ICU",
      risk: "high",
      x: 20,
      y: 30,
      width: 120,
      height: 80,
      cases: 8,
    },
    {
      id: "er",
      name: "Emergency",
      risk: "high",
      x: 160,
      y: 30,
      width: 100,
      height: 80,
      cases: 5,
    },
    {
      id: "ward-a",
      name: "Ward A",
      risk: "medium",
      x: 20,
      y: 130,
      width: 80,
      height: 60,
      cases: 3,
    },
    {
      id: "ward-b",
      name: "Ward B",
      risk: "low",
      x: 120,
      y: 130,
      width: 80,
      height: 60,
      cases: 0,
    },
    {
      id: "ward-c",
      name: "Ward C",
      risk: "medium",
      x: 220,
      y: 130,
      width: 80,
      height: 60,
      cases: 2,
    },
    {
      id: "surgery",
      name: "Surgery",
      risk: "low",
      x: 320,
      y: 30,
      width: 100,
      height: 160,
      cases: 1,
    },
    {
      id: "lab",
      name: "Laboratory",
      risk: "medium",
      x: 120,
      y: 210,
      width: 100,
      height: 40,
      cases: 2,
    },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high":
        return "#EF4444"; // Red
      case "medium":
        return "#F59E0B"; // Yellow
      case "low":
        return "#22C55E"; // Green
      default:
        return "#6B7280"; // Gray
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate zones on load
      gsap.set(".zone", { scale: 0, opacity: 0 });
      gsap.to(".zone", {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Pulse animation for high-risk zones
      gsap.to(".high-risk-zone", {
        scale: 1.05,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
      });
    }, mapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Hospital Risk Map</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-danger-500 rounded mr-2"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning-500 rounded mr-2"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-success-500 rounded mr-2"></div>
            <span>Low Risk</span>
          </div>
        </div>
      </div>

      <div
        ref={mapRef}
        className="relative bg-gray-100 rounded-lg p-4"
        style={{ height: "300px" }}
      >
        <svg viewBox="0 0 450 270" className="w-full h-full">
          {zones.map((zone) => (
            <g
              key={zone.id}
              className={`zone ${zone.risk === "high" ? "high-risk-zone" : ""}`}
            >
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                fill={getRiskColor(zone.risk)}
                fillOpacity="0.3"
                stroke={getRiskColor(zone.risk)}
                strokeWidth="2"
                rx="4"
                className="cursor-pointer hover:fill-opacity-50 transition-all duration-200"
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2 - 5}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-900"
              >
                {zone.name}
              </text>
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2 + 8}
                textAnchor="middle"
                className="text-xs fill-gray-700"
              >
                {zone.cases} cases
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default InfectionRiskMap;
