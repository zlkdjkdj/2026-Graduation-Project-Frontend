// Spring Boot API 호출 유틸리티

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// 백엔드 서버 사용 가능 여부 체크
const isBackendEnabled = () => {
  // 환경변수가 명시적으로 설정되어 있는지 확인
  return !!import.meta.env.VITE_API_BASE_URL;
};

// API 요청 헤더 생성
const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// 학습 설정 타입
export interface StudySettings {
  id?: number;
  userId?: number;
  studyPeriod: number;
  startDate: string;
  endDate: string;
  completedPages: number;
  totalPages: number;
  createdAt?: string;
  updatedAt?: string;
}

// 진도 체크 타입
export interface ProgressItem {
  id?: number;
  userId?: number;
  chapter: string;
  pages: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  completedAt?: string;
  createdAt?: string;
}

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ============================================
// 학습 설정 API
// ============================================

/**
 * 학습 설정 조회
 * GET /api/study-settings
 */
export const fetchStudySettings = async (): Promise<StudySettings | null> => {
  // 백엔드가 설정되지 않은 경우 null 반환 (에러 없이)
  if (!isBackendEnabled()) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/study-settings`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        // 데이터가 없는 경우 null 반환
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<StudySettings> = await response.json();
    return result.data || null;
  } catch (error) {
    // 네트워크 에러는 조용히 처리
    return null;
  }
};

/**
 * 학습 설정 저장
 * POST /api/study-settings
 */
export const saveStudySettings = async (settings: StudySettings): Promise<boolean> => {
  if (!isBackendEnabled()) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/study-settings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<StudySettings> = await response.json();
    return result.success;
  } catch (error) {
    return false;
  }
};

/**
 * 학습 설정 업데이트
 * PUT /api/study-settings/{id}
 */
export const updateStudySettings = async (id: number, settings: StudySettings): Promise<boolean> => {
  if (!isBackendEnabled()) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/study-settings/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<StudySettings> = await response.json();
    return result.success;
  } catch (error) {
    return false;
  }
};

// ============================================
// 진도 체크 API
// ============================================

/**
 * 진도 목록 조회
 * GET /api/study-progress
 */
export const fetchStudyProgress = async (): Promise<ProgressItem[]> => {
  if (!isBackendEnabled()) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/study-progress`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ProgressItem[]> = await response.json();
    return result.data || [];
  } catch (error) {
    return [];
  }
};

/**
 * 진도 체크 저장/업데이트
 * POST /api/study-progress
 */
export const saveStudyProgress = async (progress: ProgressItem[]): Promise<boolean> => {
  if (!isBackendEnabled()) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/study-progress`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(progress),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ProgressItem[]> = await response.json();
    return result.success;
  } catch (error) {
    return false;
  }
};

/**
 * 진도 완료 상태 토글
 * PATCH /api/study-progress/{id}/toggle
 */
export const toggleProgressStatus = async (id: number, completed: boolean): Promise<boolean> => {
  if (!isBackendEnabled()) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/study-progress/${id}/toggle`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ProgressItem> = await response.json();
    return result.success;
  } catch (error) {
    return false;
  }
};

// ============================================
// 인증 API (선택사항)
// ============================================

/**
 * 이메일 중복 체크
 * GET /api/auth/check-email?email={email}
 */
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  if (!isBackendEnabled()) {
    // 백엔드 없을 때는 localStorage에서 확인
    const users = JSON.parse(localStorage.getItem('learnTimeUsers') || '[]');
    return users.some((user: any) => user.email === email);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/check-email?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.exists || false;
  } catch (error) {
    console.error('Email check failed:', error);
    return false;
  }
};

/**
 * 닉네임 중복 체크
 * GET /api/auth/check-username?username={username}
 */
export const checkUsernameDuplicate = async (username: string): Promise<boolean> => {
  if (!isBackendEnabled()) {
    // 백엔드 없을 때는 localStorage에서 확인
    const users = JSON.parse(localStorage.getItem('learnTimeUsers') || '[]');
    return users.some((user: any) => user.username === username);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/check-username?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.exists || false;
  } catch (error) {
    console.error('Username check failed:', error);
    return false;
  }
};

/**
 * 회원가입
 * POST /api/auth/register
 */
export const register = async (email: string, username: string, password: string): Promise<{ success: boolean; message?: string }> => {
  if (!isBackendEnabled()) {
    // 백엔드 없을 때는 localStorage에 저장
    try {
      const users = JSON.parse(localStorage.getItem('learnTimeUsers') || '[]');
      users.push({ email, username, password, createdAt: new Date().toISOString() });
      localStorage.setItem('learnTimeUsers', JSON.stringify(users));
      return { success: true, message: '회원가입이 완료되었습니다!' };
    } catch (error) {
      return { success: false, message: '회원가입에 실패했습니다.' };
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: result.success || true, message: result.message || '회원가입이 완료되었습니다!' };
  } catch (error) {
    console.error('Registration failed:', error);
    return { success: false, message: '회원가입에 실패했습니다.' };
  }
};

/**
 * 로그인
 * POST /api/auth/login
 */
export const login = async (username: string, password: string): Promise<string | null> => {
  if (!isBackendEnabled()) {
    // 백엔드 없을 때는 localStorage에서 확인
    try {
      const users = JSON.parse(localStorage.getItem('learnTimeUsers') || '[]');
      const user = users.find((u: any) => u.username === username && u.password === password);
      
      if (user) {
        const token = 'mock-token-' + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return token;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const token = result.data?.token || result.token;
    
    if (token) {
      localStorage.setItem('authToken', token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

/**
 * 로그아웃
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

/**
 * 현재 로그인 상태 확인
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};