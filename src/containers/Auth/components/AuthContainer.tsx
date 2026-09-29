interface Props {
  children?: React.ReactNode;
}

export default function AuthContainer({ children }: Props) {
  return (
    <div className="w-full min-h-dvh flex flex-col lg:flex-row bg-card">
      {/* Panel de imagen (escritorio, a la derecha del formulario) */}
      <aside className="relative hidden lg:flex lg:order-last lg:w-1/2 xl:w-3/5 overflow-hidden">
        <img
          src={"/auth-cover.jpg"}
          alt="Auth cover image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/40" />

        <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14 text-white">
          <div className="flex items-center gap-3">
            <img
              src="/arch-gallery-icon.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-md object-contain bg-white"
            />
            <span className="text-lg font-semibold tracking-tight">
              ArchGallery
            </span>
          </div>

          <div className="max-w-md">
            <p className="text-3xl xl:text-4xl font-semibold leading-tight text-balance">
              Descubre y comparte la arquitectura que te inspira.
            </p>
            <p className="mt-4 text-white/75 text-base">
              Una galería hecha por y para amantes del diseño.
            </p>
          </div>
        </div>
      </aside>

      {/* Franja de imagen (móvil) */}
      <div className="relative h-36 sm:h-44 lg:hidden overflow-hidden">
        <img
          src={"/auth-cover.jpg"}
          alt="Auth cover image"
          className="absolute inset-0 w-full h-full object-cover object-[center_75%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-card" />
      </div>

      {/* Formulario */}
      <div className="flex flex-1 justify-center items-center px-5 pb-10 lg:py-10">
        <main className="flex flex-col w-full max-w-md animate-fadeInUp">
          {children}
        </main>
      </div>
    </div>
  );
}
