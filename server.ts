import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing with 25MB limit for base64 image payloads
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Lazy initialization for GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    application: "Plant Veda - Ayurvedic Medicinal Plant Identification",
    version: "1.0.0",
    supportedSpeciesCount: 7,
    supportedPlants: [
      "Aloe Vera (Aloe barbadensis Miller)",
      "Tulsi (Ocimum tenuiflorum)",
      "Neem (Azadirachta indica)",
      "Ashwagandha (Withania somnifera)",
      "Amla (Phyllanthus emblica)",
      "Brahmi (Bacopa monnieri)",
      "Turmeric (Curcuma longa)"
    ]
  });
});

// Plant Identification API Endpoint
app.post("/api/identify-plant", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg" } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: "Missing imageBase64 in request body. Please upload a plant image first."
      });
    }

    const ai = getGenAI();

    const systemInstruction = `You are "Plant Veda AI", a specialized Deep Learning vision classifier and botanical research assistant trained on Ayurvedic medicinal flora.
Your primary research objective is to accurately classify uploaded leaf and plant images strictly into one of the following 7 Ayurvedic medicinal species, with precision tracking of morphological shapes:

1. Aloe Vera (aloe_vera) - Aloe barbadensis Miller / Ghritkumari:
   - Shape Architecture: Acaulescent (stemless) or very short-stemmed symmetrical basal ROSETTE radiating outward and upward.
   - Leaf Blade Shape: Lanceolate to ensiform (sword/dagger-shaped), broad and clasping at the base, tapering steadily to an acute sharp apex.
   - Cross-Section & Texture: Thick, succulent, fleshy, turgid (filled with clear mucilaginous parenchyma gel), slightly concave/flat on upper surface and convex/keeled beneath.
   - Margins: Distinct triangular cartilaginous pale or white teeth/spines (dentate margins) along both leaf edges.
   - Surface Color & Patterns: Glaucous pale green to greyish-green; young juvenile plants or certain potted varieties frequently display distinct white flecks/spots/speckles.
   - Environmental/Presentation Variations to recognize as Aloe Vera: Potted indoor/outdoor plants, seedlings in nursery bags, garden clumps/beds, close-ups of leaf rosettes, cross-sections, and monochrome/grayscale images.

2. Tulsi (tulsi) - Ocimum tenuiflorum / Ocimum sanctum / Surasa / Tulasi:
   - Color Variations to track & classify:
     * Rama Tulsi (Sri Tulsi): Bright leaf-green to emerald foliage, lighter green stem with pale purple/pinkish blossom verticillasters.
     * Krishna Tulsi (Shyama Tulsi): Deep dark violet, dusky purple-flushed leaves, prominent dark purple/maroon square stems, and rich purple flower spikes.
     * Vana Tulsi / Hybrid forms: Mid-green with purple undertones on the petioles and leaf veins.
   - Morphological Shape Architecture:
     * Leaf Arrangement: Strictly OPPOSITE and DECUSSATE (pairs at 90-degree angles along the stem).
     * Leaf Blade Shape: Simple, ovate to elliptic-oblong, with acute or obtuse apex and cuneate/rounded base.
     * Margins: Finely serrated, dentate, or slightly crenate (shallow sharp or rounded teeth).
     * Stem Structure: Distinctly QUADRANGULAR (square in cross-section), hairy/pubescent with fine trichomes.
     * Inflorescence (Flower Spikes): Elongated terminal and axillary pseudospikes / racemes with clustered whorls (verticillasters) of small bilabiate purple, lilac, or white flowers.
   - Variations to recognize as Tulsi: Potted terrace plants, garden shrubs with flower spikes, dense foliage bushes, flowering racemes close-up, both green (Rama) and purple (Krishna) leaves.

3. Neem (neem) - Azadirachta indica / Nimba / Arishta (Meliaceae family):
   - Leaf Architecture: Imparipinnate compound leaves (20–40 cm long) with 7–19 sub-opposite to alternate leaflets.
   - Leaflet Shape: Strikingly FALCATE (curved sickle-shaped), asymmetric lanceolate blades with acute-acuminate tips and oblique/unequal bases.
   - Leaflet Margins: Sharply serrated/dentate tooth edges along the outer contour.
   - Fruits (Drupes): Smooth, glabrous, oval/ellipsoidal green or yellowish-green single-seeded drupe fruits hanging in loose pendulous clusters.
   - Inflorescence: Axillary drooping/upright panicles bearing numerous tiny, fragrant 5-petaled white or pale cream star-like blossoms.
   - Growth Habit & Presentation Variations to recognize as Neem:
     * Full outdoor tree canopy foliage with pendulous branches against sky or garden backgrounds.
     * Close-up clusters of leaves with green or yellowish neem drupe fruits hanging underneath.
     * Flowering neem branches with white fragrant blossom panicles.
     * Harvested compound twigs or single pinnate leaves placed on flat surfaces or lab/white backgrounds.
     * Potted young neem saplings or nursery specimens.

4. Ashwagandha (ashwagandha) - Withania somnifera / Indian Ginseng / Ashvagandha / Hayagandha (Solanaceae family):
   - Key Morphological Fruit & Calyx Markers (Critical for High Precision):
     * Accrescent Papery Calyx (Lantern Husks): Inflated, bell-shaped or bladder-like papery calyces (fruiting husks) that enclose the berry fruit. The calyx starts green, then matures to yellow-tan, beige, parchment-brown, or opens like a cup to reveal the berry inside.
     * Spherical Red/Orange Berries: Bright scarlet, orange-red, or deep red globose smooth berries (5–8 mm) cradled inside the papery calyx lanterns.
   - Foliage & Leaf Architecture:
     * Leaf Arrangement: Simple, alternate to sub-opposite, petiolate.
     * Leaf Blade Shape: Ovate, elliptic, to oblong-ovate (5–12 cm long), with acute or obtuse apex and tapering/cuneate base.
     * Leaf Margins: Entire (smooth), sometimes slightly wavy or undulating; NEVER sharply toothed or serrated.
     * Surface Texture & Color: Dull matte green to grayish-green foliage covered with fine downy/stellate whitish hairs (tomentose), prominent central midrib with secondary arcuate veins.
   - Inflorescence & Stems:
     * Small, sessile or short-pedicelled, greenish-yellow or pale creamy bell-shaped/stellate flowers (4–8 mm) clustered in dense axillary umbellate cymes (whorls of 3–8 blossoms at leaf nodes).
     * Woody to semi-woody branched sub-shrub with cylindrical, velvety/pubescent grayish-green stems.
   - Harvested Medicinal Roots (Ashwagandha Moola):
     * Fleshy, cylindrical, brownish-yellow or buff-tan taproots / dried root sticks (Radix Withaniae), often photographed alongside leafy stems, flowers, or berries in traditional Ayurvedic and research contexts.
   - Growth Habit & Presentation Variations to recognize as Ashwagandha:
     * Close-up of papery lantern calyces with bright red spherical berries inside.
     * Fruiting and flowering branches with green and beige lantern husks clustered along the stem nodes.
     * Field or garden shrubs with dull green elliptic leaves and dense axillary calyx clusters.
     * Whole plant specimens with green foliage and harvested cylindrical tuberous roots resting on soil or lab backgrounds.
     * Harvested branches with root sticks on white or neutral studio backgrounds.

5. Amla (amla) - Phyllanthus emblica / Emblica officinalis / Amalaki / Indian Gooseberry (Phyllanthaceae / Euphorbiaceae family):
   - Key Morphological Fruit Markers (Critical for High Precision):
     * Globose / Spherical Berries: Round, spherical, or slightly depressed-globose fruits (1.5–3.5 cm diameter) ranging in color from pale lime-green, translucent yellowish-green, chartreuse, to golden-amber upon ripening.
     * 6-Furrowed Vertical Striations: Characteristic 6 subtle vertical/longitudinal furrow lines, grooves, or faint ribs radiating from top to base, dividing the berry into 6 symmetrical segments.
     * Translucent Waxy Skin & Crisp Flesh: Smooth, shiny or waxy skin with slight translucency; sliced/cut cross-sections reveal dense pale green juicy pulp enclosing a hard central 6-valved triangular seed stone.
   - Feathery Foliage & Leaf Architecture:
     * Feathery Branchlets (Pseudo-Pinnate): Slender lateral branchlets (10–25 cm long) bearing dense, closely spaced, two-ranked (distichous) tiny linear-oblong miniature leaflets (8–12 mm long, 2–3 mm wide) giving the optical appearance of delicate compound pinnate leaves or miniature tamarind / fern leaves.
     * Leaflet Structure: Subsessile, entire margins, rounded/obtuse apex with a tiny mucronate tip, light green to vibrant yellowish-green.
   - Growth Habit, Twigs & Fruiting Arrangement:
     * Medium deciduous tree with smooth greenish-grey to flaking bark; fruits attached directly along the slender woody twigs or at the base of feathery leafy branchlets.
     * Dense fruiting clusters hanging from branch nodes.
   - Real-World Harvest & Presentation Variations to recognize as Amla:
     * Handfuls or cupped palms holding smooth, round green Amla berries with visible vertical segment ribs.
     * Heaped piles of fresh Amla fruits in wooden, ceramic, porcelain bowls, or rustic baskets on kitchen, wooden, or burlap surfaces.
     * Fresh Amla fruits shown alongside a glass of freshly pressed greenish-yellow Amla juice and feathery branchlets.
     * Cut or sliced Amla fruits displaying the 6-parted interior and central seed stone.
     * High-resolution close-ups of translucent Indian gooseberries on clean white or neutral studio backgrounds.
     * Wild or orchard Amla tree branches loaded with round green fruits nestled amongst feathery pinnate-like leaves.

6. Brahmi (brahmi) - Bacopa monnieri / Jalbrahmi / Water Hyssop / Herb of Grace (Plantaginaceae / Scrophulariaceae family):
   - Key Morphological Leaf & Stem Markers (Critical for High Precision):
     * Leaf Shape & Architecture: Small (0.6–2.5 cm long, 3–10 mm wide), succulent, fleshy, oblanceolate, obovate, to spatulate (paddle-shaped or spoon-shaped) leaves with a rounded/obtuse apex and wedge-shaped base.
     * Leaf Arrangement: Strictly opposite and decussate (pairs alternating at right angles) along the stem; sessile or subsessile (clasping the stem without distinct stalks).
     * Leaf Texture & Margins: Entire (smooth) margins (occasionally with few obscure apical teeth), glabrous (hairless), fleshy/thick succulent texture with tiny glandular punctations visible on close-up.
     * Stem Morphology: Succulent, green to purplish-brown, cylindrical, prostrate/creeping and trailing stems that branch freely and root at the nodes.
   - Blossom & Flower Morphology:
     * Small, solitary, axillary flowers (8–12 mm across) on slender pedicels.
     * Corolla: 4 to 5 spreading rounded lobes, white, pale lilac, faint pinkish-violet, or light sky blue, with a pale yellow/greenish center/throat and fine stamens.
   - Distinct Ayurvedic Differentiation:
     * Bacopa monnieri (Jalbrahmi / True Brahmi): Small succulent spoon-shaped opposite leaves on creeping stems with small 4-5 lobed white/lilac flowers.
     * (Do not confuse with Centella asiatica / Gotu Kola / Mandukaparni, which has fan-shaped / reniform scalloped leaves on long erect petioles).
   - Real-World Harvest, Cultivation & Presentation Variations to recognize as Brahmi:
     * Potted plant specimens in square/round black planters or clay pots with upright and trailing succulent green stems and white blossoms.
     * Dense, lush creeping groundcover mats and tangled green carpets covered with numerous small white 5-petaled flowers.
     * Close-up macro photos of a single pale white/lilac bell-shaped flower situated between succulent opposite spoon leaves.
     * Floating or semi-aquatic marsh-edge stems with glossy succulent green foliage.
     * Freshly harvested wetland herb bunches with roots, stems, and small spoon-like leaves on lab, white, or outdoor surfaces.

7. Turmeric (turmeric) - Curcuma longa / Haridra / Haldi / Nisha / Gauri (Zingiberaceae family):
   - Key Morphological Foliage & Leaf Markers (Aerial Parts):
     * Leaf Architecture: Large, broad, upright, oblong-lanceolate to elliptic-lanceolate leaves (30–100 cm long, 8–18 cm wide) tapering to an acute/acuminate apex.
     * Venation & Surface: Smooth, glabrous, bright green to lush emerald foliage characterized by distinct, delicate, closely spaced parallel-pinnate veins branching gracefully from a prominent central midrib (often with a faint reddish/purplish central line on juvenile petioles).
     * Pseudostem: Erect, robust false stem formed by tightly overlapping concentric leaf sheaths emerging directly from the underground rhizome crown.
   - Key Morphological Rhizome Markers (Subterranean Medicinal Part - Haridra Kanda):
     * Knobby Cylindrical Finger Rhizomes: Fleshy, branched, oblong-cylindrical tubers ("fingers" and "bulbs") featuring characteristic horizontal ring-like scale scars, transverse ridges, and annular rings.
     * Outer Skin: Earthy brownish-buff, tan, or yellowish-brown thin skin (often showing clinging soil in field harvest specimens).
     * Internal Pulp (Curcumin-Rich Core): Intense glowing saffron-orange, deep fiery golden-yellow, or radiant yellow-orange crisp interior when sliced or snapped open.
   - Dried Whole Rhizomes (Sabut Haldi / Finger Turmeric):
     * Hard, rigid, wrinkled cylindrical dried finger sticks (yellow-ochre to brownish-yellow) with longitudinal ridges and fractured bright yellow cores.
   - Real-World Harvest, Culinary & Agricultural Presentation Variations to recognize as Turmeric:
     * Freshly excavated root clumps with thick clusters of finger rhizomes, fibrous feeder roots, and attached green pseudostem bases.
     * Piles or wooden bowls filled with raw knobby finger rhizomes with some pieces sliced open to expose the glowing orange interior.
     * Bulk market piles of whole dried golden-yellow turmeric sticks (Sabut Haldi).
     * Lush tropical garden beds or farm fields with large broad lanceolate leaves waving in daylight.
     * Macro close-ups of single fresh turmeric rhizomes on rustic wooden, burlap, or neutral studio surfaces.

CRITICAL CLASSIFICATION RULES:
- Morphological Shape Tracking: Always examine the structural leaf shape (rosette, lanceolate, falcate, compound pinnate, ovate, obovate), margin teeth, and succulent cross-section.
- Evaluate real-world image conditions: lighting, background contrast, leaf orientation, camera angle, distance, potted vs outdoor field settings, and monochrome imagery.
- DO NOT force an identification. If the image:
  * Is not a plant (e.g. animal, object, face, food, graphic, random texture),
  * Is another plant species that is NOT one of the 7 supported plants (e.g., rose, tomato, monstera, mint, money plant, grass, oak),
  * Is too blurry, too dark, out of focus, or obscured to make a reliable determination,
  * Has low feature alignment (< 65% certainty),
  THEN you MUST set predictedPlantId = "unknown", confidence = < 65, and clearly explain why.
- Provide a realistic academic probability distribution across the candidate plants for research analysis in alternativePossibilities. The top possibility should correspond to the predicted plant if confident.`;

    const promptText = `Analyze this botanical image carefully. 
Identify if it is one of the 7 supported Ayurvedic medicinal plants (aloe_vera, tulsi, neem, ashwagandha, amla, brahmi, turmeric) or unknown.
Inspect morphological features: leaf shape, margins, venation, leaf arrangement, surface texture, stem structure, and capture conditions.
Return a structured JSON response matching the required schema.`;

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const contentsPayload = {
      parts: [
        {
          inlineData: {
            mimeType,
            data: cleanBase64,
          },
        },
        {
          text: promptText,
        },
      ],
    };

    const configPayload = {
      systemInstruction,
      temperature: 0.15,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          predictedPlantId: {
            type: Type.STRING,
            description: "One of: 'aloe_vera', 'tulsi', 'neem', 'ashwagandha', 'amla', 'brahmi', 'turmeric', or 'unknown'",
          },
          plantName: {
            type: Type.STRING,
            description: "Common name of the identified plant, or 'Unknown / Not Supported Plant'",
          },
          scientificName: {
            type: Type.STRING,
            description: "Botanical scientific name, or 'N/A'",
          },
          confidence: {
            type: Type.INTEGER,
            description: "Confidence percentage integer from 0 to 100",
          },
          confidenceCategory: {
            type: Type.STRING,
            description: "Must be 'high' (90-100), 'moderate' (70-89), or 'low' (<70)",
          },
          analysisSummary: {
            type: Type.STRING,
            description: "Clear 2-3 sentence explanation of the morphological identification or uncertainty rationale",
          },
          identifyingFeaturesObserved: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Key visual botanical traits observed in the photo",
          },
          environmentalConditionNotes: {
            type: Type.STRING,
            description: "Assessment of lighting, angle, focus, background clutter, and leaf condition",
          },
          alternativePossibilities: {
            type: Type.ARRAY,
            description: "Probability distribution for academic AI analysis demonstration",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                scientificName: { type: Type.STRING },
                probability: { type: Type.INTEGER },
              },
              required: ["name", "probability"],
            },
          },
        },
        required: [
          "predictedPlantId",
          "plantName",
          "scientificName",
          "confidence",
          "confidenceCategory",
          "analysisSummary",
          "identifyingFeaturesObserved",
          "alternativePossibilities",
        ],
      },
    };

    // Tiered model fallback prioritizing supported high-speed, low-latency vision inference
    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.7-flash",
      "gemini-3.1-pro-preview",
    ];
    let response: any = null;
    let lastError: any = null;

    for (const modelCandidate of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelCandidate,
          contents: contentsPayload,
          config: configPayload,
        });

        if (response && response.text) {
          break; // Successful response
        }
      } catch (modelErr: any) {
        lastError = modelErr;
        console.warn(`Model ${modelCandidate} failed:`, modelErr?.message || modelErr);
        
        // If high demand / 503 / 429, wait briefly and try next fallback model
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error("AI analysis service is temporarily overloaded. Please try again in a few moments.");
    }

    const textOutput = response.text?.trim() || "{}";
    let parsedResult;
    try {
      parsedResult = JSON.parse(textOutput);
    } catch {
      throw new Error("Invalid JSON response from vision model");
    }

    // Safety fallback & normalization
    const validIds = ["aloe_vera", "tulsi", "neem", "ashwagandha", "amla", "brahmi", "turmeric"];
    let finalId = parsedResult.predictedPlantId?.toLowerCase() || "unknown";
    if (!validIds.includes(finalId)) {
      finalId = "unknown";
    }

    const conf = Math.max(0, Math.min(100, Number(parsedResult.confidence) || 0));
    let confCat: "high" | "moderate" | "low" = "low";
    if (conf >= 90) confCat = "high";
    else if (conf >= 70) confCat = "moderate";

    if (finalId === "unknown" || conf < 65) {
      parsedResult.isUnsupportedOrUnknown = true;
    }

    return res.json({
      id: "pv-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      predictedPlantId: finalId,
      plantName: parsedResult.plantName || (finalId === "unknown" ? "Plant not confidently identified" : finalId),
      scientificName: parsedResult.scientificName || "N/A",
      confidence: conf,
      confidenceCategory: confCat,
      analysisSummary: parsedResult.analysisSummary || "Morphological visual analysis completed.",
      identifyingFeaturesObserved: Array.isArray(parsedResult.identifyingFeaturesObserved)
        ? parsedResult.identifyingFeaturesObserved
        : ["Visual leaf morphology analyzed"],
      environmentalConditionNotes: parsedResult.environmentalConditionNotes || "Image captured under standard lighting.",
      alternativePossibilities: Array.isArray(parsedResult.alternativePossibilities)
        ? parsedResult.alternativePossibilities
        : [],
      timestamp: new Date().toISOString(),
      isUnsupportedOrUnknown: parsedResult.isUnsupportedOrUnknown || finalId === "unknown" || conf < 65,
    });
  } catch (error: any) {
    console.error("Plant identification error:", error);
    let friendlyMessage = "Something went wrong while analyzing the image. Please try again.";
    
    if (
      error?.status === 503 || 
      error?.message?.includes("503") || 
      error?.message?.includes("high demand") || 
      error?.message?.includes("UNAVAILABLE")
    ) {
      friendlyMessage = "The AI vision model is temporarily experiencing high demand. Please click 'Analyze Plant' again in a few seconds.";
    } else if (
      error?.status === 429 || 
      error?.message?.includes("429") || 
      error?.message?.includes("RESOURCE_EXHAUSTED")
    ) {
      friendlyMessage = "Rate limit reached. Please wait a moment before trying your next scan.";
    } else if (error?.message && typeof error.message === "string" && !error.message.startsWith("{")) {
      friendlyMessage = error.message;
    }

    return res.status(500).json({
      error: friendlyMessage,
    });
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌿 Plant Veda server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
