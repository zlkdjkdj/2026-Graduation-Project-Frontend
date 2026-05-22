import { BookIcon, CheckIcon, CalendarIcon, ChevronDownIcon, TargetIcon, ActivityIcon } from '../../../../ui/Icons';

export const SidebarPreview = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-5 reveal-left space-y-8 order-2 lg:order-1">
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg">
          <BookIcon size={24} />
        </div>
        <h4 className="text-3xl md:text-4xl font-black uppercase italic leading-tight">한눈에 들어오는 <br /> 체계적인 관리</h4>
        <p className="text-gray-500 font-medium leading-relaxed">
          좌측 사이드바를 통해 모든 학습 과목과 운동 탭을 손쉽게 전환하세요.
          과목별 토글 기능을 통해 당신이 공부해야 할 내용을 놓치지 않고 완벽하게 관리할 수 있습니다.
        </p>
        <ul className="space-y-4">
          {["과목별 계층형 네비게이션", "간편한 모드 전환 시스템", "깔끔한 Spatial UI 디자인"].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <CheckIcon size={12} />
              </div>{" "}
              {item}
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
  );
};
