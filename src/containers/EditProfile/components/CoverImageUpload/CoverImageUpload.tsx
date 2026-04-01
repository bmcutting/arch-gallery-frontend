import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import Button from "../../../../modules/app/modules/ui/components/Button/Button";

interface Props {
  coverImageUrl?: string;
  loading?: boolean;
}

export default function CoverImageUpload({
  coverImageUrl,
  loading = false,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalLoading(true);
    try {
      console.log("onUpload");
    } finally {
      setLocalLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setLocalLoading(true);
      try {
        console.log("onUpload");
      } finally {
        setLocalLoading(false);
      }
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div
        className={`relative w-full h-32 md:h-40 lg:h-48 rounded-lg overflow-hidden border-2 ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-dashed border-border"
        } transition-colors cursor-pointer`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt="Portada del perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted text-muted-foreground">
            <FaImage className="w-8 h-8 mb-2" />
            <p className="text-sm text-center px-4">
              Arrastra una imagen o haz clic para seleccionar
            </p>
          </div>
        )}
        {(localLoading || loading) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {coverImageUrl && (
        <div className="flex gap-3">
          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading || localLoading}
          >
            Cambiar portada
          </Button>
          <Button type="button" size="sm" disabled={loading || localLoading}>
            Eliminar portada
          </Button>
        </div>
      )}
    </div>
  );
}
