// 커뮤니티 섹션 전용 컴포넌트
import React, { useState } from 'react';
import { Award, TrendingUp, Zap, Heart, MessageSquare } from 'lucide-react';
import { SectionHeading } from './CommonDesign';
import { getTheme } from './Mode';
import { Post, RankUser, RoutineSuccess } from './Types';

// --- 모의 데이터 (Mock Data) ---
// 랭킹 목록 모의 데이터
const MOCK_RANKING: RankUser[] = [
  { rank: 1, name: '김코딩', points: 1540 }, 
  { rank: 2, name: '박공부', points: 1420 }, 
  { rank: 3, name: '이헬스', points: 1280 }
];

// 루틴 달성률 통계 모의 데이터
const MOCK_ROUTINES: RoutineSuccess[] = [
  { name: '공부 진도 준수', rate: 82, color: 'bg-indigo-500' }, 
  { name: '주 4회 이상 운동', rate: 65, color: 'bg-orange-500' }
];

export function Community({ dark, userPoints }: { dark: boolean; userPoints: number }) {
  const t = getTheme(dark);
  
  // 피드 게시물 목록 상태
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: '김코딩', content: '오늘 AI 가이드대로 공부 완료!', points: 1540, timestamp: '10분 전', likes: 4 },
    { id: 2, author: '이헬스', content: '하체 데이 오운완!', points: 1280, timestamp: '1시간 전', likes: 7 },
  ]);
  
  // 작성 중인 게시글 텍스트 상태
  const [newPostContent, setNewPostContent] = useState('');

  // 새로운 게시글 등록 핸들러
  const handleAddPost = () => {
    if (!newPostContent.trim()) return;
    
    
    setPosts([
      { 
        id: Date.now(), 
        author: '나(재현)', 
        content: newPostContent, 
        points: userPoints, 
        timestamp: '방금', 
        likes: 0 
      }, 
      ...posts
    ]);
    setNewPostContent(''); // 입력창 초기화
  };

  return (
    <div className="space-y-8 animate-slideUp">
      
      {/* 1. 상단 히어로 영역: 사용자 포인트 및 레벨 표시 */}
      <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card} bg-gradient-to-br from-indigo-600/10 to-purple-600/10`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-black italic uppercase">Stacking Up Your Worth</h3>
            <div className="flex gap-3">
              {/* 포인트에 따른 레벨 계산 (100점당 1레벨) */}
              <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black">
                LV. {Math.floor(userPoints / 100)}
              </div>
            </div>
          </div>
          {/* 포인트 서클 표시 */}
          <div className={`w-40 h-40 rounded-full border-8 flex flex-col items-center justify-center ${dark ? 'border-slate-800 bg-black' : 'border-white bg-white shadow-xl'}`}>
            <span className="text-4xl font-black italic">{userPoints}</span>
            <span className="text-[10px] opacity-30 uppercase">Points</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. 랭킹 보드 (Challengers) */}
        <div className={`p-8 rounded-[3rem] border ${t.card}`}>
          <SectionHeading icon={<Award size={22} />} title="Challengers" />
          {/* 기존 랭킹에 본인(재현) 데이터를 합쳐서 렌더링 */}
          {MOCK_RANKING.concat([{ rank: 14, name: '나(재현)', points: userPoints, isMe: true }]).map(u => (
            <div key={u.name} className={`flex justify-between p-4 rounded-2xl border mb-2 ${u.isMe ? 'bg-indigo-600/20 border-indigo-500' : t.subCard}`}>
              <span className="text-sm font-semibold">{u.rank}. {u.name}</span>
              <span className="text-xs font-black text-indigo-400">{u.points} PT</span>
            </div>
          ))}
        </div>

        {/* 3. 루틴 성공률 통계 (Routine Success Rate) */}
        <div className={`p-8 rounded-[3rem] border ${t.card} lg:col-span-2`}>
          <SectionHeading icon={<TrendingUp size={22} />} title="Routine Success Rate" />
          {MOCK_ROUTINES.map(r => (
            <div key={r.name} className="mb-4">
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span>{r.name}</span>
                <span>{r.rate}%</span>
              </div>
              {/* 성취도 그래프 바 */}
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${r.color}`} style={{ width: `${r.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 게시글 작성 영역 (Composer) */}
      <div className={`p-7 rounded-[2.5rem] border ${t.card} flex gap-4`}>
        <div className="shrink-0 w-12 h-12 rounded-[1rem] bg-indigo-600 flex items-center justify-center text-white font-black">나</div>
        <div className="flex-1 space-y-4">
          <textarea 
            value={newPostContent} 
            onChange={e => setNewPostContent(e.target.value)} 
            className="w-full bg-transparent border-none text-sm font-semibold focus:ring-0 outline-none" 
            rows={2} 
            placeholder="오늘의 열정을 한 줄로 남겨보세요!" 
          />
          <button 
            onClick={handleAddPost} 
            className="px-7 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase ml-auto block"
          >
            Share Progress
          </button>
        </div>
      </div>

      {/* 5. 커뮤니티 피드 (Feed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map(p => (
          <div key={p.id} className={`p-7 rounded-[2.5rem] border ${t.card}`}>
             <div className="flex justify-between mb-4">
               <span className="font-bold">{p.author}</span>
               <span className="text-xs font-black">LV. {Math.floor(p.points / 100)}</span>
             </div>
             <p className="text-sm font-medium mb-5">{p.content}</p>
             {/* 좋아요 등 인터랙션 버튼 영역 */}
             <div className="flex gap-5 border-t pt-4">
               <button className="flex items-center gap-1.5 text-rose-400">
                 <Heart size={15} /> {p.likes}
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}