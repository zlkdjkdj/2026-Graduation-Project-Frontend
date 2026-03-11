import { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  fetchStudySettings,
  saveStudySettings,
  updateStudySettings,
  fetchStudyProgress,
  saveStudyProgress,
  type StudySettings,
  type ProgressItem,
} from '../../../utils/api';

export function AiSuggestions() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<number | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false); // 백엔드 연결 실패 시 localStorage 사용
  
  const [studyPeriod, setStudyPeriod] = useState(14);
  const [customDays, setCustomDays] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [completedPages, setCompletedPages] = useState(45);
  const totalPages = 234;

  const [todayProgress, setTodayProgress] = useState<ProgressItem[]>([
    { chapter: 'Chapter 3: 동사의 시제', pages: 'p.45-67', difficulty: 'medium', completed: false },
    { chapter: 'Chapter 4: 조동사', pages: 'p.68-89', difficulty: 'easy', completed: false },
  ]);

  // 초기 데이터 로드
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // 백엔드에서 데이터 불러오기 시도
      const settings = await fetchStudySettings();
      const progress = await fetchStudyProgress();
      
      // 성공하면 서버 데이터 사용
      if (settings) {
        setSettingsId(settings.id || null);
        setStudyPeriod(settings.studyPeriod);
        setStartDate(settings.startDate);
        setEndDate(settings.endDate);
        setCompletedPages(settings.completedPages);
        setUseLocalStorage(false);
      } else {
        // 백엔드가 없으면 localStorage 사용
        setUseLocalStorage(true);
        loadFromLocalStorage();
      }

      if (progress && progress.length > 0) {
        setTodayProgress(progress);
      } else if (useLocalStorage) {
        // localStorage에서 진도 데이터도 불러오기
        loadFromLocalStorage();
      }
    } catch (error) {
      // 백엔드 연결 실패 시 localStorage 사용
      setUseLocalStorage(true);
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // localStorage에서 데이터 불러오기
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('learnTimeStudySettings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setStudyPeriod(parsed.studyPeriod || 14);
        setStartDate(parsed.startDate || '');
        setEndDate(parsed.endDate || '');
        setCompletedPages(parsed.completedPages || 45);
        if (parsed.todayProgress) {
          setTodayProgress(parsed.todayProgress);
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  };

  // 학습 설정 저장 (debounce 적용)
  useEffect(() => {
    if (loading) return; // 초기 로딩 중에는 저장하지 않음

    const timer = setTimeout(() => {
      if (useLocalStorage) {
        saveToLocalStorage();
      } else {
        saveSettingsToServer();
      }
    }, 1000); // 1초 대기 후 저장

    return () => clearTimeout(timer);
  }, [studyPeriod, startDate, endDate, completedPages]);

  // localStorage에 저장
  const saveToLocalStorage = () => {
    try {
      const settings = {
        studyPeriod,
        startDate,
        endDate,
        completedPages,
        todayProgress,
      };
      localStorage.setItem('learnTimeStudySettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  };

  const saveSettingsToServer = async () => {
    setSaving(true);
    try {
      const settings: StudySettings = {
        studyPeriod,
        startDate,
        endDate,
        completedPages,
        totalPages,
      };

      if (settingsId) {
        // 업데이트
        await updateStudySettings(settingsId, settings);
      } else {
        // 새로 저장
        await saveStudySettings(settings);
      }
    } catch (error) {
      console.error('Failed to save settings to server:', error);
      // 서버 저장 실패 시 localStorage로 폴백
      setUseLocalStorage(true);
      saveToLocalStorage();
    } finally {
      setSaving(false);
    }
  };

  // 진도 체크 저장
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (useLocalStorage) {
        saveToLocalStorage();
      } else {
        saveProgressToServer();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [todayProgress]);

  const saveProgressToServer = async () => {
    try {
      await saveStudyProgress(todayProgress);
    } catch (error) {
      console.error('Failed to save progress to server:', error);
      // 서버 저장 실패 시 localStorage로 폴백
      setUseLocalStorage(true);
      saveToLocalStorage();
    }
  };

  // 진도 체크 토글
  const toggleProgressComplete = (index: number) => {
    setTodayProgress(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // 사용자 지정 기간 적용
  const handleCustomDays = () => {
    const days = parseInt(customDays);
    if (!isNaN(days) && days > 0 && days <= 365) {
      setStudyPeriod(days);
      setCustomDays('');
      // 날짜 초기화
      setStartDate('');
      setEndDate('');
    }
  };

  // 날짜 범위 계산
  const handleDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInDays(end, start) + 1; // +1 to include both start and end days
      
      if (days > 0) {
        setStudyPeriod(days);
      }
    }
  };

  // 날짜가 변경될 때마다 자동으로 기간 계산
  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    if (date && endDate) {
      const start = new Date(date);
      const end = new Date(endDate);
      const days = differenceInDays(end, start) + 1;
      if (days > 0) {
        setStudyPeriod(days);
      }
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (startDate && date) {
      const start = new Date(startDate);
      const end = new Date(date);
      const days = differenceInDays(end, start) + 1;
      if (days > 0) {
        setStudyPeriod(days);
      }
    }
  };

  // 오늘 날짜 (YYYY-MM-DD 형식)
  const today = format(new Date(), 'yyyy-MM-dd');

  // 진도 달성률 계산
  const calculateProgress = () => {
    const daysPerPage = studyPeriod / totalPages;
    const targetPages = Math.floor(completedPages / daysPerPage); // 현재까지 목표 페이지
    const actualProgress = (completedPages / totalPages) * 100;
    const expectedProgress = (targetPages / studyPeriod) * 100;
    
    // 간단하게: 완료 페이지 / 전체 페이지 기준
    return Math.round(actualProgress);
  };

  // 목표 대비 진행 상황
  const calculateExpectedPages = () => {
    // 현재 날짜 기준으로 몇 페이지를 완료했어야 하는지
    const currentDay = 5; // 예시: 5일째
    const pagesPerDay = totalPages / studyPeriod;
    const expectedPages = Math.round(pagesPerDay * currentDay);
    return expectedPages;
  };

  const progressPercentage = calculateProgress();
  const expectedPages = calculateExpectedPages();
  const isAhead = completedPages >= expectedPages;

  const suggestions = {
    keywords: {
      title: '공부 키워드',
      description: '선택한 책에서 크롤링한 핵심 키워드입니다',
      items: ['과거완료', '현재완료진행', '수동태', 'would rather', 'had better', '가정법', '분사구문', '관계대명사'],
    },
    studyTips: {
      title: 'AI 학습 도우미',
      tips: [
        `현재 학습 진도율은 ${progressPercentage}%입니다. ${isAhead ? '목표보다 앞서가고 있습니다! 🎉' : '목표 달성을 위해 조금 더 힘내세요! 💪'}`,
        `${studyPeriod}일 계획 기준, 현재까지 ${expectedPages}페이지 완료가 목표였으나 ${completedPages}페이지 완료하셨습니다.`,
        '현재 학습 패턴 분석 결과, 오전 시간대 집중도가 35% 높습니다.',
        '주말 학습 시간이 평일 대비 부족합니다. 주말 2시간 추가 학습을 권장합니다.',
        '최근 7일간 복습 주기가 불규칙합니다. 에빙하우스 망각곡선을 고려한 복습을 추천합니다.',
      ],
    },
  };

  const handleGoogleNotebookLLM = () => {
    window.open('https://notebooklm.google.com/', '_blank');
  };

  const handleKeywordClick = (keyword: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        AI 학습 분석 및 제안
      </h2>

      {/* 학습 기간 설정 및 진도 달성률 */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6 border border-indigo-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          학습 기간 설정
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 기간 설정 */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">학습 목표 기간</label>
            
            {/* 빠른 선택 버튼 */}
            <div className="grid grid-cols-2 gap-3">
              {[7, 14, 21, 30].map((days) => (
                <button
                  key={days}
                  onClick={() => {
                    setStudyPeriod(days);
                    setStartDate('');
                    setEndDate('');
                  }}
                  className={`
                    px-4 py-3 rounded-xl border-2 font-medium transition-all
                    ${studyPeriod === days && !startDate && !endDate
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                      : 'bg-white border-indigo-200 text-gray-700 hover:border-indigo-400'
                    }
                  `}
                >
                  {days}일
                  <span className="block text-xs opacity-80 mt-0.5">
                    ({days === 7 ? '1주' : days === 14 ? '2주' : days === 21 ? '3주' : '1개월'})
                  </span>
                </button>
              ))}
            </div>

            {/* 사용자 지정 일수 */}
            <div className="relative">
              <input
                type="number"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                placeholder="직접 입력 (일)"
                min="1"
                max="365"
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 text-gray-700 hover:border-indigo-400 focus:outline-none focus:border-indigo-500 transition-all"
              />
              <button
                onClick={handleCustomDays}
                className="absolute right-2 top-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition"
              >
                적용
              </button>
            </div>

            {/* 날짜 범위 선택 */}
            <div className="bg-white rounded-xl p-4 border-2 border-indigo-200">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <label className="text-sm font-semibold text-gray-700">날짜로 기간 설정</label>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">시작일</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-600 mb-1">종료일</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    min={startDate || undefined}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>

                {startDate && endDate && (
                  <div className="mt-2 p-2 bg-indigo-50 rounded-lg">
                    <p className="text-xs text-indigo-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      총 {studyPeriod}일 학습 계획
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 통계 정보 */}
            <div className="bg-white rounded-xl p-4 border border-indigo-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">전체 페이지</span>
                <span className="font-semibold text-gray-900">{totalPages}p</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">하루 목표</span>
                <span className="font-semibold text-indigo-600">
                  {Math.ceil(totalPages / studyPeriod)}p/일
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">현재 진도</span>
                <span className="font-semibold text-green-600">{completedPages}p</span>
              </div>
            </div>
          </div>

          {/* 진도 달성률 */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">진도 달성률</label>
            
            {/* 원형 진행률 */}
            <div className="bg-white rounded-xl p-6 border border-indigo-200 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#e0e7ff"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#4f46e5"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - progressPercentage / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-indigo-600">{progressPercentage}%</span>
                  <span className="text-xs text-gray-500 mt-1">완료</span>
                </div>
              </div>

              <div className="mt-4 w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">목표 대비</span>
                  <span className={`font-semibold ${isAhead ? 'text-green-600' : 'text-orange-600'}`}>
                    {isAhead ? '✓ 앞서가는 중' : '⚡ 더 노력 필요'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">예상 완료일</span>
                  <span className="font-semibold text-gray-900">
                    {studyPeriod}일 후
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 진도 조언 */}
        <div className="mt-4 p-4 bg-white rounded-xl border border-indigo-200">
          <p className="text-sm text-gray-700">
            {isAhead ? (
              <>
                <span className="font-semibold text-green-600">🎉 훌륭합니다!</span> 
                {' '}목표보다 {completedPages - expectedPages}페이지 더 공부하셨다. 
                이 속도를 유지하면 예정보다 빨리 완료할 수 있습니다!
              </>
            ) : (
              <>
                <span className="font-semibold text-orange-600">💪 힘내세요!</span>
                {' '}목표 달성을 위해 {expectedPages - completedPages}페이지가 더 필요합니다. 
                하루 {Math.ceil((totalPages - completedPages) / (studyPeriod - 5))}페이지씩 공부하면 충분히 따라잡을 수 있습니다!
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 오늘의 추천 진도 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              오늘의 추천 진도
            </h3>
            <div className="text-sm font-medium text-blue-600">
              {todayProgress.filter(p => p.completed).length} / {todayProgress.length} 완료
            </div>
          </div>
          
          <div className="space-y-3">
            {todayProgress.map((item, index) => (
              <div 
                key={index} 
                className={`
                  bg-white rounded-xl p-4 border-2 transition-all duration-200
                  ${item.completed 
                    ? 'border-blue-400 bg-blue-50/50 shadow-sm' 
                    : 'border-blue-200 hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  {/* 커스텀 체크박스 */}
                  <button
                    onClick={() => toggleProgressComplete(index)}
                    className={`
                      mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                      ${item.completed
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                      }
                    `}
                  >
                    {item.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  {/* 진도 정보 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`font-semibold transition-all ${item.completed ? 'text-blue-900 line-through' : 'text-gray-900'}`}>
                        {item.chapter}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.difficulty === 'easy'
                            ? 'bg-green-100 text-green-700'
                            : item.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {item.difficulty === 'easy' ? '쉬움' : item.difficulty === 'medium' ? '보통' : '어려움'}
                      </span>
                    </div>
                    <p className={`text-sm transition-all ${item.completed ? 'text-blue-600' : 'text-gray-600'}`}>
                      {item.pages}
                    </p>
                  </div>
                </div>

                {/* 완료 표시 */}
                {item.completed && (
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <p className="text-xs text-blue-600 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      완료됨! 잘하셨습니다 🎉
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 전체 완료 메시지 */}
          {todayProgress.every(p => p.completed) && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-center">
              <p className="font-semibold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                오늘의 목표를 모두 달성했습니다! 🏆
              </p>
              <p className="text-sm mt-1 opacity-90">훌륭합니다! 계속 이 속도를 유지하세요!</p>
            </div>
          )}
        </div>

        {/* 공부 키워드 (책 크롤링) */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {suggestions.keywords.title}
          </h3>
          <p className="text-xs text-purple-700 mb-4">🌐 {suggestions.keywords.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {suggestions.keywords.items.map((keyword, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-purple-700 border border-purple-200 hover:bg-purple-100 transition cursor-pointer"
                onClick={() => handleKeywordClick(keyword)}
              >
                #{keyword}
              </span>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600">
              <strong className="text-purple-700">💡 Tip:</strong> 키워드를 클릭하면 구글에서 해당 개념을 검색합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 구글 노트북 LLM 연동 */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200/50">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              구글 노트북 LLM 연동
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              더 깊이 있는 학습 분석과 개인화된 학습 전략을 원하시나요?<br />
              <strong className="text-orange-700">구글 노트북 LLM</strong>을 통해 고급 AI 학습 도우미 기능을 이용하실 수 있습니다.
            </p>
            
            <div className="bg-white rounded-xl p-4 border border-orange-200 mb-4">
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>학습 자료 심층 분석 및 요약</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>개인화된 학습 계획 및 로드맵 생성</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>약점 분석 및 맞춤형 문제 추천</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI 튜터와 대화형 학습</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGoogleNotebookLLM}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              구글 노트북 LLM으로 이동
            </button>
          </div>
        </div>
      </div>

      {/* AI 학습 도우미 */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {suggestions.studyTips.title}
        </h3>
        <div className="space-y-3">
          {suggestions.studyTips.tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-green-200 flex items-start gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed pt-1">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}