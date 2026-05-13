import { 
  ActivityIcon, 
  BookIcon, 
  DumbbellIcon, 
  CalendarIcon, 
  ClockIcon, 
  MessageSquareIcon, 
  TrophyIcon, 
  ThumbsUpIcon, 
  CheckIcon, 
  ChevronDownIcon, 
  TargetIcon,
  SmartphoneIcon,
  PlusIcon
} from '../../../components/ui/Icons';

interface TourSectionProps {
  addToRefs: (el: HTMLDivElement) => void;
}

export const TourSection = ({ addToRefs }: TourSectionProps) => {
  return (
    <section id="interface" className="relative min-h-screen w-full snap-start bg-white text-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 w-full" ref={addToRefs}>
        <div className="reveal-content mb-20 text-center">
          <h3 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Live Preview</h3>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">강력한 기능을 담은 심플한 UI</h2>
        </div>

        {/* Study Studio */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-40">
          <div className="lg:col-span-7 reveal-left">
            <div className="relative group float-animation" style={{ animationDelay: '0s' }}>
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-2xl opacity-50 glow-pulse group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 card-3d-hover">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h5 className="text-2xl font-black tracking-tight">학습 스튜디오</h5>
                    <p className="text-xs text-gray-400 font-bold mt-1">스마트하고 효율적인 학습 몰입 환경</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-4 py-2 bg-gray-50 rounded-xl text-[0.6rem] font-black uppercase tracking-widest text-gray-400 border border-gray-100">기간 설정 필요</div>
                    <div className="px-4 py-2 bg-black text-white rounded-xl text-[0.6rem] font-black uppercase tracking-widest">+ 진도 추가</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h6 className="text-[0.6rem] font-black uppercase tracking-widest text-indigo-600">핵심 지표</h6>
                    <div className="space-y-5">
                      {[
                        { name: "총 공부 시간", p: 75, color: "bg-indigo-600" },
                        { name: "진도 달성률", p: 64, color: "bg-indigo-600" },
                        { name: "문제 오답률", p: 24, color: "bg-indigo-600" }
                      ].map((m, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-[0.65rem] font-bold">
                            <span>{m.name}</span>
                            <span>{m.p}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.p}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                    <h6 className="text-[0.6rem] font-black uppercase tracking-widest text-gray-400 mb-4">오늘의 진도</h6>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <div className="w-5 h-5 bg-indigo-600 rounded-md flex items-center justify-center"><CheckIcon size={12} className="text-white" /></div>
                        <span className="text-[0.7rem] font-bold text-gray-400 line-through italic">1장: 미적분 기초</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <div className="w-5 h-5 border-2 border-gray-100 rounded-md" />
                        <span className="text-[0.7rem] font-bold">2장: 도함수의 활용</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 reveal-right space-y-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20"><ActivityIcon size={24} /></div>
            <h4 className="text-3xl md:text-4xl font-black uppercase italic leading-tight">데이터로 증명하는 <br /> 당신의 몰입도</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              주간 몰입도 리포트와 핵심 지표 대시보드를 통해 학습 성과를 실시간으로 모니터링하세요. 데이터가 당신의 성장을 수치로 증명합니다.
            </p>
          </div>
        </div>

        {/* Health Lab */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-40">
          <div className="lg:col-span-5 reveal-left space-y-8 order-2 lg:order-1">
            <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20"><DumbbellIcon size={24} /></div>
            <h4 className="text-3xl md:text-4xl font-black uppercase italic leading-tight">운동 효율을 극대화하는 <br /> 스마트 트레이닝</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              오늘 진행한 운동 부위와 세트를 기록하면 시스템이 당신의 데이터를 분석하여 부족한 부위를 찾아내고 최적의 루틴을 제안합니다.
            </p>
          </div>
          <div className="lg:col-span-7 reveal-right order-1 lg:order-2">
            <div className="relative group float-animation" style={{ animationDelay: '1s' }}>
              <div className="absolute -inset-4 bg-rose-500/10 rounded-[3rem] blur-2xl opacity-50 glow-pulse group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 card-3d-hover">
                <div className="flex items-center justify-between mb-8">
                  <h5 className="text-2xl font-black tracking-tight">운동 랩</h5>
                  <div className="flex gap-2">
                    {["가슴", "등", "하체", "어깨"].map((p, i) => (
                      <div key={i} className={`px-3 py-1 rounded-lg text-[0.55rem] font-black uppercase ${i === 0 ? 'bg-rose-600 text-white' : 'bg-gray-50 text-gray-400'}`}>{p}</div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <span className="text-[0.6rem] font-black text-rose-500 uppercase tracking-widest block mb-4">가이드</span>
                    <p className="text-[0.7rem] font-bold leading-relaxed text-gray-700">현재 대흉근 하부 발달이 상대적으로 부족합니다. 딥스나 디클라인 프레스를 추천합니다.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-white border border-gray-100 rounded-2xl flex justify-between items-center shadow-sm">
                      <span className="text-[0.65rem] font-bold">벤치 프레스</span>
                      <span className="text-[0.6rem] font-black text-rose-500 italic">5 SETS</span>
                    </div>
                    <div className="p-4 bg-white border border-gray-100 rounded-2xl flex justify-between items-center shadow-sm">
                      <span className="text-[0.65rem] font-bold">덤벨 플라이</span>
                      <span className="text-[0.6rem] font-black text-rose-500 italic">4 SETS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Management */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-40">
          <div className="lg:col-span-7 reveal-left">
            <div className="relative group float-animation" style={{ animationDelay: '2s' }}>
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] blur-2xl opacity-50 glow-pulse group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 card-3d-hover">
                <div className="flex items-center justify-between mb-8">
                  <h5 className="text-2xl font-black tracking-tight">일정 관리</h5>
                  <div className="text-[0.6rem] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">May 2026</div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="text-[0.55rem] font-black text-center text-gray-300">{d}</div>
                  ))}
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center text-[0.65rem] font-black rounded-lg ${i === 12 ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400'}`}>{i + 1}</div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
                    <ClockIcon size={16} />
                    <span className="text-[0.7rem] font-black">14:00 - 알고리즘 문제 풀이 (2시간)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 reveal-right space-y-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20"><CalendarIcon size={24} /></div>
            <h4 className="text-3xl md:text-4xl font-black uppercase italic leading-tight">빈틈없는 성장을 위한 <br /> 정교한 일정 설계</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              학습과 운동 뿐만 아니라 당신의 모든 일과를 체계적으로 관리하세요. 캘린더 기능을 통해 나만의 루틴을 최적화할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Community */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-40">
          <div className="lg:col-span-5 reveal-left space-y-8 order-2 lg:order-1">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-400/20"><MessageSquareIcon size={24} /></div>
            <h4 className="text-3xl md:text-4xl font-black uppercase italic leading-tight">서로의 동기가 되는 <br /> 러닝메이트 커뮤니티</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              비슷한 목표를 가진 사람들과 경험을 공유하세요. 댓글과 추천을 통해 서로를 응원하며 함께 성공을 향해 달려갑니다.
            </p>
          </div>
          <div className="lg:col-span-7 reveal-right order-1 lg:order-2">
            <div className="relative group float-animation" style={{ animationDelay: '0.5s' }}>
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-2xl opacity-50 glow-pulse group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 card-3d-hover">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600"><TrophyIcon size={20} /></div>
                  <div>
                    <span className="block text-[0.7rem] font-black">김철수</span>
                    <span className="text-[0.55rem] font-bold text-gray-400 uppercase">15분 전</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-700 leading-relaxed mb-6 italic">"오늘 미적분 2장 끝냈습니다! 생각보다 도함수 개념이 어렵네요. 다들 화이팅!"</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-rose-500 font-black text-[0.65rem]"><ThumbsUpIcon size={14} /> 24</div>
                  <div className="flex items-center gap-2 text-gray-400 font-black text-[0.65rem]"><MessageSquareIcon size={14} /> 8</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Management */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 reveal-left space-y-8 order-2 lg:order-1">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg"><BookIcon size={24} /></div>
            <h4 className="text-3xl md:text-4xl font-black uppercase italic leading-tight">한눈에 들어오는 <br /> 체계적인 관리</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              좌측 사이드바를 통해 모든 학습 과목과 운동 탭을 손쉽게 전환하세요.
              과목별 토글 기능을 통해 당신이 공부해야 할 내용을 놓치지 않고 완벽하게 관리할 수 있습니다.
            </p>
            <ul className="space-y-4">
              {["과목별 계층형 네비게이션", "간편한 모드 전환 시스템", "깔끔한 Spatial UI 디자인"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"><CheckIcon size={12} /></div> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 reveal-right order-1 lg:order-2">
            <div className="relative group float-animation" style={{ animationDelay: '1.5s' }}>
              <div className="absolute -inset-4 bg-black/5 rounded-[3rem] blur-2xl opacity-50 glow-pulse group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden p-10 card-3d-hover">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-xl shadow-black/20 font-black text-sm">LT</div>
                  <span className="text-2xl font-black tracking-tightest uppercase">Learn-Time</span>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-colors">
                    <CalendarIcon size={20} /> <span className="text-sm">일정 생성</span>
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between px-6 py-4 bg-black text-white rounded-2xl shadow-xl shadow-black/10">
                      <div className="flex items-center gap-4 font-black">
                        <BookIcon size={20} /> <span className="text-sm">학습 스튜디오</span>
                      </div>
                      <ChevronDownIcon size={16} />
                    </div>
                    <div className="mt-4 ml-14 space-y-4">
                      {["수학", "영어", "과학", "역사"].map((s, i) => (
                        <div key={i} className={`text-sm font-bold ${i === 0 ? 'text-indigo-600' : 'text-gray-400'} hover:text-indigo-600 transition-colors cursor-pointer`}>{s}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-colors">
                    <TargetIcon size={20} /> <span className="text-sm">운동 랩</span>
                  </div>
                  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-colors">
                    <ActivityIcon size={20} /> <span className="text-sm">커뮤니티</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Mockup (Integrated into Tour) */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mt-40">
          <div className="lg:col-span-5 reveal-left space-y-8 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md">Coming Soon</span>
            </div>
            <h4 className="text-3xl md:text-5xl font-black uppercase italic leading-tight text-gray-900">언제 어디서나 <br /> 완벽한 연결</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              Learn-Time의 모든 강력한 기능을 스마트폰에 최적화된 모바일 앱으로 만나보세요.
              이동 중에도 학습 진도를 확인하고 운동 세트를 기록할 수 있습니다.
            </p>
            <div className="pt-4">
              <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] relative overflow-hidden group/notice max-w-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 group-hover/notice:scale-150 transition-transform duration-700" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shadow-indigo-100 shrink-0">
                    <SmartphoneIcon size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">출시 안내 사항</p>
                    <p className="text-[0.75rem] font-bold text-indigo-700/80 leading-relaxed">
                      현재 Learn-Time 모바일 앱은 개발 단계에 있습니다. <br />
                      최상의 사용 경험을 위해 실제 출시 여부 및 일정은 <br />
                      예고 없이 변경될 수 있음을 알려드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 reveal-right order-1 lg:order-2 flex justify-center">
            <div className="relative group float-animation" style={{ animationDelay: '2s' }}>
              <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-[80px] opacity-50 glow-pulse group-hover:opacity-70 transition-opacity duration-500" />
              
              {/* Phone Mockup Frame */}
              <div className="relative w-[300px] h-[620px] bg-black rounded-[3rem] p-2.5 shadow-2xl shadow-indigo-500/20 card-3d-hover">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl z-20" /> {/* Notch */}
                
                {/* Phone Screen */}
                <div className="w-full h-full bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden flex flex-col relative">
                  
                  {/* Status Bar */}
                  <div className="h-12 flex items-end justify-between px-6 pb-2 text-white z-10">
                    <span className="text-[0.6rem] font-bold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" /></svg>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="flex-1 px-5 py-2 space-y-5 overflow-y-auto hide-scrollbar pb-24">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-[0.6rem]">LT</div>
                        <span className="text-white font-black text-lg italic tracking-tight">Hello, Alex</span>
                      </div>
                      <div className="w-8 h-8 bg-white/10 rounded-full border border-white/20" />
                    </div>

                    {/* Study Ring */}
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
                      <div className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest mb-4">Today's Focus</div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-white">76%</span>
                            <span className="text-[0.55rem] text-gray-400 font-bold uppercase">Completed</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exercise List */}
                    <div className="space-y-3">
                      <div className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest px-1">Evening Routine</div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center"><DumbbellIcon size={14} /></div>
                          <span className="text-white font-bold text-xs">Chest & Triceps</span>
                        </div>
                        <CheckIcon size={16} className="text-emerald-400" />
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between opacity-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center"><CalendarIcon size={14} /></div>
                          <span className="text-white font-bold text-xs">Read 20 pages</span>
                        </div>
                        <div className="w-4 h-4 border border-white/20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#0a0a0a]/90 backdrop-blur-lg border-t border-white/10 flex items-center justify-between px-8 pb-4 pt-2">
                    <BookIcon size={20} className="text-indigo-500" />
                    <TargetIcon size={20} className="text-gray-500" />
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white -mt-8 shadow-lg shadow-indigo-500/30 ring-4 ring-[#0a0a0a]">
                      <PlusIcon size={20} />
                    </div>
                    <ActivityIcon size={20} className="text-gray-500" />
                    <CalendarIcon size={20} className="text-gray-500" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
