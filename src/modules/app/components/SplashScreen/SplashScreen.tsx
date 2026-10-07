export default function SplashScreen() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white">
            <img src="/arch-gallery-icon.jpg" alt="App" className="h-16 w-16" />
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-secondary" />
        </div>
    );
}