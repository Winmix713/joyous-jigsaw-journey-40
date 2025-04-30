
import { MainDashboard } from "@/components/main-dashboard";
import { BetSlip } from "@/components/bet-slip";
import { FooterSection } from "@/components/footer-section";
import { ErrorBoundaryClient } from "@/components/error-boundary";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow">
        <div className="container mx-auto px-4">
          <ErrorBoundaryClient fallback={
            <div className="p-4 m-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
              <h3 className="font-semibold mb-2">Dashboard betöltési hiba</h3>
              <p>Something went wrong with the dashboard.</p>
            </div>
          }>
            <MainDashboard />
          </ErrorBoundaryClient>
        
          <ErrorBoundaryClient fallback={
            <div className="p-4 m-4 border border-amber-500 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">
              <h3 className="font-semibold mb-2">Fogadási szelvény hiba</h3>
              <p>Something went wrong with the bet slip.</p>
            </div>
          }>
            <BetSlip />
          </ErrorBoundaryClient>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
}
