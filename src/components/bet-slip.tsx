
"use client";

import { useState } from "react";
import { 
  CreditCard, 
  X, 
  ChevronDown, 
  AlertCircle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function BetSlip() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentBet, setCurrentBet, games, placeBet } = useAppStore();

  // Find selected game and participant
  const selectedGame = games.find(game => game.id === currentBet.gameId);
  const selectedParticipant = selectedGame?.participants.find(
    p => p.id === currentBet.selectedParticipantId
  );
  
  const hasBet = !!currentBet.gameId && !!currentBet.selectedParticipantId;
  
  // Calculate potential winnings
  const odds = selectedGame?.odds?.[currentBet.selectedParticipantId || ""] || 1;
  const potentialWin = currentBet.amount * odds;
  
  const handleClearBet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBet({
      gameId: undefined,
      selectedParticipantId: undefined,
      amount: currentBet.amount
    });
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pb-safe">
      <div className="container mx-auto px-4">
        <Card className={cn(
          "bg-card/80 backdrop-blur-xl border-white/10 mb-4 transition-all duration-300 shadow-lg",
          !isOpen && !hasBet && "opacity-80"
        )}>
          <CardHeader 
            className="p-3 cursor-pointer"
            onClick={() => setIsOpen(prev => !prev)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-blue-400" />
                <CardTitle className="text-base">
                  {hasBet 
                    ? "Fogadási szelvény" 
                    : "Nincs aktív fogadás"}
                </CardTitle>
              </div>
              
              <div className="flex items-center gap-2">
                {hasBet && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6 rounded-full" 
                    onClick={handleClearBet}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )} 
                />
              </div>
            </div>
          </CardHeader>
          
          {isOpen && (
            <>
              <CardContent className="p-4 pt-0">
                {hasBet ? (
                  <div className="rounded-md border border-white/10 overflow-hidden">
                    <div className="p-3 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{selectedGame?.title}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-5 w-5 rounded-full" 
                          onClick={handleClearBet}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedGame?.status === 'live' ? 'Élő meccs' : 'Jövőbeli meccs'}
                      </p>
                    </div>
                    
                    <div className="p-3 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">Tipp:</span>
                          <p className="text-sm font-medium">{selectedParticipant?.name} győzelem</p>
                        </div>
                        <div className="text-sm font-bold text-blue-400">
                          {odds.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex border-t border-white/5">
                      <div className="flex-1 p-3">
                        <span className="text-xs text-muted-foreground">Tét:</span>
                        <p className="text-sm font-medium">{currentBet.amount} pont</p>
                      </div>
                      <div className="flex-1 p-3 bg-muted/20">
                        <span className="text-xs text-muted-foreground">Lehetséges nyeremény:</span>
                        <p className="text-sm font-bold text-blue-400">{potentialWin.toFixed(0)} pont</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground/50 mb-2" />
                    <p className="text-muted-foreground text-sm">
                      Még nincs kiválasztott fogadás
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Válassz ki egy játékot és résztvevőt a fogadáshoz
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!hasBet}
                  onClick={placeBet}
                >
                  Fogadás leadása
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
