// ============================================================
// types/index.ts
// 전역 타입 및 DTO
// ============================================================

/** 
 * 내비게이션 모드 식별자
 */
export type Mode = 'study' | 'exercise' | 'community' | 'settings';

/** 
 * 공통 API 응답 구조
 */
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

/**
 * Todo 모델
 */
export interface Todo {
  id: string;        // 고유 식별자(PK)
  text: string;      // 할 일 내용
  completed: boolean;// 완료 여부
  isAi: boolean;     // AI 생성 여부
}

/** 
 * Todo 생성 DTO
 */
export interface CreateTodoDto extends Omit<Todo, 'id'> {}

/** 
 * Todo 수정 DTO
 */
export interface UpdateTodoDto extends Partial<Todo> {}


