import { useState } from 'react';
import { Post } from '../../pages/main/types';

export function CommunityContent() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, userName: '갓생마스터', userRank: 1, content: '오늘도 새벽 명상과 독서 완료! 뿌듯한 아침이네요.', completedRoutines: ['새벽 명상', '독서'], successRate: 100, likes: 42, reactions: {'🔥': 15, '👏': 10}, category: '#미라클모닝', streakDays: 12, createdAt: '1시간 전' },
    { id: 2, userName: '운동하는직장인', userRank: 2, content: '퇴근 후 하체 루틴 부셨습니다... 다리가 후들거리네요.', completedRoutines: ['스쿼트', '런지'], successRate: 95, likes: 28, reactions: {'🫡': 12, '🔥': 8}, category: '#운동', streakDays: 7, createdAt: '3시간 전' },
  ]);

  const [newPostContent, setNewPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("#미라클모닝");

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return alert("자랑할 내용을 입력해주세요!");
    const newPost: Post = {
      id: Date.now(),
      userName: "나의갓생", 
      userRank: 0,
      content: newPostContent,
      completedRoutines: ["루틴 완료 ✨"], 
      successRate: 100,
      likes: 0,
      reactions: {},
      category: selectedCategory,
      streakDays: 1,
      createdAt: "방금 전"
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <section className="space-y-6">
        <h3 className="text-xl font-black text-gray-800 flex items-center gap-2 px-1"><span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">🏆</span> 오늘의 갓생 TOP 3</h3>
        <div className="grid md:grid-cols-3 gap-6 items-end">
           {posts.slice(0, 3).map((p) => (
             <div key={p.id} className={`bg-white rounded-3xl border border-gray-100 p-6 flex flex-col items-center shadow-sm transition-all ${p.userRank === 1 ? 'border-emerald-200 scale-105 md:order-2 shadow-emerald-100 shadow-xl z-10' : p.userRank === 2 ? 'md:order-1' : 'md:order-3 opacity-80'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 ${p.userRank === 1 ? 'bg-emerald-500 shadow-lg' : 'bg-gray-100'}`}>{p.userRank === 1 ? '🥇' : p.userRank === 2 ? '🥈' : '🥉'}</div>
                <div className="font-bold text-gray-800">{p.userName}</div>
                <div className="text-xs font-bold text-emerald-500 mt-1 bg-emerald-50 px-3 py-1 rounded-full">성공률 {p.successRate}%</div>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl border-2 border-emerald-50 p-6 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">✍️ 오늘의 갓생 자랑하기</h4>
        <textarea className="w-full h-28 p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none" placeholder="오늘 성공한 루틴 소감을 남겨보세요!" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} />
        <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-2">
                {["#미라클모닝", "#운동", "#공부"].map(cat => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{cat}</button>))}
            </div>
            <button onClick={handlePostSubmit} className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-lg">인증글 올리기</button>
        </div>
      </section>

      <section className="bg-emerald-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex items-center">
        <div className="relative z-10 italic font-medium text-sm leading-relaxed">"성공은 매일 반복되는 작은 루틴들의 합산입니다. 오늘도 당신의 갓생을 응원합니다! ✨"</div>
        <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-black uppercase">Quote</div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-black text-gray-800 flex items-center gap-2 px-1"><span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">🔥</span> 실시간 갓생 피드</h3>
        <div className="space-y-4">
          {posts.map(p => (
            <div key={p.id} className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-emerald-600 text-sm shadow-inner">{p.userName[0]}</div>
                  <div><div className="flex items-center gap-2"><span className="font-bold text-gray-800">{p.userName}</span><span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold border border-green-100">🔥 {p.streakDays}일째</span></div><span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{p.createdAt}</span></div>
                </div>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full">{p.category}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 pl-3 border-l-4 border-emerald-50">{p.content}</p>
              <div className="flex flex-wrap gap-2 mb-6">{p.completedRoutines.map(r => (<span key={r} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">#{r}</span>))}</div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg><span className="text-xs font-bold">{p.likes}</span></button>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  {['🔥', '👏', '🫡'].map(emoji => (<button key={emoji} className="text-sm p-2 hover:bg-gray-100 rounded-xl">{emoji}</button>))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="text-center py-4"><button className="text-gray-400 font-bold text-sm hover:text-emerald-600 transition-all underline underline-offset-8">커뮤니티 게시글 더보기</button></div>
    </div>
  );
}