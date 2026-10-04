import React from 'react';
import { ShieldCheck, Map, PlusSquare, Building2, CheckCircle2, Award, Globe, FileText, Lock } from 'lucide-react';
import { UserProgress, DomainConfig } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: UserProgress;
  domainConfig: DomainConfig;
  onOpenDomainModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userProgress,
  domainConfig,
  onOpenDomainModal
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('heatmap')}>
            <div className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-md flex items-center justify-center text-emerald-400 font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white">CivicSense</span>
                <span className="text-xs bg-emerald-950 border border-emerald-800 text-emerald-400 font-medium px-2 py-0.5 rounded-sm">
                  Official Platform
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Real-Time Civic Health & Issue Resolution</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'heatmap'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Civic Heatmap</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'report'
                  ? 'bg-emerald-700 text-white font-semibold border border-emerald-600'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700 border border-emerald-700'
              }`}
            >
              <PlusSquare className="w-4 h-4" />
              <span>Report Issue</span>
            </button>

            <button
              onClick={() => setActiveTab('authority')}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'authority'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Authority Queue</span>
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'verification'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verification</span>
            </button>

            <button
              onClick={() => setActiveTab('progression')}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'progression'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Progression & Rewards</span>
            </button>
          </nav>

          {/* Right Status Actions & User Info */}
          <div className="flex items-center space-x-3">
            {/* Custom Domain Launch Status Badge */}
            <button
              onClick={onOpenDomainModal}
              className="hidden sm:flex items-center space-x-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-md transition-colors"
              title="View Domain & Pre-Launch Checklist"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-slate-200">{domainConfig.domain}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* User League & Points Badge */}
            <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md text-xs">
              <div className="text-slate-300">
                <span className="font-semibold text-emerald-400">{userProgress.league}</span>
                <span className="text-slate-500 mx-1 border-r border-slate-700 h-3 inline-block vertical-middle" />
                <span className="font-mono text-slate-200">{userProgress.points} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'heatmap' ? 'bg-emerald-800 text-white font-medium' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Heatmap
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'report' ? 'bg-emerald-700 text-white font-bold' : 'bg-slate-800 text-emerald-400'
            }`}
          >
            + Report Issue
          </button>
          <button
            onClick={() => setActiveTab('authority')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'authority' ? 'bg-emerald-800 text-white font-medium' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Authority Queue
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'verification' ? 'bg-emerald-800 text-white font-medium' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Verification
          </button>
          <button
            onClick={() => setActiveTab('progression')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'progression' ? 'bg-emerald-800 text-white font-medium' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Progression
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'privacy' ? 'bg-emerald-800 text-white font-medium' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'terms' ? 'bg-emerald-800 text-white font-medium' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Terms
          </button>
        </div>
      </div>
    </header>
  );
};
