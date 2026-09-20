import React from 'react';
import { IdentificationHistoryItem, PlantData } from '../types';
import { AYURVEDIC_PLANTS } from '../data/plants';
import { History, Trash2, Sparkles, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface IdentificationHistoryViewProps {
  history: IdentificationHistoryItem[];
  onClearHistory: () => void;
  onSelectPlant: (plant: PlantData) => void;
  onStartIdentifying: () => void;
}

export const IdentificationHistoryView: React.FC<IdentificationHistoryViewProps> = ({
  history,
  onClearHistory,
  onSelectPlant,
  onStartIdentifying,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider liquid-glass-pill text-emerald-800 dark:text-emerald-300 px-3.5 py-1 rounded-full">
            Session Activity Log
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight font-serif-display">
            Recent Identifications
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Review your previously analyzed leaf specimens and confidence evaluations.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            id="clear-history-btn"
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History Items List or Empty State */}
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => {
            const matchedPlant =
              item.predictedPlantId !== 'unknown'
                ? AYURVEDIC_PLANTS[item.predictedPlantId]
                : undefined;

            const isConfident = item.predictedPlantId !== 'unknown' && item.confidence >= 70;

            return (
              <div
                key={item.id}
                className="liquid-glass rounded-3xl p-5 shadow-lg border border-white/70 dark:border-white/10 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-900 border border-white/40 dark:border-white/15 shrink-0 shadow-xs">
                    {item.userImageBase64 ? (
                      <img
                        src={item.userImageBase64.startsWith('data:') ? item.userImageBase64 : `data:image/jpeg;base64,${item.userImageBase64}`}
                        alt={item.plantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        <History className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Identification Details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-serif-display">
                        {item.plantName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isConfident
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {item.confidence}% Confidence
                      </span>
                    </div>

                    <p className="text-xs text-emerald-700 dark:text-emerald-400 italic font-serif">
                      {item.scientificName}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="self-end sm:self-center">
                  {matchedPlant ? (
                    <button
                      onClick={() => onSelectPlant(matchedPlant)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full liquid-btn-secondary text-xs font-semibold"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>View Ayurvedic Info</span>
                    </button>
                  ) : (
                    <span className="text-xs text-amber-700 dark:text-amber-300 italic flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      Uncertain Specimen
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="liquid-glass rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-xl border border-white/70 dark:border-white/10">
          <div className="w-12 h-12 rounded-2xl liquid-glass-pill text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
            <History className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">No Identifications Yet</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Upload a leaf photo to begin classifying Ayurvedic medicinal plants with AI.
            </p>
          </div>
          <button
            onClick={onStartIdentifying}
            id="start-first-identification-btn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-btn-primary text-xs font-semibold shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Identify a Plant Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
