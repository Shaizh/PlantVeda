export interface ProcessedImageResult {
  base64Data: string;
  mimeType: string;
  originalSizeBytes: number;
  processedSizeBytes: number;
  dimensions: { width: number; height: number };
  previewUrl: string;
}

const MAX_DIMENSION = 768;
const COMPRESSION_QUALITY = 0.80;

/**
 * Resizes and compresses an image client-side before sending to server/AI vision
 */
export async function preprocessImage(fileOrUrl: File | Blob | string): Promise<ProcessedImageResult> {
  return new Promise((resolve, reject) => {
    let originalSize = 0;
    if (fileOrUrl instanceof Blob) {
      originalSize = fileOrUrl.size;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate aspect-ratio-preserving scaled dimensions
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to create canvas context'));
        return;
      }

      // Smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Export as JPEG with controlled quality
      const dataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
      const base64Data = dataUrl.split(',')[1];
      const mimeType = 'image/jpeg';
      const processedSize = Math.round((base64Data.length * 3) / 4);

      resolve({
        base64Data,
        mimeType,
        originalSizeBytes: originalSize || processedSize,
        processedSizeBytes: processedSize,
        dimensions: { width, height },
        previewUrl: dataUrl
      });
    };

    img.onerror = (err) => {
      reject(new Error('Failed to load image for processing: ' + err));
    };

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(fileOrUrl);
    }
  });
}

/**
 * Validates file format and size
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpe?g|png|webp)$/i)) {
    return {
      valid: false,
      error: 'Please upload a valid JPG, PNG, or WEBP image format.'
    };
  }

  const maxSizeBytes = 15 * 1024 * 1024; // 15MB max initial upload
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: 'Image file exceeds 15MB limit. Please choose a smaller photo.'
    };
  }

  return { valid: true };
}
