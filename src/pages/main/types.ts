export type Mode = 'edu' | 'fitness' | 'miracle' | 'community';

export interface Routine {
  id: number;
  name: string;
  time: string;
  days: string[];
  completed: boolean;
  history: boolean[]; 
}

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface Post {
  id: number;
  userName: string;
  userRank: number;
  content: string;
  completedRoutines: string[];
  successRate: number;
  likes: number;
  reactions: { [key: string]: number };
  category: string;
  streakDays: number;
  createdAt: string;
}