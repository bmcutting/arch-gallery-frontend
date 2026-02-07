export default function Header() {
  return (
    <header className="mb-8 w-full flex flex-col items-center text-center">
      <img
        src="/arch-gallery-icon.jpg"
        alt="Logo"
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mb-4 object-contain"
      />
      <h1 className="font-title-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2">
        ArchGallery
      </h1>
      <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg lg:text-xl text-center">
        Inserte sus datos para continuar
      </p>
    </header>
  );
}
