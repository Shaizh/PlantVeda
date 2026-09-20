import React, { useState } from 'react';
import { PLANT_LIST } from '../data/plants';
import { PlantData } from '../types';
import { Search, Sparkles, BookOpen, ArrowRight, Filter, Leaf } from 'lucide-react';

interface PlantLibraryProps {
  onSelectPlant: (plant: PlantData) => void;
  onIdentifyPlantClick?: () => void;
}

export const PlantLibrary: React.FC<PlantLibraryProps> = ({
  onSelectPlant,
  onIdentifyPlantClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Herb', 'Tree', 'Shrub', 'Succulent', 'Rhizome'];

  const filteredPlants = PLANT_LIST.filter((plant) => {
    const matchesCategory =
      selectedCategory === 'All' || plant.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      plant.commonName.toLowerCase().includes(query) ||
      plant.scientificName.toLowerCase().includes(query) ||
      plant.ayurvedicName.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query) ||
      plant.associatedBenefits.some((b) => b.toLowerCase().includes(query)) ||
      plant.traditionalUses.some((u) => u.toLowerCase().includes(query)) ||
      plant.partsUsed.some((p) => p.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 liquid-glass-pill px-3.5 py-1 rounded-full">
            Dravyaguna Botanical Database
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight font-serif-display">
            Ayurvedic Plant Library
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl">
            Explore the 7 core Ayurvedic medicinal species supported by Plant Veda AI, complete with Sanskrit nomenclature, botanical morphology, and therapeutic properties.
          </p>
        </div>

        {onIdentifyPlantClick && (
          <button
            onClick={onIdentifyPlantClick}
            id="library-cta-identify-btn"
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full liquid-btn-primary text-xs font-semibold shadow-md"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Identify from Photo</span>
          </button>
        )}
      </div>

      {/* Floating iOS-Style Glass Search & Filter Bar */}
      <div className="liquid-glass rounded-3xl p-4 sm:p-5 shadow-lg border border-white/70 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="plant-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicinal plants, scientific names, Sanskrit names, or benefits..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl liquid-glass-subtle text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 border border-white/60 dark:border-white/15 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-neutral-400 ml-1 mr-0.5 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#234E35] text-white shadow-sm'
                    : 'liquid-glass-subtle text-neutral-600 dark:text-neutral-300 hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-1 border-t border-black/5 dark:border-white/5">
          <span>Showing {filteredPlants.length} of {PLANT_LIST.length} supported Ayurvedic species</span>
          {searchQuery && (
            <span>Filtered for: &quot;{searchQuery}&quot;</span>
          )}
        </div>
      </div>

      {/* Plants Grid */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <div
              key={plant.plantId}
              id={`plant-card-${plant.plantId}`}
              className="group liquid-glass-card rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-950">
                  <img
                    src={plant.image}
                    alt={plant.commonName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="liquid-glass-pill text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-full bg-black/40 border-white/20">
                      {plant.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold tracking-tight font-serif-display">
                      {plant.commonName}
                    </h3>
                    <p className="text-xs text-emerald-200 italic font-serif">
                      {plant.scientificName}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-black/5 dark:border-white/5 pb-2.5">
                    <span className="text-neutral-500 dark:text-neutral-400 font-medium">Sanskrit / Ayurvedic:</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{plant.ayurvedicName}</span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                    {plant.description}
                  </p>

                  {/* Benefit chips */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {plant.associatedBenefits.slice(0, 2).map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] liquid-glass-subtle text-emerald-800 dark:text-emerald-300 font-medium px-2.5 py-0.5 rounded-full line-clamp-1"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectPlant(plant)}
                  id={`view-details-${plant.plantId}-btn`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl liquid-btn-secondary text-xs font-semibold group-hover:border-emerald-500/40 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>View Ayurvedic Information</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="liquid-glass rounded-3xl p-12 text-center max-w-md mx-auto space-y-3 border border-white/60 dark:border-white/10">
          <Leaf className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">No matching medicinal plants</h3>
          <p className="text-xs text-neutral-500">
            No plants found matching &quot;{searchQuery}&quot;. Try searching for general terms like &quot;leaves&quot;, &quot;cooling&quot;, &quot;skin&quot;, or &quot;tonic&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2 rounded-full liquid-btn-primary text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
