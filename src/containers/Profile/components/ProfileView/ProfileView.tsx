import { useState } from "react";
import type { User } from "@modules/user/domain/entities/user";
import ProfileHeader from "@containers/Profile/components/ProfileHeader/ProfileHeader";
import ProjectTab from "@containers/Profile/components/ProjectTab/ProjectTab";
import AbouTab from "@containers/Profile/components/AboutTab/AboutTab";
import ExperienceTab from "@containers/Profile/components/ExperienceTab/ExperienceTab";

interface Props {
  user: User;
  isOwnProfile: boolean;
}

const tabs = [
  { id: "projects", label: "Proyectos", icon: "FolderOpen" },
  { id: "about", label: "Sobre Mí", icon: "User" },
  { id: "experience", label: "Experiencia", icon: "Briefcase" },
];

export default function ProfileView({ user, isOwnProfile }: Props) {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen">
      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-4 lg:py-6">
        <div className="border-b border-border mb-6 md:mb-8 lg:mb-12">
          <nav className="flex gap-2 md:gap-4 overflow-x-auto" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-2 md:px-4 py-2 md:py-3 whitespace-nowrap
                    rounded-lg focus:outline-none border-2 border-muted
                    ${activeTab === tab.id
                    ? " text-foreground bg-muted font-semibold hover:border-b-2 hover:border-border"
                    : " text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-border"
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
            {activeTab === "projects" && (
              <ProjectTab userId={user.id} readOnly={!isOwnProfile} />
            )}
            {activeTab === "about" && <AbouTab user={user} />}
            {activeTab === "experience" && (
              <ExperienceTab user={user} readOnly={!isOwnProfile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
