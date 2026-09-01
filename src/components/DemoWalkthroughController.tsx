import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  Bus, 
  MapPin, 
  Layers, 
  TrendingDown, 
  AlertTriangle, 
  ClipboardCheck, 
  ShieldCheck, 
  Sparkles,
  X
} from 'lucide-react';
import { RoadDefect, RoadSegment, WorkOrder } from '../types';

interface DemoWalkthroughControllerProps {
  onNavigateSection: (section: string) => void;
  onSelectDefect: (defect: RoadDefect) => void;
  onSelectSegment: (segment: RoadSegment) => void;
  onSelectWorkOrder: (workOrder: WorkOrder) => void;
  onOpenVerificationModal: (defect: RoadDefect) => void;
  defects: RoadDefect[];
  segments: RoadSegment[];
  workOrders: WorkOrder[];
}

interface DemoStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  targetSection: string;
  icon: React.ElementType;
  badge: string;
  highlightText: string;
}

export const DemoWalkthroughController: React.FC<DemoWalkthroughControllerProps> = ({
  onNavigateSection,
  onSelectDefect,
  onSelectSegment,
  onSelectWorkOrder,
  onOpenVerificationModal,
  defects,
  segments,
  workOrders
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  const demoSteps: DemoStep[] = [
    {
      stepNumber: 1,
      title: 'Step 1: Public Bus Camera Sighting',
      subtitle: 'Edge YOLOv8 On Board Inference',
      description: 'Bus DTC DL1P 4092 on Route 717 captures high resolution road video. On device edge AI detects a 12cm deep cavity pothole with 94% confidence and auto blurs private license plates.',
      targetSection: 'fleet_nodes',
      icon: Bus,
      badge: 'Edge Detection',
      highlightText: '58.4 FPS on device latency 14.2ms'
    },
    {
      stepNumber: 2,
      title: 'Step 2: Geospatial Event Extraction',
      subtitle: 'GIS Coordinate Tagging',
      description: 'Event package with GPS coordinates, chainage KM 28.4, and keyframe snapshot transmits via cellular network saving 94.2% data bandwidth over raw video streaming.',
      targetSection: 'gis_map',
      icon: MapPin,
      badge: 'GIS Mapping',
      highlightText: 'Delhi Gurugram Expressway NH 48'
    },
    {
      stepNumber: 3,
      title: 'Step 3: Multi Bus Confirmation Cluster',
      subtitle: 'Spatial Temporal Fusion',
      description: '7 distinct municipal buses pass the same physical point within 48 hours. Visual feature embeddings match at 96% similarity, eliminating false positives and confirming severity.',
      targetSection: 'detections',
      icon: Layers,
      badge: 'Fleet Fusion',
      highlightText: '7 transit buses confirmed cluster'
    },
    {
      stepNumber: 4,
      title: 'Step 4: Road Health Dynamic Indexing',
      subtitle: 'Explainable Municipal Scoring',
      description: 'Corridor health score recalculates from 62 down to 54. Factor engine clearly explains an 8 point drop due to active cavity depth under high speed heavy axle loading.',
      targetSection: 'roads',
      icon: TrendingDown,
      badge: 'Health Index',
      highlightText: 'Corridor score: 54 / 100 (Critical)'
    },
    {
      stepNumber: 5,
      title: 'Step 5: Deterioration Risk Forecast',
      subtitle: '30 Day Horizon Probability',
      description: 'Predictive model forecasts 84% probability of rapid asphalt raveling and structural base failure within 30 days if left unaddressed under heavy freight traffic.',
      targetSection: 'predictive',
      icon: AlertTriangle,
      badge: 'Risk Prediction',
      highlightText: 'High Risk within 30 Days'
    },
    {
      stepNumber: 6,
      title: 'Step 6: AI Prioritized Work Order Dispatch',
      subtitle: 'Automated Municipal SLA Queue',
      description: 'System generates Priority P0 work order assigned to NHAI Regional Division with a strict 24 hour repair SLA and estimated remediation cost of ₹14500.',
      targetSection: 'work_orders',
      icon: ClipboardCheck,
      badge: 'Repair Queue',
      highlightText: 'Priority P0: Immediate (24h SLA)'
    },
    {
      stepNumber: 7,
      title: 'Step 7: Closed Loop Repair Verification',
      subtitle: 'Autonomous Transit Bus Re Scan',
      description: 'After contractor patches the defect, regular scheduled bus passes the site and automatically scans the repair, verifying 98.4% defect clearance with zero manual inspection overhead.',
      targetSection: 'verification',
      icon: ShieldCheck,
      badge: 'Closed Loop',
      highlightText: '98.4% SSIM clearance verified'
    },
    {
      stepNumber: 8,
      title: 'Step 8: Restored City Health Metrics',
      subtitle: 'Unified Municipal Intelligence',
      description: 'Closed work order feeds back into the urban health database, restoring the corridor score, updating executive metrics, and generating audit compliant proof for authorities.',
      targetSection: 'overview',
      icon: Sparkles,
      badge: 'City Metrics',
      highlightText: 'Audit complete and health restored'
    }
  ];

  const currentStep = demoSteps[currentStepIndex];

  const handleExecuteStep = (stepIdx: number) => {
    setCurrentStepIndex(stepIdx);
    const step = demoSteps[stepIdx];
    onNavigateSection(step.targetSection);

    const primaryDefect = defects.find(d => d.id === 'DEF 2026 8941') || defects[0];
    const primarySegment = segments.find(s => s.id === 'SEG NH48 01') || segments[0];
    const primaryWorkOrder = workOrders.find(w => w.id === 'WO NHAI 4819') || workOrders[0];

    if (step.stepNumber === 3 || step.stepNumber === 1) {
      if (primaryDefect) onSelectDefect(primaryDefect);
    } else if (step.stepNumber === 4 || step.stepNumber === 5) {
      if (primarySegment) onSelectSegment(primarySegment);
    } else if (step.stepNumber === 6) {
      if (primaryWorkOrder) onSelectWorkOrder(primaryWorkOrder);
    } else if (step.stepNumber === 7) {
      const repairedDefect = defects.find(d => d.status === 'repaired_verified') || primaryDefect;
      if (repairedDefect) onOpenVerificationModal(repairedDefect);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      handleExecuteStep(currentStepIndex + 1);
    } else {
      handleExecuteStep(0);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      handleExecuteStep(currentStepIndex - 1);
    }
  };

  if (!isExpanded) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-950 to-slate-900 border border-cyan-700/50 hover:border-cyan-500 rounded-xl text-xs font-semibold text-cyan-300 shadow-lg cursor-pointer transition"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Open 4 Minute Interactive Live Demo Walkthrough (Step {currentStep.stepNumber} of 8)</span>
          <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>
    );
  }

  const StepIcon = currentStep.icon;

  return (
    <div className="mb-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-900/60 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-full bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-wide">
                Interactive 4 Minute Product Flow Walkthrough
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Step {currentStep.stepNumber} of 8
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Follow the end to end lifecycle from bus dashcam capture to closed loop verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExecuteStep(0)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-medium cursor-pointer transition"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>Reset Flow</span>
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            title="Minimize Walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 8 Step Interactive Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-4">
        {demoSteps.map((step, idx) => {
          const isPassed = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const StepMiniIcon = step.icon;

          return (
            <button
              key={step.stepNumber}
              onClick={() => handleExecuteStep(idx)}
              className={`p-2.5 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950'
                  : isPassed
                  ? 'bg-slate-900/90 border-emerald-800/60 text-slate-300 hover:border-emerald-600'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-cyan-400' : isPassed ? 'text-emerald-400' : 'text-slate-400'}`}>
                  0{step.stepNumber}
                </span>
                {isPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <StepMiniIcon className={`w-3.5 h-3.5 ${isCurrent ? 'text-cyan-400' : 'text-slate-400'}`} />
                )}
              </div>
              <div className="text-[11px] font-semibold truncate">
                {step.badge}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 max-w-3xl">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <StepIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="text-sm font-bold text-white">
                {currentStep.title}
              </h4>
              <span className="text-[11px] text-cyan-400 font-mono font-medium">
                • {currentStep.subtitle}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              {currentStep.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Key Telemetry: {currentStep.highlightText}
              </span>
            </div>
          </div>
        </div>

        {/* Next / Previous Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevStep}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextStep}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            <span>{currentStepIndex === demoSteps.length - 1 ? 'Restart Walkthrough' : 'Next Demo Step'}</span>
            <ChevronRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
