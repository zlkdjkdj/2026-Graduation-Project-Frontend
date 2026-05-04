import { useState } from 'react';
import {
  UploadIcon, CoffeeIcon,
  PlusIcon, PlayCircleIcon, SparklesIcon, DumbbellIcon, TargetIcon, TrendIcon, TrashIcon, EditIcon
} from '../../ui/Icons';
import { Card, CardTitle } from '../../common/Card';

export function ExerciseRecordBox() {
  return (
    <Card className="h-full glow-rose border-t-4 border-rose-500">
      <CardTitle icon={<DumbbellIcon size={18} />}>트레이닝 세션</CardTitle>
      <div className="mb-8">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">운동 시간</label>
        <div className="relative">
          <input type="number" placeholder="0" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-5 text-lg font-black outline-none focus:ring-2 focus:ring-rose-500 transition-all pr-16" />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400 uppercase tracking-widest">분</span>
        </div>
      </div>
      <div className="mb-10">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">오운완 인증</label>
        <div className="border-2 border-dashed border-gray-100 dark:border-[#1a1a1a] bg-gray-50/30 dark:bg-[#050505] rounded-[2rem] p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-all group h-48">
          <UploadIcon size={32} className="text-gray-300 group-hover:text-rose-600 transition-colors" />
          <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-rose-600 transition-colors">사진 업로드</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-rose-500/10">기록 저장</button>
        <button className="py-4 border border-gray-100 dark:border-[#1a1a1a] text-gray-500 rounded-2xl text-sm font-black active:scale-95 transition-all hover:bg-gray-50 dark:hover:bg-[#0a0a0a]">리셋</button>
      </div>
    </Card>
  );
}

