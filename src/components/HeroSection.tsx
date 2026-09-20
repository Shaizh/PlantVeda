import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Layers,
  Leaf,
  Scan
} from 'lucide-react';
import { SAMPLE_TEST_LEAVES } from '../data/plants';

interface HeroSectionProps {
  onStartIdentifying: () => void;
  onExploreLibrary: () => void;
  onSelectSampleLeaf?: (imageUrl: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartIdentifying,
  onExploreLibrary,
  onSelectSampleLeaf,
}) => {
  return (
    <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 animate-in fade-in duration-300">
      {/* Hero Liquid Glass Main Card */}
      <div className="relative rounded-3xl liquid-glass overflow-hidden p-6 sm:p-10 lg:p-14 border border-white/60 dark:border-white/10 shadow-2xl">
        
        {/* Subtle internal luminous background sheen */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#388252]/20 dark:bg-[#388252]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#85B898]/20 dark:bg-[#1E4D2B]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Title, Subtitle, & Glass CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Ayurvedic AI Vision Platform</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.12] font-serif-display">
                Identify Nature. <br />
                <span className="text-[#2E7D46] dark:text-[#52B773]">Discover Ayurveda.</span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                Use AI to identify Ayurvedic medicinal plants and explore their traditional knowledge. Upload or capture a leaf photo for instant botanical and Dravyaguna analysis.
              </p>
            </div>

            {/* iOS-Style Pill Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onStartIdentifying}
                id="hero-identify-plant-btn"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full liquid-btn-primary font-semibold text-sm shadow-md transition-all active:scale-98"
              >
                <Scan className="w-4 h-4 text-emerald-300" />
                <span>Identify a Plant</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>

              <button
                onClick={onExploreLibrary}
                id="hero-explore-plants-btn"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full liquid-btn-secondary font-medium text-sm transition-all"
              >
                <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Explore Plant Library</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-black/5 dark:border-white/10 text-xs font-mono">
              <div>
                <span className="block text-neutral-900 dark:text-white font-bold text-lg sm:text-xl font-serif-display">
                  7 Species
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">Core Herbs</span>
              </div>
              <div>
                <span className="block text-neutral-900 dark:text-white font-bold text-lg sm:text-xl font-serif-display">
                  Deep Vision
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">Neural Classifier</span>
              </div>
              <div>
                <span className="block text-neutral-900 dark:text-white font-bold text-lg sm:text-xl font-serif-display">
                  Dravyaguna
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">Authentic Texts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Liquid Glass Specimen Card */}
          <div className="lg:col-span-5 relative">
            <div className="liquid-glass rounded-3xl p-4 sm:p-5 shadow-xl border border-white/70 dark:border-white/15 backdrop-blur-2xl">
              
              {/* Specimen Visual Preview */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900 shadow-inner">
                <img
                  src="/images/tulsi_reference.jpg"
                  alt="Ayurvedic Botanical Flora Specimen"
                  className="w-full h-full object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Overlaid AI Detection HUD Glass Overlay */}
                <div className="absolute inset-3 border border-dashed border-emerald-400/60 rounded-xl p-3 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Ocimum tenuiflorum
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-700/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
                      Match: 95%
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 w-max shadow-sm">
                    🌿 Tulsi (Holy Basil) • Pitta / Kapha
                  </div>
                </div>
              </div>

              {/* Research Caption */}
              <div className="mt-3.5 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 px-1">
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live AI Vision Model
                </span>
                <span className="text-[11px] font-medium">Ayurvedic Classification</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Research Objectives Glass Cards */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 liquid-glass-pill px-3.5 py-1 rounded-full">
            Scientific Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight font-serif-display">
            Designed Around 4 Core AI Pillars
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Engineered to demonstrate how computer vision and Ayurvedic pharmacology converge in a modern web application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Objective 1 */}
          <div className="liquid-glass-card rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
              1. Curated Species
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Multi-species classification supporting 7 fundamental Ayurvedic plants: Aloe Vera, Tulsi, Neem, Ashwagandha, Amla, Brahmi, and Turmeric.
            </p>
          </div>

          {/* Objective 2 */}
          <div className="liquid-glass-card rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
              2. Robust Vision AI
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Classifies morphology across lighting variations, leaf angles, background noise, and natural botanical textures with confidence scoring.
            </p>
          </div>

          {/* Objective 3 */}
          <div className="liquid-glass-card rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
              3. Ayurvedic Schema
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Structured database detailing Sanskrit names, Rasa, Virya, Vipaka, Gunas, Dosha balance, classical formulations, and safety precautions.
            </p>
          </div>

          {/* Objective 4 */}
          <div className="liquid-glass-card rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-serif-display">
              4. Ultra-Fast Pipeline
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Optimized client-side preprocessing and lightweight transfer ensuring responsive performance on mobile and desktop viewports.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launch Strip: Try Sample Leaves */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm border border-white/60 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-serif-display">
              Quick Test: Select a Sample Botanical Specimen
            </h3>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Click any specimen to test real-time AI classification instantly
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {SAMPLE_TEST_LEAVES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                onSelectSampleLeaf?.(sample.imageUrl);
                onStartIdentifying();
              }}
              className="group text-left p-2.5 rounded-2xl liquid-glass-card flex flex-col gap-2 focus:outline-none"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                <img
                  src={sample.imageUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 block truncate">
                  {sample.title}
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block truncate">
                  {sample.tag}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
