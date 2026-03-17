import { useState } from 'react';

export function StudyMaterialUpload() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<{ title: string; author: string } | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    setIsSearching(true);
    // 책 검색 및 크롤링 시뮬레이션
    setTimeout(() => {
      setIsSearching(false);
      // 예시 책 정보 (실제로는 API/크롤링 결과)
      setSelectedBook({
        title: searchQuery,
        author: '저자명 (크롤링 예정)',
      });
    }, 1500);
  };

  const handleRemoveBook = () => {
    setSelectedBook(null);
    setSearchQuery('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!selectedBook && !uploadedFile) {
      alert('책을 검색하거나 파일을 업로드해주세요.');
      return;
    }

    setIsAnalyzing(true);
    // AI 분석 시뮬레이션
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('책 목차 크롤링 및 AI 분석이 완료되었습니다! (시뮬레이션)');
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        공부 주제 설정
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 책 검색 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            책 검색 (인터넷 크롤링)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="책 제목을 검색하세요..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              disabled={!!selectedBook}
            />
            <button
              onClick={handleSearch}
              disabled={isSearching || !!selectedBook}
              className={`px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 ${
                isSearching || selectedBook
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isSearching ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  검색 중
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  검색
                </>
              )}
            </button>
          </div>

          {selectedBook && (
            <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm">
                    <div className="font-semibold text-blue-900">{selectedBook.title}</div>
                    <div className="text-blue-700 mt-1">{selectedBook.author}</div>
                    <div className="text-blue-600 text-xs mt-1">📖 목차 크롤링 완료</div>
                  </div>
                </div>
                <button
                  onClick={handleRemoveBook}
                  className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  제거
                </button>
              </div>
            </div>
          )}

          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600">
              💡 <strong>Tip:</strong> 책 검색 시 인터넷에서 자동으로 목차와 핵심 키워드를 수집합니다.
            </p>
          </div>
        </div>

        {/* 파일 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            또는 공부 자료 업로드
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.jpg,.png"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition bg-gray-50"
            >
              <div className="text-center">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm text-gray-600">
                  {uploadedFile ? uploadedFile.name : '클릭하여 파일 선택'}
                </span>
              </div>
            </label>
          </div>

          {uploadedFile && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-green-800">
                  <strong>{uploadedFile.name}</strong> 업로드 완료
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600">
              📄 지원 형식: PDF, DOCX, TXT, JPG, PNG
            </p>
          </div>
        </div>
      </div>

      {/* AI 분석 버튼 */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className={`
            px-8 py-3 rounded-xl font-medium transition flex items-center gap-2
            ${isAnalyzing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }
            text-white shadow-lg
          `}
        >
          <svg className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {isAnalyzing ? 'AI 분석 중...' : 'AI 학습 분석 시작'}
        </button>
      </div>
    </div>
  );
}
