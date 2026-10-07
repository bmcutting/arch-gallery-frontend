import AppLayout from "@layouts/AppLayout";
import { useUserContext } from "@modules/user/context/useUserContext";
import ProfileSkeleton from "./components/ProfileSkeleton/ProfileSkeleton";
import ProfileView from "./components/ProfileView/ProfileView";

export default function MyProfile() {
  const { user } = useUserContext();

  return (
    <AppLayout>
      {user ? <ProfileView user={user} isOwnProfile /> : <ProfileSkeleton />}
    </AppLayout>
  );
}
