// ============================================================
// pages/community/CommunityPage.tsx
// 커뮤니티 페이지: 게시판 CRUD, 랭킹 시스템, 활동 배지 및 보상 시스템.
// ============================================================
import React, { useState, useMemo } from 'react';
import { 
  PlusIcon, TrashIcon, EditIcon, MessageSquareIcon, 
  ThumbsUpIcon, TrophyIcon, SearchIcon, XIcon,
  RocketIcon, SparklesIcon,
  BadgeIcon, RewardIcon
} from '../../components/ui/Icons';
import { Card, CardTitle } from '../../components/common/Card';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  commentsList?: Comment[];
  timestamp: string;
  badge: string; // 'obsidian' | 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze'
}

interface User {
  id: string;
  name: string;
  points: number;
  rank: number;
}

const REWARDS = [
  { threshold: 0, name: '자전거', color: 'from-orange-400 to-orange-700', level: 'BRONZE' },
  { threshold: 101, name: '오토바이', color: 'from-slate-300 to-slate-500', level: 'SILVER' },
  { threshold: 301, name: '자동차', color: 'from-yellow-300 to-yellow-600', level: 'GOLD' },
  { threshold: 601, name: '헬리콥터', color: 'from-blue-300 to-indigo-500', level: 'PLATINUM' },
  { threshold: 1001, name: '비행기', color: 'from-cyan-300 to-blue-600', level: 'DIAMOND' },
  { threshold: 2001, name: '우주선', color: 'from-purple-500 via-indigo-600 to-black', level: 'OBSIDIAN' },
];

