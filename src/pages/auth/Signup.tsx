import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router'; // react-router-dom을 사용 중이라면 'react-router-dom'으로 변경하세요.

// 정규식 패턴
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9가-힣]{2,15}$/;

/**
 * 프론트엔드 테스트를 위한 Mock API 함수들
 */
const mockApi = {
  checkEmailDuplicate: (email: string): Promise<boolean> => 
    new Promise((resolve) => setTimeout(() => resolve(false), 600)), // 항상 사용 가능하다고 가정 (false)
  
  checkUsernameDuplicate: (username: string): Promise<boolean> => 
    new Promise((resolve) => setTimeout(() => resolve(false), 600)),
    
  register: (email: string, username: string, password: string): Promise<{ success: boolean; message?: string }> => 
    new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1500))
};

export function SignupPage() {
  const navigate = useNavigate();

  // 입력 필드
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 유효성 검사 상태
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [emailDuplicate, setEmailDuplicate] = useState<boolean | null>(null);
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [usernameDuplicate, setUsernameDuplicate] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  // 중복 체크 로딩
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 비밀번호 보기/숨기기
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 이메일 유효성 검사 및 중복 체크
  useEffect(() => {
    if (email === '') {
      setEmailValid(null);
      setEmailDuplicate(null);
      return;
    }

    const isValid = EMAIL_REGEX.test(email);
    setEmailValid(isValid);

    if (!isValid) {
      setEmailDuplicate(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      // 실제 API 대신 Mock API 호출
      const isDuplicate = await mockApi.checkEmailDuplicate(email);
      setEmailDuplicate(isDuplicate);
      setCheckingEmail(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  // 닉네임 유효성 검사 및 중복 체크
  useEffect(() => {
    if (username === '') {
      setUsernameValid(null);
      setUsernameDuplicate(null);
      return;
    }

    const isValid = USERNAME_REGEX.test(username);
    setUsernameValid(isValid);

    if (!isValid) {
      setUsernameDuplicate(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true);
      // 실제 API 대신 Mock API 호출
      const isDuplicate = await mockApi.checkUsernameDuplicate(username);
      setUsernameDuplicate(isDuplicate);
      setCheckingUsername(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (password === '') {
      setPasswordValid(null);
      return;
    }
    const isValid = PASSWORD_REGEX.test(password);
    setPasswordValid(isValid);
  }, [password]);

  // 비밀번호 확인 일치 검사
  useEffect(() => {
    if (passwordConfirm === '') {
      setPasswordMatch(null);
      return;
    }
    setPasswordMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  const isFormValid = 
    emailValid === true && 
    emailDuplicate === false && 
    usernameValid === true && 
    usernameDuplicate === false && 
    passwordValid === true && 
    passwordMatch === true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 실제 API 대신 Mock API 호출
      const result = await mockApi.register(email, username, password);

      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setSubmitError(result.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      setSubmitError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <Link to="/" className="inline-block group">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
              Learn-Time
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Run Toward Success with Learn-Time
          </p>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight">
            회원가입
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline transition-all">
              로그인하기
            </Link>
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200
                    ${emailValid === null 
                      ? 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100' 
                      : emailValid && !emailDuplicate
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-100'
                        : 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    }
                  `}
                  placeholder="example@email.com"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  {checkingEmail ? (
                    <svg className="animate-spin h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : emailValid === true && emailDuplicate === false ? (
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : emailValid === false || emailDuplicate === true ? (
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              </div>
              {email && (
                <div className="mt-2 animate-fadeIn">
                  {emailValid === false && <p className="text-xs font-medium text-red-600">올바른 이메일 형식을 입력해주세요.</p>}
                  {emailValid === true && emailDuplicate === true && <p className="text-xs font-medium text-red-600">이미 사용 중인 이메일입니다.</p>}
                  {emailValid === true && emailDuplicate === false && <p className="text-xs font-medium text-green-600 text-opacity-90">사용 가능한 이메일입니다.</p>}
                </div>
              )}
            </div>

            {/* 닉네임 */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                닉네임
              </label>
              <div className="relative group">
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200
                    ${usernameValid === null 
                      ? 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100' 
                      : usernameValid && !usernameDuplicate
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-100'
                        : 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    }
                  `}
                  placeholder="2-15자 (한글, 영문, 숫자)"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  {checkingUsername ? (
                    <svg className="animate-spin h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : usernameValid === true && usernameDuplicate === false ? (
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : usernameValid === false || usernameDuplicate === true ? (
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              </div>
              {username && (
                <div className="mt-2 animate-fadeIn">
                  {usernameValid === false && <p className="text-xs font-medium text-red-600">2-15자의 한글, 영문, 숫자만 사용 가능합니다.</p>}
                  {usernameValid === true && usernameDuplicate === true && <p className="text-xs font-medium text-red-600">이미 사용 중인 닉네임입니다.</p>}
                  {usernameValid === true && usernameDuplicate === false && <p className="text-xs font-medium text-green-600 text-opacity-90">사용 가능한 닉네임입니다.</p>}
                </div>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200
                    ${passwordValid === null 
                      ? 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100' 
                      : passwordValid
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-100'
                        : 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    }
                  `}
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center group-hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {password && !passwordValid && (
                <ul className="mt-2 text-[11px] font-medium text-gray-500 grid grid-cols-2 gap-x-2 gap-y-1 bg-gray-50 p-2 rounded-lg">
                  <li className={password.length >= 8 ? 'text-green-600' : 'text-red-400'}>✓ 8자 이상</li>
                  <li className={/[A-Za-z]/.test(password) ? 'text-green-600' : 'text-red-400'}>✓ 영문 포함</li>
                  <li className={/\d/.test(password) ? 'text-green-600' : 'text-red-400'}>✓ 숫자 포함</li>
                  <li className={/[@$!%*#?&]/.test(password) ? 'text-green-600' : 'text-red-400'}>✓ 특수문자 포함</li>
                </ul>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <div className="relative group">
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  required
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200
                    ${passwordMatch === null 
                      ? 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100' 
                      : passwordMatch
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-100'
                        : 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    }
                  `}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPasswordConfirm ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordConfirm && (
                <p className={`mt-2 text-xs font-medium animate-fadeIn ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                </p>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`
                  w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent 
                  rounded-xl shadow-lg text-base font-bold text-white 
                  focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-300 transform active:scale-[0.98]
                  ${isFormValid && !isSubmitting
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-200 focus:ring-indigo-300'
                    : 'bg-gray-200 cursor-not-allowed text-gray-400'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    가입 처리 중...
                  </>
                ) : (
                  '시작하기'
                )}
              </button>
            </div>

            {/* 메시지 영역 */}
            {(submitError || submitSuccess) && (
              <div className={`rounded-xl border p-4 animate-bounce-short ${submitError ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                <div className="flex items-center gap-2">
                  <svg className={`h-5 w-5 ${submitError ? 'text-red-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {submitError ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <p className={`text-sm font-medium ${submitError ? 'text-red-700' : 'text-green-700'}`}>
                    {submitError || '회원가입 완료! 곧 로그인 페이지로 이동합니다.'}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* 푸터 */}
        <div className="text-center text-xs text-gray-500 px-4">
          <p>
            회원가입 시 Learn-Time의{' '}
            <a href="#" className="text-indigo-600 hover:underline font-semibold">이용약관</a> 및{' '}
            <a href="#" className="text-indigo-600 hover:underline font-semibold">개인정보 처리방침</a>에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}