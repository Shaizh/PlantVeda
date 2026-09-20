import { PlantData, PlantId } from '../types';

export const AYURVEDIC_PLANTS: Record<Exclude<PlantId, 'unknown'>, PlantData> = {
  aloe_vera: {
    plantId: 'aloe_vera',
    commonName: 'Aloe Vera',
    scientificName: 'Aloe barbadensis Miller',
    ayurvedicName: 'Ghritkumari (घृतकुमारी)',
    botanicalFamily: 'Asphodelaceae',
    category: 'Succulent',
    description: 'A stemless or very short-stemmed succulent plant with thick, fleshy, lanceolate green leaves that have serrated margins with small white teeth. The inner gel is clear, mucilaginous, and rich in cooling and restorative polysaccharides.',
    identifyingFeatures: [
      'Thick, fleshy, lanceolate leaves radiating in a rosette pattern',
      'Spiky or serrated leaf margins with distinct pale teeth',
      'Pale green to grey-green surface, occasionally with white flecks in young plants',
      'Clear, jelly-like inner parenchyma gel when cross-sectioned',
      'Succulent perennial habit requiring minimal soil hydration'
    ],
    properties: {
      rasa: ['Tikta (Bitter)', 'Madhura (Sweet)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet post-digestive effect)',
      gunas: ['Guru (Heavy)', 'Snigdha (Unctuous / Oily)', 'Picchila (Slimy)'],
      doshaKarma: {
        vata: 'Balances',
        pitta: 'Balances',
        kapha: 'Balances',
        summary: 'Tridoshic pacifier; exceptionally potent for cooling aggravated Pitta and soothing Vata dryness.'
      }
    },
    traditionalUses: [
      'Topical application for soothing sunburns, minor cuts, and skin irritations',
      'Traditional digestive tonifier and gentle bowel regulator (Kumaryasava)',
      'Liver support and natural detoxifier in classical Ayurvedic formulations',
      'Nourishing female reproductive tonic (Rasayana for Stree-Roga)'
    ],
    associatedBenefits: [
      'Promotes deep skin hydration and natural collagen preservation',
      'Supports healthy gut lining and gastrointestinal motility',
      'Exhibits antimicrobial and natural anti-inflammatory activity',
      'Assists in healthy blood sugar regulation when properly administered'
    ],
    partsUsed: ['Leaf pulp / gel (Pith)', 'Leaf latex / juice (Kumari Swarasa)'],
    preparationInformation: {
      forms: ['Fresh inner leaf gel', 'Cold-pressed juice', 'Kumaryasava (fermented tonic)', 'Herbal medicated oils'],
      dosageOrMethod: 'Fresh inner leaf gel (1-2 tablespoons) or standardized juice (15-30 ml) diluted in warm water on an empty stomach.',
      classicFormulations: ['Kumaryasava', 'Raja Pravartini Vati', 'Aloe Medicated Ghritha']
    },
    precautions: [
      'Do not consume the yellow aloin/latex layer near the leaf rind if pregnant or experiencing acute diarrhea.',
      'Always patch test topical applications on inner forearm prior to extensive cosmetic use.'
    ],
    contraindications: [
      'Pregnancy and lactation (latex may stimulate uterine contractions)',
      'Intestinal obstruction or acute inflammatory bowel disease',
      'Known hypersensitivity to Liliaceae family plants'
    ],
    image: '/images/aloe_vera_planter.jpg',
    sampleImages: [
      {
        label: 'Aloe Vera Planter Specimen',
        url: '/images/aloe_vera_planter.jpg',
        description: 'Vibrant succulent Aloe Vera leaves with distinctive white spots and spiky serrated margins'
      },
      {
        label: 'Aloe Vera Clump',
        url: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
        description: 'Cluster of succulent leaves showing distinct edge teeth'
      }
    ]
  },

  tulsi: {
    plantId: 'tulsi',
    commonName: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum tenuiflorum',
    ayurvedicName: 'Surasa / Tulasi (तुलसी)',
    botanicalFamily: 'Lamiaceae (Mint family)',
    category: 'Herb',
    description: 'An aromatic perennial sub-shrub venerated as the "Queen of Herbs" in Ayurveda. Characterized by simple, opposite, ovate leaves with serrated margins, hairy stems, and fragrant purplish-green hues.',
    identifyingFeatures: [
      'Opposite, decussate ovate leaves with finely toothed or serrated margins',
      'Distinctive square green-to-purple hairy stems',
      'Strongly aromatic camphoraceous and clove-like scent when crushed',
      'Terminal whorled racemes of small purplish or white blossoms',
      'Available in Rama Tulsi (green leaf) and Krishna/Shyama Tulsi (dark purple leaf) varieties'
    ],
    properties: {
      rasa: ['Katu (Pungent)', 'Tikta (Bitter)'],
      virya: 'Ushna (Heating / Warming)',
      vipaka: 'Katu (Pungent post-digestive effect)',
      gunas: ['Laghu (Light)', 'Ruksha (Dry)', 'Tikshna (Sharp / Penetrating)'],
      doshaKarma: {
        vata: 'Balances',
        pitta: 'Increases',
        kapha: 'Balances',
        summary: 'Powerfully balances Vata and Kapha; excess consumption may mildly elevate Pitta due to Ushna virya.'
      }
    },
    traditionalUses: [
      'Respiratory support for coughs, colds, congestion, and bronchial vitality (Pranavaha Srotas)',
      'Adaptogenic support to modulate physical and psychological stress',
      'Digestive stimulant that ignites Agni and eliminates Ama (toxins)',
      'Traditional antimicrobial water purifier and environmental sanctifier'
    ],
    associatedBenefits: [
      'Rich in eugenol, rosmarinic acid, and natural antioxidants',
      'Enhances cellular immunity and antibody response',
      'Supports healthy cortisol balance and cognitive calm',
      'Assists in healthy respiratory passage clearance'
    ],
    partsUsed: ['Fresh leaves (Tulasi Patra)', 'Seeds (Tulasi Beeja)', 'Whole aerial plant'],
    preparationInformation: {
      forms: ['Fresh leaf infusion / tea', 'Expressed fresh juice (Swarasa)', 'Fine leaf powder (Churna)', 'Medicated ghee or oil'],
      dosageOrMethod: '5-10 fresh leaves chewed in morning or 1-2 teaspoons steeped in hot water as an herbal tea with ginger and honey.',
      classicFormulations: ['Tribhuvankirti Rasa', 'Tulasi Churna', 'Kaphaketu Rasa', 'Surasadi Gana Kashayam']
    },
    precautions: [
      'May enhance anti-clotting effects when taken alongside blood thinning medications.',
      'Moderation is recommended for individuals with severe Pitta aggravation or active hyperacidity.'
    ],
    contraindications: [
      'Extreme Pitta disorders with burning sensations or active bleeding',
      'Concomitant high-dose anticoagulant therapy without practitioner oversight'
    ],
    image: '/images/tulsi_reference.jpg',
    sampleImages: [
      {
        label: 'Krishna Tulsi Flowering Specimen',
        url: '/images/tulsi_reference.jpg',
        description: 'Vibrant Holy Basil with purplish square stems, serrated leaves, and upright flower spikes'
      },
      {
        label: 'Rama Tulsi Green Foliage',
        url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
        description: 'Opposite branching pattern with aromatic leaf clusters'
      }
    ]
  },

  neem: {
    plantId: 'neem',
    commonName: 'Neem (Indian Lilac)',
    scientificName: 'Azadirachta indica',
    ayurvedicName: 'Nimba / Arishta (निम्ब)',
    botanicalFamily: 'Meliaceae (Mahogany family)',
    category: 'Tree',
    description: 'A fast-growing evergreen tree renowned as the "Village Pharmacy" of India. Features pinnately compound leaves with distinctively falcate (curved sickle-shaped) leaflets and sharply serrated edges.',
    identifyingFeatures: [
      'Imparipinnate compound leaves carrying 20–30 sub-opposite leaflets',
      'Distinctive sickle-shaped (falcate), asymmetric lanceolate leaflets',
      'Sharply serrated margins with an intensely bitter taste in all tissues',
      'Rough greyish-brown bark with vertical fissures',
      'Small, fragrant white star-like flowers in axillary panicles'
    ],
    properties: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Katu (Pungent post-digestive effect)',
      gunas: ['Laghu (Light)', 'Ruksha (Dry)'],
      doshaKarma: {
        vata: 'Increases',
        pitta: 'Balances',
        kapha: 'Balances',
        summary: 'Supreme pacifier of Pitta and Kapha; excessively dry/bitter qualities can aggravate Vata in high quantities.'
      }
    },
    traditionalUses: [
      'Comprehensive skin rejuvenation for eczema, acne, dermatitis, and fungal disorders (Kushtaghna)',
      'Potent blood purifier (Raktashodhaka) and metabolic cleanser',
      'Oral hygiene maintenance using neem twigs as traditional herbal toothbrushes (Danta Dhavana)',
      'Natural antiparasitic (Krimighna) and agricultural pest deterrent'
    ],
    associatedBenefits: [
      'High concentrations of bioactive azadirachtin, nimbin, and nimbidol',
      'Deeply cleanses inflammatory toxins from the liver and bloodstream',
      'Promotes rapid topical skin barrier soothing and blemish reduction',
      'Supports healthy oral microbiome and gum tissue resilience'
    ],
    partsUsed: ['Leaves (Patra)', 'Bark (Twak)', 'Seeds and seed oil (Taila)', 'Flowers (Pushpa)'],
    preparationInformation: {
      forms: ['Decoction (Kashayam)', 'Leaf paste (Lepa)', 'Medicated cold-pressed oil (Neem Taila)', 'Leaf powder (Churna)'],
      dosageOrMethod: 'External leaf paste applied for 20 minutes on skin; internal leaf powder (500mg-1g) strictly under Ayurvedic supervision.',
      classicFormulations: ['Nimbadi Churna', 'Nimbadi Kashayam', 'Panchatikta Ghrita', 'Jatyadi Taila']
    },
    precautions: [
      'Internal use must be cyclical and short-term due to intense cooling and dry potency.',
      'Neem seed oil is for EXTERNAL use only and must never be swallowed by children or infants.'
    ],
    contraindications: [
      'Pregnancy, trying to conceive, and early lactation',
      'Severe debility, chronic emaciation, or unmanaged high Vata conditions',
      'Infants and young children for internal preparations'
    ],
    image: '/images/neem_reference.jpg',
    sampleImages: [
      {
        label: 'Neem Tree Canopy & Drupes',
        url: '/images/neem_reference.jpg',
        description: 'Vibrant compound pinnate branches showing falcate serrated leaflets, green drupe fruits, and delicate white blossoms'
      },
      {
        label: 'Neem Leaf Compound Twig',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        description: 'Close-up of alternate imparipinnate leaflets with distinctive curved sickle shape'
      }
    ]
  },

  ashwagandha: {
    plantId: 'ashwagandha',
    commonName: 'Ashwagandha (Indian Ginseng)',
    scientificName: 'Withania somnifera',
    ayurvedicName: 'Hayagandha / Ashwagandha (अश्वगंधा)',
    botanicalFamily: 'Solanaceae (Nightshade family)',
    category: 'Shrub',
    description: 'A stout woody shrub with dull green elliptic leaves, bell-shaped greenish-yellow flowers, and papery calyx-encased orange-red berries. The tuberous roots exude a distinctive earthy horse-like scent signifying vitality and strength.',
    identifyingFeatures: [
      'Simple, ovate to elliptic alternate leaves with entire margins and fine stellate pubescence',
      'Small greenish-yellow axillary flowers in compact clusters',
      'Spherical orange-red berries enclosed in an inflated lantern-like papery calyx',
      'Stout, fleshy brownish-white tuberous taproot with characteristic horse-like aroma',
      'Sub-shrub habit reaching 35–75 cm in height with velvety branches'
    ],
    properties: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
      virya: 'Ushna (Heating / Warming)',
      vipaka: 'Madhura (Sweet post-digestive effect)',
      gunas: ['Guru (Heavy)', 'Snigdha (Unctuous / Nourishing)'],
      doshaKarma: {
        vata: 'Balances',
        pitta: 'Increases',
        kapha: 'Balances',
        summary: 'Exceptional Rasayana for pacifying Vata and building Ojas (vital essence); slightly heating for high Pitta.'
      }
    },
    traditionalUses: [
      'Premier Balya (strength-giver) and Rasayana (rejuvenator) for vitality and longevity',
      'Nourishing nervous system tonic (Medhya) for anxiety, mental fatigue, and sound sleep (Nidrajanana)',
      'Supports healthy muscle mass, stamina, and reproductive tissue vitality (Shukra Dhatu)',
      'Joint comfort and natural resilience against age-related degeneration'
    ],
    associatedBenefits: [
      'High concentrations of bioactive withanolides and withaferin-A',
      'Demonstrated reduction in serum cortisol and sympathetic stress overload',
      'Promotes restorative deep sleep cycles without grogginess',
      'Assists in physical recovery, cellular endurance, and neuromuscular coordination'
    ],
    partsUsed: ['Dried root (Moola)', 'Leaves (Patra - rarely for external poultice)'],
    preparationInformation: {
      forms: ['Root powder (Ashwagandha Churna)', 'Ksheerapaka (decoction simmered with warm milk)', 'Ashwagandharishta', 'Medicated herbal ghee'],
      dosageOrMethod: '3-6g of root powder mixed with warm grass-fed milk, honey, or ghee taken 30 minutes before bedtime.',
      classicFormulations: ['Ashwagandharishta', 'Ashwagandhadi Lehya', 'Chyawanprash', 'Balarishta']
    },
    precautions: [
      'Avoid high doses in hyperthyroidism unless monitored by a physician.',
      'Take with food or soothing milk if prone to gastric sensitivity.'
    ],
    contraindications: [
      'Pregnancy (due to potential spasmolytic and uterine stimulating properties)',
      'Severe acute inflammatory Pitta states or severe liver disorders'
    ],
    image: '/images/ashwagandha_reference.jpg',
    sampleImages: [
      {
        label: 'Ashwagandha Berries & Papery Calyx Lanterns',
        url: '/images/ashwagandha_reference.jpg',
        description: 'Vibrant spherical orange-red berries enclosed within papery lantern-like inflated calyces and velvety elliptic leaves'
      },
      {
        label: 'Ashwagandha Plant & Roots',
        url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80',
        description: 'Medicinal cylindrical taproots alongside fresh foliage and axillary flower clusters'
      }
    ]
  },

  amla: {
    plantId: 'amla',
    commonName: 'Amla (Indian Gooseberry)',
    scientificName: 'Phyllanthus emblica',
    ayurvedicName: 'Amalaki / Dhatri (आमलकी)',
    botanicalFamily: 'Phyllanthaceae',
    category: 'Tree',
    description: 'A deciduous tree with delicate, feathery, light-green branchlets bearing closely-spaced linear leaflets resembling compound leaves. Yields globose, pale greenish-yellow fruits celebrated as one of the richest natural sources of heat-stable Vitamin C.',
    identifyingFeatures: [
      'Feathery branchlets with numerous tiny, closely set linear-oblong alternate leaflets',
      'Smooth greenish-grey bark that peels in irregular thin flakes',
      'Round, smooth, ribbed translucent greenish-yellow fruits (2-3 cm diameter)',
      'Contains 5 of the 6 fundamental Ayurvedic tastes (lacks only Lavana / Salty)',
      'Deciduous medium-sized tree with elegant weeping foliage'
    ],
    properties: {
      rasa: ['Amla (Sour - dominant)', 'Kashaya (Astringent)', 'Tikta (Bitter)', 'Katu (Pungent)', 'Madhura (Sweet)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet post-digestive effect)',
      gunas: ['Guru (Heavy)', 'Ruksha (Dry)', 'Sheeta (Cold)'],
      doshaKarma: {
        vata: 'Balances',
        pitta: 'Balances',
        kapha: 'Balances',
        summary: 'Supreme Tridosha Har (balances Vata with sour taste, Pitta with sweet/cooling properties, and Kapha with dry/astringent nature).'
      }
    },
    traditionalUses: [
      'Chief foundational ingredient of Chyawanprash and Triphala',
      'Anti-aging Rasayana (Vayasthapana) preserving cellular vigor and vision (Chakshushya)',
      'Nourishes hair roots, prevents premature graying, and promotes scalp health (Keshya)',
      'Supports healthy digestion, Agni balance, and acid neutralization'
    ],
    associatedBenefits: [
      'Exceptionally high bio-available Vitamin C stabilized by hydrolyzable tannins (emblicanin A & B)',
      'Powerful natural free radical scavenger and cellular protector',
      'Enhances iron absorption and supports healthy hemoglobin levels',
      'Promotes liver lipid metabolism and cardiovascular endothelial health'
    ],
    partsUsed: ['Fresh and dried fruit pulp (Phala)', 'Fruit seed (Beeja)'],
    preparationInformation: {
      forms: ['Fresh fruit juice (Amalaki Swarasa)', 'Fine dried fruit powder (Churna)', 'Triphala formulation', 'Medicated hair oil (Amla Taila)'],
      dosageOrMethod: 'Fresh juice (15-20 ml) with a teaspoon of raw honey, or 3-5g dried fruit powder in warm water in the morning.',
      classicFormulations: ['Chyawanprash', 'Triphala Churna', 'Dhatri Lauha', 'Amalaki Rasayana', 'Brahma Rasayana']
    },
    precautions: [
      'High doses may cause mild dry throat or loose stools in sensitive constitutions.',
      'Take after meals if experiencing active acute gastric hyperacidity.'
    ],
    contraindications: [
      'Acute dysentery or severe active dehydration',
      'Excessively dry Vata state without combining with unctuous ghee or sesame oil'
    ],
    image: '/images/amla_reference.jpg',
    sampleImages: [
      {
        label: 'Amla Cluster & Feathery Branchlet',
        url: '/images/amla_reference.jpg',
        description: 'Pale translucent yellowish-green ribbed berries attached along delicate feathery branchlets'
      },
      {
        label: 'Fresh Amla Fruits & Section',
        url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
        description: 'Spherical 6-furrowed Indian gooseberries with crisp sour-astringent pulp'
      }
    ]
  },

  brahmi: {
    plantId: 'brahmi',
    commonName: 'Brahmi (Water Hyssop)',
    scientificName: 'Bacopa monnieri',
    ayurvedicName: 'Saraswati / Brahmi (ब्राह्मी)',
    botanicalFamily: 'Plantaginaceae (formerly Scrophulariaceae)',
    category: 'Herb',
    description: 'A non-aromatic creeping perennial herb native to wetlands and muddy shores. Possesses small, succulent, obovate-oblong leaves arranged oppositely along trailing succulent stems with solitary pale-blue or white four-to-five petaled flowers.',
    identifyingFeatures: [
      'Small, succulent, obovate or oblanceolate opposite leaves (1-2 cm long)',
      'Trailing, creeping stems that root effortlessly at nodes in moist soil',
      'Small, solitary light blue, purple, or white flowers on short pedicels',
      'Leaves are slightly fleshy, smooth, and punctate with minute glandular dots',
      'Mildly bitter taste with a refreshing water-vegetative undertone'
    ],
    properties: {
      rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
      virya: 'Sheeta (Cooling)',
      vipaka: 'Madhura (Sweet post-digestive effect)',
      gunas: ['Laghu (Light)', 'Sara (Flowing / Mobile)'],
      doshaKarma: {
        vata: 'Balances',
        pitta: 'Balances',
        kapha: 'Balances',
        summary: 'Supreme Medhya Rasayana; harmonizes Sadhaka Pitta, Prana Vata, and Tarpaka Kapha in the cranial region.'
      }
    },
    traditionalUses: [
      'Premier Medhya Rasayana (cognitive and intellect enhancer) to boost memory (Smriti) and retention (Dhi)',
      'Nootropic support for academic learning, focus, mental clarity, and speech coordination',
      'Calming brain tonic for nervous restlessness, anxiety, and mental exhaustion',
      'Cooling scalp application to relieve intellectual fatigue and support sound sleep'
    ],
    associatedBenefits: [
      'Abundant in triterpenoid saponins known as Bacosides A and B',
      'Facilitates synaptic transmission and nerve impulse communication',
      'Protects hippocampal neurons against oxidative neurotoxicity',
      'Enhances GABA neurotransmitter activity to induce tranquil focus'
    ],
    partsUsed: ['Whole herb (Panchanga)', 'Fresh leaves (Patra)'],
    preparationInformation: {
      forms: ['Brahmi Ghritha (medicated ghee)', 'Fresh juice (Brahmi Swarasa)', 'Fine leaf powder (Churna)', 'Brahmi oil for Shirodhara'],
      dosageOrMethod: '1-2 teaspoons of Brahmi Ghritha or 3g leaf powder taken with warm milk or honey in the early morning.',
      classicFormulations: ['Brahmi Ghrita', 'Brahmi Vati', 'Saraswatarishta', 'Brahmi Taila', 'Smriti Sagar Rasa']
    },
    precautions: [
      'Take with food or a healthy fat carrier (ghee/milk) as bacosides are fat-soluble and may cause mild nausea on empty stomachs.',
      'Consult physician if taking thyroid hormones or sedative medications.'
    ],
    contraindications: [
      'Severe bradycardia or urinary tract obstruction',
      'Active peptic ulceration in high untreated doses'
    ],
    image: '/images/brahmi_reference.jpg',
    sampleImages: [
      {
        label: 'Brahmi Aquatic Herb',
        url: '/images/brahmi_reference.jpg',
        description: 'Small fleshy spatulate leaves with creeping wetland stems and delicate pale flowers'
      }
    ]
  },

  turmeric: {
    plantId: 'turmeric',
    commonName: 'Turmeric (Golden Spice)',
    scientificName: 'Curcuma longa',
    ayurvedicName: 'Haridra / Nisha (हरिद्रा)',
    botanicalFamily: 'Zingiberaceae (Ginger family)',
    category: 'Rhizome',
    description: 'A perennial herbaceous plant with large, oblong-lanceolate leaves emerging from aromatic, tuberous, fleshy underground rhizomes with vibrant deep-orange-yellow interiors and fragrant spicy notes.',
    identifyingFeatures: [
      'Large, broad, erect, oblong-lanceolate dark green leaves (70–100 cm long)',
      'Long petiole sheathing at base forming a false pseudostem',
      'Dense spike of pale green or white floral bracts often tinted pink at the top',
      'Fleshy underground rhizomes with rough brownish skin and vibrant golden-orange flesh',
      'Distinctive warm, earthy, pungent-aromatic aroma when root or leaf is crushed'
    ],
    properties: {
      rasa: ['Tikta (Bitter)', 'Katu (Pungent)'],
      virya: 'Ushna (Heating / Warming)',
      vipaka: 'Katu (Pungent post-digestive effect)',
      gunas: ['Laghu (Light)', 'Ruksha (Dry)'],
      doshaKarma: {
        vata: 'Balances',
        pitta: 'Balances',
        kapha: 'Balances',
        summary: 'Balances all three Doshas (Tridoshahara); pacifies Kapha with dry warmth, Pitta through bitter taste, and Vata when cooked with fats.'
      }
    },
    traditionalUses: [
      'Universal Varnya (complexion enhancer) applied topically as traditional bridal Ubtan paste',
      'Potent natural anti-inflammatory (Shothahara) for joint mobility and tissue repair',
      'Classical blood purifier (Krimighna & Raktashodhaka) and wound healer (Vranaropana)',
      'Supports healthy metabolism (Pramehaghna) and respiratory clearings (Golden Milk / Haridra Khanda)'
    ],
    associatedBenefits: [
      'Rich in bioactive curcuminoids (curcumin, demethoxycurcumin, bisdemethoxycurcumin)',
      'Inhibits inflammatory enzymes (COX-2, LOX) and cellular oxidative stress',
      'Assists in healthy liver detoxification and bile flow production',
      'Promotes digestive comfort and supports natural gut microbiome integrity'
    ],
    partsUsed: ['Fresh and cured rhizome (Kanda)', 'Leaves (Patra - for steaming and wrapping)'],
    preparationInformation: {
      forms: ['Rhizome powder (Haridra Churna)', 'Fresh rhizome paste', 'Golden milk (Haldi Doodh)', 'Haridra Khanda granules'],
      dosageOrMethod: '1-3g pure root powder cooked with warm milk/ghee and a pinch of black pepper (piperine boosts bioavailability by up to 2000%).',
      classicFormulations: ['Haridra Khanda', 'Nisha Amalaki Churna', 'Curcuma Medicated Ghee', 'Sudarshana Churna']
    },
    precautions: [
      'Caution in active biliary duct obstruction or symptomatic gallstones.',
      'Discontinue high supplemental doses 2 weeks prior to major scheduled surgeries.'
    ],
    contraindications: [
      'Complete bile duct obstruction',
      'Active gastric ulcers in high isolated extract doses',
      'Concurrent high-dose prescription anticoagulant therapy without medical guidance'
    ],
    image: '/images/turmeric_reference.jpg',
    sampleImages: [
      {
        label: 'Turmeric Broad Leaves & Rhizomes',
        url: '/images/turmeric_reference.jpg',
        description: 'Broad lanceolate tropical leaves and freshly harvested vibrant golden-orange rhizomes'
      }
    ]
  }
};

