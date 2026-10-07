import ProfileSkeleton from "@containers/Profile/components/ProfileSkeleton/ProfileSkeleton";
import ProfileView from "@containers/Profile/components/ProfileView/ProfileView";
import AppLayout from "@layouts/AppLayout";
import useProfileUser from "@modules/user/hooks/useProfileUser";
import { useParams } from "react-router-dom";

export default function ArchitectProfile() {
    const { userId = "" } = useParams<{ userId: string }>();
    const { user, loading, error } = useProfileUser(userId);

    if (error) {
        return (
            <AppLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <p>No se encontró este perfil.</p>
                </div>
            </AppLayout>
        );
    }

    if (loading || !user) {
        return (
            <AppLayout>
                <ProfileSkeleton />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <ProfileView user={user} isOwnProfile={false} />
        </AppLayout>
    );
}
