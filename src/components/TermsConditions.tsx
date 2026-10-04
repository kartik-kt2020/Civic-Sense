import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-md p-6 sm:p-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <FileText className="w-4 h-4" />
          <span>Platform Governance</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Terms &amp; Conditions</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Effective Date: October 4, 2026 &bull; Domain: civicsense.org
        </p>
      </div>

      <div className="space-y-5 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the CivicSense platform (civicsense.org), you agree to be bound by these Terms and Conditions. CivicSense is a civic participation ecosystem designed for authentic issue reporting, live heatmap tracking, and verified resolution workflows.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Truthful Reporting Requirement</h2>
          <p>
            Users warrant that all submitted reports, evidence photographs, and location tags represent genuine, real-time civic issues. Submitting fabricated evidence, false reports, misleading severity ratings, or duplicate spam reports is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Trust Score &amp; Penalty Mechanism</h2>
          <p>
            To uphold platform integrity, CivicSense enforces an automated and community-driven trust score system. Submitting a verified authentic report adds points and builds trust score. Conversely, submitting false or spam reports results in an immediate deduction (-50 points) and trust score reduction. Repeated violations will result in account suspension.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Community Verification Rules</h2>
          <p>
            Community members participating in verification votes or before/after resolution checks must act impartially. Verification decisions must be based on observable visual evidence.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">5. Intellectual Property and Content License</h2>
          <p>
            By uploading evidence photos or descriptions, you grant CivicSense a non-exclusive, royalty-free license to host, display, and transmit such content to municipal authorities and public civic heatmaps for resolution tracking.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">6. Limitation of Liability</h2>
          <p>
            CivicSense functions as a decision-support and dispatch tracking ecosystem. While we facilitate report routing to authorities, physical maintenance work and emergency response remain under the jurisdiction of municipal teams.
          </p>
        </section>
      </div>
    </div>
  );
};
