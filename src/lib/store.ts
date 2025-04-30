
"use client";

import { create } from "zustand";
import { format, addMinutes } from "date-fns";
import { AppState } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

// Generate mock data
const generateMockGames = () => {
  const categories = ["sport", "esport"];
  const statuses = ["upcoming", "live"];
  const titles = [
    "FC Barcelona vs Real Madrid",
    "Lakers vs Warriors",
    "Cloud9 vs Team Liquid",
    "Astralis vs Natus Vincere",
    "Manchester United vs Liverpool",
  ];

  return Array.from({ length: 6 }, (_, i) => ({
    id: `game-${i + 1}`,
    title: titles[i % titles.length],
    description: `Exciting match between top teams`,
    image: "/placeholder.jpg",
    status: statuses[i % statuses.length] as "upcoming" | "live" | "completed",
    startTime: format(addMinutes(new Date(), i * 30), "yyyy-MM-dd'T'HH:mm:ss"),
    category: categories[i % categories.length],
    participants: [
      {
        id: `team-${i * 2 + 1}`,
        name: titles[i % titles.length].split(" vs ")[0],
      },
      {
        id: `team-${i * 2 + 2}`,
        name: titles[i % titles.length].split(" vs ")[1],
      },
    ],
    odds: {
      [`team-${i * 2 + 1}`]: 1.5 + i * 0.2,
      [`team-${i * 2 + 2}`]: 2.5 - i * 0.1,
    },
    minBet: 10,
    maxBet: 1000,
  }));
};

const generateRecentWinners = () => {
  const usernames = ["johndoe", "alice92", "sportsmaster", "gambler44", "luckyguy"];
  const games = ["FC Barcelona vs Real Madrid", "Lakers vs Warriors", "Cloud9 vs Team Liquid"];

  return Array.from({ length: 5 }, (_, i) => ({
    id: `winner-${i + 1}`,
    username: usernames[i % usernames.length],
    gameTitle: games[i % games.length],
    timestamp: format(addMinutes(new Date(), -i * 15), "yyyy-MM-dd'T'HH:mm:ss"),
    amount: 100 + i * 50,
    winningAmount: (100 + i * 50) * (1.5 + i * 0.3),
  }));
};

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  userStats: {
    points: 1250,
    winRate: 68,
    notifications: [
      {
        id: "notif-1",
        title: "Nyeremény érkezett",
        message: "Gratulálunk! Megnyerted a fogadásod a Barcelona vs Real Madrid meccsen.",
        timestamp: format(addMinutes(new Date(), -30), "yyyy-MM-dd'T'HH:mm:ss"),
        read: false,
      },
      {
        id: "notif-2",
        title: "Új promóció",
        message: "500 pont bónusz minden új felhasználónak!",
        timestamp: format(addMinutes(new Date(), -120), "yyyy-MM-dd'T'HH:mm:ss"),
        read: true,
      },
    ],
  },
  
  markNotificationAsRead: (id) =>
    set((state) => ({
      userStats: {
        ...state.userStats,
        notifications: state.userStats.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
      },
    })),
  
  games: generateMockGames(),
  recentWinners: generateRecentWinners(),
  
  currentBet: {
    gameId: undefined,
    selectedParticipantId: undefined,
    amount: 10,
  },
  
  setCurrentBet: (data) =>
    set((state) => ({
      currentBet: { ...state.currentBet, ...data },
    })),
    
  placeBet: () =>
    set((state) => {
      const { currentBet, games } = state;
      
      if (!currentBet.gameId || !currentBet.selectedParticipantId) {
        toast({
          title: "Hiba történt",
          description: "Kérjük válassz ki egy fogadást",
          variant: "destructive",
        });
        return state;
      }
      
      const game = games.find((g) => g.id === currentBet.gameId);
      if (!game) {
        toast({
          title: "Hiba történt",
          description: "Nem található a kiválasztott játék",
          variant: "destructive",
        });
        return state;
      }
      
      const odds = game.odds[currentBet.selectedParticipantId];
      const winnings = Math.round(currentBet.amount * odds);
      const participantName = game.participants.find(
        (p) => p.id === currentBet.selectedParticipantId
      )?.name || "Ismeretlen";
      
      toast({
        title: "Sikeres fogadás",
        description: `Fogadást tettél: ${participantName} csapatra ${currentBet.amount} pontért. Potenciális nyeremény: ${winnings} pont.`,
      });
      
      return {
        ...state,
        userStats: {
          ...state.userStats,
          points: state.userStats.points - currentBet.amount,
        },
        currentBet: {
          gameId: undefined,
          selectedParticipantId: undefined,
          amount: currentBet.amount,
        },
      };
    }),
}));
