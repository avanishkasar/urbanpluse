export type DefectCategory = 
  | 'pothole'
  | 'alligator_crack'
  | 'longitudinal_crack'
  | 'waterlogging'
  | 'faded_lane_marking'
  | 'damaged_divider'
  | 'damaged_traffic_sign'
  | 'damaged_manhole';

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export type VerificationStatus = 
  | 'multi_bus_confirmed'
  | 'pending_verification'
  | 'citizen_verified'
  | 'repaired_verified'
  | 'work_order_dispatched';

export interface DefectObservation {
  id: string;
  busId: string;
  routeNumber: string;
  timestamp: string;
  confidence: number;
  speedKmh: number;
  cameraAngle: string;
  visualSimilarity: number;
  blurringActive: boolean;
}

export interface RoadDefect {
  id: string;
  title: string;
  category: DefectCategory;
  severity: SeverityLevel;
  lat: number;
  lng: number;
  roadName: string;
  highwayCode: string;
  chainageKm: string;
  confidence: number;
  busSightingsCount: number;
  firstSeen: string;
  lastSeen: string;
  status: VerificationStatus;
  thumbnail: string;
  beforeImage: string;
  afterImage?: string;
  verifiedBuses: DefectObservation[];
  trafficExposure: 'Heavy Trucking' | 'Moderate Traffic' | 'Urban Commute' | 'Expressway High Speed';
  roadHealthImpact: number;
  aiRiskScore: number;
  estimatedRepairCostINR: number;
  suggestedAction: string;
  workOrderId?: string;
  assignedDept: 'NHAI Regional Division' | 'PWD Urban Works' | 'Smart City Corp' | 'Expressway Authority';
  priorityReason?: string;
  depthEstimateCm?: number;
  areaEstimateSqM?: number;
  clusteringScore?: number;
}

export interface HealthFactors {
  defectPenalty: number;
  severityMultiplier: number;
  trafficExposureWeight: number;
  waterloggingImpact: number;
  deteriorationVelocity: number;
  recencyAdjustment: number;
}

export interface RoadSegment {
  id: string;
  name: string;
  highwayCode: string;
  startKm: number;
  endKm: number;
  healthScore: number;
  status: 'Critical' | 'Degraded' | 'Fair' | 'Optimal';
  activeDefectsCount: number;
  dailyTrafficVolume: string;
  deteriorationRisk30d: number;
  riskHorizonLabel: string;
  factors: HealthFactors;
  scoreExplanation: string;
  recentScoreChange: string;
  laneCount: number;
  surfaceType: string;
  coords: [number, number][];
}

export interface WorkOrder {
  id: string;
  defectId: string;
  defectTitle: string;
  location: string;
  severity: SeverityLevel;
  priority: 'Priority P0: Immediate (24h)' | 'Priority P1: Urgent (72h)' | 'Priority P2: Routine (7d)' | 'Priority P3: Scheduled';
  priorityReason: string;
  department: string;
  contractor: string;
  slaHours: number;
  createdDate: string;
  status: 'Assigned' | 'In Progress' | 'Repaired' | 'Verified Closed';
  costINR: number;
}

export interface FleetBus {
  busId: string;
  plateNumber: string;
  routeId: string;
  routeName: string;
  currentSpeed: number;
  lat: number;
  lng: number;
  currentRoad: string;
  detectionsToday: number;
  edgeFps: number;
  lastSync: string;
  status: 'active' | 'standby';
  modelLatencyMs: number;
  facePlateBlurring: boolean;
  cellularDataSavedMb: number;
}

export interface HourlyDetectionData {
  hour: string;
  potholes: number;
  cracks: number;
  markings: number;
  waterlogging: number;
  total: number;
}

export interface FleetMetricSummary {
  activeBusesCount: number;
  totalKilometersScanned: number;
  detectionsPerKm: number;
  clusteringMergeRate: number;
  avgInferenceLatencyMs: number;
  bandwidthSavedPercent: number;
  privacyComplianceScore: number;
  totalCostAvoidanceINR: number;
}
