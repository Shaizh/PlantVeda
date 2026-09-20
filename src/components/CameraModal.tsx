import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = async (mode: 'environment' | 'user') => {
    setIsInitializing(true);
    setCameraError(null);

    // Stop existing stream if running
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsInitializing(false);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        'Unable to access camera. Please check browser permissions or use file upload.'
      );
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `plant-capture-${Date.now()}.jpg`, {
            type: 'image/jpeg',
          });
          onCapture(file);
          onClose();
        }
      },
      'image/jpeg',
      0.9
    );
  };

  const toggleFacingMode = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="liquid-glass rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/70 dark:border-white/15 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-neutral-900 dark:text-white text-base">Capture Plant Photo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/10 transition-colors"
            id="close-camera-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport */}
        <div className="relative bg-black aspect-4/3 flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center text-neutral-300 max-w-xs space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
              <p className="text-sm">{cameraError}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Botanical Focus Reticle / Framing Guide */}
              <div className="absolute inset-8 border-2 border-dashed border-white/60 rounded-3xl pointer-events-none flex flex-col justify-between p-4">
                <span className="text-[11px] font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full w-max border border-white/20">
                  Center leaf or plant branch
                </span>
                <span className="text-[11px] font-mono text-emerald-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full w-max self-end border border-white/20">
                  Ensure good lighting
                </span>
              </div>
            </>
          )}

          {isInitializing && !cameraError && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
              <span className="text-sm text-neutral-200">Initializing camera lens...</span>
            </div>
          )}
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Controls */}
        <div className="p-5 px-6 flex items-center justify-between border-t border-black/5 dark:border-white/10">
          <button
            type="button"
            onClick={toggleFacingMode}
            disabled={!!cameraError || isInitializing}
            className="flex items-center gap-1.5 text-xs px-4 py-2.5 rounded-full liquid-btn-secondary text-neutral-700 dark:text-neutral-200 transition-colors disabled:opacity-40"
            id="switch-camera-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch Lens</span>
          </button>

          <button
            type="button"
            onClick={handleCapture}
            disabled={!!cameraError || isInitializing}
            className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all disabled:opacity-40 border-2 border-white/40"
            id="snap-photo-btn"
            aria-label="Capture Photo"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-white shadow-xs" />
            </div>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-2.5 rounded-full transition-colors"
            id="cancel-camera-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
