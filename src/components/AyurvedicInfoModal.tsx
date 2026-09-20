import React from 'react';
import { PlantData } from '../types';
import { 
  X, 
  ShieldAlert, 
  Sparkles, 
  Flame, 
  Droplet, 
  Wind, 
  CheckCircle2, 
  AlertTriangle,
  Beaker,
  HeartPulse,
  Leaf
} from 'lucide-react';

interface AyurvedicInfoModalProps {
  plant: PlantData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AyurvedicInfoModal: React.FC<AyurvedicInfoModalProps> = ({
  plant,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="liquid-glass rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-white/70 dark:border-white/15 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="relative bg-neutral-950 text-white px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden shrink-0">
          {/* Subtle botanical image background blur */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: `url(${plant.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-emerald-950/80" />

          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider liquid-glass-pill text-emerald-200 bg-white/10 border-white/20 px-3 py-0.5 rounded-full">
                {plant.category} • {plant.botanicalFamily}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                ID: {plant.plantId}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif-display">
              {plant.commonName}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-300">
              <span className="italic font-serif text-emerald-300">{plant.scientificName}</span>
              <span className="opacity-40">•</span>
              <span className="font-medium text-white">{plant.ayurvedicName}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-ayurvedic-modal-btn"
            className="relative z-10 self-start sm:self-center p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Ayurvedic Information"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Top Description & Identifying Characteristics */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Botanical Overview & Morphology
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200 text-base leading-relaxed">
              {plant.description}
            </p>
            <div className="liquid-glass-subtle rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white mb-2">
                Key Visual Identifying Characteristics:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                {plant.identifyingFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Ayurvedic Dravyaguna Properties Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-1.5 font-serif-display">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Ayurvedic Dravyaguna (Energetics)
              </h3>
              <span className="text-[11px] text-neutral-400 font-medium">Classical Energetic Profile</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Rasa */}
              <div className="liquid-glass-subtle rounded-2xl p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                  Rasa (Taste)
                </span>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {plant.properties.rasa.join(', ')}
                </p>
              </div>

              {/* Virya */}
              <div className="liquid-glass-subtle rounded-2xl p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                  Virya (Potency)
                </span>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {plant.properties.virya}
                </p>
              </div>

              {/* Vipaka */}
              <div className="liquid-glass-subtle rounded-2xl p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                  Vipaka (Post-Digestive)
                </span>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {plant.properties.vipaka}
                </p>
              </div>

              {/* Gunas */}
              <div className="liquid-glass-subtle rounded-2xl p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                  Gunas (Qualities)
                </span>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {plant.properties.gunas.join(', ')}
                </p>
              </div>
            </div>

            {/* Dosha Karma Card */}
            <div className="liquid-glass-subtle rounded-2xl p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white block">
                Dosha Karma (Tridosha Interaction)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl liquid-glass-card">
                  <Wind className="w-4 h-4 text-sky-500 shrink-0" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase">Vata</div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">{plant.properties.doshaKarma.vata}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl liquid-glass-card">
                  <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase">Pitta</div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">{plant.properties.doshaKarma.pitta}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl liquid-glass-card">
                  <Droplet className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="text-[10px] text-neutral-400 font-semibold uppercase">Kapha</div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">{plant.properties.doshaKarma.kapha}</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 italic">
                {plant.properties.doshaKarma.summary}
              </p>
            </div>
          </section>

          {/* Traditional Uses & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-1.5 font-serif-display">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                Traditional Uses
              </h3>
              <ul className="space-y-2">
                {plant.traditionalUses.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-200 liquid-glass-subtle p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-1.5 font-serif-display">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Commonly Associated Benefits
              </h3>
              <ul className="space-y-2">
                {plant.associatedBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-200 liquid-glass-subtle p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Parts Used & Preparations */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-1.5 font-serif-display">
              <Beaker className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Parts Traditionally Used & Preparations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="liquid-glass-subtle rounded-2xl p-3.5">
                <span className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase tracking-wider block mb-1">
                  Plant Parts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {plant.partsUsed.map((part, idx) => (
                    <span key={idx} className="text-xs liquid-glass-pill text-neutral-800 dark:text-neutral-200 font-medium px-2.5 py-0.5 rounded-full">
                      {part}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2 liquid-glass-subtle rounded-2xl p-3.5 space-y-1.5">
                <span className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
                  Recommended Forms & Method
                </span>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {plant.preparationInformation.dosageOrMethod}
                </p>
                {plant.preparationInformation.classicFormulations && (
                  <div className="pt-1 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] uppercase font-semibold text-neutral-400">Classic Formulations:</span>
                    {plant.preparationInformation.classicFormulations.map((f, idx) => (
                      <span key={idx} className="text-[11px] liquid-glass-pill text-neutral-800 dark:text-neutral-200 font-medium px-2.5 py-0.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Precautions & Contraindications */}
          <section className="bg-rose-500/10 rounded-2xl p-4 border border-rose-500/30 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              Safety & Contraindications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-rose-800 dark:text-rose-200">
              <div>
                <span className="font-semibold block mb-1">Precautions:</span>
                <ul className="list-disc list-inside space-y-1">
                  {plant.precautions.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold block mb-1">Contraindications:</span>
                <ul className="list-disc list-inside space-y-1">
                  {plant.contraindications.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Mandatory Prominent Educational Disclaimer */}
          <div className="bg-amber-500/10 rounded-2xl p-4 border border-amber-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Educational & Research Disclaimer
              </span>
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
                This information is for educational purposes only and is not medical advice. Consult a qualified healthcare professional before using medicinal plants for treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full liquid-btn-primary text-xs font-semibold shadow-md"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