export const PLANT_LIST = Object.values(AYURVEDIC_PLANTS);

// Sample curated images for instant testing in the UI
export const SAMPLE_TEST_LEAVES = [
  {
    id: 'sample-tulsi',
    plantId: 'tulsi' as PlantId,
    title: 'Tulsi (Holy Basil)',
    subtitle: 'Opposite ovate serrated leaves with purple square stem',
    imageUrl: '/images/tulsi_reference.jpg',
    tag: 'Aromatic Herb'
  },
  {
    id: 'sample-aloe',
    plantId: 'aloe_vera' as PlantId,
    title: 'Aloe Vera',
    subtitle: 'Thick succulent rosette with toothed leaf margins',
    imageUrl: '/images/aloe_vera_planter.jpg',
    tag: 'Succulent Leaf'
  },
  {
    id: 'sample-neem',
    plantId: 'neem' as PlantId,
    title: 'Neem Leaf',
    subtitle: 'Pinnately compound sickle-shaped serrated leaflets',
    imageUrl: '/images/neem_reference.jpg',
    tag: 'Compound Tree Leaf'
  },
  {
    id: 'sample-ashwagandha',
    plantId: 'ashwagandha' as PlantId,
    title: 'Ashwagandha',
    subtitle: 'Papery calyx lantern husks, red berries & elliptic leaves',
    imageUrl: '/images/ashwagandha_reference.jpg',
    tag: 'Medicinal Shrub'
  },
  {
    id: 'sample-amla',
    plantId: 'amla' as PlantId,
    title: 'Amla (Indian Gooseberry)',
    subtitle: 'Ribbed translucent green berries with feathery branchlets',
    imageUrl: '/images/amla_reference.jpg',
    tag: 'Feathery Branchlet'
  },
  {
    id: 'sample-brahmi',
    plantId: 'brahmi' as PlantId,
    title: 'Brahmi',
    subtitle: 'Succulent spoon-shaped opposite leaves & white blossoms',
    imageUrl: '/images/brahmi_reference.jpg',
    tag: 'Wetland Creeping Herb'
  },
  {
    id: 'sample-turmeric',
    plantId: 'turmeric' as PlantId,
    title: 'Turmeric Foliage',
    subtitle: 'Broad oblong-lanceolate leaves with golden rhizome',
    imageUrl: '/images/turmeric_reference.jpg',
    tag: 'Broad Rhizome Leaf'
  }
];
