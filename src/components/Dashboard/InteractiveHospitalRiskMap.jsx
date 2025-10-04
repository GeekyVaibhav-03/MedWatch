import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  MapPin,
  Users,
  AlertTriangle,
  Shield,
  Activity,
  Clock,
  Filter,
  Maximize2,
  TrendingUp,
  TrendingDown,
  Eye,
  Settings
} from "lucide-react";

const InteractiveHospitalRiskMap = () => {
  const mapRef = useRef(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [viewMode, setViewMode] = useState("risk"); // risk, occupancy, alerts
  const [timeRange, setTimeRange] = useState("current"); // current, 6h, 24h, 7d
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Enhanced hospital zones with detailed data
  const [hospitalZones, setHospitalZones] = useState([
    {
      id: "icu",
      name: "Intensive Care Unit",
      shortName: "ICU",
      type: "critical-care",
      coordinates: { x: 50, y: 80, width: 180, height: 120 },
      riskLevel: "high",
      riskScore: 8.5,
      capacity: 20,
      currentOccupancy: 18,
      mdrCases: 5,
      activeCases: 8,
      alerts: 3,
      containmentLevel: "strict",
      lastIncident: "2 hours ago",
      protocols: ["Full PPE Required", "Limited Access", "Daily Screening"],
      staff: { doctors: 6, nurses: 12, support: 4 },
      equipment: ["Ventilators", "ECMO", "Dialysis"],
      trends: {
        riskChange: "+0.5",
        occupancyChange: "+2",
        alertChange: "+1"
      }
    },
    {
      id: "emergency",
      name: "Emergency Department",
      shortName: "Emergency",
      type: "emergency",
      coordinates: { x: 260, y: 80, width: 160, height: 120 },
      riskLevel: "high",
      riskScore: 7.8,
      capacity: 35,
      currentOccupancy: 28,
      mdrCases: 3,
      activeCases: 5,
      alerts: 5,
      containmentLevel: "enhanced",
      lastIncident: "45 minutes ago",
      protocols: ["Rapid Screening", "Isolation Ready", "Enhanced Cleaning"],
      staff: { doctors: 8, nurses: 15, support: 6 },
      equipment: ["Trauma Bays", "X-Ray", "CT Scanner"],
      trends: {
        riskChange: "+0.2",
        occupancyChange: "+5",
        alertChange: "+2"
      }
    },
    {
      id: "surgery-1",
      name: "Surgery Suite A",
      shortName: "Surgery A",
      type: "surgery",
      coordinates: { x: 450, y: 80, width: 140, height: 80 },
      riskLevel: "medium",
      riskScore: 4.2,
      capacity: 8,
      currentOccupancy: 6,
      mdrCases: 1,
      activeCases: 1,
      alerts: 1,
      containmentLevel: "standard",
      lastIncident: "6 hours ago",
      protocols: ["Sterile Environment", "Pre-Op Screening", "Air Filtration"],
      staff: { doctors: 12, nurses: 8, support: 4 },
      equipment: ["OR Tables", "Anesthesia", "Surgical Robots"],
      trends: {
        riskChange: "-0.3",
        occupancyChange: "0",
        alertChange: "-1"
      }
    },
    {
      id: "surgery-2",
      name: "Surgery Suite B",
      shortName: "Surgery B",
      type: "surgery",
      coordinates: { x: 450, y: 180, width: 140, height: 80 },
      riskLevel: "low",
      riskScore: 2.1,
      capacity: 6,
      currentOccupancy: 3,
      mdrCases: 0,
      activeCases: 0,
      alerts: 0,
      containmentLevel: "standard",
      lastIncident: "3 days ago",
      protocols: ["Sterile Environment", "Pre-Op Screening"],
      staff: { doctors: 8, nurses: 6, support: 3 },
      equipment: ["OR Tables", "Anesthesia"],
      trends: {
        riskChange: "-0.1",
        occupancyChange: "-1",
        alertChange: "0"
      }
    },
    {
      id: "ward-a",
      name: "Medical Ward A",
      shortName: "Ward A",
      type: "general-ward",
      coordinates: { x: 50, y: 230, width: 120, height: 100 },
      riskLevel: "medium",
      riskScore: 5.5,
      capacity: 40,
      currentOccupancy: 35,
      mdrCases: 2,
      activeCases: 3,
      alerts: 2,
      containmentLevel: "enhanced",
      lastIncident: "4 hours ago",
      protocols: ["Contact Precautions", "Regular Screening", "Visitor Restrictions"],
      staff: { doctors: 4, nurses: 12, support: 6 },
      equipment: ["Patient Monitors", "IV Pumps", "Beds"],
      trends: {
        riskChange: "+0.1",
        occupancyChange: "+3",
        alertChange: "0"
      }
    },
    {
      id: "ward-b",
      name: "Medical Ward B",
      shortName: "Ward B",
      type: "general-ward",
      coordinates: { x: 190, y: 230, width: 120, height: 100 },
      riskLevel: "low",
      riskScore: 2.8,
      capacity: 40,
      currentOccupancy: 25,
      mdrCases: 0,
      activeCases: 0,
      alerts: 0,
      containmentLevel: "standard",
      lastIncident: "2 days ago",
      protocols: ["Standard Precautions", "Routine Screening"],
      staff: { doctors: 3, nurses: 10, support: 5 },
      equipment: ["Patient Monitors", "IV Pumps", "Beds"],
      trends: {
        riskChange: "-0.2",
        occupancyChange: "-2",
        alertChange: "0"
      }
    },
    {
      id: "ward-c",
      name: "Medical Ward C",
      shortName: "Ward C",
      type: "general-ward",
      coordinates: { x: 330, y: 230, width: 120, height: 100 },
      riskLevel: "medium",
      riskScore: 4.1,
      capacity: 35,
      currentOccupancy: 30,
      mdrCases: 1,
      activeCases: 2,
      alerts: 1,
      containmentLevel: "enhanced",
      lastIncident: "8 hours ago",
      protocols: ["Contact Precautions", "Enhanced Cleaning"],
      staff: { doctors: 3, nurses: 9, support: 4 },
      equipment: ["Patient Monitors", "IV Pumps", "Beds"],
      trends: {
        riskChange: "-0.1",
        occupancyChange: "+1",
        alertChange: "-1"
      }
    },
    {
      id: "laboratory",
      name: "Clinical Laboratory",
      shortName: "Lab",
      type: "diagnostic",
      coordinates: { x: 50, y: 350, width: 160, height: 80 },
      riskLevel: "medium",
      riskScore: 3.9,
      capacity: 15,
      currentOccupancy: 12,
      mdrCases: 0,
      activeCases: 0,
      alerts: 1,
      containmentLevel: "enhanced",
      lastIncident: "12 hours ago",
      protocols: ["Biosafety Protocols", "Sample Handling", "PPE Required"],
      staff: { doctors: 2, nurses: 0, support: 10 },
      equipment: ["Analyzers", "Microscopes", "Centrifuges"],
      trends: {
        riskChange: "0",
        occupancyChange: "+1",
        alertChange: "0"
      }
    },
    {
      id: "radiology",
      name: "Radiology Department",
      shortName: "Radiology",
      type: "diagnostic",
      coordinates: { x: 230, y: 350, width: 140, height: 80 },
      riskLevel: "low",
      riskScore: 1.8,
      capacity: 12,
      currentOccupancy: 8,
      mdrCases: 0,
      activeCases: 0,
      alerts: 0,
      containmentLevel: "standard",
      lastIncident: "5 days ago",
      protocols: ["Standard Precautions", "Equipment Cleaning"],
      staff: { doctors: 4, nurses: 2, support: 6 },
      equipment: ["MRI", "CT Scanner", "X-Ray"],
      trends: {
        riskChange: "0",
        occupancyChange: "0",
        alertChange: "0"
      }
    },
    {
      id: "pharmacy",
      name: "Hospital Pharmacy",
      shortName: "Pharmacy",
      type: "support",
      coordinates: { x: 390, y: 350, width: 120, height: 80 },
      riskLevel: "low",
      riskScore: 1.2,
      capacity: 8,
      currentOccupancy: 6,
      mdrCases: 0,
      activeCases: 0,
      alerts: 0,
      containmentLevel: "standard",
      lastIncident: "No incidents",
      protocols: ["Standard Precautions", "Medication Safety"],
      staff: { doctors: 1, nurses: 0, support: 7 },
      equipment: ["Dispensing Systems", "Storage Units"],
      trends: {
        riskChange: "0",
        occupancyChange: "0",
        alertChange: "0"
      }
    }
  ]);

  // Get zone color based on view mode and data
  const getZoneColor = (zone) => {
    switch (viewMode) {
      case "risk":
        switch (zone.riskLevel) {
          case "high": return "#EF4444";
          case "medium": return "#F59E0B";
          case "low": return "#22C55E";
          default: return "#6B7280";
        }
      case "occupancy":
        const occupancyRate = zone.currentOccupancy / zone.capacity;
        if (occupancyRate > 0.9) return "#EF4444";
        if (occupancyRate > 0.7) return "#F59E0B";
        return "#22C55E";
      case "alerts":
        if (zone.alerts > 2) return "#EF4444";
        if (zone.alerts > 0) return "#F59E0B";
        return "#22C55E";
      default:
        return "#6B7280";
    }
  };

  // Get zone opacity based on activity
  const getZoneOpacity = (zone) => {
    const baseOpacity = 0.6;
    if (selectedZone && selectedZone.id === zone.id) return 0.9;
    if (zone.riskLevel === "high") return baseOpacity + 0.2;
    return baseOpacity;
  };

  // Handle zone click
  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    
    // Animate selection
    gsap.to(`#zone-${zone.id}`, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    
    // Animate transition
    gsap.to(".zone", {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(".zone", {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    });
  };

  // Animation effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.set(".zone", { scale: 0, opacity: 0 });
      gsap.to(".zone", {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2
      });

      // Pulse animation for high-risk zones
      gsap.to(".high-risk-zone", {
        scale: 1.02,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });

      // Control animations
      gsap.from(".map-controls", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, mapRef);

    return () => ctx.revert();
  }, []);

  // Update animations when view mode changes
  useEffect(() => {
    gsap.to(".zone", {
      duration: 0.5,
      ease: "power2.inOut"
    });
  }, [viewMode]);

  return (
    <div ref={mapRef} className="space-y-6">
      {/* Map Controls */}
      <div className="map-controls space-y-4">
        {/* View Mode Controls */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Hospital Risk Map</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="btn btn-secondary"
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                {isFullscreen ? 'Exit' : 'Fullscreen'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* View Mode Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Mode
              </label>
              <div className="flex space-x-2">
                {[
                  { key: 'risk', label: 'Risk Level', icon: AlertTriangle },
                  { key: 'occupancy', label: 'Occupancy', icon: Users },
                  { key: 'alerts', label: 'Alerts', icon: Activity }
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.key}
                      onClick={() => handleViewModeChange(mode.key)}
                      className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors ${
                        viewMode === mode.key
                          ? 'bg-primary-100 text-primary-700 border border-primary-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Range Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Range
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="current">Current Status</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>

            {/* Quick Stats */}
            <div className="text-sm">
              <div className="text-gray-700 font-medium mb-1">Quick Stats</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>High Risk Zones:</span>
                  <span className="text-danger-600 font-medium">
                    {hospitalZones.filter(z => z.riskLevel === 'high').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Active Alerts:</span>
                  <span className="text-warning-600 font-medium">
                    {hospitalZones.reduce((sum, z) => sum + z.alerts, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Occupancy:</span>
                  <span className="text-primary-600 font-medium">
                    {Math.round(hospitalZones.reduce((sum, z) => sum + (z.currentOccupancy / z.capacity), 0) / hospitalZones.length * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            {viewMode === 'risk' && 'Risk Level Legend'}
            {viewMode === 'occupancy' && 'Occupancy Level Legend'}
            {viewMode === 'alerts' && 'Alert Level Legend'}
          </h4>
          <div className="grid grid-cols-3 gap-4 text-xs">
            {viewMode === 'risk' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-danger-500 rounded"></div>
                  <span>High Risk (7.0+)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warning-500 rounded"></div>
                  <span>Medium Risk (3.0-6.9)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success-500 rounded"></div>
                  <span>Low Risk (0-2.9)</span>
                </div>
              </>
            )}
            {viewMode === 'occupancy' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-danger-500 rounded"></div>
                  <span>Over 90% Full</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warning-500 rounded"></div>
                  <span>70-90% Full</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success-500 rounded"></div>
                  <span>Under 70% Full</span>
                </div>
              </>
            )}
            {viewMode === 'alerts' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-danger-500 rounded"></div>
                  <span>3+ Active Alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warning-500 rounded"></div>
                  <span>1-2 Active Alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success-500 rounded"></div>
                  <span>No Active Alerts</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50' : ''
      }`}>
        <div className={`relative ${isFullscreen ? 'h-full' : 'h-96'}`}>
          <svg 
            viewBox="0 0 640 480" 
            className="w-full h-full"
            style={{ backgroundColor: '#F9FAFB' }}
          >
            {/* Hospital Floor Plan Background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Hospital Zones */}
            {hospitalZones.map((zone) => (
              <g
                key={zone.id}
                className={`zone ${zone.riskLevel === 'high' ? 'high-risk-zone' : ''}`}
                id={`zone-${zone.id}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleZoneClick(zone)}
              >
                {/* Zone Rectangle */}
                <rect
                  x={zone.coordinates.x}
                  y={zone.coordinates.y}
                  width={zone.coordinates.width}
                  height={zone.coordinates.height}
                  fill={getZoneColor(zone)}
                  fillOpacity={getZoneOpacity(zone)}
                  stroke={selectedZone?.id === zone.id ? "#1F2937" : getZoneColor(zone)}
                  strokeWidth={selectedZone?.id === zone.id ? 3 : 1}
                  rx="8"
                  className="transition-all duration-300 hover:fill-opacity-80"
                />

                {/* Zone Label */}
                <text
                  x={zone.coordinates.x + zone.coordinates.width / 2}
                  y={zone.coordinates.y + zone.coordinates.height / 2 - 10}
                  textAnchor="middle"
                  className="text-sm font-bold fill-white"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {zone.shortName}
                </text>

                {/* Zone Stats */}
                <text
                  x={zone.coordinates.x + zone.coordinates.width / 2}
                  y={zone.coordinates.y + zone.coordinates.height / 2 + 5}
                  textAnchor="middle"
                  className="text-xs fill-white"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {viewMode === 'risk' && `Risk: ${zone.riskScore}`}
                  {viewMode === 'occupancy' && `${zone.currentOccupancy}/${zone.capacity}`}
                  {viewMode === 'alerts' && `${zone.alerts} alerts`}
                </text>

                {/* Risk Indicator */}
                {zone.riskLevel === 'high' && (
                  <circle
                    cx={zone.coordinates.x + zone.coordinates.width - 15}
                    cy={zone.coordinates.y + 15}
                    r="8"
                    fill="#DC2626"
                    className="animate-pulse"
                  />
                )}

                {/* Alert Badge */}
                {zone.alerts > 0 && (
                  <g>
                    <circle
                      cx={zone.coordinates.x + 15}
                      cy={zone.coordinates.y + 15}
                      r="10"
                      fill="#F59E0B"
                    />
                    <text
                      x={zone.coordinates.x + 15}
                      y={zone.coordinates.y + 19}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      {zone.alerts}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Hospital Layout Elements */}
            {/* Corridors */}
            <rect x="240" y="60" width="20" height="380" fill="#E5E7EB" opacity="0.5" />
            <rect x="30" y="210" width="580" height="20" fill="#E5E7EB" opacity="0.5" />
            
            {/* Entrances */}
            <rect x="0" y="140" width="30" height="40" fill="#3B82F6" opacity="0.7" />
            <text x="15" y="165" textAnchor="middle" className="text-xs fill-white font-bold">
              MAIN
            </text>
            
            {/* Emergency Entrance */}
            <rect x="610" y="140" width="30" height="40" fill="#EF4444" opacity="0.7" />
            <text x="625" y="165" textAnchor="middle" className="text-xs fill-white font-bold">
              ER
            </text>
          </svg>
        </div>
      </div>

      {/* Selected Zone Details */}
      {selectedZone && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: getZoneColor(selectedZone) }}
              >
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedZone.name}
                </h3>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`badge ${
                    selectedZone.riskLevel === 'high' ? 'badge-danger' :
                    selectedZone.riskLevel === 'medium' ? 'badge-warning' : 'badge-success'
                  }`}>
                    {selectedZone.riskLevel} Risk
                  </span>
                  <span className="text-sm text-gray-500">
                    Risk Score: {selectedZone.riskScore}/10
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Status */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Occupancy:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">
                      {selectedZone.currentOccupancy}/{selectedZone.capacity}
                    </span>
                    <span className={`text-xs ${
                      selectedZone.trends.occupancyChange.startsWith('+') ? 'text-warning-600' :
                      selectedZone.trends.occupancyChange.startsWith('-') ? 'text-success-600' : 'text-gray-500'
                    }`}>
                      ({selectedZone.trends.occupancyChange})
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">MDR Cases:</span>
                  <span className={`font-medium ${selectedZone.mdrCases > 0 ? 'text-danger-600' : 'text-success-600'}`}>
                    {selectedZone.mdrCases}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Alerts:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${
                      selectedZone.alerts > 2 ? 'text-danger-600' :
                      selectedZone.alerts > 0 ? 'text-warning-600' : 'text-success-600'
                    }`}>
                      {selectedZone.alerts}
                    </span>
                    <span className={`text-xs ${
                      selectedZone.trends.alertChange.startsWith('+') ? 'text-danger-600' :
                      selectedZone.trends.alertChange.startsWith('-') ? 'text-success-600' : 'text-gray-500'
                    }`}>
                      ({selectedZone.trends.alertChange})
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Containment Level:</span>
                  <span className={`badge text-xs ${
                    selectedZone.containmentLevel === 'strict' ? 'badge-danger' :
                    selectedZone.containmentLevel === 'enhanced' ? 'badge-warning' : 'badge-success'
                  }`}>
                    {selectedZone.containmentLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Incident:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedZone.lastIncident}
                  </span>
                </div>
              </div>
            </div>

            {/* Staff & Resources */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Staff & Resources</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 block mb-1">Staff on Duty:</span>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Doctors:</span>
                      <span className="font-medium">{selectedZone.staff.doctors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nurses:</span>
                      <span className="font-medium">{selectedZone.staff.nurses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support:</span>
                      <span className="font-medium">{selectedZone.staff.support}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 block mb-1">Key Equipment:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedZone.equipment.map((item, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Protocols */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Active Protocols</h4>
              <div className="space-y-2">
                {selectedZone.protocols.map((protocol, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-gray-700">{protocol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overall Hospital Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-6 w-6 text-danger-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {hospitalZones.filter(z => z.riskLevel === 'high').length}
          </div>
          <div className="text-sm text-gray-600">High Risk Zones</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className="h-6 w-6 text-warning-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {hospitalZones.reduce((sum, z) => sum + z.alerts, 0)}
          </div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {hospitalZones.reduce((sum, z) => sum + z.currentOccupancy, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Patients</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-success-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {hospitalZones.reduce((sum, z) => sum + z.mdrCases, 0)}
          </div>
          <div className="text-sm text-gray-600">MDR Cases</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHospitalRiskMap;