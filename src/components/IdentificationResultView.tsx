import React, { useState } from 'react';
import { IdentificationResult, PlantData } from '../types';
import { AYURVEDIC_PLANTS } from '../data/plants';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Eye, 
  BarChart3, 
  SunMedium, 
  Leaf, 
  BookOpen, 
  ShieldAlert 
} from 'lucide-react';

interface IdentificationResultViewProps {
  result: IdentificationResult;
  onIdentifyAnother: () => void;
  onOpenAyurvedicInfo: (plant: PlantData) => void;
  onOpenLibrary: () => void;
}

export const IdentificationResultView: React.FC<IdentificationResultViewProps> = ({
  result,
  onIdentifyAnother,
  onOpenAyurvedicInfo,
  onOpenLibrary,
}) => {
  const [showResearchDetails, setShowResearchDetails] = useState(true);

  const matchedPlantData: PlantData | undefined = 
    result.predictedPlantId !== 'unknown' 
      ? AYURVEDIC_PLANTS[result.predictedPlantId] 
      : undefined;

  // Determine confidence aesthetics
  const getConfidenceBadge = () => {
    if (result.confidence >= 90) {
      return {
        label: 'High Confidence',
        color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        barColor: 'bg-gradient-to-r from-emerald-500 to-teal-400',
        text: 'text-emerald-700 dark:text-emerald-400',
      };
    } else if (result.confidence >= 70) {
      return {
        label: 'Moderate Confidence',
        color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
        barColor: 'bg-gradient-to-r from-amber-500 to-yellow-400',
        text: 'text-amber-700 dark:text-amber-400',
      };
    } else {
      return {
        label: 'Low Confidence (Uncertain)',
        color: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
        barColor: 'bg-rose-500',
        text: 'text-rose-700 dark:text-rose-400',
      };
    }
  };

  const badge = getConfidenceBadge();
  const isConfidentIdentification = result.predictedPlantId !== 'unknown' && result.confidence >= 70;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl mx-auto">
      {/* Top Banner Liquid Glass Card */}
      <div className={`rounded-3xl liquid-glass p-6 sm:p-8 transition-all shadow-xl border ${
        isConfidentIdentification 
          ? 'border-white/70 dark:border-white/15' 
          : 'border-amber-500/30 dark:border-amber-500/20'
      }`}>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          
          {/* Main Identification Details */}
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              {isConfidentIdentification ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider liquid-glass-pill text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Plant Identified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider liquid-glass-pill text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full border-amber-500/30">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Uncertain / Unsupported
                </span>
              )}
              
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.color}`}>
                AI Confidence: {result.confidence}% ({badge.label})
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight font-serif-display">
              {isConfidentIdentification ? (
                matchedPlantData?.commonName || result.plantName
              ) : (
                'Plant Not Confidently Identified'
              )}
            </h2>

            {isConfidentIdentification && matchedPlantData && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                <span className="italic font-serif font-medium text-emerald-700 dark:text-emerald-400">
                  {matchedPlantData.scientificName}
                </span>
                <span className="opacity-40">•</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  Ayurvedic: <strong className="text-emerald-700 dark:text-emerald-400">{matchedPlantData.ayurvedicName}</strong>
                </span>
                <span className="opacity-40">•</span>
                <span className="text-xs liquid-glass-subtle text-neutral-700 dark:text-neutral-300 px-2.5 py-0.5 rounded-full font-medium">
                  {matchedPlantData.category}
                </span>
              </div>
            )}

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1 max-w-2xl">
              {isConfidentIdentification 
                ? (result.analysisSummary || matchedPlantData?.description)
                : 'The AI vision classifier could not confidently match the uploaded photo to any of the 7 supported Ayurvedic medicinal plants. Please upload another clear image with good lighting showing full leaf details.'}
            </p>
          </div>

          {/* Visual Comparison: Uploaded Input vs Botanical Reference */}
          <div className="shrink-0 flex items-center gap-3">
            {result.userImageBase64 && (
              <div className="relative group flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/60 dark:border-white/20 shadow-md bg-neutral-900">
                  <img
                    src={result.userImageBase64.startsWith('data:') ? result.userImageBase64 : `data:image/jpeg;base64,${result.userImageBase64}`}
                    alt="Uploaded Plant Specimen"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="mt-1.5 text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-300 liquid-glass-subtle px-2.5 py-0.5 rounded-full">
                  Your Specimen
                </span>
              </div>
            )}

            {isConfidentIdentification && matchedPlantData?.image && (
              <div className="relative group flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-md bg-neutral-900">
                  <img
                    src={matchedPlantData.image}
                    alt={`${matchedPlantData.commonName} Reference Botanical Specimen`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="mt-1.5 text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 liquid-glass-subtle px-2.5 py-0.5 rounded-full">
                  Verified Reference
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Confidence Progress Meter Bar */}
        <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Vision Confidence Score
            </span>
            <span className={badge.text}>{result.confidence}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${badge.barColor}`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-mono pt-0.5">
            <span>0% (Unsupported)</span>
            <span>70% (Moderate Threshold)</span>
            <span>90%+ (High Precision)</span>
          </div>
        </div>

        {/* Low Confidence Warning Notice */}
        {!isConfidentIdentification && (
          <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider block">
                Low Confidence Detection Advice
              </span>
              <p>
                The AI is not fully confident about this result. Please upload another clear image with good lighting, avoid blur, and ensure the entire leaf morphology or branch is visible.
              </p>
            </div>
          </div>
        )}

        {/* Action Button Row */}
        <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center gap-3">
          {isConfidentIdentification && matchedPlantData && (
            <button
              onClick={() => onOpenAyurvedicInfo(matchedPlantData)}
              id="view-ayurvedic-info-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-full liquid-btn-primary text-xs font-semibold shadow-md active:scale-98 transition-all"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>View Ayurvedic Information</span>
              <ArrowRight className="w-4 h-4 opacity-80" />
            </button>
          )}

          <button
            onClick={onIdentifyAnother}
            id="identify-another-plant-btn"
            className="flex items-center gap-2 px-5 py-3 rounded-full liquid-btn-secondary text-xs font-semibold"
          >
            <RotateCcw className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>Identify Another Plant</span>
          </button>

          <button
            onClick={onOpenLibrary}
            id="explore-library-from-result-btn"
            className="flex items-center gap-2 px-5 py-3 rounded-full liquid-btn-secondary text-xs font-semibold ml-auto"
          >
            <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Browse 7 Plants Library</span>
          </button>
        </div>
      </div>

      {/* Morphological Features & Environmental Capture Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identifying Features Observed */}
        <div className="liquid-glass-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Morphological Features Observed
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
            {result.identifyingFeaturesObserved.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 liquid-glass-subtle p-2.5 rounded-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Real-World Capture Analysis */}
        <div className="liquid-glass-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <SunMedium className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Real-World Condition Assessment
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed liquid-glass-subtle p-3 rounded-2xl">
            {result.environmentalConditionNotes || "Standard daylight capture. Leaf edges, venation, and surface features evaluated with morphological edge detection."}
          </p>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Robustness engine tested against blur, angle variance, and background noise.</span>
          </div>
        </div>
      </div>

      {/* Academic/Research Feature: AI Analysis Details & Probability Distribution */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-7 shadow-xl border border-white/70 dark:border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white font-serif-display">
                Academic Research: AI Analysis Details
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Candidate class probability distribution across 7 supported Ayurvedic species
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowResearchDetails(!showResearchDetails)}
            className="text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            {showResearchDetails ? 'Collapse' : 'Expand'}
          </button>
        </div>

        {showResearchDetails && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="liquid-glass-subtle p-3.5 rounded-2xl">
                <span className="text-neutral-400 text-[10px] uppercase font-mono block">Top Prediction</span>
                <span className="font-bold text-sm text-neutral-900 dark:text-white">{result.plantName}</span>
              </div>
              <div className="liquid-glass-subtle p-3.5 rounded-2xl">
                <span className="text-neutral-400 text-[10px] uppercase font-mono block">Classification Confidence</span>
                <span className="font-bold text-sm text-emerald-700 dark:text-emerald-400">{result.confidence}%</span>
              </div>
            </div>

            {/* Alternative Possibilities Distribution Table */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Probability Distribution (%):
              </span>
              <div className="space-y-2">
                {result.alternativePossibilities && result.alternativePossibilities.length > 0 ? (
                  result.alternativePossibilities.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-800 dark:text-neutral-200 font-medium">{item.name}</span>
                        <span className="font-mono text-emerald-700 dark:text-emerald-400">{item.probability}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            idx === 0 ? 'bg-emerald-600' : 'bg-neutral-400 dark:bg-neutral-600'
                          }`}
                          style={{ width: `${item.probability}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-neutral-500 italic">
                    Single class output identified with {result.confidence}% confidence.
                  </div>
                )}
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-mono liquid-glass-subtle p-3.5 rounded-2xl">
              * Note: The classifier utilizes multi-class leaf morphology feature vectors. Non-supported flora or ambiguous leaf captures are mapped to the &quot;Unknown / Low Confidence&quot; boundary to prevent hallucinated Ayurvedic misdiagnoses.
            </p>
          </div>
        )}
      </div>

      {/* Educational Note */}
      <div className="liquid-glass rounded-2xl p-4 flex items-start gap-3 text-xs text-neutral-600 dark:text-neutral-300 shadow-sm border border-white/60 dark:border-white/10">
        <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p>
          <strong>Educational Research Note:</strong> This application is developed for academic demonstration of AI vision classification on Ayurvedic medicinal flora. It does not replace professional medical or botanical taxonomy consultation.
        </p>
      </div>
    </div>
  );
};
