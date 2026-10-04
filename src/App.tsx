import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CivicHeatmap } from './components/CivicHeatmap';
import { ReportIssue } from './components/ReportIssue';
import { AuthorityDashboard } from './components/AuthorityDashboard';
import { CommunityVerification } from './components/CommunityVerification';
import { CivicProgression } from './components/CivicProgression';
import { DomainLaunchStatus } from './components/DomainLaunchStatus';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';

import { INITIAL_LOCALITIES, INITIAL_REPORTS, INITIAL_USER_PROGRESS, INITIAL_DOMAIN_CONFIG } from './data/initialData';
import { Locality, CivicReport, UserProgress, DomainConfig, ReportStatus } from './types';
import { ShieldCheck, PlusSquare, MapPin, Building2, CheckCircle2, Award, Clock, ArrowRight, X } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('heatmap');
  const [localities, setLocalities] = useState<Locality[]>(INITIAL_LOCALITIES);
  const [reports, setReports] = useState<CivicReport[]>(INITIAL_REPORTS);
  const [userProgress, setUserProgress] = useState<UserProgress>(INITIAL_USER_PROGRESS);
  const [domainConfig] = useState<DomainConfig>(INITIAL_DOMAIN_CONFIG);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState<boolean>(false);
  const [inspectedReport, setInspectedReport] = useState<CivicReport | null>(null);

  // Add new citizen report
  const handleCreateReport = (newReport: CivicReport) => {
    setReports(prev => [newReport, ...prev]);

    // Update locality unresolved count & reports count
    setLocalities(prev =>
      prev.map(loc => {
        if (loc.id === newReport.location.localityId) {
          const newUnresolved = loc.unresolvedCount + 1;
          const newReports = loc.reportsCount + 1;
          const newScore = Math.max(10, loc.civicScore - (newReport.severity === 'critical' ? 8 : 4));
          return {
            ...loc,
            unresolvedCount: newUnresolved,
            reportsCount: newReports,
            civicScore: newScore
          };
        }
        return loc;
      })
    );

    // Reward user points (+20 points for valid report)
    setUserProgress(prev => ({
      ...prev,
      points: prev.points + 20,
      verifiedReportsSubmitted: prev.verifiedReportsSubmitted + 1
    }));
  };

  // Update report status (Authority queue action)
  const handleUpdateReportStatus = (
    reportId: string,
    newStatus: ReportStatus,
    assignedTeam?: string,
    afterImageUrl?: string
  ) => {
    setReports(prev =>
      prev.map(rep => {
        if (rep.id === reportId) {
          return {
            ...rep,
            status: newStatus,
            assignedTeam: assignedTeam || rep.assignedTeam,
            afterImageUrl: afterImageUrl || rep.afterImageUrl
          };
        }
        return rep;
      })
    );

    // If case resolved, boost locality score
    if (newStatus === 'resolved' || newStatus === 'citizen_verified') {
      const targetReport = reports.find(r => r.id === reportId);
      if (targetReport) {
        setLocalities(prevLocs =>
          prevLocs.map(loc => {
            if (loc.id === targetReport.location.localityId) {
              const updatedUnresolved = Math.max(0, loc.unresolvedCount - 1);
              const updatedScore = Math.min(100, loc.civicScore + 6);
              return {
                ...loc,
                unresolvedCount: updatedUnresolved,
                civicScore: updatedScore
              };
            }
            return loc;
          })
        );
      }
    }
  };

  // Community verification vote action
  const handleVerifyReport = (reportId: string, isValid: boolean) => {
    if (isValid) {
      setReports(prev =>
        prev.map(rep => {
          if (rep.id === reportId) {
            return {
              ...rep,
              status: 'verified',
              communityVerificationsCount: rep.communityVerificationsCount + 1
            };
          }
          return rep;
        })
      );
      setUserProgress(prev => ({
        ...prev,
        points: prev.points + 10,
        communityVerificationsDone: prev.communityVerificationsDone + 1
      }));
    } else {
      // Flagged as spam
      setReports(prev => prev.filter(r => r.id !== reportId));
      setUserProgress(prev => ({
        ...prev,
        points: Math.max(0, prev.points - 50),
        trustScore: Math.max(0, prev.trustScore - 5)
      }));
    }
  };

  // Citizen confirms authority resolution
  const handleConfirmResolution = (reportId: string) => {
    handleUpdateReportStatus(reportId, 'citizen_verified');
    setUserProgress(prev => ({
      ...prev,
      points: prev.points + 20,
      resolutionsConfirmed: prev.resolutionsConfirmed + 1
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProgress={userProgress}
        domainConfig={domainConfig}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Objective Functional Hero Banner (Shown on Heatmap / Dashboard tab) */}
        {activeTab === 'heatmap' && (
          <div className="bg-slate-900 border border-slate-800 rounded-md p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Civic Participation Infrastructure &bull; Live Network</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Civic Participation Ecosystem for Real-Time Issue Reporting, Heatmap Tracking, and Resolution Workflows
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Empowering citizens and municipal teams with verified evidence, AI classification, automated routing, and transparent civic health metrics.
                </p>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('report')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm flex items-center space-x-2"
                  >
                    <PlusSquare className="w-4 h-4" />
                    <span>Report Civic Issue at Location</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('authority')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm px-4 py-2.5 rounded-md transition-colors flex items-center space-x-2"
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Municipal Control Queue</span>
                  </button>
                </div>
              </div>

              {/* Real Operational Metrics Box (Computed directly from live data) */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-md space-y-3 min-w-[260px] text-xs font-mono">
                <div className="text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 pb-2">
                  System Live Metrics
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Active Reports:</span>
                  <span className="font-bold text-white text-sm">{reports.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Verified &amp; Resolved:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {reports.filter(r => r.status === 'resolved' || r.status === 'citizen_verified').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Active Wards Monitored:</span>
                  <span className="font-bold text-sky-400 text-sm">{localities.length} Wards</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">User Civic Streak:</span>
                  <span className="font-bold text-amber-400 text-sm">{userProgress.currentStreak} Days</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab View Switcher */}
        {activeTab === 'heatmap' && (
          <CivicHeatmap
            localities={localities}
            reports={reports}
            onSelectReport={(rep) => setInspectedReport(rep)}
            onOpenReportModal={() => setActiveTab('report')}
          />
        )}

        {activeTab === 'report' && (
          <ReportIssue
            localities={localities}
            onSubmitReport={handleCreateReport}
            onCancel={() => setActiveTab('heatmap')}
          />
        )}

        {activeTab === 'authority' && (
          <AuthorityDashboard
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        )}

        {activeTab === 'verification' && (
          <CommunityVerification
            reports={reports}
            userProgress={userProgress}
            onVerifyReport={handleVerifyReport}
            onConfirmResolution={handleConfirmResolution}
          />
        )}

        {activeTab === 'progression' && (
          <CivicProgression
            userProgress={userProgress}
            localities={localities}
          />
        )}

        {activeTab === 'privacy' && <PrivacyPolicy />}

        {activeTab === 'terms' && <TermsConditions />}
      </main>

      {/* Case Detailed Inspection Modal */}
      {inspectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-md p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-emerald-400 font-mono text-xs uppercase font-bold">
                  Case ID: #{inspectedReport.id} &bull; {inspectedReport.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{inspectedReport.title}</h3>
              </div>
              <button
                onClick={() => setInspectedReport(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">{inspectedReport.description}</p>

            <div className="h-56 border border-slate-800 rounded-md overflow-hidden bg-slate-950">
              <img src={inspectedReport.imageUrl} alt="Case Evidence" className="w-full h-full object-cover" />
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded-md text-xs font-mono space-y-1 text-slate-300">
              <p>Address: {inspectedReport.location.address}</p>
              <p>Locality: {inspectedReport.location.localityName}</p>
              <p>AI Classification Confidence: {inspectedReport.aiConfidence}%</p>
              <p>Pipeline Status: <span className="text-emerald-400 uppercase">{inspectedReport.status.replace('_', ' ')}</span></p>
              <p>Timestamp: {inspectedReport.timestamp}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectedReport(null)}
                className="bg-slate-800 text-slate-200 px-4 py-1.5 rounded-md text-xs font-medium"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Domain Launch Status Modal */}
      {isDomainModalOpen && (
        <DomainLaunchStatus
          domainConfig={domainConfig}
          onClose={() => setIsDomainModalOpen(false)}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Footer Bar */}
      <Footer
        onNavigateTab={(tab) => setActiveTab(tab)}
        domainConfig={domainConfig}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />
    </div>
  );
};
