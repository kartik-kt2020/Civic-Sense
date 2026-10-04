import React, { useState } from 'react';
import { CivicReport, ReportStatus } from '../types';
import { Building2, Clock, CheckCircle2, AlertTriangle, ShieldCheck, UserCheck, ArrowRight, Upload, Filter, Search } from 'lucide-react';

interface AuthorityDashboardProps {
  reports: CivicReport[];
  onUpdateReportStatus: (
    reportId: string,
    newStatus: ReportStatus,
    assignedTeam?: string,
    afterImageUrl?: string
  ) => void;
}

export const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({
  reports,
  onUpdateReportStatus
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState<string>('all');
  const [activeReportModal, setActiveReportModal] = useState<CivicReport | null>(null);
  const [assignedTeamInput, setAssignedTeamInput] = useState<string>('Municipal Sanitation Unit 1');
  const [afterImageInput, setAfterImageInput] = useState<string | null>(null);

  // Filter reports
  const filteredReports = reports.filter(r => {
    if (selectedStatusFilter !== 'all' && r.status !== selectedStatusFilter) return false;
    if (selectedLocalityFilter !== 'all' && r.location.localityId !== selectedLocalityFilter) return false;
    return true;
  });

  // Calculate metrics
  const totalReports = reports.length;
  const resolvedReports = reports.filter(r => r.status === 'resolved' || r.status === 'citizen_verified').length;
  const inProgressReports = reports.filter(r => r.status === 'in_progress' || r.status === 'assigned').length;
  const criticalHotspots = reports.filter(r => r.severity === 'critical' && r.status !== 'resolved' && r.status !== 'citizen_verified').length;
  const resolutionRatePercent = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 100;

  // Handle status step update
  const handleAdvanceStatus = (report: CivicReport) => {
    if (report.status === 'reported') {
      onUpdateReportStatus(report.id, 'verified');
    } else if (report.status === 'verified') {
      onUpdateReportStatus(report.id, 'assigned', assignedTeamInput);
    } else if (report.status === 'assigned') {
      onUpdateReportStatus(report.id, 'in_progress', report.assignedTeam || assignedTeamInput);
    } else if (report.status === 'in_progress') {
      // Trigger resolution modal to attach after evidence photo
      setActiveReportModal(report);
    }
  };

  const handleCompleteResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReportModal) return;

    // Default SVG after image fallback if user didn't upload custom file
    const svgAfter = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#064e3b"/>
      <circle cx="300" cy="180" r="48" fill="#10b981" opacity="0.4"/>
      <text x="300" y="188" font-family="monospace, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">OFFICIAL RESOLUTION COMPLETED</text>
      <text x="300" y="230" font-family="sans-serif" font-size="12" fill="#a7f3d0" text-anchor="middle">CLEARED &amp; VERIFIED BY MUNICIPAL TEAM</text>
    </svg>`;
    const finalAfterUrl = afterImageInput || `data:image/svg+xml;utf8,${encodeURIComponent(svgAfter)}`;

    onUpdateReportStatus(activeReportModal.id, 'resolved', activeReportModal.assignedTeam || assignedTeamInput, finalAfterUrl);
    setActiveReportModal(null);
    setAfterImageInput(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Municipal Operations Control</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Authority Queue & SLA Dispatch</h1>
            <p className="text-sm text-slate-400 mt-1">
              Operational pipeline for city crews: assign maintenance teams, track SLA countdowns, and verify before/after resolution evidence.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-800 border border-slate-700 p-3 rounded-md">
            <div>
              <span className="text-slate-400 block">Current Resolution Rate</span>
              <span className="text-lg font-bold text-emerald-400">{resolutionRatePercent}%</span>
            </div>
            <div className="border-r border-slate-700 h-8 mx-2" />
            <div>
              <span className="text-slate-400 block">Critical Hotspots</span>
              <span className="text-lg font-bold text-red-400">{criticalHotspots} cases</span>
            </div>
          </div>
        </div>

        {/* Operational Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-md">
            <span className="text-slate-400 block font-medium">Total Cases Received</span>
            <span className="text-xl font-bold text-white font-mono mt-0.5 block">{totalReports}</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-md">
            <span className="text-slate-400 block font-medium">Assigned / In Progress</span>
            <span className="text-xl font-bold text-amber-400 font-mono mt-0.5 block">{inProgressReports}</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-md">
            <span className="text-slate-400 block font-medium">Resolved &amp; Verified</span>
            <span className="text-xl font-bold text-emerald-400 font-mono mt-0.5 block">{resolvedReports}</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-md">
            <span className="text-slate-400 block font-medium">Average SLA Response</span>
            <span className="text-xl font-bold text-sky-400 font-mono mt-0.5 block">3.2 hours</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-400 font-semibold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filter Queue:</span>
          </span>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-3 py-1.5 focus:outline-none"
          >
            <option value="all">All Pipeline Statuses</option>
            <option value="reported">Reported (Pending Review)</option>
            <option value="verified">Verified (Ready for Assignment)</option>
            <option value="assigned">Assigned to Crew</option>
            <option value="in_progress">In Progress (Work Active)</option>
            <option value="resolved">Resolved (Awaiting Citizen Confirmation)</option>
            <option value="citizen_verified">Citizen Verified (Closed)</option>
          </select>
        </div>

        <div className="text-slate-400 font-mono">
          Showing {filteredReports.length} cases
        </div>
      </div>

      {/* Main Issue Queue Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800/90 text-slate-300 font-semibold border-b border-slate-700 uppercase tracking-wider">
                <th className="p-3.5">Case ID &amp; Issue Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">Locality Address</th>
                <th className="p-3.5">Assigned Team &amp; SLA</th>
                <th className="p-3.5">Status Pipeline</th>
                <th className="p-3.5 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredReports.map(rep => {
                let severityBadge = 'bg-slate-800 text-slate-300 border-slate-700';
                if (rep.severity === 'critical') severityBadge = 'bg-red-950 text-red-400 border-red-800';
                else if (rep.severity === 'serious') severityBadge = 'bg-orange-950 text-orange-400 border-orange-800';
                else if (rep.severity === 'moderate') severityBadge = 'bg-amber-950 text-amber-400 border-amber-800';

                let statusBadge = 'bg-slate-800 text-slate-300 border-slate-700';
                if (rep.status === 'resolved' || rep.status === 'citizen_verified') {
                  statusBadge = 'bg-emerald-950 text-emerald-400 border-emerald-800';
                } else if (rep.status === 'in_progress') {
                  statusBadge = 'bg-amber-950 text-amber-400 border-amber-800';
                } else if (rep.status === 'assigned') {
                  statusBadge = 'bg-sky-950 text-sky-400 border-sky-800';
                }

                return (
                  <tr key={rep.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-100">{rep.title}</div>
                      <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                        #{rep.id} &bull; Reported {rep.timestamp}
                      </div>
                    </td>
                    <td className="p-3.5 uppercase font-mono text-slate-300">{rep.category}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 border rounded-sm font-semibold capitalize ${severityBadge}`}>
                        {rep.severity}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-mono text-[11px]">{rep.location.address}</td>
                    <td className="p-3.5">
                      {rep.assignedTeam ? (
                        <div>
                          <div className="text-slate-200 font-semibold">{rep.assignedTeam}</div>
                          {rep.slaHoursRemaining && (
                            <div className="text-amber-400 font-mono text-[11px] flex items-center space-x-1 mt-0.5">
                              <Clock className="w-3 h-3 inline" />
                              <span>SLA Window: {rep.slaHoursRemaining}h remaining</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-1 border rounded-sm font-semibold capitalize ${statusBadge}`}>
                        {rep.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {rep.status !== 'citizen_verified' && (
                        <button
                          onClick={() => handleAdvanceStatus(rep)}
                          className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-md font-semibold text-xs transition-colors inline-flex items-center space-x-1"
                        >
                          <span>
                            {rep.status === 'reported' && 'Verify Issue'}
                            {rep.status === 'verified' && 'Assign Team'}
                            {rep.status === 'assigned' && 'Start Work'}
                            {rep.status === 'in_progress' && 'Mark Resolved'}
                            {rep.status === 'resolved' && 'Awaiting Citizen Review'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolution Evidence Upload Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-md p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Attach Work Resolution Evidence</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Case ID: #{activeReportModal.id} &bull; {activeReportModal.title}
              </p>
            </div>

            <form onSubmit={handleCompleteResolution} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-md">
                  <span className="text-slate-400 block font-semibold mb-1">Before Evidence Photo</span>
                  <img src={activeReportModal.imageUrl} alt="Before resolution" className="w-full h-32 object-cover rounded-sm" />
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-md">
                  <span className="text-slate-400 block font-semibold mb-1">After Resolution Evidence</span>
                  {afterImageInput ? (
                    <img src={afterImageInput} alt="After resolution" className="w-full h-32 object-cover rounded-sm" />
                  ) : (
                    <div className="w-full h-32 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 rounded-sm">
                      <Upload className="w-5 h-5 mb-1" />
                      <span>Upload After Photo</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Maintenance Crew Designation</label>
                <input
                  type="text"
                  value={assignedTeamInput}
                  onChange={(e) => setAssignedTeamInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3 py-1.5 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveReportModal(null)}
                  className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md font-bold"
                >
                  Confirm Resolution &amp; Notify Citizen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
