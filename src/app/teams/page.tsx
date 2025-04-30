
import { ErrorBoundary } from "@/components/error-boundary";
import { FooterSection } from "@/components/footer-section";

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-12">
        <ErrorBoundary fallbackUI={<div>Failed to load teams information</div>}>
          <div className="grid grid-cols-1 gap-6">
            <h1 className="text-3xl font-bold">Csapatok</h1>
            <div className="p-12 text-center border border-dashed border-white/10 rounded-lg">
              <p className="text-muted-foreground">Ez az oldal fejlesztés alatt áll</p>
            </div>
          </div>
        </ErrorBoundary>
      </div>
      <FooterSection />
    </div>
  );
}
