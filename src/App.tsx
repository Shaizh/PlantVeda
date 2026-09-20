import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlantIdentifier } from './components/PlantIdentifier';
import { IdentificationResultView } from './components/IdentificationResultView';
import { PlantLibrary } from './components/PlantLibrary';
import { IdentificationHistoryView } from './components/IdentificationHistoryView';
import { AboutPage } from './components/AboutPage';
import { AyurvedicInfoModal } from './components/AyurvedicInfoModal';
import { Footer } from './components/Footer';
import { PlantData, IdentificationResult, IdentificationHistoryItem } from './types';

const HISTORY_STORAGE_KEY = 'plant_veda_identifications_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'identify' | 'library' | 'history' | 'about'>('home');
  const [currentResult, setCurrentResult] = useState<IdentificationResult | null>(null);
  const [selectedPlantModal, setSelectedPlantModal] = useState<PlantData | null>(null);
  const [history, setHistory] = useState<IdentificationHistoryItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('plant_veda_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Sync theme with document element
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('plant_veda_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('plant_veda_theme', 'light');
      }
    } catch (e) {
      console.warn('Theme update error:', e);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Load identification history from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load identification history from storage:', e);
    }
  }, []);

  // Save history updates to localStorage
  const saveHistory = (newHistory: IdentificationHistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.warn('Failed to persist identification history:', e);
    }
  };

  const handleIdentificationComplete = (result: IdentificationResult) => {
    setCurrentResult(result);
    setActiveTab('identify');

    // Add to history log
    const historyItem: IdentificationHistoryItem = {
      id: result.id,
      predictedPlantId: result.predictedPlantId,
      plantName: result.plantName,
      scientificName: result.scientificName,
      confidence: result.confidence,
      confidenceCategory: result.confidenceCategory,
      timestamp: result.timestamp,
      userImageBase64: result.userImageBase64,
      analysisSummary: result.analysisSummary,
    };

    const updated = [historyItem, ...history.filter(h => h.id !== result.id)].slice(0, 30);
    saveHistory(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIdentifyAnother = () => {
    setCurrentResult(null);
    setActiveTab('identify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300 flex flex-col font-sans selection:bg-[#388252]/25 selection:text-[#1B4529] dark:selection:text-[#72D494]">
      {/* Ambient Botanical Glow Elements behind Liquid Glass */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#85B898]/25 to-[#427A55]/15 dark:from-[#234E35]/30 dark:to-[#122A1D]/20 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#9BBF7D]/20 to-[#4E7E5A]/15 dark:from-[#1E432D]/30 dark:to-[#0F2618]/20 blur-3xl animate-float-reverse" />
        <div className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-t from-[#7CA88D]/20 to-[#326946]/10 dark:from-[#183925]/25 dark:to-transparent blur-3xl animate-float-slow" />
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        onQuickIdentify={() => {
          setCurrentResult(null);
          setActiveTab('identify');
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Home Page Tab */}
        {activeTab === 'home' && (
          <HeroSection
            onStartIdentifying={() => {
              setCurrentResult(null);
              setActiveTab('identify');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreLibrary={() => {
              setActiveTab('library');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSampleLeaf={() => {
              setCurrentResult(null);
              setActiveTab('identify');
            }}
          />
        )}

        {/* Identify Plant Tab */}
        {activeTab === 'identify' && (
          <div>
            {currentResult ? (
              <IdentificationResultView
                result={currentResult}
                onIdentifyAnother={handleIdentifyAnother}
                onOpenAyurvedicInfo={(plant) => setSelectedPlantModal(plant)}
                onOpenLibrary={() => {
                  setActiveTab('library');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : (
              <PlantIdentifier
                onIdentificationComplete={handleIdentificationComplete}
              />
            )}
          </div>
        )}

        {/* Plant Library Tab */}
        {activeTab === 'library' && (
          <PlantLibrary
            onSelectPlant={(plant) => setSelectedPlantModal(plant)}
            onIdentifyPlantClick={() => {
              setCurrentResult(null);
              setActiveTab('identify');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Recent Identifications History Tab */}
        {activeTab === 'history' && (
          <IdentificationHistoryView
            history={history}
            onClearHistory={handleClearHistory}
            onSelectPlant={(plant) => setSelectedPlantModal(plant)}
            onStartIdentifying={() => {
              setCurrentResult(null);
              setActiveTab('identify');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* About Research Project Tab */}
        {activeTab === 'about' && (
          <AboutPage
            onStartIdentifying={() => {
              setCurrentResult(null);
              setActiveTab('identify');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Structured Ayurvedic Detail Modal */}
      <AyurvedicInfoModal
        plant={selectedPlantModal}
        isOpen={!!selectedPlantModal}
        onClose={() => setSelectedPlantModal(null)}
      />

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          if (tab === 'identify') setCurrentResult(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectPlant={(plant) => setSelectedPlantModal(plant)}
      />
    </div>
  );
}
