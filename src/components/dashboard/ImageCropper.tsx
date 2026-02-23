import { useState, useCallback, useRef } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RotateCw, ZoomIn, Maximize } from "lucide-react";

interface ImageCropperProps {
  open: boolean;
  imageSrc: string;
  aspect?: number;
  cropShape?: "rect" | "round";
  onClose: () => void;
  onCropComplete: (croppedImage: string) => void;
}

/**
 * Creates a cropped image that correctly handles zoom-out scenarios.
 * When the user zooms out, the crop area can be larger than the image,
 * so we need to draw the image centered on a transparent/white canvas.
 */
const createCroppedImage = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation: number = 0
): Promise<string> => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
    image.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  // Fill with transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate source and destination coordinates
  // pixelCrop.x/y can be negative when zoomed out
  const sx = Math.max(0, pixelCrop.x);
  const sy = Math.max(0, pixelCrop.y);
  const sx2 = Math.min(image.naturalWidth, pixelCrop.x + pixelCrop.width);
  const sy2 = Math.min(image.naturalHeight, pixelCrop.y + pixelCrop.height);

  const sw = sx2 - sx;
  const sh = sy2 - sy;

  if (sw <= 0 || sh <= 0) {
    // Image is completely outside the crop area
    return canvas.toDataURL("image/png");
  }

  const dx = sx - pixelCrop.x;
  const dy = sy - pixelCrop.y;

  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, sw, sh);

  return canvas.toDataURL("image/png");
};

const ImageCropper = ({
  open,
  imageSrc,
  aspect = 1,
  cropShape = "rect",
  onClose,
  onCropComplete: onCropDone,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await createCroppedImage(imageSrc, croppedAreaPixels, rotation);
      onCropDone(croppedImage);
      onClose();
    } catch (e) {
      console.error("Failed to crop image:", e);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleAutoFit = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(0.1);
    setRotation(0);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>تعديل الصورة</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[350px] bg-muted rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            cropShape={cropShape}
            minZoom={0.1}
            maxZoom={5}
            objectFit="contain"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            showGrid={true}
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <ZoomIn className="w-4 h-4" /> زوم
            </Label>
            <Slider
              value={[zoom]}
              min={0.1}
              max={5}
              step={0.01}
              onValueChange={(v) => setZoom(v[0])}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <RotateCw className="w-4 h-4" /> تدوير
            </Label>
            <Slider
              value={[rotation]}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => setRotation(v[0])}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 flex-wrap">
          <Button variant="outline" onClick={handleAutoFit} className="gap-1.5">
            <Maximize className="w-4 h-4" />
            Auto-fit
          </Button>
          <Button variant="outline" onClick={handleReset}>
            إعادة ضبط
          </Button>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
