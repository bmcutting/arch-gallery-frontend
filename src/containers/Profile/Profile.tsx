import AppLayout from "../Home/components/AppLayout";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import ProjectTab from "./components/ProjectTab/ProjectTab";

export default function Profile() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        <ProfileHeader />
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-4 lg:py-6">
          <div className="border-b border-border mb-6 md:mb-8 lg:mb-12">
            <nav className="flex gap-2 md:gap-4 overflow-x-auto" role="tablist">
              <button
                className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 border-b-2 whitespace-nowrap
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-t-lg mb-2 md:mb-4 lg:mb-6"
              >
                <span className="text-sm md:text-base">Proyectos</span>
              </button>
            </nav>
            <div role="tabpanel">
              <ProjectTab />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
