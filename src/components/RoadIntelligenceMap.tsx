import React, { useState, useEffect, useMemo } from 'react';
import { 
  RoadDefect, 
  RoadSegment, 
  FleetBus 
} from '../types';
import { 
  CATEGORY_LABELS, 
  SEVERITY_BADGES 
} from '../data/mockData';
import { 
  Flame, 
  Layers, 
  Bus, 
  Radio, 
  Send
} from 'lucide-react';

interface RoadIntelligenceMapProps {
  defects?: RoadDefect[];
  segments?: RoadSegment[];
  fleetBuses?: FleetBus[];
  onSelectDefect?: (defect: RoadDefect) => void;
  selectedDefect?: RoadDefect | null;
  onDispatchWorkOrder?: (defectId: string) => void;
}

export const RoadIntelligenceMap: React.FC<RoadIntelligenceMapProps> = ({
  defects = [],
  segments = [],
  fleetBuses = [],
  onSelectDefect = (_d: RoadDefect) => {},
  selectedDefect = null,
  onDispatchWorkOrder = (_id: string) => {}
}) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showFleet, setShowFleet] = useState(true);
  const [showSegments, setShowSegments] = useState(true);
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [selectedCorridor, setSelectedCorridor] = useState<string>('all');
  const [simulatedFleetStep, setSimulatedFleetStep] = useState(0);

  // Animate fleet buses along road routes
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedFleetStep((prev) => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filtered defects
  const filteredDefects = useMemo(() => {
    return (defects || []).filter((d) => {
      const matchesSeverity = severityFilter === 'all' || d.severity === severityFilter;
      const matchesCorridor = selectedCorridor === 'all' || d.highwayCode === selectedCorridor;
      return matchesSeverity && matchesCorridor;
    });
  }, [defects, severityFilter, selectedCorridor]);

  // Coordinate bounds for Delhi NCR region to map onto SVG canvas
  // Approx: Lat 28.38 to 28.66, Lng 77.00 to 77.28
  const minLat = 28.38;
  const maxLat = 28.66;
  const minLng = 77.00;
  const maxLng = 77.28;

  const projectToMap = (lat: number, lng: number) => {
    // Mercator projection to SVG 1000x600 viewBox
    const x = ((lng - minLng) / (maxLng - minLng)) * 860 + 70;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 480 + 60;
    return { x, y };
  };

  return (
    <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Map Control Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-sm font-extrabold text-white tracking-wide">
              GIS High Definition Defect Heatmap
            </span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
            {filteredDefects.length} Active Hotspots
          </span>
        </div>

        {/* Layer Toggles & Filters */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          
          {/* Corridor selector */}
          <select
            value={selectedCorridor}
            onChange={(e) => setSelectedCorridor(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Highway Corridors</option>
            <option value="NH 48">NH 48 (Delhi Gurugram Expwy)</option>
            <option value="RR DEL 01">Ring Road (Delhi Urban)</option>
            <option value="GCR 02">Golf Course Ext Road</option>
            <option value="NH 248A">Sohna Elevated Highway</option>
          </select>

          {/* Severity Filter */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            {(['all', 'critical', 'high'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase transition cursor-pointer ${
                  severityFilter === sev
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev === 'all' ? 'All' : sev}
              </button>
            ))}
          </div>

          {/* Heatmap Toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold text-xs transition cursor-pointer ${
              showHeatmap 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' 
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heatmap</span>
          </button>

          {/* Fleet Toggle */}
          <button
            onClick={() => setShowFleet(!showFleet)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold text-xs transition cursor-pointer ${
              showFleet 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Active Fleet</span>
          </button>

          {/* Road Segment Health Toggle */}
          <button
            onClick={() => setShowSegments(!showSegments)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold text-xs transition cursor-pointer ${
              showSegments 
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50' 
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Road Segments</span>
          </button>
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-slate-950 select-none overflow-hidden">
        
        {/* Subtle GIS Grid & Satellite Radar Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none" />

        {/* SVG Interactive Canvas */}
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full object-cover transition-transform duration-300"
        >
          <defs>
            {/* Heatmap Gradients */}
            <radialGradient id="heat-critical" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#f97316" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#eab308" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-high" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
            
            {/* Glow Filters */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Arterial Highway Network Base Lines */}
          <g className="roads opacity-60">
            {/* NH 48 Expressway Spine */}
            <path
              d="M 120 480 Q 280 380 440 310 T 620 220 T 820 120"
              fill="none"
              stroke="#334155"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 120 480 Q 280 380 440 310 T 620 220 T 820 120"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.7"
            />
            {/* Ring Road Loop */}
            <ellipse
              cx="640"
              cy="230"
              rx="160"
              ry="110"
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            <ellipse
              cx="640"
              cy="230"
              rx="160"
              ry="110"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* MG Road and Radial Arterials */}
            <path
              d="M 380 350 L 580 280 L 760 380"
              fill="none"
              stroke="#1e293b"
              strokeWidth="6"
            />
            <path
              d="M 440 310 L 480 490 L 620 520"
              fill="none"
              stroke="#1e293b"
              strokeWidth="6"
            />
          </g>

          {/* Road Segment Health Layer */}
          {showSegments && (
            <g className="segments">
              {segments.map((seg) => {
                if (!seg.coords || seg.coords.length < 2) return null;
                const pathPoints = seg.coords.map((c) => {
                  const pt = projectToMap(c[0], c[1]);
                  return `${pt.x},${pt.y}`;
                }).join(' L ');

                const strokeColor = 
                  seg.healthScore >= 80 ? '#10b981' :
                  seg.healthScore >= 60 ? '#f59e0b' : '#f43f5e';

                return (
                  <g key={seg.id} className="cursor-pointer group">
                    <path
                      d={`M ${pathPoints}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                      className="transition-all duration-300 group-hover:stroke-width-[10px]"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Heatmap Layer */}
          {showHeatmap && (
            <g className="heatmap pointer-events-none">
              {filteredDefects.map((defect) => {
                const pt = projectToMap(defect.lat, defect.lng);
                const radius = defect.severity === 'critical' ? 75 : defect.severity === 'high' ? 55 : 35;
                const gradientId = defect.severity === 'critical' ? 'url(#heat-critical)' : 'url(#heat-high)';
                
                return (
                  <circle
                    key={`heat-${defect.id}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={radius}
                    fill={gradientId}
                    opacity="0.8"
                  />
                );
              })}
            </g>
          )}

          {/* Fleet Bus Live Telemetry Markers */}
          {showFleet && (
            <g className="fleet">
              {fleetBuses.map((bus, idx) => {
                const basePt = projectToMap(bus.lat, bus.lng);
                const offsetX = Math.sin((simulatedFleetStep + idx * 20) * 0.1) * 12;
                const offsetY = Math.cos((simulatedFleetStep + idx * 20) * 0.1) * 8;
                const pt = { x: basePt.x + offsetX, y: basePt.y + offsetY };

                return (
                  <g key={bus.busId} className="cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="16"
                      fill="#06b6d4"
                      opacity="0.2"
                      className="animate-ping"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="8"
                      fill="#0891b2"
                      stroke="#ecfeff"
                      strokeWidth="2"
                    />
                    <rect
                      x={pt.x - 38}
                      y={pt.y - 24}
                      width="76"
                      height="16"
                      rx="4"
                      fill="#0f172a"
                      stroke="#0891b2"
                      strokeWidth="1"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fill="#22d3ee"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      fontWeight="bold"
                    >
                      {bus.busId.split(' ')[0]} {bus.currentSpeed}km/h
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Defect Markers */}
          <g className="defects">
            {filteredDefects.map((defect) => {
              const pt = projectToMap(defect.lat, defect.lng);
              const isSelected = selectedDefect?.id === defect.id;
              const isCritical = defect.severity === 'critical';
              const markerColor = 
                defect.severity === 'critical' ? '#f43f5e' :
                defect.severity === 'high' ? '#f97316' :
                defect.severity === 'medium' ? '#eab308' : '#06b6d4';

              return (
                <g
                  key={defect.id}
                  onClick={() => onSelectDefect(defect)}
                  className="cursor-pointer transition-transform hover:scale-125"
                  style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                >
                  {isCritical && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="22"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? "14" : "10"}
                    fill={markerColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "3" : "2"}
                    filter="url(#glow)"
                  />

                  <text
                    x={pt.x}
                    y={pt.y + 3.5}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize={isSelected ? "10" : "8"}
                    fontWeight="900"
                    fontFamily="sans-serif"
                  >
                    {defect.busSightingsCount}
                  </text>

                  {isSelected && (
                    <g>
                      <rect
                        x={pt.x - 70}
                        y={pt.y - 42}
                        width="140"
                        height="24"
                        rx="6"
                        fill="#020617"
                        stroke={markerColor}
                        strokeWidth="1.5"
                        filter="url(#glow)"
                      />
                      <text
                        x={pt.x}
                        y={pt.y - 26}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {defect.title.length > 20 ? defect.title.substring(0, 18) + '…' : defect.title}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-xs space-y-2 shadow-xl">
          <div className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
            GIS Layer Legend
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              <span>Critical Defect (P0)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>High Severity (P1)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              <span>Live Fleet Bus</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="w-3 h-1 bg-emerald-500 rounded" />
              <span>Healthy Segment (80+)</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Stats on Map */}
        <div className="absolute top-3 right-3 hidden sm:flex items-center gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-300">Spatial Index:</span>
            <span className="text-cyan-400 font-bold">PostGIS Spatial Engine</span>
          </div>
        </div>
      </div>

      {/* Selected Defect Slide In Inspector Drawer */}
      {selectedDefect && (
        <div className="bg-slate-900 border-t border-slate-800 p-4 sm:p-5 transition-all">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            {/* Left: Thumbnail & Core Info */}
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-950">
                <img
                  src={selectedDefect.thumbnail}
                  alt={selectedDefect.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-cyan-300">
                  {Math.round(selectedDefect.confidence * 100)}% Conf
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${SEVERITY_BADGES[selectedDefect.severity].badge}`}>
                    {selectedDefect.severity} SEVERITY
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {selectedDefect.id}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-300">
                    {selectedDefect.highwayCode}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {selectedDefect.title}
                </h3>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                  <span>Location: {selectedDefect.roadName} ({selectedDefect.chainageKm})</span>
                  <span>GPS: {selectedDefect.lat.toFixed(4)}° N, {selectedDefect.lng.toFixed(4)}° E</span>
                  <span className="text-emerald-400 font-medium">
                    ⚡ {selectedDefect.busSightingsCount} Fleet Buses Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: Multi bus Observations Summary */}
            <div className="hidden xl:flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-mono text-slate-400">Multi Bus Verification</div>
                <div className="text-slate-200 font-semibold">
                  Latest: {selectedDefect.lastSeen}
                </div>
                <div className="text-slate-400 text-[11px]">
                  Estimated Cost: <span className="text-amber-400 font-bold">₹{selectedDefect.estimatedRepairCostINR.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
              <button
                onClick={() => onSelectDefect(selectedDefect)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
              >
                Close Drawer
              </button>

              <button
                onClick={() => onDispatchWorkOrder(selectedDefect.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch AI Work Order (SLA: 24h)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
