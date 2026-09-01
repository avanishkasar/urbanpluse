import React, { useState } from 'react';
import { 
  MOCK_DEFECTS, 
  MOCK_ROAD_SEGMENTS, 
  MOCK_HOURLY_DETECTIONS, 
  MOCK_FLEET_BUSES, 
  MOCK_WORK_ORDERS 
} from './data/mockData';
import { RoadDefect, RoadSegment, WorkOrder } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { KpiOverview } from './components/KpiOverview';
import { RoadIntelligenceMap } from './components/RoadIntelligenceMap';
import { RecentDetectionsTable } from './components/RecentDetectionsTable';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { MobileCitizenDashcam } from './components/MobileCitizenDashcam';
import { PythonScriptViewer } from './components/PythonScriptViewer';
import { PredictiveMaintenanceSection } from './components/PredictiveMaintenanceSection';
import { WorkOrdersSection } from './components/WorkOrdersSection';
import { FleetSensorsSection } from './components/FleetSensorsSection';
import { RoadsSection } from './components/RoadsSection';
import { DefectsSection } from './components/DefectsSection';
import { ClosedLoopVerificationModal } from './components/ClosedLoopVerificationModal';
import { ImageDetailModal } from './components/ImageDetailModal';
import { DemoWalkthroughController } from './components/DemoWalkthroughController';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mobile' | 'map_studio' | 'verification' | 'python_code'>('dashboard');
  const [currentSection, setCurrentSection] = useState<string>('overview');
  const [selectedDept, setSelectedDept] = useState<string>('All Jurisdictions');
  
  // Data state
  const [defects, setDefects] = useState<RoadDefect[]>(MOCK_DEFECTS);
  const [segments, setSegments] = useState<RoadSegment[]>(MOCK_ROAD_SEGMENTS);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(MOCK_WORK_ORDERS);
  const [fleetBuses] = useState(MOCK_FLEET_BUSES);
  const [hourlyData] = useState(MOCK_HOURLY_DETECTIONS);

  // Modals and Selection state
  const [selectedDefect, setSelectedDefect] = useState<RoadDefect | null>(null);
  const [inspectingImageDefect, setInspectingImageDefect] = useState<RoadDefect | null>(null);
  const [verificationModalDefect, setVerificationModalDefect] = useState<RoadDefect | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter defects by selected jurisdiction
  const visibleDefects = defects.filter((d) => {
    if (selectedDept === 'All Jurisdictions') return true;
    return d.assignedDept === selectedDept;
  });

  const criticalDefectsCount = visibleDefects.filter((d) => d.severity === 'critical').length;
  const verifiedReportsCount = visibleDefects.reduce((acc, d) => acc + d.busSightingsCount, 0);
  const pendingRepairsCount = workOrders.filter((w) => w.status !== 'Verified Closed').length;

  // Handler: Dispatch AI Work Order
  const handleDispatchWorkOrder = (defectId: string) => {
    const defect = defects.find((d) => d.id === defectId);
    if (!defect) return;

    const newWorkOrderId = `WO NHAI ${Math.floor(1000 + Math.random() * 9000)}`;
    const newWo: WorkOrder = {
      id: newWorkOrderId,
      defectId: defect.id,
      defectTitle: defect.title,
      location: `${defect.roadName} ${defect.chainageKm}`,
      severity: defect.severity,
      priority: defect.severity === 'critical' ? 'Priority P0: Immediate (24h)' : 'Priority P1: Urgent (72h)',
      priorityReason: 'Critical impact on heavy transit expressway flow and safety risk',
      department: defect.assignedDept,
      contractor: 'L and T Infrastructure Rapid Unit',
      slaHours: defect.severity === 'critical' ? 24 : 72,
      createdDate: 'Just Now',
      status: 'Assigned',
      costINR: defect.estimatedRepairCostINR
    };

    setWorkOrders([newWo, ...workOrders]);
    setDefects(
      defects.map((d) =>
        d.id === defectId ? { ...d, status: 'work_order_dispatched', workOrderId: newWorkOrderId } : d
      )
    );

    confetti({ particleCount: 40, origin: { y: 0.6 } });
    showToast(`Work Order ${newWorkOrderId} dispatched to ${defect.assignedDept}`);
  };

  // Handler: Simulate a new live defect from fleet dashcam
  const handleSimulateNewDefect = () => {
    const randomLats = [28.4620, 28.5110, 28.5980, 28.6250];
    const randomLngs = [77.0310, 77.0810, 77.2150, 77.2250];
    const idx = Math.floor(Math.random() * randomLats.length);
    const newId = `DEF 2026 ${Math.floor(9000 + Math.random() * 999)}`;

    const newDefect: RoadDefect = {
      id: newId,
      title: 'Freshly Detected Deep Pothole (Depth ~14cm)',
      category: 'pothole',
      severity: 'critical',
      lat: randomLats[idx],
      lng: randomLngs[idx],
      roadName: 'Delhi Gurugram Expressway (NH 48 Inbound)',
      highwayCode: 'NH 48',
      chainageKm: `KM ${(20 + Math.random() * 15).toFixed(1)} (Right Lane)`,
      confidence: 0.95,
      busSightingsCount: 1,
      firstSeen: 'Just Now',
      lastSeen: 'Just Now (Bus DL1P 4092)',
      status: 'pending_verification',
      thumbnail: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
      trafficExposure: 'Heavy Trucking',
      roadHealthImpact: 20,
      aiRiskScore: 97,
      estimatedRepairCostINR: 16500,
      suggestedAction: 'Cold mix Bituminous Concrete Fill and Compaction',
      assignedDept: 'NHAI Regional Division',
      verifiedBuses: [
        { 
          id: 'OBS NEW', 
          busId: 'DTC DL1P 4092', 
          routeNumber: 'Route 717', 
          timestamp: 'Just Now', 
          confidence: 0.95, 
          speedKmh: 52, 
          cameraAngle: 'Front Center 1080p',
          visualSimilarity: 0.98,
          blurringActive: true
        }
      ]
    };

    setDefects([newDefect, ...defects]);
    setSelectedDefect(newDefect);
    showToast(`New Road Defect ${newId} detected by Bus DL1P 4092 on NH 48`);
  };

  // Handler: Citizen and Route verification from mobile
  const handleVerifyFromRoute = (defectId: string, isConfirmed: boolean) => {
    setDefects(
      defects.map((d) => {
        if (d.id === defectId) {
          return {
            ...d,
            busSightingsCount: isConfirmed ? d.busSightingsCount + 1 : d.busSightingsCount,
            status: isConfirmed ? 'multi_bus_confirmed' : d.status,
            lastSeen: 'Just now (Citizen Verification HUD)'
          };
        }
        return d;
      })
    );
    showToast(isConfirmed ? 'Community Verification Confirmed and Synced to GIS Center' : 'Citizen vote recorded as clear');
  };

  // Handler: Complete repair verification
  const handleVerifyRepairSuccess = (defectId: string) => {
    setDefects(
      defects.map((d) => (d.id === defectId ? { ...d, status: 'repaired_verified' } : d))
    );
    setWorkOrders(
      workOrders.map((w) => (w.defectId === defectId ? { ...w, status: 'Verified Closed' } : w))
    );
    showToast('Closed loop repair successfully verified and closed');
  };

  // Demo Walkthrough Navigation Bridge
  const handleDemoNavigate = (view: string, section?: string) => {
    if (view === 'dashboard') {
      setActiveTab('dashboard');
      if (section) setCurrentSection(section);
    } else if (view === 'mobile') {
      setActiveTab('mobile');
    } else if (view === 'verification') {
      setActiveTab('verification');
    } else if (view === 'map_studio') {
      setActiveTab('map_studio');
    } else if (view === 'python_code') {
      setActiveTab('python_code');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        onSimulateNewDefect={handleSimulateNewDefect}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 animate-in fade-in duration-300">
          <div className="bg-slate-900/95 border border-cyan-500/60 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-2.5 text-xs text-white backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Command Center Sidebar */}
        {activeTab === 'dashboard' && (
          <Sidebar
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            defectCount={visibleDefects.length}
            criticalCount={criticalDefectsCount}
            workOrderCount={workOrders.length}
            onOpenMobileView={() => setActiveTab('mobile')}
          />
        )}

        {/* Dynamic Views based on activeTab and currentSection */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* TAB 1: AUTHORITY COMMAND CENTER */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Dashboard Banner and Mode Badges */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      NHAI and State PWD Road Command Center
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                      LIVE RADAR
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Continuous infrastructure intelligence using public transit buses (DTC, HR Transit, BMTC Fleet).
                  </p>
                </div>

                <div className="flex items-center gap-2.5 text-xs font-mono">
                  <button
                    onClick={() => setIsDemoActive(!isDemoActive)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isDemoActive
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                        : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isDemoActive ? 'Hide Demo Guide' : 'Interactive Demo Flow'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('mobile')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold transition border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Switch to Mobile View</span>
                  </button>
                </div>
              </div>

              {/* Interactive Demo Controller Bar */}
              {isDemoActive && (
                <DemoWalkthroughController
                  currentSection={currentSection}
                  onNavigate={handleDemoNavigate}
                  onSimulateDefect={handleSimulateNewDefect}
                  onOpenVerificationModal={(defectId) => {
                    const d = defects.find((item) => item.id === defectId) || defects[0];
                    setVerificationModalDefect(d);
                  }}
                  onClose={() => setIsDemoActive(false)}
                />
              )}

              {/* OVERVIEW SECTION: Full Suite */}
              {currentSection === 'overview' && (
                <>
                  <KpiOverview
                    totalDefects={visibleDefects.length}
                    criticalCount={criticalDefectsCount}
                    verifiedCount={verifiedReportsCount}
                    pendingRepairs={pendingRepairsCount}
                    onFilterSeverity={(sev) => {
                      if (sev === 'critical') setCurrentSection('detections');
                      else if (sev === 'repairs') setCurrentSection('work_orders');
                      else if (sev === 'verified') setCurrentSection('detections');
                    }}
                  />

                  <RoadIntelligenceMap
                    defects={visibleDefects}
                    segments={segments}
                    fleetBuses={fleetBuses}
                    onSelectDefect={(defect) => setSelectedDefect(defect)}
                    selectedDefect={selectedDefect}
                    onDispatchWorkOrder={handleDispatchWorkOrder}
                  />

                  <AnalyticsCharts
                    hourlyData={hourlyData}
                    segments={segments}
                  />

                  <RecentDetectionsTable
                    defects={visibleDefects}
                    onSelectDefect={(defect) => setSelectedDefect(defect)}
                    onDispatchWorkOrder={handleDispatchWorkOrder}
                    onInspectImage={(defect) => setInspectingImageDefect(defect)}
                  />

                  <RoadsSection
                    segments={segments}
                    defects={visibleDefects}
                    selectedSegment={null}
                    onSelectSegment={(seg) => {
                      showToast(`Selected ${seg.name}: Health Score ${seg.healthScore} / 100`);
                    }}
                    onSelectDefect={(defect) => {
                      setSelectedDefect(defect);
                      setInspectingImageDefect(defect);
                    }}
                  />

                  <PredictiveMaintenanceSection
                    segments={segments}
                    onSelectSegment={(seg) => {
                      showToast(`Selected ${seg.name}: Health Score ${seg.healthScore} / 100`);
                    }}
                  />

                  <WorkOrdersSection
                    workOrders={workOrders}
                    onOpenVerificationModal={(defectId) => {
                      const d = defects.find((item) => item.id === defectId);
                      if (d) setVerificationModalDefect(d);
                    }}
                    onUpdateStatus={(woId, newStatus) => {
                      setWorkOrders(
                        workOrders.map((w) => (w.id === woId ? { ...w, status: newStatus } : w))
                      );
                      showToast(`Work Order ${woId} updated to ${newStatus}`);
                    }}
                  />

                  <FleetSensorsSection 
                    fleetBuses={fleetBuses} 
                    onSelectBus={(bus) => {
                      showToast(`Live node ${bus.busId} active on route ${bus.routeNumber}`);
                    }}
                  />
                </>
              )}

              {/* DEDICATED GIS MAP SECTION */}
              {currentSection === 'gis_map' && (
                <div className="space-y-6">
                  <RoadIntelligenceMap
                    defects={visibleDefects}
                    segments={segments}
                    fleetBuses={fleetBuses}
                    onSelectDefect={(defect) => setSelectedDefect(defect)}
                    selectedDefect={selectedDefect}
                    onDispatchWorkOrder={handleDispatchWorkOrder}
                  />
                  <RecentDetectionsTable
                    defects={visibleDefects}
                    onSelectDefect={(defect) => setSelectedDefect(defect)}
                    onDispatchWorkOrder={handleDispatchWorkOrder}
                    onInspectImage={(defect) => setInspectingImageDefect(defect)}
                  />
                </div>
              )}

              {/* DEDICATED ROADS SECTION */}
              {currentSection === 'roads' && (
                <RoadsSection
                  segments={segments}
                  defects={visibleDefects}
                  selectedSegment={null}
                  onSelectSegment={(seg) => {
                    showToast(`Selected ${seg.name}: Health Score ${seg.healthScore} / 100`);
                  }}
                  onSelectDefect={(defect) => {
                    setSelectedDefect(defect);
                    setInspectingImageDefect(defect);
                  }}
                />
              )}

              {/* DEDICATED DEFECTS REGISTRY SECTION */}
              {currentSection === 'detections' && (
                <DefectsSection
                  defects={visibleDefects}
                  selectedDefect={selectedDefect}
                  onSelectDefect={(defect) => setSelectedDefect(defect)}
                  onInspectImage={(defect) => setInspectingImageDefect(defect)}
                  onDispatchWorkOrder={handleDispatchWorkOrder}
                  onOpenVerificationModal={(defect) => setVerificationModalDefect(defect)}
                />
              )}

              {/* DEDICATED PREDICTIVE MAINTENANCE SECTION */}
              {currentSection === 'predictive' && (
                <PredictiveMaintenanceSection
                  segments={segments}
                  onSelectSegment={(seg) => {
                    showToast(`Selected ${seg.name}: Health Score ${seg.healthScore} / 100`);
                  }}
                />
              )}

              {/* DEDICATED WORK ORDERS SECTION */}
              {currentSection === 'work_orders' && (
                <WorkOrdersSection
                  workOrders={workOrders}
                  onOpenVerificationModal={(defectId) => {
                    const d = defects.find((item) => item.id === defectId);
                    if (d) setVerificationModalDefect(d);
                  }}
                  onUpdateStatus={(woId, newStatus) => {
                    setWorkOrders(
                      workOrders.map((w) => (w.id === woId ? { ...w, status: newStatus } : w))
                    );
                    showToast(`Work Order ${woId} updated to ${newStatus}`);
                  }}
                />
              )}

              {/* DEDICATED FLEET SENSORS SECTION */}
              {currentSection === 'fleet_nodes' && (
                <FleetSensorsSection 
                  fleetBuses={fleetBuses} 
                  onSelectBus={(bus) => {
                    showToast(`Live node ${bus.busId} active on route ${bus.routeNumber}`);
                  }}
                />
              )}

              {/* DEDICATED VERIFICATION SECTION */}
              {currentSection === 'verification' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-white">Closed Loop Repair Verification</h2>
                      <p className="text-xs text-slate-400">Autonomous fleet observation confirms repair completion before ticket closure.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {defects.map((defect) => (
                      <div
                        key={defect.id}
                        className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 transition space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-cyan-400">{defect.id}</span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {defect.highwayCode}
                          </span>
                        </div>

                        <div className="relative h-36 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                          <img
                            src={defect.thumbnail}
                            alt={defect.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-cyan-300">
                            {defect.status === 'repaired_verified' ? 'VERIFIED REPAIRED' : 'AUDIT PENDING'}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{defect.title}</h4>
                          <p className="text-[11px] text-slate-400">📍 {defect.roadName}</p>
                        </div>

                        <button
                          onClick={() => setVerificationModalDefect(defect)}
                          className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                        >
                          Open Before and After Comparison
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: CITIZEN AND DASHCAM MOBILE VIEW */}
          {activeTab === 'mobile' && (
            <div className="space-y-6">
              <MobileCitizenDashcam
                onVerifyFromRoute={handleVerifyFromRoute}
                onClose={() => setActiveTab('dashboard')}
              />
            </div>
          )}

          {/* TAB 3: FULLSCREEN GIS MAP STUDIO */}
          {activeTab === 'map_studio' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Full Screen GIS Spatial Intelligence Studio</h2>
                  <p className="text-xs text-slate-400">High definition road condition layers with live fleet overlays.</p>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Back to Command Overview
                </button>
              </div>

              <RoadIntelligenceMap
                defects={visibleDefects}
                segments={segments}
                fleetBuses={fleetBuses}
                onSelectDefect={(defect) => setSelectedDefect(defect)}
                selectedDefect={selectedDefect}
                onDispatchWorkOrder={handleDispatchWorkOrder}
              />

              <RecentDetectionsTable
                defects={visibleDefects}
                onSelectDefect={(defect) => setSelectedDefect(defect)}
                onDispatchWorkOrder={handleDispatchWorkOrder}
                onInspectImage={(defect) => setInspectingImageDefect(defect)}
              />
            </div>
          )}

          {/* TAB 4: CLOSED LOOP REPAIR VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Closed Loop Repair Verification Engine
                </span>
                <h2 className="text-2xl font-black text-white">
                  Post Repair Proof and Autonomous SLA Audit
                </h2>
                <p className="text-xs text-slate-400">
                  Instead of ending at a complaint ticket, the public transit bus fleet passes over the repair site to visually confirm that the asphalt defect has been resolved.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defects.slice(0, 4).map((defect) => (
                  <div
                    key={defect.id}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 transition space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">{defect.id}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {defect.highwayCode}
                      </span>
                    </div>

                    <div className="relative h-40 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img
                        src={defect.thumbnail}
                        alt={defect.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-cyan-300">
                        {defect.status === 'repaired_verified' ? 'VERIFIED REPAIRED' : 'IN AUDIT QUEUE'}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{defect.title}</h4>
                      <p className="text-[11px] text-slate-400">📍 {defect.roadName}</p>
                    </div>

                    <button
                      onClick={() => setVerificationModalDefect(defect)}
                      className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                    >
                      Open Before and After Comparison
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PYTHON YOLO ML CODE VIEWER */}
          {activeTab === 'python_code' && (
            <div className="space-y-6">
              <PythonScriptViewer />
            </div>
          )}

        </main>
      </div>

      {/* High-Res Image Detail Modal */}
      {inspectingImageDefect && (
        <ImageDetailModal
          defect={inspectingImageDefect}
          onClose={() => setInspectingImageDefect(null)}
          onDispatchWorkOrder={handleDispatchWorkOrder}
        />
      )}

      {/* Closed Loop Verification Modal */}
      {verificationModalDefect && (
        <ClosedLoopVerificationModal
          defect={verificationModalDefect}
          onClose={() => setVerificationModalDefect(null)}
          onVerifyRepairSuccess={handleVerifyRepairSuccess}
        />
      )}

    </div>
  );
}
