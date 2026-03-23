// 프로젝트 전역 테마 설정, 상수 및 스타일 정보 관리
import React from 'react';
import { Lightbulb, AlertCircle, Zap, Calendar, Award, TrendingUp, Activity } from 'lucide-react';
import type { BodyPart, StudySuggestion, FitnessSuggestion } from './Types';

/** --- 기본 상수 설정 --- **/
// 운동 기록 시 사용되는 신체 부위 목록
export const BODY_PARTS: BodyPart[] = ['가슴', '등', '어깨', '이두', '삼두', '하체', '복근'];
// 오늘 날짜 (YYYY-MM-DD 형식)
export const TODAY = new Date().toISOString().slice(0, 10);

/** * 다크/화이트 모드 테마 팔레트 
 * @param dark - true일 경우 다크모드 전용 Tailwind 클래스 반환
 */
export const getTheme = (dark: boolean) => dark
  ? {
      bg: 'bg-[#0a0a0c] text-slate-200',
      nav: 'bg-[#0a0a0c]/80 border-slate-800 backdrop-blur-2xl',
      tabActive: 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] border-indigo-500',
      card: 'bg-[#161618] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
      input: 'bg-[#1c1c1f] border-slate-700 text-slate-100 focus:border-indigo-500',
      subCard: 'bg-[#1c1c1f] border-slate-800 hover:border-slate-700 hover:bg-[#222225]',
      textMuted: 'text-slate-500',
      accent: 'text-indigo-400',
      divider: 'border-slate-800',
      label: 'text-slate-400',
      sectionBg: 'bg-[#111113]',
    }
  : {
      bg: 'bg-[#f8f9fa] text-[#1d1d1f]',
      nav: 'bg-white/80 border-slate-200 backdrop-blur-2xl',
      tabActive: 'bg-white text-indigo-600 shadow-lg border-slate-200',
      card: 'bg-white border-slate-100 shadow-xl',
      input: 'bg-slate-100 border-transparent text-black focus:bg-white focus:ring-2 focus:ring-indigo-500',
      subCard: 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-white',
      textMuted: 'text-slate-400',
      accent: 'text-indigo-600',
      divider: 'border-slate-100',
      label: 'text-slate-500',
      sectionBg: 'bg-slate-50',
    };

/** --- AI 제안 카드 전용 스타일 맵핑 --- **/
// 1. 학습(Education) 섹션 AI 제안 스타일
export const STUDY_SUGG_STYLE: Record<StudySuggestion['type'], any> = {
  tip: { icon: <Lightbulb size={16} className="text-yellow-400" />, border: 'border-yellow-500/20 bg-yellow-500/5', badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20', label: '학습 팁' },
  warning: { icon: <AlertCircle size={16} className="text-rose-400" />, border: 'border-rose-500/20 bg-rose-500/5', badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20', label: '주의' },
  boost: { icon: <Zap size={16} className="text-emerald-400" />, border: 'border-emerald-500/20 bg-emerald-500/5', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', label: '성과' },
  schedule: { icon: <Calendar size={16} className="text-blue-400" />, border: 'border-blue-500/20 bg-blue-500/5', badge: 'bg-blue-500/15 text-blue-400 border-blue-500/20', label: '일정' },
};

// 2. 운동(Fitness) 섹션 AI 코치 스타일
export const FITNESS_SUGG_STYLE: Record<FitnessSuggestion['type'], any> = {
  praise: { icon: <Award size={16} className="text-yellow-400" />, border: 'border-yellow-500/20 bg-yellow-500/5', badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20', label: '칭찬' },
  improve: { icon: <TrendingUp size={16} className="text-indigo-400" />, border: 'border-indigo-500/20 bg-indigo-500/5', badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20', label: '개선' },
  recovery: { icon: <Activity size={16} className="text-green-400" />, border: 'border-green-500/20 bg-green-500/5', badge: 'bg-green-500/15 text-green-400 border-green-500/20', label: '회복' },
  caution: { icon: <AlertCircle size={16} className="text-rose-400" />, border: 'border-rose-500/20 bg-rose-500/5', badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20', label: '주의' },
};

/** --- 모의 데이터 (Mock Data) --- **/
// AI 학습 제안 갱신 시 보여줄 임시 데이터
export const MOCK_NEW_STUDY_SUGGESTIONS = [
  { 
    type: 'tip' as const,   
    title: '수면 직전 10분의 마법',   
    body: '자기 전 오늘 공부한 핵심 키워드 3개만 복기해보세요. 수면 중 장기 기억 저장 효율이 2배 높아집니다.' 
  },
  { 
    type: 'boost' as const, 
    title: '연속 학습 5일 돌파!',       
    body: '정말 대단합니다! 어제보다 집중력이 15% 더 안정적인 패턴을 보이고 있습니다.' 
  },
  { 
    type: 'schedule' as const, 
    title: '새로운 학습 계획 제안', 
    body: '주말에는 복습 위주의 가벼운 스케줄을 가져가는 것이 장기적인 번아웃 방지에 도움이 됩니다.' 
  }
];