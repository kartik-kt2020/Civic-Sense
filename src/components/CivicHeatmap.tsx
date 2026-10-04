import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { Locality, CivicReport, CivicCategory, SeverityLevel } from '../types';
import { MapPin, Filter, Layers, AlertCircle, CheckCircle, TrendingUp, TrendingDown, Clock, ShieldCheck } from 'lucide-react';

interface CivicHeatmapProps {
  localities: Locality[];
  reports: CivicReport[];
  onSelectReport: (report: CivicReport) => void;
  onOpenReportModal: () => void;
}

// Function to generate Leaflet SVG pin icon depending on status & severity
const getMarkerIcon = (severity: SeverityLevel, status: string) => {
  let color = '#eab308'; // yellow
  if (status === 'resolved' || status === 'citizen_verified') {
    color = '#10b981'; // green
  } else if (severity === 'critical') {
    color = '#18181b'; // black / critical dirty area
  } else if (severity === 'serious') {
    color = '#ef4444'; // red / serious hotspot
  } else if (severity === 'moderate') {
    color = '#f97316'; // orange
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="${color}" stroke="#ffffff" stroke-width="1.5">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
};

export const CivicHeatmap: React.FC<CivicHeatmapProps> = ({
  localities,
  reports,
  onSelectReport,
  onOpenReportModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTime, setSelectedTime] = useState<string>('7d');
  const [activeLocality, setActiveLocality] = useState<Locality | null>(null);

  // Map center default (NCR region coordinates from blueprint)
  const defaultCenter: [number, number] = [28.65, 77.36];

  // Filter reports
  const filteredReports = reports.filter(rep => {
    if (selectedCategory !== 'all' && rep.category !== selectedCategory) return false;
    if (selectedStatus === 'unresolved' && (rep.status === 'resolved' || rep.status === 'citizen_verified')) return false;
    if (selectedStatus === 'resolved' && (rep.status !== 'resolved' && rep.status !== 'citizen_verified')) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Functional Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Real-Time Intelligence Map</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Live Civic Health Map
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Visual civic status across districts. Map legend distinguishes clean verified zones, minor issues, recurring hotspots, and critical sanitation priority areas.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenReportModal}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm px-4 py-2.5 rounded-md transition-colors shadow-sm flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Report Issue at GPS Location</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Category Layer Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5 flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Issue Category Layer</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              <option value="waste">Waste & Sanitation Spills</option>
              <option value="hygiene">Public Hygiene & Cleanliness</option>
              <option value="water">Water Leakage & Mains</option>
              <option value="drainage">Drainage & Sewage Blockage</option>
              <option value="roads">Road Hazards & Potholes</option>
              <option value="infrastructure">Public Infrastructure</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resolution Status</span>
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="unresolved">Active Unresolved Cases</option>
              <option value="resolved">Verified Resolved Cases</option>
            </select>
          </div>

          {/* Time Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Timeframe Window</span>
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Map + Locality Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Column */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col h-[520px]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-slate-300 font-semibold flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Live Geographic Coordinate Grid</span>
            </span>
            <span className="text-slate-400 font-mono">
              Showing {filteredReports.length} reported markers
            </span>
          </div>

          {/* Leaflet Map Canvas */}
          <div className="flex-1 w-full rounded-md overflow-hidden relative border border-slate-800">
            <MapContainer
              center={defaultCenter}
              zoom={12}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Locality Hotspot Radii */}
              {localities.map(loc => {
                let strokeColor = '#10b981'; // green score > 75
                if (loc.civicScore < 40) strokeColor = '#ef4444'; // red
                else if (loc.civicScore < 70) strokeColor = '#f97316'; // orange

                return (
                  <CircleMarker
                    key={loc.id}
                    center={loc.center}
                    radius={30}
                    pathOptions={{
                      color: strokeColor,
                      fillColor: strokeColor,
                      fillOpacity: 0.15,
                      weight: 1.5
                    }}
                  >
                    <Popup>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-slate-100">{loc.name} Ward</p>
                        <p className="text-slate-300">Civic Health Score: <span className="font-bold">{loc.civicScore}/100</span></p>
                        <p className="text-slate-400">Unresolved Issues: {loc.unresolvedCount}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}

              {/* Report Individual Pins */}
              {filteredReports.map(rep => (
                <Marker
                  key={rep.id}
                  position={[rep.location.lat, rep.location.lng]}
                  icon={getMarkerIcon(rep.severity, rep.status)}
                >
                  <Popup>
                    <div className="text-xs space-y-2 max-w-xs">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                        <span className="font-bold text-slate-100 truncate">{rep.title}</span>
                        <span className="uppercase text-[10px] px-1.5 py-0.5 rounded-sm font-semibold bg-slate-800 text-slate-300">
                          {rep.category}
                        </span>
                      </div>
                      <p className="text-slate-300 line-clamp-2">{rep.description}</p>
                      <div className="text-slate-400 space-y-0.5 font-mono text-[11px]">
                        <p>Location: {rep.location.address}</p>
                        <p>Status: <span className="text-emerald-400 capitalize">{rep.status.replace('_', ' ')}</span></p>
                        <p>AI Confidence: {rep.aiConfidence}%</p>
                      </div>
                      <button
                        onClick={() => onSelectReport(rep)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 py-1 rounded-sm text-center font-medium mt-1 transition-colors"
                      >
                        Inspect Case Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Heatmap Color Standard Blueprint Legend */}
          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 sm:grid-cols-6 gap-2 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 bg-emerald-500 rounded-sm inline-block" />
              <span className="text-slate-300 font-medium">Green: Clean / Healthy</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 bg-slate-500 rounded-sm inline-block" />
              <span className="text-slate-300 font-medium">Grey: Insufficient Data</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 bg-yellow-500 rounded-sm inline-block" />
              <span className="text-slate-300 font-medium">Yellow: Minor Issues</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 bg-orange-500 rounded-sm inline-block" />
              <span className="text-slate-300 font-medium">Orange: Recurring</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 bg-red-500 rounded-sm inline-block" />
              <span className="text-slate-300 font-medium">Red: Serious Hotspot</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 bg-zinc-900 border border-zinc-700 rounded-sm inline-block" />
              <span className="text-slate-300 font-medium">Black: Critical Dirty</span>
            </div>
          </div>
        </div>

        {/* Locality Civic Health Scores Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Locality Civic Health Scores</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calculated 0 to 100 weighted civic index</p>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1">
            {localities.map(loc => {
              const scoreDiff = loc.civicScore - loc.previousScore;
              let scoreBadgeColor = 'text-emerald-400 border-emerald-900 bg-emerald-950';
              if (loc.civicScore < 50) scoreBadgeColor = 'text-red-400 border-red-900 bg-red-950';
              else if (loc.civicScore < 75) scoreBadgeColor = 'text-amber-400 border-amber-900 bg-amber-950';

              return (
                <div
                  key={loc.id}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-md p-3 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-100 text-sm">{loc.name}</span>
                    <div className={`px-2 py-0.5 rounded-sm border text-xs font-mono font-bold ${scoreBadgeColor}`}>
                      {loc.civicScore} / 100
                    </div>
                  </div>

                  {/* Score Progress Bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-sm overflow-hidden mb-2">
                    <div
                      className={`h-full ${
                        loc.civicScore >= 75 ? 'bg-emerald-500' : loc.civicScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${loc.civicScore}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="flex items-center space-x-1">
                      {scoreDiff >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 inline" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-red-400 inline" />
                      )}
                      <span className={scoreDiff >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {scoreDiff >= 0 ? `+${scoreDiff}` : scoreDiff} vs last week
                      </span>
                    </span>
                    <span>{loc.resolutionRate}% resolution rate</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-md text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Civic Health Formula Metrics</p>
            <p>Score reflects issue severity weight, recurrence factor, fresh unresolved reports, average team resolution time, and community verification votes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
