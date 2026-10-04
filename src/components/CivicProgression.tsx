import React from 'react';
import { UserProgress, Locality } from '../types';
import { Award, Flame, ShieldCheck, CheckCircle2, Trophy, Star, Zap, TrendingUp } from 'lucide-react';

interface CivicProgressionProps {
  userProgress: UserProgress;
  localities: Locality[];
}

export const CivicProgression: React.FC<CivicProgressionProps> = ({
  userProgress,
  localities
}) => {
  const leagueTiers = [
    { level: 1, name: 'Civic Starter', pointsRange: '0 to 499 pts', rewards: 'Digital badge & profile frame' },
    { level: 2, name: 'Civic Supporter', pointsRange: '500 to 1,499 pts', rewards: 'Wallpapers & participation certificate' },
    { level: 3, name: 'Civic Champion', pointsRange: '1,500 to 2,999 pts', rewards: 'Official certificate & champion badge' },
    { level: 4, name: 'Civic Leader', pointsRange: '3,000 to 5,999 pts', rewards: 'CivicSense shirt & featured profile' },
    { level: 5, name: 'Civic Guardian', pointsRange: '6,000+ pts', rewards: 'Hall of Fame & premium merchandise' }
  ];

  const pointRules = [
    { action: 'Valid civic report submitted', points: '+20 pts' },
    { action: 'AI / system verification passed', points: '+10 pts' },
    { action: 'Community report verification vote', points: '+10 pts' },
    { action: 'Reported issue successfully resolved', points: '+30 pts' },
    { action: 'Citizen confirms resolution after photo', points: '+20 pts' },
    { action: 'Meaningful civic challenge completed', points: '+50 pts' },
    { action: 'Cleanup / community activity', points: '+75 pts' },
    { action: 'False or spam report submitted', points: '-50 pts' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Civic Participation &amp; Progression</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Citizen Progression &amp; Rewards</h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Civic responsibility structured as tangible progression. Points derive strictly from verified community impact rather than report volume.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-md text-xs font-mono">
              <span className="text-slate-400 block">Total Impact Points</span>
              <span className="text-2xl font-bold text-emerald-400">{userProgress.points} pts</span>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-md text-xs font-mono">
              <span className="text-slate-400 block">Current Streak</span>
              <span className="text-2xl font-bold text-amber-400 flex items-center space-x-1">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500 inline" />
                <span>{userProgress.currentStreak} Days</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 17-Day Civic Streak Tracker Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-md p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Active Civic Action Streak (17-Day Record)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              One verified civic action per day maintains streak. Milestones at 3, 7, 14, 30, 60, and 100 days.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-sm">
            Milestone 14-Day Passed!
          </div>
        </div>

        {/* 7-Day Weekly Pattern Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
          {userProgress.streakWeeklyMap.map((item, index) => (
            <div
              key={index}
              className={`border rounded-md p-3 text-center space-y-1 ${
                item.active
                  ? 'bg-slate-800/90 border-emerald-700/80 text-slate-100'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider">{item.day}</div>
              <div className="w-6 h-6 rounded-sm bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto my-1">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">{item.activity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* League Tiers & Point Rules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* League Progression Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-md p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              <span>League Progression Tiers</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Advance through verified civic impact milestones</p>
          </div>

          <div className="space-y-3 text-xs">
            {leagueTiers.map(tier => {
              const isCurrent = userProgress.league === tier.name;
              return (
                <div
                  key={tier.level}
                  className={`p-3 rounded-md border transition-colors ${
                    isCurrent
                      ? 'bg-slate-800 border-emerald-600 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                      <span>League {tier.level}: {tier.name}</span>
                      {isCurrent && (
                        <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded-sm font-semibold">
                          Current Tier
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-emerald-400">{tier.pointsRange}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Rewards: {tier.rewards}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Point Rules Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-md p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Impact Point Allocation Model</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Point ledger rewards quality and verification</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-slate-800 text-slate-300 font-semibold border-b border-slate-700">
                  <th className="p-2.5">Civic Action</th>
                  <th className="p-2.5 text-right">Points Earned / Deducted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {pointRules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-2.5 text-slate-300 font-sans">{rule.action}</td>
                    <td className={`p-2.5 text-right font-bold ${rule.points.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {rule.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Badges & Achievements Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-md p-6 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Star className="w-5 h-5 text-emerald-400" />
            <span>Civic Badges &amp; Achievements</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Unlocked by verified milestone contributions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProgress.achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-md border text-xs space-y-2 ${
                ach.unlocked
                  ? 'bg-slate-800/90 border-emerald-700/80 text-slate-100'
                  : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{ach.name}</span>
                {ach.unlocked ? (
                  <span className="bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] px-2 py-0.5 rounded-sm font-semibold">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-sm">
                    LOCKED
                  </span>
                )}
              </div>

              <p className="text-slate-300 text-[11px]">{ach.description}</p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                <span>Progress: {ach.currentCount} / {ach.requiredCount}</span>
                <div className="w-24 bg-slate-900 h-1.5 rounded-sm overflow-hidden border border-slate-700">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${Math.min(100, (ach.currentCount / ach.requiredCount) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
