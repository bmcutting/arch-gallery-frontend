import { FaInfo, FaUpload } from "react-icons/fa";
import Input from "../../../../modules/app/modules/ui/components/Input/Input";

interface Props {
  profileImageUrl?: string;
}

export default function ProfilePhotoUpload({ profileImageUrl }: Props) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-muted border-2 border-border">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Vista previa de foto de perfil del arquitecto"
                className="w-full h-full object-cover"
              />
            ) : (
              <div>
                <img
                  src="/user.png"
                  alt="Vista previa de foto de perfil del arquitecto"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 md:p-8 transition-discrete">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <FaUpload name="Upload" size={24} />
              </div>
              <div>
                <p className="text-sm md:text-base font-medium text-black mb-1">
                  Arrastra tu foto aquí o haz clic para seleccionar
                </p>
                <p className="text-xs md:text-sm text-black">
                  JPG o PNG (máx. 5MB)
                </p>
              </div>
            </div>
            <div className="hidden">
              <Input
                value="PhotoUploadInput"
                onChange={() => console.log("HOLA")}
                className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Seleccionar Archivo
            </button>
          </div>
        </div>

        {profileImageUrl && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Cambiar Foto
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Eliminar foto
            </button>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex gap-3">
            <FaInfo name="Info" size={20} className="shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-muted-foreground space-y-1">
              <p>• Usa una foto profesional con buena iluminación</p>
              <p>• Asegúrate de que tu rostro sea claramente visible</p>
              <p>• Evita fondos distractores o imágenes borrosas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
