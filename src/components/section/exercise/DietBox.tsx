// ============================================================
// components/section/exercise/DietBox.tsx
// 식단(영양) 관리 카드.
//
// 기능:
//   - 아침 / 점심 / 저녁 탭 전환
//   - 각 탭별 음식 목록 관리 (추가 / 삭제)
//   - 음식명 + 중량(g) 입력 후 추가 버튼
//   - 탭별 총 칼로리 자동 계산 및 하단 배너 표시
//   - 칼로리는 현재 Math.random() 임시 산출 (추후 영양 DB 연동 필요)
// ============================================================
import { useState } from 'react';
import { CoffeeIcon, PlusIcon, TrashIcon } from '../../ui/Icons';
import { Card, CardTitle } from '../../common/Card';

type MealItem = { id: string; name: string; amount: string; cal: number };
type MealRecord = Record<string, MealItem[]>;

const MEALS = ['아침', '점심', '저녁'] as const;

const INITIAL_ITEMS: MealRecord = {
  아침: [
    { id: '1', name: '계란', amount: '100', cal: 155 },
    { id: '2', name: '토스트', amount: '50', cal: 133 },
  ],
  점심: [],
  저녁: [],
};

export function DietBox() {
  const [tab, setTab] = useState<string>('아침');
  const [items, setItems] = useState<MealRecord>(INITIAL_ITEMS);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const current = items[tab];
  const totalCal = current.reduce((acc, cur) => acc + cur.cal, 0);

  const addItem = () => {
    if (!name.trim() || !amount) return;
    const newItem: MealItem = { id: Date.now().toString(), name, amount, cal: Math.floor(Math.random() * 200) + 50 };
    setItems(prev => ({ ...prev, [tab]: [...prev[tab], newItem] }));
    setName('');
    setAmount('');
  };

  const removeItem = (id: string) =>
    setItems(prev => ({ ...prev, [tab]: prev[tab].filter(item => item.id !== id) }));

  return (
    <Card className="flex flex-col h-full glow-rose border-t-4 border-rose-500">
      <CardTitle icon={<CoffeeIcon size={18} />}>영양 관리</CardTitle>

      {/* Meal tab selector */}
      <div className="flex gap-3 mb-10 bg-gray-50 dark:bg-[#050505] p-2 rounded-[1.5rem] border border-gray-100 dark:border-[#1a1a1a]">
        {MEALS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[0.65rem] font-black uppercase tracking-widest rounded-xl transition-all ${tab === t ? 'bg-rose-600 text-white shadow-xl' : 'text-gray-400 hover:text-rose-600'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Food list */}
      <div className="space-y-4 mb-10 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {current.length === 0 && <p className="text-xs text-gray-400 font-medium italic text-center mt-10">기록된 식단이 없습니다.</p>}
        {current.map(item => (
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

      {/* Add form */}
      <div className="flex flex-col gap-3 mb-10">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="음식명" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
        <div className="flex gap-3">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="중량 (g)" className="flex-grow bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
          <button onClick={addItem} className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center active:scale-95 shadow-xl shadow-rose-500/10 shrink-0"><PlusIcon size={20} /></button>
        </div>
      </div>

      {/* Total calories */}
      <div className="bg-rose-600 p-6 rounded-[2rem] flex justify-between items-center mt-auto shadow-2xl shadow-rose-500/10">
        <span className="text-[0.65rem] font-black text-rose-100 uppercase tracking-[0.2em]">총 섭취 칼로리</span>
        <div className="text-2xl font-black text-white tracking-tightest">{totalCal} <span className="text-xs opacity-50 ml-1">KCAL</span></div>
      </div>
    </Card>
  );
}
