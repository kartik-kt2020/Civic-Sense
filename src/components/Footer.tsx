import React from 'react';
import { ShieldCheck, Globe, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { DomainConfig } from '../types';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  domainConfig: DomainConfig;
  onOpenDomainModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  domainConfig,
  onOpenDomainModal
}) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-base font-bold text-white tracking-tight">CivicSense</span>
              <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono px-2 py-0.5 rounded-sm">
                v1.0 Production Release
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              Real-time civic participation ecosystem. Connecting citizen evidence with municipal resolution workflows, transparent civic health indexing, and impact-based progression.
            </p>
            <div className="flex items-center space-x-3 text-slate-300 font-mono text-[11px] pt-1">
              <button
                onClick={onOpenDomainModal}
                className="hover:text-emerald-400 transition-colors flex items-center space-x-1"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Domain: {domainConfig.domain}</span>
              </button>
              <span>&bull;</span>
              <span className="text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SSL TLS 1.3 Active</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Navigation Modules</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('heatmap')} className="hover:text-emerald-400 transition-colors">
                  Live Civic Heatmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('report')} className="hover:text-emerald-400 transition-colors">
                  Report Civic Issue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('authority')} className="hover:text-emerald-400 transition-colors">
                  Authority Control Queue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('verification')} className="hover:text-emerald-400 transition-colors">
                  Community Verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('progression')} className="hover:text-emerald-400 transition-colors">
                  Progression &amp; Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Governance &amp; Privacy</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('privacy')} className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('terms')} className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenDomainModal} className="hover:text-emerald-400 transition-colors">
                  Pre-Launch Verification Checklist
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>&copy; 2026 CivicSense Municipal Infrastructure System. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>DNS A Record: {domainConfig.aRecord}</span>
            <span>CNAME: {domainConfig.cnameRecord}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
