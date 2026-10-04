import React, { useState } from 'react';
import { CivicReport, UserProgress } from '../types';
import { CheckCircle2, ShieldCheck, ThumbsUp, AlertTriangle, Eye, ArrowRight, UserCheck, ShieldAlert } from 'lucide-react';

interface CommunityVerificationProps {
  reports: CivicReport[];
  userProgress: UserProgress;
  onVerifyReport: (reportId: string, isValid: boolean) => void;
  onConfirmResolution: (reportId: string) => void;
}

export const CommunityVerification: React.FC<CommunityVerificationProps> = ({
  reports,
  userProgress,
  onVerifyReport,
  onConfirmResolution
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved_check'>('pending');
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  // Unverified reported cases requiring community confirmation
  const pendingReports = reports.filter(r => r.status === 'reported');

  // Resolved cases awaiting citizen confirmation of before/after photos
  const resolvedAwaitingConfirmation = reports.filter(r => r.status === 'resolved');

  const handleCommunityVote = (reportId: string, isValid: boolean) => {
    onVerifyReport(reportId, isValid);
    setVerificationFeedback(isValid ? '+10 Impact Points added! Case verified by community.' : 'Case flagged for spam review.');
    setTimeout(() => setVerificationFeedback(null), 3000);
  };

  const handleResolutionConfirmation = (reportId: string) => {
    onConfirmResolution(reportId);
    setVerificationFeedback('+20 Impact Points earned! Resolution confirmed by community.');
    setTimeout(() => setVerificationFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Trust &amp; Community Verification Hub</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Community Verification Protocol</h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Prevent spam, confirm report validity, and validate municipal before/after resolution evidence. Your trust score protects platform integrity.
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-3 rounded-md text-xs font-mono">
            <span className="text-slate-400 block">Your Trust Score</span>
            <span className="text-xl font-bold text-emerald-400">{userProgress.trustScore} / 100</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">High Reputation Contributor</span>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex space-x-3 mt-6 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium rounded-md transition-colors ${
              activeTab === 'pending'
                ? 'bg-emerald-700 text-white border border-emerald-600 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Pending Community Verification ({pendingReports.length})
          </button>
          <button
            onClick={() => setActiveTab('resolved_check')}
            className={`px-4 py-2 font-medium rounded-md transition-colors ${
              activeTab === 'resolved_check'
                ? 'bg-emerald-700 text-white border border-emerald-600 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Confirm Resolved Work ({resolvedAwaitingConfirmation.length})
          </button>
        </div>
      </div>

      {verificationFeedback && (
        <div className="bg-emerald-950 border border-emerald-800 rounded-md p-4 text-xs font-mono text-emerald-300 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{verificationFeedback}</span>
        </div>
      )}

      {/* Main Tab Content */}
      {activeTab === 'pending' ? (
        <div className="space-y-4">
          {pendingReports.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-md p-8 text-center text-slate-400 text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-semibold text-slate-200">No pending reports awaiting verification in your area.</p>
              <p>All citizen reports are currently verified or assigned to municipal teams.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingReports.map(rep => (
                <div key={rep.id} className="bg-slate-900 border border-slate-800 rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                    <span className="font-mono text-emerald-400 font-bold">#{rep.id}</span>
                    <span className="uppercase text-[10px] px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 border border-slate-700">
                      {rep.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{rep.title}</h3>
                  <p className="text-xs text-slate-300">{rep.description}</p>

                  <div className="h-44 border border-slate-800 rounded-md overflow-hidden bg-slate-950">
                    <img src={rep.imageUrl} alt="Case evidence" className="w-full h-full object-cover" />
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 space-y-1 bg-slate-950 p-2.5 rounded-sm border border-slate-800">
                    <p>Address: {rep.location.address}</p>
                    <p>AI Classification Confidence: <span className="text-emerald-400">{rep.aiConfidence}%</span></p>
                    <p>Reporter: {rep.reporterName}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => handleCommunityVote(rep.id, false)}
                      className="w-1/2 bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 py-2 rounded-md font-semibold transition-colors flex items-center justify-center space-x-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Flag Fake / Spam (-50)</span>
                    </button>
                    <button
                      onClick={() => handleCommunityVote(rep.id, true)}
                      className="w-1/2 bg-emerald-700 hover:bg-emerald-600 text-white py-2 rounded-md font-bold transition-colors flex items-center justify-center space-x-1"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Confirm Valid (+10)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {resolvedAwaitingConfirmation.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-md p-8 text-center text-slate-400 text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-semibold text-slate-200">No resolved cases awaiting citizen confirmation.</p>
              <p>When municipal teams resolve issues, before/after evidence photos will appear here for community review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resolvedAwaitingConfirmation.map(rep => (
                <div key={rep.id} className="bg-slate-900 border border-slate-800 rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                    <span className="font-mono text-emerald-400 font-bold">#{rep.id}</span>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-sm font-semibold uppercase">
                      Resolution Submitted
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{rep.title}</h3>
                  <p className="text-xs text-slate-300 font-mono">Assigned Crew: {rep.assignedTeam || 'Municipal Response Unit'}</p>

                  {/* Before vs After Side-by-Side Comparison */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block">BEFORE REPORT PHOTO</span>
                      <img src={rep.imageUrl} alt="Before" className="w-full h-32 object-cover rounded-sm border border-slate-800" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-emerald-400 font-semibold block">AFTER RESOLUTION PHOTO</span>
                      <img src={rep.afterImageUrl || rep.imageUrl} alt="After" className="w-full h-32 object-cover rounded-sm border border-slate-800" />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => handleResolutionConfirmation(rep.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-md transition-colors shadow-sm flex items-center justify-center space-x-1"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Confirm Issue Fixed (+20 pts)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