export function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    { 
      id: '1', 
      author: '열공러77', 
      content: '오늘 5시간 몰입 성공! 미적분 드디어 이해되네요.', 
      likes: 24, 
      comments: 2, 
      timestamp: '10분 전', 
      badge: 'diamond',
      commentsList: [
        { id: 'c1', author: '수학귀신', content: '축하드려요! 저도 얼른 이해하고 싶네요 ㅎㅎ', timestamp: '5분 전' },
        { id: 'c2', author: '근성장마스터', content: '공부 근성 대단하십니다!', timestamp: '2분 전' }
      ]
    },
    { id: '2', author: '근성장마스터', content: '하체 데이 끝... 내일 걸을 수 있을지 모르겠네요.', likes: 42, comments: 0, timestamp: '30분 전', badge: 'obsidian', commentsList: [] },
    { id: '3', author: '습관요정', content: '30일 루틴 달성 보상으로 오토바이 배지 땄습니다!', likes: 15, comments: 0, timestamp: '1시간 전', badge: 'silver', commentsList: [] },
  ]);

  const [ranking] = useState<User[]>([
    { id: '1', name: '근성장마스터', points: 2450, rank: 1 },
    { id: '2', name: '열공러77', points: 1820, rank: 2 },
    { id: '3', name: '습관요정', points: 450, rank: 3 },
    { id: '4', name: '루틴왕', points: 320, rank: 4 },
  ]);

  const [currentUser] = useState({
    name: '나의 계정',
    points: 1250,
  });

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const currentLevelIdx = useMemo(() => {
    const idx = [...REWARDS].reverse().findIndex(r => currentUser.points >= r.threshold);
    return idx === -1 ? 0 : REWARDS.length - 1 - idx;
  }, [currentUser.points]);

  const currentLevel = REWARDS[currentLevelIdx];

  const nextLevel = useMemo(() => {
    return REWARDS.find(r => r.threshold > currentUser.points);
  }, [currentUser.points]);

  const progress = useMemo(() => {
    if (!nextLevel) return 100;
    const currentThreshold = currentLevel.threshold;
    const nextThreshold = nextLevel.threshold;
    return ((currentUser.points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  }, [currentUser.points, currentLevel, nextLevel]);

  const handleSavePost = () => {
    if (!newPostContent.trim()) return;
    if (editingPostId) {
      setPosts(posts.map(p => p.id === editingPostId ? { ...p, content: newPostContent } : p));
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        author: currentUser.name,
        content: newPostContent,
        likes: 0,
        comments: 0,
        timestamp: '방금 전',
        badge: currentLevel.level.toLowerCase(),
        commentsList: []
      };
      setPosts([newPost, ...posts]);
    }
    setNewPostContent('');
    setEditingPostId(null);
    setIsPostModalOpen(false);
  };

  const handleAddComment = () => {
    if (!commentInput.trim() || !selectedPost) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUser.name,
      content: commentInput,
      timestamp: '방금 전'
    };
    
    const updatedPost = {
      ...selectedPost,
      comments: (selectedPost.comments || 0) + 1,
      commentsList: [...(selectedPost.commentsList || []), newComment]
    };
    
    setPosts(posts.map(p => p.id === selectedPost.id ? updatedPost : p));
    setSelectedPost(updatedPost);
    setCommentInput('');
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const openEditModal = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPostId(post.id);
    setNewPostContent(post.content);
    setIsPostModalOpen(true);
  };

  const getBadgeGradient = (type: string) => {
    switch (type) {
      case 'obsidian': return 'from-purple-900 to-black';
      case 'diamond': return 'from-cyan-400 to-blue-600';
      case 'platinum': return 'from-indigo-400 to-indigo-800';
      case 'gold': return 'from-yellow-300 to-amber-600';
      case 'silver': return 'from-slate-200 to-slate-500';
      default: return 'from-orange-300 to-orange-700';
    }
  };

  const topPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 2);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 studio-card glow-indigo">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2 text-gradient">커뮤니티 광장</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">3D 리워드와 함께하는 즐거운 성장 시스템.</p>
        </div>
        <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-[#050505] rounded-[2.5rem] border border-gray-100 dark:border-[#1a1a1a]">
          <RewardIcon index={currentLevelIdx} size={64} />
          <div>
            <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">현재 모빌리티 등급</p>
            <p className="text-2xl font-black tracking-tighter text-indigo-600">{currentLevel.name}</p>
            <p className="text-[0.65rem] font-bold text-gray-400">{currentUser.points} <span className="opacity-50 font-medium">POINTS</span></p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* 게시판 영역 */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex-grow max-w-md">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="검색어를 입력하세요..." 
                className="w-full bg-white dark:bg-[#0d0d0d] border border-gray-100 dark:border-[#1a1a1a] rounded-[2rem] pl-14 pr-6 py-4 text-sm font-bold focus:border-indigo-500 outline-none transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => { setEditingPostId(null); setNewPostContent(''); setIsPostModalOpen(true); }}
              className="ml-4 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm active:scale-95 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2"
            >
              <PlusIcon size={18} /> 포스팅
            </button>
          </div>

          {/* 인기글 랭킹 */}
          <div className="mb-10">
            <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
              <span className="text-rose-500"><SparklesIcon size={20} /></span> 주간 인기글 랭킹
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topPosts.map((post, idx) => (
                <div key={post.id} onClick={() => setSelectedPost(post)} className="bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-[#111] dark:to-[#1a1a1a] p-5 rounded-[2rem] border border-indigo-100 dark:border-[#222] hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-2xl font-black text-indigo-200 dark:text-indigo-900 italic">0{idx + 1}</span>
                    <BadgeIcon level={post.badge} size={28} />
                  </div>
                  <p className="font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-gray-500">{post.author}</span>
                    <span className="flex items-center gap-1 text-rose-500 font-black text-xs"><ThumbsUpIcon size={14} /> {post.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2 text-gray-500">최신 피드</h3>
            {posts.map(post => (
              <Card key={post.id} onClick={() => setSelectedPost(post)} className="p-8 group hover:border-indigo-200 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <BadgeIcon level={post.badge} size={48} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[1rem]">{post.author}</span>
                        <div className={`px-2 py-0.5 rounded-full text-[0.5rem] font-black uppercase tracking-widest bg-gradient-to-br ${getBadgeGradient(post.badge)} text-white`}>
                          {post.badge}
                        </div>
                      </div>
                      <span className="text-[0.65rem] font-bold text-gray-400 uppercase">{post.timestamp}</span>
                    </div>
                  </div>
                  {post.author === currentUser.name && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => openEditModal(post, e)} className="p-2 text-gray-400 hover:text-indigo-600 transition-all"><EditIcon size={16} /></button>
                      <button onClick={(e) => { e.stopPropagation(); deletePost(post.id); }} className="p-2 text-gray-400 hover:text-rose-500 transition-all"><TrashIcon size={16} /></button>
                    </div>
                  )}
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-relaxed mb-8 pl-1">{post.content}</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition-colors font-black text-xs">
                    <ThumbsUpIcon size={18} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-500 transition-colors font-black text-xs">
                    <MessageSquareIcon size={18} /> {post.comments}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 랭킹 및 보상 시스템 영역 */}
        <div className="xl:col-span-4 space-y-8">
          <Card className="p-8 border-t-4 border-indigo-500">
            <CardTitle icon={<TrophyIcon size={20} />}>글로벌 랭킹</CardTitle>
            <div className="space-y-4">
              {ranking.map((user, idx) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-[#050505]/50 border border-gray-100 dark:border-[#1a1a1a] rounded-2xl group transition-all hover:bg-white dark:hover:bg-black">
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${idx === 0 ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-500/20' : idx === 1 ? 'bg-slate-300 text-white shadow-lg shadow-slate-500/20' : idx === 2 ? 'bg-orange-400 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 border border-gray-100 dark:border-white/5'}`}>
                      {user.rank}
                    </span>
                    <span className="font-bold text-sm">{user.name}</span>
                  </div>
                  <span className="text-[0.65rem] font-black text-indigo-500 uppercase tracking-widest">{user.points.toLocaleString()} PT</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 border-t-4 border-indigo-500 overflow-hidden relative">
            <div className="absolute -right-20 -bottom-20 text-indigo-500/5 rotate-12 scale-150 grayscale"><RocketIcon size={200} /></div>
            <CardTitle icon={<SparklesIcon size={20} />}>리워드 마일스톤</CardTitle>
            <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest mb-8">다음 단계 진화까지 <span className="text-indigo-500">{nextLevel ? nextLevel.threshold - currentUser.points : 0} PT</span></p>
            
            <div className="relative pt-6 pb-4">
              <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gray-100 dark:bg-[#1a1a1a] rounded-full"></div>
              <div className="absolute left-6 top-0 w-1.5 bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ height: `${progress}%` }}></div>
              
              <div className="space-y-12 relative">
                {REWARDS.map((r, i) => {
                  const isUnlocked = currentUser.points >= r.threshold;
                  return (
                    <div key={r.name} className={`flex items-center gap-6 transition-all duration-500 ${isUnlocked ? 'opacity-100 scale-100' : 'opacity-20 scale-90 grayscale'}`}>
                      <div className="relative z-10">
                        <RewardIcon index={i} size={48} />
                        {isUnlocked && <div className="absolute -inset-1 bg-indigo-500/20 rounded-2xl blur-md -z-1"></div>}
                      </div>
                      <div>
                        <p className={`text-[0.55rem] font-black uppercase tracking-widest ${isUnlocked ? 'text-indigo-500' : 'text-gray-400'}`}>Level 0{i+1}</p>
                        <p className="text-sm font-black tracking-tight">{r.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card className="p-8 border-t-4 border-indigo-500">
            <CardTitle icon={<SparklesIcon size={20} />}>배지 컬렉션</CardTitle>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {['bronze', 'silver', 'gold', 'platinum', 'diamond', 'obsidian'].map((b) => (
                <div key={b} className="flex flex-col items-center gap-2 p-3 bg-gray-50/50 dark:bg-[#050505]/50 rounded-2xl border border-gray-100 dark:border-[#1a1a1a] hover:scale-105 transition-all">
                  <BadgeIcon level={b} size={40} />
                  <span className="text-[0.5rem] font-black uppercase tracking-widest text-gray-400">{b}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 게시글 상세 모달 (댓글 포함) */}
      {selectedPost && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-2xl max-h-[90vh] rounded-[3rem] border border-gray-100 dark:border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <header className="p-8 border-b border-gray-100 dark:border-[#1a1a1a] flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <BadgeIcon level={selectedPost.badge} size={40} />
                <div>
                  <p className="font-black text-sm">{selectedPost.author}</p>
                  <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">{selectedPost.timestamp}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-3 bg-gray-50 dark:bg-[#111] hover:bg-rose-500 hover:text-white rounded-2xl transition-all">
                <XIcon size={20} />
              </button>
            </header>
            
            <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
              <p className="text-xl font-medium leading-relaxed text-gray-800 dark:text-gray-200 mb-10 whitespace-pre-wrap">{selectedPost.content}</p>
              
              <div className="border-t border-gray-100 dark:border-[#1a1a1a] pt-10">
                <h4 className="font-black text-[0.65rem] uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <MessageSquareIcon size={14} /> Comments ({selectedPost.commentsList?.length || 0})
                </h4>
                <div className="space-y-6">
                  {selectedPost.commentsList?.map(comment => (
                    <div key={comment.id} className="bg-gray-50/50 dark:bg-[#050505]/50 p-6 rounded-3xl border border-gray-50 dark:border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-xs text-indigo-600">{comment.author}</span>
                        <span className="text-[0.6rem] font-bold text-gray-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                    </div>
                  ))}
                  {(!selectedPost.commentsList || selectedPost.commentsList.length === 0) && (
                    <p className="text-center py-10 text-xs font-bold text-gray-400 italic">첫 댓글을 남겨보세요!</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-8 border-t border-gray-100 dark:border-[#1a1a1a] bg-gray-50/30 dark:bg-[#050505]/30 shrink-0">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="따뜻한 댓글을 남겨주세요..."
                  className="flex-grow bg-white dark:bg-[#111] border border-gray-200 dark:border-[#1a1a1a] rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                />
                <button 
                  onClick={handleAddComment}
                  className="px-8 bg-black dark:bg-white text-white dark:text-black font-black text-sm rounded-2xl active:scale-95 transition-all shadow-xl shadow-indigo-500/10"
                >
                  게시
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 게시글 생성/수정 모달 */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-xl rounded-[3rem] border border-gray-100 dark:border-[#1a1a1a] shadow-2xl p-10 animate-in zoom-in-95 duration-200">
            <header className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black tracking-tight">{editingPostId ? '글 수정' : '새 생각 공유'}</h3>
              <button 
                onClick={() => setIsPostModalOpen(false)}
                className="p-3 bg-gray-50 dark:bg-[#111] hover:bg-gray-100 rounded-2xl text-gray-400 transition-all"
              >
                <XIcon size={20} />
              </button>
            </header>
            <div className="space-y-6">
              <textarea 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="오늘의 성장이나 고민을 공유해 보세요..."
                className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-[2rem] p-8 text-lg font-medium min-h-[250px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              />
              <button 
                onClick={handleSavePost}
                className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-500/20"
              >
                {editingPostId ? '수정 완료' : '업로드하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
