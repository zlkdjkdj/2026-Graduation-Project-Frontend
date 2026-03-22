// 회원가입 페이지
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Mail, User, Lock, Check, X, Eye, EyeOff, Loader2, AlertCircle, Sparkles } from 'lucide-react';

// 유효성 검사 정규식
const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PW: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  NAME: /^[a-zA-Z0-9가-힣]{2,15}$/
};

// 가짜 API
const mockApi = {
  checkEmail: (email: string) => new Promise(res => setTimeout(() => res(false), 600)),
  checkName: (name: string) => new Promise(res => setTimeout(() => res(false), 600)),
  register: () => new Promise(res => setTimeout(() => res({ success: true }), 1500))
};


export function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', username: '', password: '', confirm: '' });
  const [validity, setValidity] = useState({ email: null, name: null, pw: null, match: null });
  const [duplicates, setDuplicates] = useState({ email: null, name: null });
  const [loading, setLoading] = useState({ email: false, name: false, submit: false });
  const [shows, setShows] = useState({ pw: false, confirm: false });
  const [msg, setMsg] = useState({ error: '', success: false });

  const { email, username, password, confirm } = formData;

  //비밀번호 체크리스트
  const pwChecks = {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*#?&]/.test(password)
  };

  // 입력 핸들러: 타이핑 시 실시간으로 formData 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Side Effect (이메일): 형식 검사 및 타이핑 멈춤(Debounce) 시 중복 체크 실행
  useEffect(() => {
    const checkEmail = async () => {
      const isEValid = REGEX.EMAIL.test(email);
      setValidity(v => ({ ...v, email: isEValid }));
      if (isEValid) {
        setLoading(l => ({ ...l, email: true }));
        const isDup: any = await mockApi.checkEmail(email);
        setDuplicates(d => ({ ...d, email: isDup }));
        setLoading(l => ({ ...l, email: false }));
      }
    };
    const timer = setTimeout(checkEmail, 500);
    return () => clearTimeout(timer);
  }, [email]);

// Side Effect (닉네임): 형식 검사 및 중복 체크
  useEffect(() => {
    const checkName = async () => {
      const isNValid = REGEX.NAME.test(username);
      setValidity(v => ({ ...v, name: isNValid }));
      if (isNValid) {
        setLoading(l => ({ ...l, name: true }));
        const isDup: any = await mockApi.checkName(username);
        setDuplicates(d => ({ ...d, name: isDup }));
        setLoading(l => ({ ...l, name: false }));
      }
    };
    const timer = setTimeout(checkName, 500);
    return () => clearTimeout(timer);
  }, [username]);

  // Side Effect (비밀번호): 강도 검사 및 2차 비밀번호 일치 여부 확인
  useEffect(() => {
    setValidity(v => ({ 
      ...v, 
      pw: REGEX.PW.test(password), 
      match: password !== '' && password === confirm 
    }));
  }, [password, confirm]);

  const isFormValid = validity.email && !duplicates.email && validity.name && !duplicates.name && validity.pw && validity.match;

  // ── 수정된 테두리 로직: 빨간색 제거, 성공 시 파란색 ──
  const getInputClass = (isValid: any, isDup: any) => `
    w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4
    ${(isValid && !isDup) 
      ? 'border-blue-500 focus:ring-blue-100' // 조건 충족 시 파란색 테두리
      : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'} // 그 외엔 기본 회색/인디고 포인트
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        
        <div className="text-center">
          <Link to="/" className="inline-block group">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">Learn-Time</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-2">회원가입 <Sparkles className="text-amber-400" size={24} /></h2>
          <p className="mt-2 text-sm text-gray-600">이미 계정이 있으신가요? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">로그인하기</Link></p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl p-8 border border-white/40">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (isFormValid) console.log('Submit'); }}>
            
            {/* 이메일 */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-1.5"><Mail size={14} className="text-indigo-400"/> 이메일</label>
              <div className="relative">
                <input name="email" type="email" value={email} onChange={handleChange} className={getInputClass(validity.email, duplicates.email)} placeholder="example@email.com" />
                <div className="absolute right-4 top-3.5">
                  {loading.email ? <Loader2 className="animate-spin text-indigo-500" size={18}/> : 
                   validity.email && !duplicates.email && <Check className="text-blue-500" size={18}/>}
                </div>
              </div>
            </div>

            {/* 닉네임 */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-1.5"><User size={14} className="text-indigo-400"/> 닉네임</label>
              <div className="relative">
                <input name="username" type="text" value={username} onChange={handleChange} className={getInputClass(validity.name, duplicates.name)} placeholder="2-15자 한글/영문/숫자" />
                <div className="absolute right-4 top-3.5">
                  {loading.name ? <Loader2 className="animate-spin text-indigo-500" size={18}/> : 
                   validity.name && !duplicates.name && <Check className="text-blue-500" size={18}/>}
                </div>
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-1.5"><Lock size={14} className="text-indigo-400"/> 비밀번호</label>
              <div className="relative">
                <input name="password" type={shows.pw ? 'text' : 'password'} value={password} onChange={handleChange} className={getInputClass(validity.pw, null)} placeholder="강력한 암호를 설정하세요" />
                <button type="button" onClick={() => setShows(s => ({...s, pw: !s.pw}))} className="absolute right-4 top-3.5 text-gray-400">{shows.pw ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
              </div>

              {password && !validity.pw && (
                <div className="mt-3 p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2.5 ml-0.5">보안 요구사항</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      { label: '8자 이상', met: pwChecks.length },
                      { label: '영문 포함', met: pwChecks.letter },
                      { label: '숫자 포함', met: pwChecks.number },
                      { label: '특수문자 포함', met: pwChecks.special },
                    ].map((check, idx) => (
                      <li key={idx} className={`flex items-center gap-2 text-[11px] font-semibold transition-colors duration-300 ${check.met ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${check.met ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Check size={10} strokeWidth={4} className={check.met ? 'text-blue-600' : 'text-gray-300'} />
                        </div>
                        {check.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">비밀번호 확인</label>
              <div className="relative">
                <input name="confirm" type={shows.confirm ? 'text' : 'password'} value={confirm} onChange={handleChange} className={getInputClass(validity.match, null)} placeholder="다시 입력해 주세요" />
                <button type="button" onClick={() => setShows(s => ({...s, confirm: !s.confirm}))} className="absolute right-4 top-3.5 text-gray-400">{shows.confirm ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
              </div>
              {confirm && validity.match && (
                <p className="text-[11px] font-bold ml-1 text-blue-600 animate-in fade-in">✓ 비밀번호가 일치합니다.</p>
              )}
            </div>

            <button type="submit" disabled={!isFormValid || loading.submit} className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 ${isFormValid && !loading.submit ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:shadow-blue-200 active:scale-[0.98]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              {loading.submit ? <Loader2 className="animate-spin mx-auto" size={20}/> : 'Learn-Time 시작하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}