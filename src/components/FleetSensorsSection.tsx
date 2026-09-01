import React from 'react';
import { FleetBus, FleetMetricSummary } from '../types';
import { 
  Bus, 
  Radio, 
  Cpu, 
  Zap, 
  Gauge, 
  ShieldCheck, 
  Lock, 
  Wifi, 
  Layers, 
  Database,
  ArrowDownRight,
  TrendingDown
} from 'lucide-react';
import { MOCK_FLEET_SUMMARY } from '../data/mockData';

interface FleetSensorsSectionProps {
  fleetBuses?: FleetBus[];
  buses?: FleetBus[];
  onSelectBus?: (bus: FleetBus) => void;
}

export const FleetSensorsSection: React.FC<FleetSensorsSectionProps> = ({
  fleetBuses,
  buses,
  onSelectBus
}) => {
  const activeFleet = fleetBuses || buses || [];
  const summary: FleetMetricSummary = MOCK_FLEET_SUMMARY;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bus className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Public Transit Fleet Sensing Mesh and Edge Telemetry
              </h2>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Edge Active
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl">
              Turning everyday municipal transit buses into high frequency mobile urban scanning units. On device YOLOv8 models detect road infrastructure degradation in near real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              64 Buses Connected
            </span>
          </div>
        </div>

        {/* 4 Key Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Bandwidth Saved */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Bandwidth Saved</span>
              <Wifi className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mb-1">
              {summary.bandwidthSavedPercent}%
            </div>
            <div className="text-[11px] text-slate-400">
              ~42 KB event JSON vs ~45 MB raw video stream
            </div>
          </div>

          {/* 2. Edge Inference Latency */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Avg Model Latency</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono mb-1">
              {summary.avgInferenceLatencyMs} ms
            </div>
            <div className="text-[11px] text-slate-400">
              58.4 FPS on board Jetson Orin Nano
            </div>
          </div>

          {/* 3. Detections per Kilometre */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Detections Density</span>
              <Gauge className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mb-1">
              {summary.detectionsPerKm} / km
            </div>
            <div className="text-[11px] text-slate-400">
              3840 km scanned across NCR today
            </div>
          </div>

          {/* 4. Privacy & Compliance Score */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Privacy Preservation</span>
              <Lock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-300 font-mono mb-1">
              100% Edge Anonymized
            </div>
            <div className="text-[11px] text-slate-400">
              Automated face and plate blurring active
            </div>
          </div>

        </div>
      </div>

      {/* Privacy Architecture & Edge Compliance Deep Dive */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">
            Privacy Preservation and Bandwidth Architecture
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Zero Raw Video Storage</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Camera feeds run entirely in on chip memory ring buffers. Raw video is immediately overwritten within 3 seconds and never saved to persistent storage or cloud buckets.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>On Device Face and Plate Blurring</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              A specialized real time lightweight neural net blurs all human faces and civilian vehicle license plates directly at the camera sensor before defect keyframe extraction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-amber-400" />
              <span>Event Only Cellular Uplink</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Instead of streaming continuous 1080p video, buses only transmit an anonymized 42 KB JSON event with GPS, chainage, and a cropped defect bounding box when verified.
            </p>
          </div>
        </div>
      </div>

      {/* Live Fleet Units Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">
            Active Public Transit Sensing Units ({activeFleet.length} Monitored)
          </h3>
          <span className="text-xs font-mono text-slate-400">
            DTC and Haryana Transit Fleet
          </span>
        </div>

        <div className="space-y-3">
          {activeFleet.map((bus) => (
            <div
              key={bus.busId}
              onClick={() => onSelectBus && onSelectBus(bus)}
              className="p-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-xs">
                      {bus.busId}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ({bus.plateNumber})
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {bus.lastSync}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">
                    {bus.routeId}: {bus.routeName}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Current Location: {bus.currentRoad} • Speed: {bus.currentSpeed} km/h
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-right shrink-0">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Detections Today</div>
                  <div className="text-xs font-bold text-white font-mono">{bus.detectionsToday} events</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] uppercase font-mono text-slate-400">FPS / Latency</div>
                  <div className="text-xs font-bold text-cyan-300 font-mono">{bus.edgeFps} FPS / {bus.modelLatencyMs}ms</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Cellular Saved</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono">{bus.cellularDataSavedMb} MB</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
