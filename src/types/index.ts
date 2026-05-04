export type Mode = 'study' | 'exercise' | 'community' | 'settings';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  isAi: boolean;
}