export function DietBox() {
  const [tab, setTab] = useState('아침');
  const [items, setItems] = useState<Record<string, { id: string, name: string, amount: string, cal: number }[]>>({
    '아침': [
      { id: '1', name: '계란', amount: '100', cal: 155 },
      { id: '2', name: '토스트', amount: '50', cal: 133 }
    ],
    '점심': [],
    '저녁': []
  });
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const currentItems = items[tab];
  const totalCal = currentItems.reduce((acc, cur) => acc + cur.cal, 0);

  const addItem = () => {
    if (!name.trim() || !amount) return;
    const newItem = { id: Date.now().toString(), name, amount, cal: Math.floor(Math.random() * 200) + 50 };
    setItems({ ...items, [tab]: [...currentItems, newItem] });
    setName(''); setAmount('');
  };

  const removeItem = (id: string) => {
    setItems({ ...items, [tab]: currentItems.filter(item => item.id !== id) });
  };

  return (
    <Card className="flex flex-col h-full glow-rose border-t-4 border-rose-500">
      <CardTitle icon={<CoffeeIcon size={18} />}>영양 관리</CardTitle>
      <div className="flex gap-3 mb-10 bg-gray-50 dark:bg-[#050505] p-2 rounded-[1.5rem] border border-gray-100 dark:border-[#1a1a1a]">
        {['아침', '점심', '저녁'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[0.65rem] font-black uppercase tracking-widest rounded-xl transition-all ${tab === t
              ? 'bg-rose-600 text-white shadow-xl'
              : 'text-gray-400 hover:text-rose-600'
              }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-4 mb-10 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {currentItems.length === 0 && <p className="text-xs text-gray-400 font-medium italic text-center mt-10">기록된 식단이 없습니다.</p>}
        {currentItems.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-gray-50/50 dark:bg-[#050505]/50 border border-gray-100 dark:border-[#1a1a1a] p-5 rounded-2xl hover:border-rose-200 transition-all group">
            <div>
              <span className="text-sm font-black text-gray-800 dark:text-gray-200 block">{item.name}</span>
              <span className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest mt-1 block">{item.amount}g</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-black font-mono text-gray-900 dark:text-white">{item.cal} <span className="text-[0.6rem] text-gray-400 ml-1">KCAL</span></span>
              <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><TrashIcon size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 mb-10">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="음식명" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
        <div className="flex gap-3">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="중량 (g)" className="flex-grow bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
          <button onClick={addItem} className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-xl shadow-rose-500/10 shrink-0">
            <PlusIcon size={20} />
          </button>
        </div>
      </div>
      <div className="bg-rose-600 p-6 rounded-[2rem] flex justify-between items-center mt-auto shadow-2xl shadow-rose-500/10">
        <span className="text-[0.65rem] font-black text-rose-100 uppercase tracking-[0.2em]">총 섭취 칼로리</span>
        <div className="text-2xl font-black text-white tracking-tightest">
          {totalCal} <span className="text-xs opacity-50 ml-1">KCAL</span>
        </div>
      </div>
    </Card>
  );
}

export function ExerciseGuideBox() {
  const [active, setActive] = useState('가슴');
  const parts = ['가슴', '등', '어깨', '이두', '삼두', '하체'];
  return (
    <Card className="flex flex-col h-full border-t-4 border-rose-500">
      <CardTitle icon={<PlayCircleIcon size={18} />}>비주얼 트레이닝</CardTitle>
      <div className="flex flex-wrap gap-3 mb-10">
        {parts.map(p => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`px-6 py-3 rounded-xl text-[0.65rem] font-black uppercase tracking-widest transition-all ${active === p
              ? 'bg-rose-600 text-white shadow-xl'
              : 'border border-gray-100 dark:border-[#1a1a1a] text-gray-400 hover:text-rose-600'
              }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex-grow bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-[2.5rem] flex flex-col items-center justify-center min-h-[250px] cursor-pointer hover:bg-rose-50 transition-all group overflow-hidden relative">
        <div className="absolute inset-0 bg-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <PlayCircleIcon size={64} className="text-gray-300 group-hover:text-rose-600 transition-all group-hover:scale-110 z-10" />
      </div>
      <p className="text-center text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-400 mt-6">
        {active} 교육 영상 스트림
      </p>
    </Card>
  );
}

export function AiExerciseGuideBox() {
  return (
    <Card className="flex flex-col h-full border-t-4 border-rose-500">
      <CardTitle icon={<SparklesIcon size={18} />}>AI 전략 분석</CardTitle>
      <div className="space-y-6 flex-grow flex flex-col justify-center">
        <GuideItem icon={<DumbbellIcon size={20} />} title="최적화 제안" text="삼두 볼륨이 부족합니다. 중량 딥스 3세트 추가를 권장합니다." />
        <GuideItem icon={<TargetIcon size={20} />} title="목표 분석" text="가슴 근비대 정체기입니다. 벤치프레스 중량을 2.5kg 증량하세요." />
        <GuideItem icon={<TrendIcon size={20} />} title="신체 변화" text="등 근육 발달이 우수합니다. 데드리프트를 루틴에 추가해 보세요." />
      </div>
    </Card>
  );
}

function GuideItem({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="p-6 rounded-[2rem] border border-gray-100 dark:border-[#1a1a1a] bg-gray-50/50 dark:bg-[#050505]/50 flex items-start gap-6 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all">
      <div className="mt-1 text-rose-500">{icon}</div>
      <div>
        <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-2 tracking-tight">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export function ExerciseDiaryBox() {
  return (
    <Card className="h-full glow-rose border-t-4 border-rose-500">
      <CardTitle icon={<EditIcon size={18} />}>트레이닝 로그</CardTitle>
      <textarea
        placeholder="오늘의 강도, 집중도, 그리고 신체 반응을 기록하세요..."
        className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-[2rem] p-8 text-sm text-gray-800 dark:text-gray-200 flex-grow min-h-[160px] mb-8 outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium leading-relaxed resize-none"
      />
      <div className="flex items-center justify-between gap-6 mt-auto">
        <div className="flex items-center gap-4">
          <input type="number" defaultValue="0" className="w-24 bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-xl p-4 text-center text-lg font-black outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
          <span className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400">총 운동 시간 (분)</span>
        </div>
        <button className="py-4 px-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-rose-500/10">세션 저장</button>
      </div>
    </Card>
  );
}

export function BodyCompositionBox() {
  return (
    <Card className="h-full border-t-4 border-rose-500">
      <CardTitle icon={<TrendIcon size={18} />}>신체 바이오메트릭</CardTitle>
      <div className="space-y-6 mb-10">
        <div className="space-y-2">
          <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1">체중 (kg)</label>
          <input type="number" placeholder="0.0" step="0.1" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-4 text-sm font-black outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1">체지방률 (%)</label>
          <input type="number" placeholder="0.0" step="0.1" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-4 text-sm font-black outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1">골격근량 (kg)</label>
          <input type="number" placeholder="0.0" step="0.1" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-4 text-sm font-black outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
        </div>
      </div>
      <button className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-rose-500/10">데이터 업데이트</button>
    </Card>
  );
}

export function ExerciseDashboardBox() {
  return (
    <Card className="p-10 border-t-4 border-rose-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tightest uppercase">트레이닝 인텔리전스</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">고정밀 신체 데이터 추적 및 분석 시스템.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none text-[0.6rem] font-black uppercase tracking-[0.2em] px-8 py-4 border border-gray-100 dark:border-[#1a1a1a] rounded-2xl hover:bg-rose-50 transition-all">볼륨 리포트</button>
          <button className="flex-1 md:flex-none text-[0.6rem] font-black uppercase tracking-[0.2em] px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-rose-500/10">최적화 시작</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h3 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">근성장 속도</h3>
          <div className="flex items-end gap-5 h-[280px] relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              {[0, 1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-black dark:border-white" />)}
            </div>
            {[50, 60, 55, 80, 70, 95, 60].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group z-10">
                <div 
                  className="w-full bg-gray-100 dark:bg-[#1a1a1a] group-hover:bg-rose-600 transition-all duration-700 rounded-full cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-center mt-5 text-[0.6rem] font-black text-gray-300 dark:text-gray-700 uppercase tracking-[0.2em] group-hover:text-rose-600 transition-colors">
                  {['월', '화', '수', '목', '금', '토', '일'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-10">
          <h3 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">퍼포먼스 인덱스</h3>
          <div className="grid grid-cols-1 gap-8">
             <div className="p-8 rounded-[2.5rem] border border-gray-100 dark:border-[#1a1a1a] bg-gray-50/50 dark:bg-[#050505]/50 hover:border-rose-300 transition-all">
                <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">지속성 스코어</p>
                <div className="flex items-end gap-3">
                   <span className="text-4xl font-black tracking-tightest">85<span className="text-xl ml-1 text-rose-500 font-black">%</span></span>
                   <span className="text-xs text-emerald-500 font-black mb-1.5 uppercase tracking-wider">+5.2% 상승</span>
                </div>
             </div>
             <div className="p-8 rounded-[2.5rem] border border-gray-100 dark:border-[#1a1a1a] bg-gray-50/50 dark:bg-[#050505]/50 hover:border-rose-300 transition-all">
                <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">누적 운동 볼륨</p>
                <div className="flex items-end gap-3">
                   <span className="text-4xl font-black tracking-tightest">12.4<span className="text-xl ml-1 text-rose-500 font-black">TON</span></span>
                   <span className="text-[0.6rem] text-gray-400 font-black mb-2 uppercase tracking-widest ml-1">주간 합계</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
