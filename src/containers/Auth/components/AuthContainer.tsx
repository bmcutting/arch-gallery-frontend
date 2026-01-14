interface Props {
  children?: React.ReactNode;
}

export default function AuthContainer({ children }: Props) {
  return (
    <div className="w-full h-screen flex justify-center items-center px-5 bg-neutral-50">
      <main className="flex flex-col w-full max-w-md sm:bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow-sm sm:p-6">
        {children}
      </main>
    </div>
  );
}
