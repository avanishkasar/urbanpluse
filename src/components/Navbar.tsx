import React from 'react';
import { 
  Activity, 
  Layers, 
  Smartphone, 
  Code2, 
  ShieldCheck, 
  AlertTriangle,
  Radio,
  Flame
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'mobile' | 'map_studio' | 'verification' | 'python_code';
  setActiveTab: (tab: 'dashboard' | 'mobile' | 'map_studio' | 'verification' | 'python_code') => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  onSimulateNewDefect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDept,
  setSelectedDept,
  onSimulateNewDefect
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top emergency live alert bar */}
      <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/80 border-b border-rose-900/30 px-4 py-1 text-xs flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 text-rose-400 shrink-0 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-mono font-semibold uppercase tracking-wider text-[11px]">LIVE FLEET TELEMETRY</span>
        </div>
        <div className="marquee-container text-slate-300 font-mono text-[11px] truncate mx-4 flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-amber-300">
            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
            <span>NH 48 Km 28.4: <strong>Cavity Pothole</strong> verified by 7 buses. P0 Work Order Generated.</span>
          </span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Radio className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>Bus DL1P 4092 syncing 58.4 FPS on device YOLOv8 inference.</span>
          </span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Connaught Place Radial 3: Bitumen patch verified closed.</span>
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-slate-400 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            64 Buses Active
          </span>
          <span className="hidden sm:inline font-mono text-slate-400">Municipal Command Edition</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Platform Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-cyan-500/20">
              <Activity className="w-5 h-5 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  UrbanPulse <span className="text-cyan-400 font-black">AI</span>
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  Municipal Intelligence
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Autonomous Public Fleet Road Intelligence and GIS Command Center
              </p>
            </div>
          </div>

          {/* Navigation Mode Switcher */}
          <nav className="hidden lg:flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Authority Command</span>
            </button>

            <button
              onClick={() => setActiveTab('mobile')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'mobile'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Citizen and Dashcam HUD</span>
            </button>

            <button
              onClick={() => setActiveTab('map_studio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'map_studio'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full GIS Heatmap</span>
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'verification'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Closed Loop Repair</span>
            </button>

            <button
              onClick={() => setActiveTab('python_code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'python_code'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Edge ML Pipeline</span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Department Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Jurisdiction:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-transparent text-xs font-semibold text-cyan-300 focus:outline-none cursor-pointer"
              >
                <option value="NHAI Regional Division" className="bg-slate-900 text-slate-100">NHAI (National Highways)</option>
                <option value="PWD Urban Works" className="bg-slate-900 text-slate-100">State PWD Works</option>
                <option value="Smart City Corp" className="bg-slate-900 text-slate-100">Smart City Municipal Corp</option>
                <option value="All Jurisdictions" className="bg-slate-900 text-slate-100">All Agencies (Unified GIS)</option>
              </select>
            </div>

            {/* Simulate Live Edge Ingestion Button */}
            <button
              onClick={onSimulateNewDefect}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold rounded-lg shadow-md shadow-orange-500/20 active:scale-95 transition-all duration-150 cursor-pointer"
              title="Simulate a real time fleet bus detecting a new high severity defect"
            >
              <Flame className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              <span className="hidden sm:inline">Simulate Bus Event</span>
              <span className="sm:hidden">Simulate</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab bar */}
        <div className="lg:hidden flex items-center justify-between pb-3 pt-1 border-t border-slate-800/80 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Authority Command
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeTab === 'mobile' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Citizen and Dashcam
          </button>
          <button
            onClick={() => setActiveTab('map_studio')}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeTab === 'map_studio' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            GIS Heatmap
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeTab === 'verification' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Repair Loop
          </button>
          <button
            onClick={() => setActiveTab('python_code')}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeTab === 'python_code' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Python ML
          </button>
        </div>
      </div>
    </header>
  );
};
