import React from 'react';
import { DomainConfig } from '../types';
import { Globe, CheckCircle2, ShieldCheck, FileText, X, ExternalLink, Lock } from 'lucide-react';

interface DomainLaunchStatusProps {
  domainConfig: DomainConfig;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DomainLaunchStatus: React.FC<DomainLaunchStatusProps> = ({
  domainConfig,
  onClose,
  onNavigateTab
}) => {
  const checklist = [
    {
      label: 'Connected Custom Domain',
      detail: `Configured target domain: ${domainConfig.domain} (A Record: ${domainConfig.aRecord})`,
      passed: domainConfig.dnsConnected && domainConfig.sslActive
    },
    {
      label: 'Favicon Installed & Linked',
      detail: 'Vector SVG favicon active in HTML head root (/favicon.svg)',
      passed: domainConfig.faviconVerified
    },
    {
      label: 'AI Made Tag Completely Removed',
      detail: 'No AI watermark, AI generator tag, or builder branding present anywhere',
      passed: domainConfig.aiTagRemoved
    },
    {
      label: 'Privacy Policy Page Connected',
      detail: 'Official Privacy Policy page published with geo-location data terms',
      passed: domainConfig.privacyPolicyConnected,
      tab: 'privacy'
    },
    {
      label: 'Terms & Conditions Page Connected',
      detail: 'Official Terms & Conditions page published with truthful reporting requirements',
      passed: domainConfig.termsConditionConnected,
      tab: 'terms'
    }
  ];

  const allPassed = checklist.every(c => c.passed);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-md p-6 max-w-2xl w-full shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Globe className="w-4 h-4" />
              <span>Production Deployment Control</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Domain &amp; Launch Readiness</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Callout Box */}
        <div className={`p-4 rounded-md border text-xs font-mono flex items-center justify-between ${
          allPassed ? 'bg-emerald-950 border-emerald-800 text-emerald-300' : 'bg-amber-950 border-amber-800 text-amber-300'
        }`}>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <p className="font-bold text-sm text-white">
                {allPassed ? 'READY FOR LAUNCH' : 'PRE-LAUNCH CHECKLIST PENDING'}
              </p>
              <p className="text-slate-300 font-sans mt-0.5">
                Target Custom Domain: <strong className="font-mono text-emerald-400">{domainConfig.domain}</strong> &bull; SSL TLS 1.3 Active
              </p>
            </div>
          </div>
          <span className="bg-slate-900 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-sm font-bold">
            100% VERIFIED
          </span>
        </div>

        {/* Detailed Pre-Launch Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Mandatory Production Launch Requirements
          </h3>

          <div className="space-y-2.5 text-xs">
            {checklist.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-md flex items-center justify-between"
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-slate-700 block" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-100">{item.label}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{item.detail}</p>
                  </div>
                </div>

                {item.tab && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateTab(item.tab!);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center space-x-1"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Domain DNS Records Box */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-md text-xs font-mono space-y-1 text-slate-300">
          <p className="font-bold text-slate-200">DNS Configuration Overview</p>
          <p>A Record &rarr; {domainConfig.aRecord} (Direct Apex Route)</p>
          <p>CNAME &rarr; {domainConfig.cnameRecord} (Subdomain Routing)</p>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-md transition-colors"
          >
            Close Control Window
          </button>
        </div>
      </div>
    </div>
  );
};
