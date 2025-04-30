
export interface User {
  id: string;
  username: string;
  points: number;
  winRate: number;
  totalTips: number;
  successfulTips: number;
  followers: number;
  expertise: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
}

export interface Team {
  id: string;
  name: string;
  image?: string;
  recentForm?: string[]; // pl.: ['W', 'L', 'W']
  stats?: Record<string, number | string>;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  image?: string;
  status: 'upcoming' | 'live' | 'completed';
  startTime: string; // ISO string
  endTime?: string;
  category: 'sport' | 'esport' | string;
  participants: {
    id: string;
    name: string;
    isPopular?: boolean;
  }[];
  odds: Record<string, number>;
  minBet: number;
  maxBet: number;
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'upcoming' | 'live' | 'completed';
  startTime: string; // ISO string
  endTime?: string;
  teams: {
    home: Team;
    away: Team;
  };
  prediction: {
    type: 'winner' | 'score' | 'other';
    value: string;
    odds: number;
    confidence: number; // százalékban (0-100)
  };
  analysis: string;
  category: 'football' | 'basketball' | 'tennis' | 'esports';
  tipster: {
    id: string;
    username: string;
    winRate: number;
    expertise: string[];
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  minStake: number;
  maxStake: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  tipId: string;
  content: string;
  timestamp: string; // ISO string
  likes: number;
}

export interface TipHistory {
  id: string;
  tipId: string;
  userId: string;
  stake: number;
  prediction: string;
  odds: number;
  status: 'pending' | 'won' | 'lost';
  placedAt: string; // ISO string
  potentialReturn: number;
}

export interface RecentWinner {
  id: string;
  username: string;
  gameTitle: string;
  timestamp: string;
  amount: number;
  winningAmount: number;
}

export interface CurrentBet {
  gameId?: string;
  selectedParticipantId?: string;
  amount: number;
}

export interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  userStats: {
    points: number;
    winRate: number;
    notifications: Notification[];
  };
  
  markNotificationAsRead: (id: string) => void;
  
  games: Game[];
  recentWinners: RecentWinner[];
  
  currentBet: CurrentBet;
  setCurrentBet: (data: Partial<CurrentBet>) => void;
  placeBet: () => void;
}
