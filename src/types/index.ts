// ============================================================
// types/index.ts
// 프로젝트 전역에서 사용하는 TypeScript 타입 정의 모음
// ============================================================

/** 앱 내 탐색 모드 식별자 */
export type Mode = 'study' | 'exercise' | 'community' | 'settings';

/**
 * 학습 체크리스트 항목 타입
 * @property id       - 고유 식별자 (Date.now() 기반)
 * @property text     - 할 일 텍스트
 * @property completed - 완료 여부
 * @property isAi     - AI가 생성한 항목 여부 (섹션 분리에 사용)
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  isAi: boolean;
}
