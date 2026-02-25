import { useState } from "react";
import AppLayout from "../Home/components/AppLayout";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import ProjectTab from "./components/ProjectTab/ProjectTab";
import AbouTab from "./components/AboutTab/AboutTab";
import useProfile from "./hooks/useProfile";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("projects");
  const user = useProfile();

  const tabs = [
    {
      id: "projects",
      label: "Proyectos",
      icon: "FolderOpen",
    },
    { id: "about", label: "Sobre Mí", icon: "User" },
    { id: "experience", label: "Experiencia", icon: "Briefcase" },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen">
        <ProfileHeader user={user} />
        <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-4 lg:py-6">
          <div className="border-b border-border mb-6 md:mb-8 lg:mb-12">
            <nav className="flex gap-2 md:gap-4 overflow-x-auto" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab?.id}
                  role="tab"
                  aria-selected={activeTab === tab?.id}
                  aria-controls={`${tab?.id}-panel`}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 whitespace-nowrap rounded-t-lg transition-colors duration-200 focus:outline-none 
                    focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      activeTab === tab.id
                        ? "border-b-2 border-primary text-gray-800 bg-gray-200 font-semibold"
                        : "border-b-2 border-transparent text-gray-600 hover:text-foreground hover:border-border"
                    }`}
                >
                  <span className="text-sm md:text-base">{tab.label}</span>
                </button>
              ))}
            </nav>
            <div
              role="tabpanel"
              id={`${activeTab}-panel`}
              aria-labelledby={`${activeTab}-tab`}
              className="mt-6 animate-fadeIn"
            >
              {activeTab === "projects" && <ProjectTab userId={user?.id} />}
              {activeTab === "about" && <AbouTab user={user} />}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
