import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { checkEmailDuplicate, checkUsernameDuplicate, register } from '../../utils/api';

// 정규식 패턴
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9가-힣]{2,15}$/;

export function RegisterPage() {
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

    // 정규식 검사
    const isValid = EMAIL_REGEX.test(email);
    setEmailValid(isValid);

    if (!isValid) {
      setEmailDuplicate(null);
      return;
    }

    // 중복 체크 (debounce)
    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      const isDuplicate = await checkEmailDuplicate(email);
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

    // 정규식 검사
    const isValid = USERNAME_REGEX.test(username);
    setUsernameValid(isValid);

    if (!isValid) {
      setUsernameDuplicate(null);
      return;
    }

    // 중복 체크 (debounce)
    const timer = setTimeout(async () => {
      setCheckingUsername(true);
      const isDuplicate = await checkUsernameDuplicate(username);
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

  // 폼 제출 가능 여부
  const isFormValid = 
    emailValid === true && 
    emailDuplicate === false && 
    usernameValid === true && 
    usernameDuplicate === false && 
    passwordValid === true && 
    passwordMatch === true;

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await register(email, username, password);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Learn-Time
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Run Toward Success with Learn-Time
          </p>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition">
              로그인하기
            </Link>
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                    ${emailValid === null 
                      ? 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200' 
                      : emailValid && !emailDuplicate
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-200'
                        : 'border-red-500 focus:border-red-600 focus:ring-red-200'
                    }
                  `}
                  placeholder="example@email.com"
                />
                
                {/* 상태 아이콘 */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {checkingEmail ? (
                    <svg className="animate-spin h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : emailValid === true && emailDuplicate === false ? (
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : emailValid === false || emailDuplicate === true ? (
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              </div>

              {/* 피드백 메시지 */}
              {email && (
                <div className="mt-2">
                  {emailValid === false && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      올바른 이메일 형식을 입력해주세요.
                    </p>
                  )}
                  {emailValid === true && emailDuplicate === true && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      이미 사용 중인 이메일입니다.
                    </p>
                  )}
                  {emailValid === true && emailDuplicate === false && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      사용 가능한 이메일입니다.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 닉네임 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                    ${usernameValid === null 
                      ? 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200' 
                      : usernameValid && !usernameDuplicate
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-200'
                        : 'border-red-500 focus:border-red-600 focus:ring-red-200'
                    }
                  `}
                  placeholder="2-15자 (한글, 영문, 숫자)"
                />
                
                {/* 상태 아이콘 */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {checkingUsername ? (
                    <svg className="animate-spin h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : usernameValid === true && usernameDuplicate === false ? (
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : usernameValid === false || usernameDuplicate === true ? (
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              </div>

              {/* 피드백 메시지 */}
              {username && (
                <div className="mt-2">
                  {usernameValid === false && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      2-15자의 한글, 영문, 숫자만 사용 가능합니다.
                    </p>
                  )}
                  {usernameValid === true && usernameDuplicate === true && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      이미 사용 중인 닉네임입니다.
                    </p>
                  )}
                  {usernameValid === true && usernameDuplicate === false && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      사용 가능한 닉네임입니다.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                    ${passwordValid === null 
                      ? 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200' 
                      : passwordValid
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-200'
                        : 'border-red-500 focus:border-red-600 focus:ring-red-200'
                    }
                  `}
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                />
                
                {/* 보기/숨기기 버튼 */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* 비밀번호 강도 표시 */}
              {password && (
                <div className="mt-2">
                  {passwordValid === false && (
                    <div className="space-y-1">
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        비밀번호 조건을 확인해주세요:
                      </p>
                      <ul className="text-xs text-gray-600 ml-6 space-y-0.5">
                        <li className={password.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                          • 8자 이상
                        </li>
                        <li className={/[A-Za-z]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                          • 영문 포함
                        </li>
                        <li className={/\d/.test(password) ? 'text-green-600' : 'text-red-600'}>
                          • 숫자 포함
                        </li>
                        <li className={/[@$!%*#?&]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                          • 특수문자 포함 (@$!%*#?&)
                        </li>
                      </ul>
                    </div>
                  )}
                  {passwordValid === true && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      안전한 비밀번호입니다.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className={`
                    appearance-none block w-full px-4 py-3 pr-12 border-2 rounded-xl 
                    placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                    ${passwordMatch === null 
                      ? 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200' 
                      : passwordMatch
                        ? 'border-green-500 focus:border-green-600 focus:ring-green-200'
                        : 'border-red-500 focus:border-red-600 focus:ring-red-200'
                    }
                  `}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                
                {/* 보기/숨기기 버튼 */}
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswordConfirm ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* 피드백 메시지 */}
              {passwordConfirm && (
                <div className="mt-2">
                  {passwordMatch === false && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}
                  {passwordMatch === true && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      비밀번호가 일치합니다.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 제출 버튼 */}
            <div>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`
                  w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent 
                  rounded-xl shadow-lg text-sm font-medium text-white 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all
                  ${isFormValid && !isSubmitting
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500'
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    처리 중...
                  </>
                ) : (
                  '회원가입'
                )}
              </button>
            </div>

            {/* 에러 메시지 */}
            {submitError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-600">{submitError}</p>
                </div>
              </div>
            )}

            {/* 성공 메시지 */}
            {submitSuccess && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-green-600">
                    회원가입이 완료되었습니다! 로그인 페이지로 이동합니다...
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* 추가 정보 */}
        <div className="text-center text-sm text-gray-600">
          <p>
            회원가입을 진행하시면{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">이용약관</a> 및{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
