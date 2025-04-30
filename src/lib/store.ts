
import { create } from 'zustand';
import { Tip, Notification, User, TipHistory, Tipster, Game, RecentWinner } from './types';
import { mockTips, mockNotifications, mockTipsters } from './mock-data';

interface CurrentBet {
  gameId: string | null;
  selectedParticipantId: string | null;
  amount: number;
}

interface AppState {
  userStats: User & { notifications: Notification[] };
  tips: Tip[];
  games: Game[];
  recentWinners: RecentWinner[];
  currentTip: {
    tipId: string | null;
    stake: number;
    selectedPrediction: string | null;
  };
  currentBet: CurrentBet;
  tipHistory: TipHistory[];
  topTipsters: Tipster[];
  isDarkMode: boolean;
  isAuthenticated: boolean;

  // Actions
  markNotificationAsRead: (id: string) => void;
  setCurrentTip: (tip: Partial<AppState['currentTip']>) => void;
  setCurrentBet: (bet: Partial<CurrentBet>) => void;
  followTip: () => void;
  placeBet: () => void;
  toggleDarkMode: () => void;
  login: () => void;
  logout: () => void;
}

// Some mock games data for now
const mockGames: Game[] = [
  {
    id: 'game1',
    title: 'Champions League: Barcelona vs Real Madrid',
    description: 'El Clasico - Champions League Semi-Final',
    image: 'https://picsum.photos/800/400?random=1',
    status: 'live',
    startTime: new Date(Date.now() - 30 * 60000).toISOString(),
    category: 'sport',
    participants: [
      { id: 'barca', name: 'FC Barcelona', isPopular: true },
      { id: 'madrid', name: 'Real Madrid' }
    ],
    odds: { barca: 2.10, madrid: 3.40 },
    minBet: 10,
    maxBet: 1000
  },
  {
    id: 'game2',
    title: 'NBA Finals: Lakers vs Celtics',
    description: 'Game 7 - Championship Decider',
    image: 'https://picsum.photos/800/400?random=2',
    status: 'upcoming',
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60000).toISOString(),
    category: 'sport',
    participants: [
      { id: 'lakers', name: 'Los Angeles Lakers' },
      { id: 'celtics', name: 'Boston Celtics', isPopular: true }
    ],
    odds: { lakers: 1.95, celtics: 1.85 },
    minBet: 5,
    maxBet: 500
  },
  {
    id: 'game3',
    title: 'CS:GO Tournament Finals: NaVi vs FaZe',
    description: 'ESL Pro League Season 16 Finals',
    image: 'https://picsum.photos/800/400?random=3',
    status: 'upcoming',
    startTime: new Date(Date.now() + 12 * 60 * 60000).toISOString(),
    category: 'esport',
    participants: [
      { id: 'navi', name: 'Natus Vincere', isPopular: true },
      { id: 'faze', name: 'FaZe Clan' }
    ],
    odds: { navi: 1.75, faze: 2.05 },
    minBet: 10,
    maxBet: 800
  }
];

// Mock recent winners data
const mockRecentWinners: RecentWinner[] = [
  {
    id: 'win1',
    username: 'SportsMaster',
    gameTitle: 'Premier League: Liverpool vs Man City',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    amount: 100,
    winningAmount: 285
  },
  {
    id: 'win2',
    username: 'BettingKing',
    gameTitle: 'Wimbledon Final: Djokovic vs Federer',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    amount: 200,
    winningAmount: 360
  },
  {
    id: 'win3',
    username: 'LuckyGamer',
    gameTitle: 'LoL World Championship',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    amount: 50,
    winningAmount: 175
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  userStats: {
    id: '1',
    username: 'TipMaster',
    points: 1250,
    winRate: 68,
    totalTips: 42,
    successfulTips: 28,
    followers: 156,
    expertise: ['Football', 'NBA'],
    notifications: mockNotifications,
  },
  tips: mockTips,
  games: mockGames,
  recentWinners: mockRecentWinners,
  currentTip: {
    tipId: null,
    stake: 100,
    selectedPrediction: null,
  },
  currentBet: {
    gameId: null,
    selectedParticipantId: null,
    amount: 100,
  },
  tipHistory: [],
  topTipsters: mockTipsters,
  isDarkMode: true,
  isAuthenticated: true,

  markNotificationAsRead: (id) =>
    set((state) => ({
      userStats: {
        ...state.userStats,
        notifications: state.userStats.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
      },
    })),

  setCurrentTip: (tip) =>
    set((state) => ({
      currentTip: { ...state.currentTip, ...tip },
    })),

  setCurrentBet: (bet) =>
    set((state) => ({
      currentBet: { ...state.currentBet, ...bet },
    })),

  followTip: () => {
    const { currentTip, tips, userStats, tipHistory } = get();
    const { tipId, stake, selectedPrediction } = currentTip;

    if (!tipId || !selectedPrediction || stake <= 0) {
      console.warn('Invalid tip placement attempt');
      return;
    }

    const tip = tips.find((t) => t.id === tipId);
    if (!tip) {
      console.warn('Tip not found');
      return;
    }

    const newHistoryItem: TipHistory = {
      id: `tip-${Date.now()}`,
      tipId,
      userId: userStats.id,
      stake,
      prediction: selectedPrediction,
      odds: tip.prediction.odds,
      status: 'pending',
      placedAt: new Date().toISOString(),
      potentialReturn: stake * tip.prediction.odds,
    };

    set({
      tipHistory: [newHistoryItem, ...tipHistory],
      userStats: {
        ...userStats,
        points: userStats.points - stake,
      },
      currentTip: {
        tipId: null,
        stake: 100,
        selectedPrediction: null,
      },
    });
  },

  placeBet: () => {
    const { currentBet, userStats, games } = get();
    
    if (!currentBet.gameId || !currentBet.selectedParticipantId || currentBet.amount <= 0) {
      console.warn('Invalid bet placement attempt');
      return;
    }
    
    const game = games.find((g) => g.id === currentBet.gameId);
    if (!game) {
      console.warn('Game not found');
      return;
    }
    
    // Deduct points from user
    set({
      userStats: {
        ...userStats,
        points: userStats.points - currentBet.amount,
      },
      // Reset current bet after placement
      currentBet: {
        gameId: null,
        selectedParticipantId: null,
        amount: 100,
      },
    });
    
    console.log('Bet placed successfully', { currentBet, game });
  },

  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  login: () =>
    set(() => ({
      isAuthenticated: true,
    })),

  logout: () =>
    set(() => ({
      isAuthenticated: false,
    })),
}));
