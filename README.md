# 🌿 Plant Veda – Ayurvedic Medicinal Plant Identification

Plant Veda is an AI-powered web application that identifies selected Ayurvedic medicinal plants from images and provides structured information about their traditional Ayurvedic properties, uses, identifying features, preparation methods, precautions, and related details.

The application combines **image-based AI identification** with an organized Ayurvedic plant library to make medicinal plant information easier to explore and understand.

---

## ✨ Features

### 🔍 AI Plant Identification

* Upload a plant image for identification.
* Supports JPG, PNG, and WEBP images.
* Camera capture support.
* Drag-and-drop image upload.
* Client-side image preprocessing for improved analysis.
* AI confidence-based classification.
* Handles unclear, unsupported, or low-confidence images by returning an unknown result instead of forcing an incorrect identification.

### 🌱 Supported Plants

Plant Veda currently supports identification of:

1. **Aloe Vera** – *Aloe barbadensis Miller*
2. **Tulsi** – *Ocimum tenuiflorum*
3. **Neem** – *Azadirachta indica*
4. **Ashwagandha** – *Withania somnifera*
5. **Amla** – *Phyllanthus emblica*
6. **Brahmi** – *Bacopa monnieri*
7. **Turmeric** – *Curcuma longa*

### 📚 Ayurvedic Plant Library

Each supported plant contains structured information including:

* Common and scientific name
* Ayurvedic/Sanskrit name
* Botanical family
* Plant category
* Description
* Identifying features
* Rasa (taste)
* Virya (potency)
* Vipaka
* Gunas
* Dosha effects
* Traditional uses
* Associated benefits
* Parts used
* Preparation information
* Classic formulations
* Precautions
* Contraindications

### 🕘 Identification History

* Saves previous identification results locally.
* View previously identified plants.
* Review confidence levels and analysis summaries.
* Stores identification timestamps.

### 📖 Identification Results

Results provide:

* Identified plant
* Scientific name
* Confidence score
* Confidence category
* AI analysis summary
* Observed identifying features
* Environmental condition notes
* Alternative possibilities

### 🎨 User Interface

* Clean Ayurvedic-inspired interface.
* Responsive design.
* Home, Identify, Library, History, and About sections.
* Light/dark theme support.
* Camera-based identification workflow.

---

## 🛠️ Technologies Used

| Technology                | Purpose                             |
| ------------------------- | ----------------------------------- |
| React                     | Frontend UI development             |
| TypeScript                | Type-safe application development   |
| Vite                      | Frontend development and build tool |
| Tailwind CSS              | Styling and responsive UI           |
| Node.js                   | Backend runtime                     |
| Express.js                | API server                          |
| Google Gemini API         | AI-powered plant image analysis     |
| Lucide React              | Icons                               |
| Motion                    | UI animations                       |
| Canvas / Image Processing | Image preprocessing                 |

---

## 📁 Project Structure

```text
plant-veda/
├── public/
│   └── images/
│       ├── aloe_vera_planter.jpg
│       ├── amla_reference.jpg
│       ├── ashwagandha_reference.jpg
│       ├── brahmi_reference.jpg
│       ├── neem_reference.jpg
│       ├── tulsi_reference.jpg
│       └── turmeric_reference.jpg
│
├── src/
│   ├── components/
│   │   ├── AboutPage.tsx
│   │   ├── AyurvedicInfoModal.tsx
│   │   ├── CameraModal.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── IdentificationHistoryView.tsx
│   │   ├── IdentificationResultView.tsx
│   │   ├── Navbar.tsx
│   │   ├── PlantIdentifier.tsx
│   │   └── PlantLibrary.tsx
│   │
│   ├── data/
│   │   └── plants.ts
│   │
│   ├── utils/
│   │   └── imagePreprocessing.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
│
├── server.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ How It Works

```text
User uploads/captures plant image
            ↓
      Image preprocessing
            ↓
       Backend API
            ↓
      Google Gemini AI
            ↓
   Plant classification
            ↓
   Confidence validation
            ↓
   Identification result
            ↓
 Ayurvedic information
```

The system is designed to avoid presenting unreliable predictions. Images that are unclear, unsupported, or below the configured confidence threshold can be classified as **unknown**.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/Shaizh/PlantVeda.git
cd PlantVeda
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API key

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your actual API key to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The application runs on:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server.

### Production Build

```bash
npm run build
```

Builds the frontend and backend for production.

### Production Start

```bash
npm start
```

Starts the production server after building.

### Type Checking

```bash
npm run lint
```

Runs TypeScript type checking.

---

## 🔐 Security

* API credentials are stored through environment variables.
* `.env*` files are excluded from Git.
* API keys should never be hard-coded into source files.
* Image analysis is handled through the backend API rather than exposing the Gemini API key in the frontend.

---

## 📱 Main Application Modules

### 1. Home

Introduces Plant Veda and provides access to the main features.

### 2. Plant Identification

Allows users to upload, drag-and-drop, or capture plant images for AI identification.

### 3. Plant Library

Provides detailed Ayurvedic information for the supported medicinal plants.

### 4. Identification History

Stores and displays previous identification results.

### 5. About

Provides information about the Plant Veda application.

---

## 🎯 Project Objective

The objective of Plant Veda is to create a simple and accessible platform for identifying selected Ayurvedic medicinal plants through image analysis while presenting organized information about their traditional Ayurvedic characteristics and uses.

---

## 🔮 Future Enhancements

Possible future improvements include:

* Support for additional medicinal plants.
* Improved image classification accuracy.
* Multi-image plant analysis.
* Regional language support.
* Offline plant reference library.
* More advanced plant disease and health analysis.
* User accounts and cloud-based identification history.
* Improved model evaluation and dataset management.

---

## ⚠️ Disclaimer

Plant Veda provides informational content about Ayurvedic medicinal plants and traditional uses. Identification results and plant information should not be treated as medical advice or a substitute for professional healthcare guidance.

---

## 👨‍💻 Project Information

**Project:** Plant Veda
**Category:** AI / Computer Vision / Web Application
**Purpose:** Ayurvedic Medicinal Plant Identification
**Frontend:** React + TypeScript
**Backend:** Node.js + Express.js
**AI:** Google Gemini API

---

## 📄 License

This project is developed for educational and academic purposes.

