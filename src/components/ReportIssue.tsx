import React, { useState } from 'react';
import { CivicCategory, SeverityLevel, CivicReport, Locality } from '../types';
import { Camera, MapPin, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Upload, X } from 'lucide-react';

interface ReportIssueProps {
  localities: Locality[];
  onSubmitReport: (newReport: CivicReport) => void;
  onCancel: () => void;
}

export const ReportIssue: React.FC<ReportIssueProps> = ({
  localities,
  onSubmitReport,
  onCancel
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CivicCategory>('waste');
  const [severity, setSeverity] = useState<SeverityLevel>('moderate');
  const [description, setDescription] = useState('');
  const [localityId, setLocalityId] = useState<string>(localities[0]?.id || 'loc-1');
  const [address, setAddress] = useState('Sector 4 Main Road, Indirapuram');
  const [lat, setLat] = useState<number>(28.6366);
  const [lng, setLng] = useState<number>(77.3732);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiConfidence, setAiConfidence] = useState<number>(94);
  const [aiCategorySuggestion, setAiCategorySuggestion] = useState<CivicCategory>('waste');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Handle local image file upload or generate fallback evidence preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Simulate AI classification on image upload
        if (title.toLowerCase().includes('water') || title.toLowerCase().includes('pipe')) {
          setAiCategorySuggestion('water');
          setCategory('water');
        } else if (title.toLowerCase().includes('road') || title.toLowerCase().includes('pothole')) {
          setAiCategorySuggestion('roads');
          setCategory('roads');
        } else {
          setAiCategorySuggestion('waste');
          setCategory('waste');
        }
        setAiConfidence(92);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick preset evidence image generator
  const handlePresetEvidence = (presetCategory: CivicCategory) => {
    setCategory(presetCategory);
    setAiCategorySuggestion(presetCategory);
    setAiConfidence(95);

    const bgMap: Record<CivicCategory, { bg: string; text: string; color: string }> = {
      waste: { bg: '#1e1b4b', text: 'GARBAGE SPILL EVIDENCE', color: '#ef4444' },
      water: { bg: '#0f172a', text: 'WATER LEAKAGE EVIDENCE', color: '#3b82f6' },
      drainage: { bg: '#171717', text: 'DRAIN BLOCKAGE EVIDENCE', color: '#f97316' },
      roads: { bg: '#18181b', text: 'ROAD DAMAGE EVIDENCE', color: '#eab308' },
      hygiene: { bg: '#1e293b', text: 'PUBLIC SANITATION EVIDENCE', color: '#eab308' },
      infrastructure: { bg: '#27272a', text: 'INFRASTRUCTURE DAMAGE EVIDENCE', color: '#ef4444' }
    };

    const info = bgMap[presetCategory];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="${info.bg}" />
      <circle cx="300" cy="180" r="48" fill="${info.color}" opacity="0.3" />
      <text x="300" y="188" font-family="monospace, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">${info.text}</text>
      <text x="300" y="230" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">GEO-TAGGED TIME STAMP: ${new Date().toISOString()}</text>
    </svg>`;
    setImagePreview(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    const selectedLocality = localities.find(l => l.id === localityId) || localities[0];

    const newReport: CivicReport = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      category,
      description: description.trim() || 'Civic issue captured via mobile reporting interface.',
      location: {
        lat,
        lng,
        address: address.trim() || `${selectedLocality.name} Central Ward`,
        localityId: selectedLocality.id,
        localityName: selectedLocality.name
      },
      severity,
      status: 'reported',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      imageUrl: imagePreview || `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#0f172a"/><text x="300" y="200" font-family="sans-serif" font-size="18" fill="#f8fafc" text-anchor="middle">CIVIC EVIDENCE PHOTO ATTACHED</text></svg>`)}`,
      aiConfidence,
      duplicateFlag: false,
      communityVerificationsCount: 1,
      reporterId: 'usr-901',
      reporterName: 'Aarav Sharma'
    };

    setTimeout(() => {
      onSubmitReport(newReport);
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onCancel();
      }, 1500);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-md p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Camera className="w-4 h-4" />
            <span>Citizen Submission Portal</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Report Civic Issue</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload geo-tagged evidence. Case automatically updates live heatmap and routes to municipal queue.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {successMessage ? (
        <div className="bg-emerald-950 border border-emerald-800 rounded-md p-6 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Report Successfully Registered!</h3>
          <p className="text-xs text-emerald-300 font-mono">
            +20 Civic Points earned! Case ID #REP-{Date.now().toString().slice(-4)} placed on heatmap.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Issue Title Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Issue Summary Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Overflowing garbage bins near Sector 4 market gate"
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Photo Evidence Upload Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Evidence Photo Upload *
            </label>

            {imagePreview ? (
              <div className="relative border border-slate-700 rounded-md overflow-hidden bg-slate-950 h-52">
                <img src={imagePreview} alt="Civic report evidence" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 bg-slate-900/90 text-slate-300 hover:text-white p-1.5 rounded-md text-xs border border-slate-700"
                >
                  Change Photo
                </button>
                <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-sm font-mono">
                  GPS: {lat.toFixed(4)}, {lng.toFixed(4)}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-700 hover:border-emerald-600 rounded-md p-6 text-center bg-slate-950/60 transition-colors">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-300 font-medium">Click to select photo or drop evidence image</p>
                <p className="text-[11px] text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-3 text-xs text-slate-400 file:bg-slate-800 file:text-slate-200 file:border-0 file:px-3 file:py-1.5 file:rounded-md file:cursor-pointer"
                />

                {/* Quick Sample Generators */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <p className="text-[11px] text-slate-400 mb-2">Or select category evidence sample:</p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    <button
                      type="button"
                      onClick={() => handlePresetEvidence('waste')}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md"
                    >
                      Waste Spill
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePresetEvidence('water')}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md"
                    >
                      Water Leak
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePresetEvidence('roads')}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md"
                    >
                      Pothole
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Category Analysis Result Card */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-md p-3 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">
                AI Classification: <strong className="text-white capitalize">{aiCategorySuggestion}</strong> ({aiConfidence}% confidence)
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">Manual override active</span>
          </div>

          {/* Category & Severity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CivicCategory)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="waste">Waste & Garbage</option>
                <option value="hygiene">Public Hygiene & Cleanliness</option>
                <option value="water">Water Leakage</option>
                <option value="drainage">Drainage & Sewage</option>
                <option value="roads">Road Hazards & Potholes</option>
                <option value="infrastructure">Public Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="minor">Minor (Low immediate impact)</option>
                <option value="moderate">Moderate (Requires attention)</option>
                <option value="serious">Serious (High recurrence / hazard)</option>
                <option value="critical">Critical (Immediate safety / health risk)</option>
              </select>
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Locality / Ward
              </label>
              <select
                value={localityId}
                onChange={(e) => setLocalityId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                {localities.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} Ward (Score: {loc.civicScore}/100)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Street Address / Landmark
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Near Gate 3, Sector 4 Main Road"
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Additional Context Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue condition, duration, or any safety notes..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-2 rounded-md transition-colors shadow-sm flex items-center space-x-2"
            >
              {isSubmitting ? (
                <span>Registering Case...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Verified Case (+20 pts)</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
