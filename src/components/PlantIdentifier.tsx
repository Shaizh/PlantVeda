import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sun, 
  Focus, 
  HandMetal, 
  Maximize2,
  FileImage,
  Layers
} from 'lucide-react';
import { SAMPLE_TEST_LEAVES } from '../data/plants';
import { preprocessImage, validateImageFile, ProcessedImageResult } from '../utils/imagePreprocessing';
import { CameraModal } from './CameraModal';
import { IdentificationResult, PlantId } from '../types';

interface PlantIdentifierProps {
  onIdentificationComplete: (result: IdentificationResult) => void;
}

export const PlantIdentifier: React.FC<PlantIdentifierProps> = ({ onIdentificationComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImageResult | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('Preparing image...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle incoming image file or sample
  const handleImageSelected = async (fileOrUrl: File | string) => {
    setErrorMessage(null);
    setIsProcessingImage(true);

    try {
      if (fileOrUrl instanceof File) {
        const validation = validateImageFile(fileOrUrl);
        if (!validation.valid) {
          setErrorMessage(validation.error || 'Please upload a JPG, PNG or WEBP image.');
          setIsProcessingImage(false);
          return;
        }
        setSelectedFile(fileOrUrl);
      } else {
        setSelectedFile(null);
      }

      // Preprocess image (resize & compress client-side for lightweight high-speed transfer)
      const processed = await preprocessImage(fileOrUrl);
      setProcessedImage(processed);
    } catch (err: any) {
      console.error('Preprocessing error:', err);
      setErrorMessage('Could not process this image. Please try another photo.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageSelected(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setProcessedImage(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Perform AI identification via backend API
  const handleAnalyze = async () => {
    if (!processedImage) {
      setErrorMessage('Please upload a plant image first.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisStep('Preprocessing & resizing botanical frame...');

    try {
      setTimeout(() => {
        setAnalysisStep('Analyzing leaf morphology, margins & venation...');
      }, 700);

      setTimeout(() => {
        setAnalysisStep('Evaluating Ayurvedic flora classifier (Gemini Vision)...');
      }, 1500);

      const response = await fetch('/api/identify-plant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: processedImage.base64Data,
          mimeType: processedImage.mimeType,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Something went wrong while analyzing the image. Please try again.');
      }

      const result: IdentificationResult = await response.json();
      result.userImageBase64 = processedImage.previewUrl;
      onIdentificationComplete(result);
    } catch (err: any) {
      console.error('Identification API error:', err);
      setErrorMessage(
        err.message || 'Something went wrong while analyzing the image. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 liquid-glass-pill px-3.5 py-1 rounded-full">
          AI Vision Classifier
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight font-serif-display">
          Identify Your Plant
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto">
          Upload a clear photo of a leaf or plant. Plant Veda will analyze morphological features and match it with Ayurvedic botanical knowledge.
        </p>
      </div>

      {/* Main Upload / Preview Area */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-white/70 dark:border-white/10">
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          id="plant-file-input"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleImageSelected(e.target.files[0]);
            }
          }}
        />

        {/* Upload Zone or Image Preview */}
        {!processedImage ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-emerald-500 bg-emerald-500/10 scale-[0.99]'
                : 'border-emerald-700/20 dark:border-emerald-400/20 hover:border-emerald-500 bg-white/30 dark:bg-black/20 hover:bg-white/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
            id="drag-drop-zone"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-600/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                <Upload className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                  Drop an image or choose from photos
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Supported formats: <strong className="text-emerald-700 dark:text-emerald-400">JPG • PNG • WEBP</strong> (Fast inference)
                </p>
              </div>

              {/* Action buttons inside upload zone */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  id="browse-files-btn"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 rounded-full liquid-btn-primary text-xs font-semibold shadow-sm"
                >
                  Choose Photo
                </button>
                <button
                  type="button"
                  id="open-camera-modal-btn"
                  onClick={() => setCameraOpen(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full liquid-btn-secondary text-xs font-semibold"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Take Photo</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Preview State */
          <div className="space-y-5">
            <div className="relative rounded-3xl overflow-hidden bg-neutral-950 aspect-16/10 sm:aspect-21/9 flex items-center justify-center border border-white/20 shadow-2xl">
              <img
                src={processedImage.previewUrl}
                alt="Selected Plant Preview"
                className="max-h-full max-w-full object-contain"
              />

              {/* Top controls over preview */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={handleRemoveImage}
                  disabled={isAnalyzing}
                  id="remove-image-btn"
                  className="p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white backdrop-blur-md transition-colors shadow-sm disabled:opacity-50"
                  aria-label="Remove Image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preprocessing Metadata Badge */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2.5">
                <span>{processedImage.dimensions.width}×{processedImage.dimensions.height}px</span>
                <span className="opacity-40">•</span>
                <span className="text-emerald-300">
                  Preprocessed: {Math.round(processedImage.processedSizeBytes / 1024)} KB
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                onClick={handleRemoveImage}
                disabled={isAnalyzing}
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium disabled:opacity-50 transition-colors"
                id="choose-different-image-btn"
              >
                ← Choose a different image
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || isProcessingImage}
                  id="analyze-plant-btn"
                  className="flex items-center gap-2 px-7 py-3 rounded-full liquid-btn-primary text-sm font-semibold shadow-lg active:scale-98 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                      <span>Analyzing Plant...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>Analyze Plant</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay Animation during AI classification */}
        {isAnalyzing && (
          <div className="p-6 rounded-3xl liquid-glass border border-emerald-500/30 text-center space-y-3.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white font-serif-display">
                “Analyzing your plant…”
              </h4>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-mono">
              {analysisStep}
            </p>
            <div className="w-56 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs flex items-start justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold block">Notice</span>
                <p>{errorMessage}</p>
              </div>
            </div>
            {processedImage && (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Test with Curated Sample Leaves */}
      <div className="liquid-glass rounded-3xl p-6 shadow-sm space-y-3 border border-white/60 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Instant Demo: Try with Sample Leaves
            </h3>
          </div>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">1-click test specimens</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {SAMPLE_TEST_LEAVES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              id={`sample-leaf-${sample.plantId}`}
              disabled={isAnalyzing}
              onClick={() => handleImageSelected(sample.imageUrl)}
              className="group text-left p-2 rounded-2xl liquid-glass-card flex flex-col gap-1.5 focus:outline-none"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                <img
                  src={sample.imageUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 backdrop-blur-md text-white font-mono px-1.5 py-0.5 rounded-full">
                  {sample.tag}
                </span>
              </div>
              <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                {sample.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Real-World Image Capture Guidance Advice Box */}
      <div className="liquid-glass rounded-3xl p-6 shadow-sm space-y-4 border border-white/60 dark:border-white/10">
        <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
          <Focus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            For Better AI Accuracy & Real-World Robustness:
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs text-neutral-600 dark:text-neutral-300">
          <div className="flex items-start gap-2.5 liquid-glass-subtle p-3.5 rounded-2xl">
            <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-neutral-900 dark:text-white mb-0.5">Good Lighting</strong>
              <span>Use natural, diffused lighting without harsh dark shadows.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 liquid-glass-subtle p-3.5 rounded-2xl">
            <Focus className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-neutral-900 dark:text-white mb-0.5">Clear Focus</strong>
              <span>Keep the leaf or plant clearly visible and avoid excessive blur.</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-[#F9FAF6] p-3 rounded-xl border border-[#E8ECE0]">
            <Maximize2 className="w-4 h-4 text-[#5B6D55] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1B2A1E] mb-0.5">Complete Leaf</strong>
              <span>Try to capture the complete leaf margin and stem arrangement.</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-[#F9FAF6] p-3 rounded-xl border border-[#E8ECE0]">
            <HandMetal className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1B2A1E] mb-0.5">Unobstructed</strong>
              <span>Avoid covering the plant with your hand or fingers.</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-[#F9FAF6] p-3 rounded-xl border border-[#E8ECE0]">
            <FileImage className="w-4 h-4 text-[#3A5A40] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#1B2A1E] mb-0.5">7 Species</strong>
              <span>Classifies Aloe, Tulsi, Neem, Ashwagandha, Amla, Brahmi, Turmeric.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={(file) => handleImageSelected(file)}
      />
    </div>
  );
};
