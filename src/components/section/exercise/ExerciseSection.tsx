import { useState } from 'react';
import {
  UploadIcon, SaveIcon, ResetIcon, CoffeeIcon, SunIcon, MoonIcon,
  PlusIcon, PlayCircleIcon, SparklesIcon, DumbbellIcon, TargetIcon, TrendIcon, TrashIcon, ArrowUpIcon
} from '../../ui/Icons';
import { Card, CardTitle } from '../../common/Card';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';

export function ExerciseRecordBox() {
  return (
    <Card>
      <CardTitle>운동 기록 입력</CardTitle>
      <div className="mb-6">
        <Input label="운동 시간 (분)" type="number" placeholder="0" className="focus:ring-red-500" />
      </div>
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-500 mb-2">오운완 사진 저장</label>
        <div className="border-2 border-dashed border-gray-300 dark:border-[#3A3A3C] bg-gray-50 dark:bg-[#1E1E20] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-all group h-32">
          <UploadIcon color="stroke-gray-400 group-hover:stroke-red-500" />
          <p className="mt-3 text-xs text-gray-500 font-bold group-hover:text-red-500 transition-colors">클릭하여 사진 업로드</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="danger"><SaveIcon /> 저장</Button>
        <Button variant="outline"><ResetIcon /> 리셋</Button>
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
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col shrink-0 min-h-[400px] transition-colors duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-5">식단 관리</h2>
      <div className="flex gap-2 mb-6">
        {['아침', '점심', '저녁'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${tab === t
              ? 'bg-red-500 border-red-500 text-white shadow-md'
              : 'bg-transparent border-gray-200 dark:border-[#3A3A3C] text-gray-500 hover:bg-gray-50 dark:hover:bg-[#1E1E20]'
              }`}
          >
            {t === '아침' ? <CoffeeIcon /> : t === '점심' ? <SunIcon /> : <MoonIcon />}
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3 mb-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {currentItems.length === 0 && <p className="text-xs text-gray-400 italic text-center mt-4">등록된 식단이 없습니다.</p>}
        {currentItems.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-[#1A1A1C] border border-gray-100 dark:border-[#2A2A2B] p-4 rounded-xl group transition-all hover:border-red-200 dark:hover:border-red-900/30">
            <div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.name}</span>
              <span className="text-xs text-gray-400 ml-2 font-medium">{item.amount}g</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-red-500">{item.cal} kcal</span>
              <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-opacity"><TrashIcon size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-6 shrink-0">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="음식명" className="flex-grow bg-gray-50 dark:bg-[#1E1E20] border border-gray-200 dark:border-[#3A3A3C] rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-red-500" />
        <div className="flex items-center bg-gray-50 dark:bg-[#1E1E20] border border-gray-200 dark:border-[#3A3A3C] rounded-xl px-3 w-28">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="그램" className="w-full bg-transparent text-center text-sm outline-none text-gray-800 dark:text-gray-200" />
        </div>
        <button onClick={addItem} className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0">
          <PlusIcon />
        </button>
      </div>
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl p-5 flex justify-between items-center mt-auto shrink-0">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
          <CoffeeIcon /> {tab} 총 칼로리
        </div>
        <div className="text-3xl font-black text-red-600 dark:text-red-500 tracking-tight">
          {totalCal} <span className="text-sm font-bold ml-1">kcal</span>
        </div>
      </div>
    </div>
  );
}

export function ExerciseGuideBox() {
  const [active, setActive] = useState('가슴');
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col flex-grow transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-5">운동 가이드</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {['가슴', '등', '어깨', '이두', '삼두', '하체'].map(p => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${active === p
              ? 'bg-red-500 border-red-500 text-white shadow-md'
              : 'bg-transparent border-gray-200 dark:border-[#3A3A3C] text-gray-500 hover:bg-gray-50 dark:hover:bg-[#2A2A2C]'
              }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex-grow bg-gray-100 dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2B] rounded-xl flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:brightness-110 group relative overflow-hidden">
        <PlayCircleIcon className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform mb-3" />
      </div>
      <p className="text-center text-xs font-medium text-gray-500 mt-4">
        선택된 부위: <span className="text-red-500 font-bold">{active}</span> 운동 영상
      </p>
    </div>
  );
}

export function AiExerciseGuideBox() {
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col h-full transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <span className="text-red-500"><SparklesIcon /></span> AI 운동 가이드
      </h2>
      <div className="space-y-4 flex-grow flex flex-col justify-center">
        <GuideItem
          icon={<DumbbellIcon color="text-red-500" />}
          title="부족 부위 안내"
          text="삼두 운동 강화 필요: 주 3회 딥스 추가 권장"
          borderColor="border-red-100 dark:border-red-900/30"
          bgColor="bg-red-50 dark:bg-red-950/10"
        />
        <GuideItem
          icon={<TargetIcon color="text-yellow-500" />}
          title="목표 달성"
          text="가슴 발달 부족: 벤치프레스 무게 중량 제안"
        />
        <GuideItem
          icon={<TrendIcon color="text-green-500" />}
          title="성장 분석"
          text="등 근육 우수: 현재 루틴 유지하면서 데드리프트 추가 고려"
        />
      </div>
    </div>
  );
}

function GuideItem({ icon, title, text, borderColor = "border-gray-100 dark:border-[#2A2A2B]", bgColor = "bg-gray-50 dark:bg-[#1A1A1C]" }: { icon: React.ReactNode, title: string, text: string, borderColor?: string, bgColor?: string }) {
  return (
    <div className={`${bgColor} p-4 rounded-xl border ${borderColor} flex items-start gap-4 transition-colors`}>
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export function ExerciseDiaryBox() {
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col h-full transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">운동 일기</h2>
      <p className="text-xs font-bold text-gray-500 mb-4">오늘의 기록</p>
      <textarea
        placeholder="오늘 한 운동과 느낀 점을 자유롭게 작성해보세요...&#13;&#10;&#13;&#10;예: 오늘은 가슴 운동을 했습니다. 벤치프레스 80kg 3세트를 성공했고, 이전보다 무게를 5kg 올렸습니다. 마지막 세트가 힘들었지만 완료했습니다!"
        className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2B] rounded-xl p-5 text-sm text-gray-800 dark:text-gray-300 flex-grow min-h-[120px] mb-5 outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none leading-relaxed"
      />
      <div className="flex items-center justify-between gap-4 mt-auto text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <DumbbellIcon />
          <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2B] rounded-lg overflow-hidden h-10 w-24">
            <input type="number" defaultValue="0" className="flex-grow bg-transparent text-center text-sm outline-none text-gray-900 dark:text-gray-200" />
            <div className="flex flex-col border-l border-gray-200 dark:border-[#2A2A2B] w-8 bg-gray-50 dark:bg-[#1A1A1C]">
              <button className="hover:bg-gray-200 dark:hover:bg-[#2A2A2C] text-xs flex-1 border-b border-gray-200 dark:border-[#2A2A2B] text-gray-500 flex items-center justify-center">▲</button>
              <button className="hover:bg-gray-200 dark:hover:bg-[#2A2A2C] text-xs flex-1 text-gray-500 flex items-center justify-center">▼</button>
            </div>
          </div>
          <span className="text-sm font-bold">분 운동함</span>
        </div>
        <button className="py-2.5 px-8 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition-all shadow-md active:scale-95 flex items-center gap-2">
          <SaveIcon /> 저장 (+8P)
        </button>
      </div>
    </div>
  );
}

export function BodyCompositionBox() {
  return (
    <Card>
      <CardTitle icon={<TrendIcon color="text-red-500" />}>신체 변화 기록</CardTitle>
      <div className="space-y-4 mb-6">
        <Input label="몸무게 (kg)" type="number" placeholder="0.0" step="0.1" className="focus:ring-red-500" />
        <Input label="체지방률 (%)" type="number" placeholder="0.0" step="0.1" className="focus:ring-red-500" />
        <Input label="골격근량 (kg)" type="number" placeholder="0.0" step="0.1" className="focus:ring-red-500" />
      </div>
      <Button variant="danger" className="w-full">
        <SaveIcon /> 저장
      </Button>
    </Card>
  );
}

export function ExerciseDashboardBox() {
  const dailyData = [60, 80, 0, 100, 70, 0, 90];
  const consistency = 85;
  const volumeLifted = "12,450kg";
  const caloriesBurned = "3,200 kcal";

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-8 shadow-sm dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-400 dark:to-orange-300 transition-colors">
          AI 운동 분석 대시보드
        </h2>
        <span className="text-xs font-bold bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-3 py-1 rounded-full">
          This Week
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-[#241A1A] dark:to-[#201A1A] rounded-2xl p-6 border border-red-100 dark:border-[#2A2A2B] flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-xs font-black text-red-600/70 dark:text-red-400/70 mb-2 uppercase tracking-[0.2em] relative z-10">Consistency</p>
          <div className="relative flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-[#2A2A2C]" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * consistency) / 100} className="text-red-500" strokeLinecap="round" />
            </svg>
            <span className="absolute text-2xl font-black text-gray-800 dark:text-white">{consistency}%</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-[#1A1A1C] rounded-2xl p-6 border border-gray-100 dark:border-[#2A2A2B] flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-xs font-black text-gray-400 mb-2 uppercase tracking-[0.2em] relative z-10">Total Volume</p>
          <h4 className="text-4xl font-light text-gray-800 dark:text-white relative z-10 tracking-tight">{volumeLifted}</h4>
          <p className="text-xs text-orange-500 mt-2 font-bold flex items-center gap-1 relative z-10"><ArrowUpIcon size={12} /> 5% from last week</p>
        </div>
        <div className="bg-gray-50 dark:bg-[#1A1A1C] rounded-2xl p-6 border border-gray-100 dark:border-[#2A2A2B] flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-xs font-black text-gray-400 mb-2 uppercase tracking-[0.2em] relative z-10">Calories Burned</p>
          <h4 className="text-4xl font-light text-gray-800 dark:text-white tracking-tight relative z-10">{caloriesBurned}</h4>
          <p className="text-xs text-red-500 mt-2 font-bold flex items-center gap-1 relative z-10"><ArrowUpIcon size={12} /> Top 10% user</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-[#1A1A1C] rounded-2xl p-8 border border-gray-100 dark:border-[#2A2A2B]">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-6">Weekly Activity Heatmap</h3>
        <div className="h-40 flex items-end justify-between gap-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end relative">
              <div className="w-full bg-gray-200 dark:bg-[#2A2A2C] rounded-lg relative h-[85%] overflow-hidden transition-all duration-300 group-hover:bg-gray-300 dark:group-hover:bg-[#3A3A3C]">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 to-red-400 dark:from-red-500 dark:to-red-300 transition-all duration-1000 rounded-lg group-hover:brightness-110" style={{ height: `${dailyData[i]}%` }} />
              </div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{day}</span>
              <div className="absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {dailyData[i]}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
