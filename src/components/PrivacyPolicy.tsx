import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-md p-6 sm:p-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Lock className="w-4 h-4" />
          <span>Legal Compliance</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Effective Date: October 4, 2026 &bull; Domain: civicsense.org
        </p>
      </div>

      <div className="space-y-5 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Information Collection and Purpose</h2>
          <p>
            CivicSense collects information submitted directly by users for the explicit purpose of identifying, categorizing, mapping, and resolving public civic issues. Collected data includes geo-location coordinates (latitude and longitude), evidence photographs of public infrastructure or environmental hazards, user-provided descriptions, and user profile metadata required to maintain trust scores and civic progression streaks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Geo-Location Data Usage</h2>
          <p>
            Geo-tagging is fundamental to civic issue resolution. When you submit a report, your device location is recorded to pin the exact geographic position of the civic concern on our public heatmap and route the ticket to responsible municipal maintenance authorities. Users can review and adjust location accuracy prior to submission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Photography and Public Space Privacy</h2>
          <p>
            Evidence photographs must focus strictly on public space infrastructure, sanitation spills, water leaks, road damage, or public property. Users are instructed not to capture private residential interiors or identifiable personal vehicle license plates without authorization. CivicSense processes images through automated filters to flag irrelevant or private content.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Data Sharing with Municipal Authorities</h2>
          <p>
            CivicSense shares geo-tagged issue data, evidence photos, category severity metrics, and resolution progress with designated municipal departments, local government crews, and community verification teams. We do not sell user personal data to third-party commercial advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">5. Account Progression and Trust Scores</h2>
          <p>
            User activity metrics (including verified reports, streak history, trust score calculation, and unlocked badges) are preserved in your account profile to prevent platform abuse and recognize sustained civic participation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">6. Contact and Data Requests</h2>
          <p>
            For privacy inquiries, data deletion requests, or account verification assistance, contact our data compliance office at privacy@civicsense.org.
          </p>
        </section>
      </div>
    </div>
  );
};
