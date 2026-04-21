import Navbar from "../containers/Home/components/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {children}
    </div>
  );
}
