import React, { useState, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { gsap } from "gsap";
import { 
  Users, 
  AlertTriangle, 
  Shield, 
  Activity, 
  Filter,
  Search,
  Calendar,
  MapPin
} from "lucide-react";

const ContactNetworkGraph = () => {
  const graphRef = useRef();
  const containerRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [filters, setFilters] = useState({
    riskLevel: "all",
    timeRange: "24h", 
    department: "all",
    patientStatus: "all"
  });

  // Mock network data - in real app this would come from API
  const [networkData, setNetworkData] = useState({
    nodes: [
      // High-risk patients (MDR positive)
      {
        id: "P-2031",
        name: "Patient Alpha",
        group: "high-risk",
        riskLevel: "high",
        department: "ICU",
        status: "active",
        mdrStatus: "MRSA+",
        location: "ICU Room 12",
        admissionDate: "2024-10-01",
        contactCount: 8,
        size: 12,
        color: "#EF4444"
      },
      {
        id: "P-2045", 
        name: "Patient Beta",
        group: "high-risk",
        riskLevel: "high", 
        department: "Surgery",
        status: "active",
        mdrStatus: "VRE+",
        location: "Surgery Suite 3",
        admissionDate: "2024-10-02",
        contactCount: 5,
        size: 10,
        color: "#EF4444"
      },
      
      // Medium-risk patients (under observation)
      {
        id: "P-1987",
        name: "Patient Gamma", 
        group: "medium-risk",
        riskLevel: "medium",
        department: "Ward A",
        status: "observation",
        mdrStatus: "Pending",
        location: "Ward A Room 205",
        admissionDate: "2024-09-28",
        contactCount: 12,
        size: 8,
        color: "#F59E0B"
      },
      {
        id: "P-2012",
        name: "Patient Delta",
        group: "medium-risk", 
        riskLevel: "medium",
        department: "Emergency",
        status: "observation",
        mdrStatus: "Negative",
        location: "Emergency Room",
        admissionDate: "2024-10-03",
        contactCount: 15,
        size: 8,
        color: "#F59E0B"
      },
      
      // Low-risk patients
      {
        id: "P-1999",
        name: "Patient Epsilon",
        group: "low-risk",
        riskLevel: "low",
        department: "Ward B", 
        status: "routine",
        mdrStatus: "Negative",
        location: "Ward B Room 310",
        admissionDate: "2024-09-30",
        contactCount: 3,
        size: 6,
        color: "#22C55E"
      },
      {
        id: "P-2055",
        name: "Patient Zeta",
        group: "low-risk",
        riskLevel: "low",
        department: "Ward C",
        status: "routine", 
        mdrStatus: "Negative",
        location: "Ward C Room 115",
        admissionDate: "2024-10-04",
        contactCount: 2,
        size: 6,
        color: "#22C55E"
      },
      
      // Healthcare workers
      {
        id: "HW-001",
        name: "Dr. Johnson",
        group: "healthcare-worker",
        riskLevel: "medium",
        department: "ICU", 
        status: "active",
        role: "Physician",
        location: "ICU",
        contactCount: 25,
        size: 8,
        color: "#8B5CF6"
      },
      {
        id: "HW-002", 
        name: "Nurse Wilson",
        group: "healthcare-worker",
        riskLevel: "medium",
        department: "Ward A",
        status: "active",
        role: "Nurse",
        location: "Ward A", 
        contactCount: 18,
        size: 7,
        color: "#8B5CF6"
      },
      {
        id: "HW-003",
        name: "Tech Davis",
        group: "healthcare-worker", 
        riskLevel: "low",
        department: "Laboratory",
        status: "active",
        role: "Lab Tech",
        location: "Laboratory",
        contactCount: 8,
        size: 6,
        color: "#8B5CF6"
      }
    ],
    links: [
      // High-risk patient connections
      { 
        source: "P-2031", 
        target: "HW-001", 
        strength: 8, 
        duration: "45 min",
        contactType: "Direct Care",
        riskLevel: "high",
        timestamp: "2024-10-04T08:30:00Z"
      },
      { 
        source: "P-2031", 
        target: "P-1987", 
        strength: 3, 
        duration: "15 min",
        contactType: "Room Transfer", 
        riskLevel: "high",
        timestamp: "2024-10-04T14:15:00Z"
      },
      { 
        source: "P-2045", 
        target: "HW-001", 
        strength: 5, 
        duration: "30 min",
        contactType: "Consultation",
        riskLevel: "high", 
        timestamp: "2024-10-04T10:00:00Z"
      },
      
      // Medium-risk connections
      { 
        source: "P-1987", 
        target: "HW-002", 
        strength: 6, 
        duration: "60 min",
        contactType: "Nursing Care",
        riskLevel: "medium",
        timestamp: "2024-10-04T09:00:00Z"
      },
      { 
        source: "P-2012", 
        target: "HW-001", 
        strength: 4, 
        duration: "20 min",
        contactType: "Emergency Care",
        riskLevel: "medium",
        timestamp: "2024-10-04T06:30:00Z"
      },
      { 
        source: "P-1987", 
        target: "P-1999", 
        strength: 2, 
        duration: "10 min",
        contactType: "Shared Equipment",
        riskLevel: "medium",
        timestamp: "2024-10-04T11:45:00Z"
      },
      
      // Low-risk connections
      { 
        source: "P-1999", 
        target: "HW-002", 
        strength: 3, 
        duration: "25 min",
        contactType: "Routine Care",
        riskLevel: "low",
        timestamp: "2024-10-04T13:20:00Z"
      },
      { 
        source: "P-2055", 
        target: "HW-003", 
        strength: 2, 
        duration: "10 min", 
        contactType: "Lab Sample",
        riskLevel: "low",
        timestamp: "2024-10-04T07:15:00Z"
      },
      
      // Healthcare worker connections
      { 
        source: "HW-001", 
        target: "HW-002", 
        strength: 4, 
        duration: "30 min",
        contactType: "Consultation",
        riskLevel: "medium",
        timestamp: "2024-10-04T12:00:00Z"
      },
      { 
        source: "HW-002", 
        target: "HW-003", 
        strength: 2, 
        duration: "15 min",
        contactType: "Lab Coordination",
        riskLevel: "low", 
        timestamp: "2024-10-04T16:30:00Z"
      }
    ]
  });

  // Filter the network data based on current filters
  const getFilteredData = () => {
    let filteredNodes = networkData.nodes.filter(node => {
      if (filters.riskLevel !== "all" && node.riskLevel !== filters.riskLevel) return false;
      if (filters.department !== "all" && node.department !== filters.department) return false;
      if (filters.patientStatus !== "all" && node.status !== filters.patientStatus) return false;
      return true;
    });

    let filteredLinks = networkData.links.filter(link => {
      const sourceNode = filteredNodes.find(n => n.id === link.source);
      const targetNode = filteredNodes.find(n => n.id === link.target);
      if (!sourceNode || !targetNode) return false;
      if (filters.riskLevel !== "all" && link.riskLevel !== filters.riskLevel) return false;
      return true;
    });

    return { nodes: filteredNodes, links: filteredLinks };
  };

  const filteredData = getFilteredData();

  // Node painting function
  const paintNode = (node, ctx, globalScale) => {
    const label = node.name || node.id;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size || 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color || '#999';
    ctx.fill();

    // Add border for selected node
    if (selectedNode && selectedNode.id === node.id) {
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw icon based on node type
    ctx.fillStyle = '#fff';
    ctx.font = `${fontSize * 0.8}px Sans-Serif`;
    if (node.group === 'healthcare-worker') {
      ctx.fillText('👨‍⚕️', node.x, node.y);
    } else {
      ctx.fillText('🏥', node.x, node.y);
    }

    // Draw label
    ctx.fillStyle = '#333';
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillText(label, node.x, node.y + (node.size || 5) + fontSize);
  };

  // Link painting function
  const paintLink = (link, ctx) => {
    const start = link.source;
    const end = link.target;
    
    // Draw link line
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    
    // Set line style based on risk level
    if (link.riskLevel === 'high') {
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 3;
    } else if (link.riskLevel === 'medium') {
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = '#22C55E';
      ctx.lineWidth = 1;
    }
    
    ctx.stroke();
  };

  // Handle node click
  const handleNodeClick = (node) => {
    setSelectedNode(node);
    
    // Animate node selection
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(2, 1000);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setSelectedNode(null); // Reset selection when filters change
  };

  // Animation effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".network-controls", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
      
      gsap.from(".network-container", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Network Controls */}
      <div className="network-controls space-y-4">
        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h4 className="text-sm font-medium text-gray-900">Network Filters</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Risk Level Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Risk Level
              </label>
              <select
                value={filters.riskLevel}
                onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>

            {/* Time Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Time Range
              </label>
              <select
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Departments</option>
                <option value="ICU">ICU</option>
                <option value="Emergency">Emergency</option>
                <option value="Surgery">Surgery</option>
                <option value="Ward A">Ward A</option>
                <option value="Ward B">Ward B</option>
                <option value="Ward C">Ward C</option>
                <option value="Laboratory">Laboratory</option>
              </select>
            </div>

            {/* Patient Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Patient Status
              </label>
              <select
                value={filters.patientStatus}
                onChange={(e) => handleFilterChange('patientStatus', e.target.value)}
                className="w-full text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="observation">Under Observation</option>
                <option value="routine">Routine Care</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Network Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-danger-500 rounded-full"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-warning-500 rounded-full"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-success-500 rounded-full"></div>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span>Healthcare Worker</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Graph Container */}
      <div className="network-container bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-96 w-full">
          <ForceGraph2D
            ref={graphRef}
            graphData={filteredData}
            nodeAutoColorBy="group"
            nodeCanvasObject={paintNode}
            linkCanvasObject={paintLink}
            onNodeClick={handleNodeClick}
            nodeLabel={node => `
              <div class="bg-white p-3 rounded-lg shadow-lg border max-w-xs">
                <div class="font-semibold text-gray-900">${node.name}</div>
                <div class="text-sm text-gray-600 mt-1">
                  <div><strong>ID:</strong> ${node.id}</div>
                  <div><strong>Risk Level:</strong> <span class="capitalize">${node.riskLevel}</span></div>
                  <div><strong>Department:</strong> ${node.department}</div>
                  <div><strong>Location:</strong> ${node.location}</div>
                  ${node.mdrStatus ? `<div><strong>MDR Status:</strong> ${node.mdrStatus}</div>` : ''}
                  ${node.role ? `<div><strong>Role:</strong> ${node.role}</div>` : ''}
                  <div><strong>Contact Count:</strong> ${node.contactCount}</div>
                </div>
              </div>
            `}
            linkLabel={link => `
              <div class="bg-white p-3 rounded-lg shadow-lg border max-w-xs">
                <div class="font-semibold text-gray-900">Contact Details</div>
                <div class="text-sm text-gray-600 mt-1">
                  <div><strong>Type:</strong> ${link.contactType}</div>
                  <div><strong>Duration:</strong> ${link.duration}</div>
                  <div><strong>Risk Level:</strong> <span class="capitalize">${link.riskLevel}</span></div>
                  <div><strong>Time:</strong> ${new Date(link.timestamp).toLocaleString()}</div>
                </div>
              </div>
            `}
            width={800}
            height={400}
            backgroundColor="#f9fafb"
            nodeRelSize={1}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.01}
            linkDirectionalParticleColor={() => 'rgba(255,255,255,0.8)'}
            cooldownTicks={100}
            onEngineStop={() => graphRef.current.zoomToFit(400)}
          />
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: selectedNode.color }}
                ></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedNode.name}
                </h3>
                <span className={`badge ${
                  selectedNode.riskLevel === 'high' ? 'badge-danger' :
                  selectedNode.riskLevel === 'medium' ? 'badge-warning' : 'badge-success'
                }`}>
                  {selectedNode.riskLevel} Risk
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-gray-700">Patient ID:</strong>
                  <p className="text-gray-900">{selectedNode.id}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Department:</strong>
                  <p className="text-gray-900">{selectedNode.department}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Current Location:</strong>
                  <p className="text-gray-900">{selectedNode.location}</p>
                </div>
                {selectedNode.mdrStatus && (
                  <div>
                    <strong className="text-gray-700">MDR Status:</strong>
                    <p className="text-gray-900">{selectedNode.mdrStatus}</p>
                  </div>
                )}
                {selectedNode.role && (
                  <div>
                    <strong className="text-gray-700">Role:</strong>
                    <p className="text-gray-900">{selectedNode.role}</p>
                  </div>
                )}
                <div>
                  <strong className="text-gray-700">Total Contacts:</strong>
                  <p className="text-gray-900">{selectedNode.contactCount}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedNode(null)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{filteredData.nodes.length}</div>
          <div className="text-sm text-gray-600">Total Nodes</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className="h-5 w-5 text-warning-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{filteredData.links.length}</div>
          <div className="text-sm text-gray-600">Active Contacts</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-5 w-5 text-danger-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {filteredData.nodes.filter(n => n.riskLevel === 'high').length}
          </div>
          <div className="text-sm text-gray-600">High Risk</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-5 w-5 text-success-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(filteredData.links.filter(l => l.riskLevel === 'low').length / filteredData.links.length * 100)}%
          </div>
          <div className="text-sm text-gray-600">Safe Contacts</div>
        </div>
      </div>
    </div>
  );
};

export default ContactNetworkGraph;