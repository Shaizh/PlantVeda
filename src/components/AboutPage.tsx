import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  Compass, 
  GitBranch,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onStartIdentifying: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartIdentifying }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>BCA Academic & AI Research Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight font-serif-display">
          About Plant Veda
        </h1>
        <p className="text-base sm:text-lg text-emerald-700 dark:text-emerald-400 font-serif italic max-w-xl mx-auto">
          “Discover the Wisdom of Plants with AI”
        </p>
      </div>

      {/* Project Overview Statement */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-xl border border-white/70 dark:border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white font-serif-display">
          What is Plant Veda?
        </h2>
        <p className="text-neutral-700 dark:text-neutral-200 text-sm sm:text-base leading-relaxed">
          <strong>Plant Veda</strong> is an AI-powered educational web application designed to identify selected Ayurvedic medicinal plants from images and provide structured information about their traditional uses and properties.
        </p>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
          Developed as a Bachelor of Computer Applications (BCA) research project, the system demonstrates the practical integration of Deep Learning computer vision models with ancient botanical taxonomy (Ayurvedic Dravyaguna Vigyan). By transforming unstructured digital photography into structured medicinal profiles, Plant Veda preserves and democratizes traditional botanical wisdom for students, researchers, and nature enthusiasts.
        </p>
      </div>

      {/* 4 Core Research Pillars */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            System Methodology
          </span>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white font-serif-display">
            Four Core Research Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1 */}
          <div className="liquid-glass-card rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl liquid-glass-pill text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
                Larger Plant Dataset
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Moving beyond single-specimen toys, Plant Veda establishes an initial 7-species multi-class taxonomy representing the foundation of Ayurvedic pharmacology:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
              <div className="flex items-center gap-1.5 liquid-glass-subtle p-2 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Aloe Vera</span>
              </div>
              <div className="flex items-center gap-1.5 liquid-glass-subtle p-2 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Tulsi (Holy Basil)</span>
              </div>
              <div className="flex items-center gap-1.5 liquid-glass-subtle p-2 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Neem</span>
              </div>
              <div className="flex items-center gap-1.5 liquid-glass-subtle p-2 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Ashwagandha</span>
              </div>
              <div className="flex items-center gap-1.5 liquid-glass-subtle p-2 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Amla</span>
              </div>
              <div className="flex items-center gap-1.5 liquid-glass-subtle p-2 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Brahmi</span>
              </div>
              <div className="flex items-center gap-1.5 liquid-glass-subtle p-2 rounded-xl col-span-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Turmeric (Curcuma longa)</span>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="liquid-glass-card rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl liquid-glass-pill text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                02
              </span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
                Real-World Image Robustness
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Real environmental field conditions present challenges like inconsistent shadows, complex soil backgrounds, varied camera angles, and partially torn leaves. The model applies strict confidence thresholds (&lt; 70% categorized as uncertain) and rejects non-supported or non-plant inputs rather than forcing inaccurate classifications.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="liquid-glass-card rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl liquid-glass-pill text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                03
              </span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
                Ayurvedic Knowledge Integration
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Every identified specimen is cross-referenced with a structured Dravyaguna schema covering Sanskrit designations, Ayurvedic taste (Rasa), potency (Virya), post-digestive effect (Vipaka), Tridosha balance, traditional preparations, therapeutic benefits, and clear contraindications.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="liquid-glass-card rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl liquid-glass-pill text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center">
                04
              </span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
                Real-Time & Lightweight Experience
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              To minimize latency on cellular networks and conserve server compute, uploaded high-resolution photographs are compressed and downscaled client-side via HTML5 canvas prior to inference. The web interface is engineered for sub-second rendering across mobile, tablet, and desktop screens.
            </p>
          </div>
        </div>
      </div>

      {/* AI Vision Pipeline Architecture */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-xl border border-white/70 dark:border-white/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white font-serif-display">
            AI Classification Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase font-bold">Step 1</span>
            <h4 className="font-bold text-neutral-900 dark:text-white">Capture & Compress</h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Client-side canvas preprocessing rescales photo while preserving morphological contours.
            </p>
          </div>

          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase font-bold">Step 2</span>
            <h4 className="font-bold text-neutral-900 dark:text-white">Vision Feature Vector</h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Gemini Vision analyzes leaf margins, arrangement, venation, and surface texture.
            </p>
          </div>

          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase font-bold">Step 3</span>
            <h4 className="font-bold text-neutral-900 dark:text-white">Confidence Gate</h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Probabilities are evaluated across 7 classes; ambiguous/unsupported images map to Unknown.
            </p>
          </div>

          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase font-bold">Step 4</span>
            <h4 className="font-bold text-neutral-900 dark:text-white">Ayurvedic Synthesis</h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Structured Dravyaguna record is joined and rendered with full energetic properties.
            </p>
          </div>
        </div>
      </div>

      {/* Future Expansion & Modular Roadmap */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white font-serif-display">
            Future Expansion Roadmap
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          The classification architecture is engineered with modular class mapping to facilitate seamless scaling to wider Ayurvedic botanical categories in subsequent research phases:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1">
            <h4 className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Medicinal Flowers
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Hibiscus (Japa), Shankhpushpi, Lotus (Kamala), Jasmine (Jati)
            </p>
          </div>

          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1">
            <h4 className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Medicinal Roots
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Shatavari (Asparagus racemosus), Licorice (Yashtimadhu), Sariva
            </p>
          </div>

          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1">
            <h4 className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Medicinal Fruits
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Haritaki (Chebula), Bibhitaki (Bellirica), Jamun, Bilva
            </p>
          </div>

          <div className="liquid-glass-subtle p-4 rounded-2xl space-y-1">
            <h4 className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Regional Herbs
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
              Bhringraj, Punarnava, Guduchi (Tinospora cordifolia), Kalmegh
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Prominent Educational Disclaimer */}
      <div className="bg-amber-500/10 rounded-3xl p-6 border border-amber-500/30 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-amber-800 dark:text-amber-300 font-serif-display">
            Educational Research & Safety Disclaimer
          </h3>
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
            This application is for educational and academic research purposes only and is not medical advice. Consult a qualified healthcare professional before using medicinal plants for treatment. Deep Learning predictions should not be used as the sole basis for clinical or pharmacological ingestion.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onStartIdentifying}
          id="about-try-identify-btn"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full liquid-btn-primary font-semibold text-xs shadow-lg transition-all active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>Launch AI Plant Identifier</span>
          <ArrowRight className="w-4 h-4 opacity-80" />
        </button>
      </div>
    </div>
  );
};
