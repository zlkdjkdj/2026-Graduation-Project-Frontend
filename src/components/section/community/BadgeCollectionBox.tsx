import { Card, CardTitle } from '../../common/Card';
import { SparklesIcon, BadgeIcon } from '../../ui/Icons';

// 획득한 배지들의 목록을 2열 그리드로 나열해 주는 컬렉션 박스 컴포넌트
export function BadgeCollectionBox() {
  const badgeLevels = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'obsidian'];

  return (
    <Card className="p-8 border-t-4 border-indigo-500">
      <CardTitle icon={<SparklesIcon size={20} />}>배지 컬렉션</CardTitle>
      
      {
        // 배지 카드 그리드 영역
      }
      <div className="grid grid-cols-2 gap-4 mt-4">
        {badgeLevels.map((b) => (
          <div 
            key={b} 
            className="flex flex-col items-center gap-3 p-4 bg-gray-50/50 dark:bg-[#050505]/50 rounded-2xl border border-gray-100 dark:border-[#1a1a1a] hover:scale-105 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
          >
            <BadgeIcon level={b} size={72} />
            <span className="text-[0.55rem] font-black uppercase tracking-widest text-gray-400">{b}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
