import React from 'react';
import { Leaf, ShieldAlert, GraduationCap } from 'lucide-react';
import { PlantData } from '../types';
import { PLANT_LIST } from '../data/plants';

interface FooterProps {
  onNavClick: (tab: 'home' | 'identify' | 'library' | 'history' | 'about') => void;
  onSelectPlant: (plant: PlantData) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onSelectPlant }) => {
  return (
    <footer className="mt-20 border-t border-black/5 dark:border-white/10 liquid-glass relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl liquid-btn-primary flex items-center justify-center shadow-md">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white font-serif-display">
                PLANT VEDA
              </span>
            </div>
            <p className="text-emerald-700 dark:text-emerald-400 text-sm font-serif italic">
              “Discover the Wisdom of Plants with AI”
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              An AI-powered academic research web application for identifying Ayurvedic medicinal flora from leaf photography.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>BCA Academic & AI Research Project</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('identify')}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                >
                  Identify Plant from Photo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('library')}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                >
                  Ayurvedic Plant Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('history')}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                >
                  Recent Identifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                >
                  About Research Project
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported 7 Ayurvedic Species */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-mono">
              Supported 7 Plants
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              {PLANT_LIST.map((plant) => (
                <li key={plant.plantId}>
                  <button
                    onClick={() => onSelectPlant(plant)}
                    className="hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>{plant.commonName}</span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 italic font-serif">{plant.ayurvedicName.split(' ')[0]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Safety & Medical Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Safety Disclaimer
            </h4>
            <p className="text-[11px] text-amber-800 dark:text-amber-200/90 leading-relaxed bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/20">
              This application is strictly for educational and academic research purposes. It does not replace medical advice from a qualified healthcare professional. Do not use medicinal plants for treatment without clinical guidance.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            © {new Date().getFullYear()} Plant Veda. Academic Research Project.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with Deep Learning & Ayurvedic Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
