//데이터 구조와 인터페이스 정의
import React from 'react';

export type Mode = 'edu' | 'fitness' | 'community';
export type BodyPart = '가슴' | '등' | '어깨' | '이두' | '삼두' | '하체' | '복근';

export interface Task { id: number; text: string; done: boolean; time?: string }
export interface AiGuideTask { id: number; text: string; done: boolean; tag: string; tagColor: string }
export interface WorkoutLog { id: number; date: string; durationMin: number; calories: number; memo: string }
export interface WeightEntry { date: string; weight: number; bodyFat?: number }

export interface StudySuggestion {
  id: number;
  type: 'tip' | 'warning' | 'boost' | 'schedule';
  title: string; body: string; time: string; read: boolean;
}
export interface FitnessSuggestion {
  id: number;
  type: 'praise' | 'improve' | 'recovery' | 'caution';
  title: string; body: string; time: string;
}
export interface Post { id: number; author: string; content: string; points: number; timestamp: string; likes: number }
export interface RankUser { rank: number; name: string; points: number; isMe?: boolean }
export interface RoutineSuccess { name: string; rate: number; color: string }
export interface StudyLog {
  id: number;
  date: string;
  durationMin: number;
  content: string;
}