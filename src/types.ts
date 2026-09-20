export type PlantId = 
  | 'aloe_vera'
  | 'tulsi'
  | 'neem'
  | 'ashwagandha'
  | 'amla'
  | 'brahmi'
  | 'turmeric'
  | 'unknown';

export interface AyurvedicProperties {
  rasa: string[]; // Tastes (Tikta, Kashaya, Madhura, Katu, Lavana, Amla)
  virya: string; // Potency (Sheeta / Ushna - Cold / Hot)
  vipaka: string; // Post-digestive effect (Madhura, Katu, Amla)
  gunas: string[]; // Qualities (Laghu, Snigdha, Ruksha, Guru, Tikshna)
  doshaKarma: {
    vata: 'Balances' | 'Increases' | 'Neutral';
    pitta: 'Balances' | 'Increases' | 'Neutral';
    kapha: 'Balances' | 'Increases' | 'Neutral';
    summary: string;
  };
}

export interface PlantData {
  plantId: PlantId;
  commonName: string;
  scientificName: string;
  ayurvedicName: string; // Sanskrit name
  botanicalFamily: string;
  category: 'Herb' | 'Tree' | 'Shrub' | 'Succulent' | 'Rhizome';
  description: string;
  identifyingFeatures: string[];
  properties: AyurvedicProperties;
  traditionalUses: string[];
  associatedBenefits: string[];
  partsUsed: string[];
  preparationInformation: {
    forms: string[];
    dosageOrMethod: string;
    classicFormulations?: string[];
  };
  precautions: string[];
  contraindications: string[];
  image: string;
  sampleImages: {
    label: string;
    url: string;
    description: string;
  }[];
}

export interface AlternativePossibility {
  name: string;
  scientificName?: string;
  probability: number;
}

export interface IdentificationResult {
  id: string;
  predictedPlantId: PlantId;
  plantName: string;
  scientificName: string;
  confidence: number;
  confidenceCategory: 'high' | 'moderate' | 'low';
  analysisSummary: string;
  identifyingFeaturesObserved: string[];
  environmentalConditionNotes?: string;
  alternativePossibilities: AlternativePossibility[];
  timestamp: string;
  userImageBase64?: string;
  isUnsupportedOrUnknown?: boolean;
}

export interface IdentificationHistoryItem {
  id: string;
  predictedPlantId: PlantId;
  plantName: string;
  scientificName: string;
  confidence: number;
  confidenceCategory: 'high' | 'moderate' | 'low';
  timestamp: string;
  userImageBase64?: string;
  analysisSummary: string;
}
