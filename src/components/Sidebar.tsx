import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  AlertOctagon, 
  TrendingUp, 
  ClipboardList, 
  Bus, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  Layers, 
  ArrowUpRight
} from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  defectCount: number;
  criticalCount: number;
  workOrderCount: number;
  onOpenMobileView: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  setCurrentSection,
  defectCount,
  criticalCount,
  workOrderCount,
  onOpenMobileView
}) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Command Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'gis_map',
      label: 'Live GIS Heatmap',
      icon: Map,
      badge: 'Live'
    },
    {
      id: 'roads',
      label: 'Road Health Profiles',
      icon: Layers,
      badge: '0 to 100'
    },
    {
      id: 'detections',
      label: 'Defect Registry',
      icon: AlertOctagon,
      badge: `${defectCount}`
    },
    {
      id: 'predictive',
      label: 'Deterioration AI',
      icon: TrendingUp,
      badge: `${criticalCount} High Risk`
    },
    {
      id: 'work_orders',
      label: 'AI Repair Queue',
      icon: ClipboardList,
      badge: `${workOrderCount}`
    },
    {
      id: 'fleet_nodes',
      label: 'Fleet Sensor Mesh',
      icon: Bus,
      badge: '64 Units'
    },
    {
      id: 'verification',
      label: 'Closed Loop Proof',
      icon: CheckCircle2,
      badge: '98% Conf'
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-900/60 border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-5rem)]">
      <div className="space-y-6">
        
        {/* Fleet Mesh Status Widget */}
        <div className="bg-slate-950/80 border border-cyan-900/40 rounded-xl p-3.5 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Sensing Fleet Mesh
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">Edge Devices</div>
              <div className="text-slate-100 font-bold text-sm">64 / 64</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">Avg Latency</div>
              <div className="text-emerald-400 font-bold text-sm">14.2 ms</div>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Bandwidth Saved</span>
            <span className="font-mono font-semibold text-cyan-300">94.2%</span>
          </div>
        </div>

        {/* Primary Navigation Menu */}
        <div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-2 px-2">
            Operations Console
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                      isActive 
                        ? 'bg-cyan-400 text-slate-950 font-bold' 
                        : item.badge === 'Live'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Launch Mobile Simulator */}
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-900/40 rounded-xl p-3.5 text-xs">
          <div className="text-indigo-300 font-semibold mb-1 flex items-center justify-between">
            <span>Bus Dashcam HUD</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed mb-2.5">
            Test on device YOLO bounding box detector and citizen route verification UI.
          </p>
          <button
            onClick={onOpenMobileView}
            className="w-full py-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition cursor-pointer shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Launch Mobile Demo</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>UrbanPulse AI Enterprise</span>
        <span className="font-mono text-cyan-400">Municipal Edition</span>
      </div>
    </aside>
  );
};
