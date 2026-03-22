// 학습(Education) 섹션 컴포넌트
import React from 'react';
import { 
  BookOpen, Upload, Loader2, Sparkles, Flag, Zap, 
  CheckCircle, Calendar, Trash2, Plus, Brain, 
  RefreshCw, Clock, Save 
} from 'lucide-react';
import { SectionHeading, ProgressBar } from './CommonDesign';
import { getTheme, STUDY_SUGG_STYLE } from './Mode';
import { useEducation } from '../../utils/Main/useEducation';

export function Education({ dark, earnPoints }: { dark: boolean; earnPoints: () => void }) {
  const t = getTheme(dark);
  
  // 커스텀 훅,  상태(state), 계산된 통계(stats), 실행 함수(actions)
  const { state, stats, actions } = useEducation(earnPoints);

  return (
    <div className="space-y-8 animate-slideUp">
      
      {/* 1. 학습 설정  */}
      <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card}`}>
        <SectionHeading icon={<BookOpen size={24} />} title="Study Setup" sub="학습 목표와 기간을 입력하세요" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: '책 제목', type: 'text', val: state.bookTitle, set: actions.setBookTitle },
            { label: '시작일', type: 'date', val: state.startDate, set: actions.setStartDate },
            { label: '종료일', type: 'date', val: state.endDate, set: actions.setEndDate },
            { label: '총 일수', type: 'number', val: state.totalDays, set: (v: string) => actions.setTotalDays(Number(v)) },
          ].map((input) => (
            <div key={input.label} className="space-y-2">
              <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>{input.label}</label>
              <input 
                type={input.type} 
                value={input.val} 
                onChange={(e) => input.set(e.target.value)} 
                className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm outline-none border-2 transition-all ${t.input}`} 
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 학습 자료 업로드 */}
          <label className={`lg:col-span-2 border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${dark ? 'border-slate-800 hover:bg-slate-800/40' : 'border-slate-200 hover:bg-slate-50'}`}>
            <Upload size={32} className={t.textMuted} />
            <p className={`font-semibold text-sm ${t.textMuted}`}>자료 업로드 (PDF / 이미지)</p>
            <input type="file" className="hidden" />
          </label>
          {/* AI 분석 시작 버튼 */}
          <button onClick={actions.handleStartAnalysis} disabled={state.isAnalyzing} className="bg-indigo-600 text-white rounded-[2rem] font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/25 flex flex-col items-center justify-center gap-3 min-h-[140px]">
            {state.isAnalyzing ? <Loader2 className="animate-spin" size={28} /> : <Sparkles size={28} />}
            <span className="text-sm tracking-widest uppercase">{state.isAnalyzing ? '분석 중...' : '분석 시작'}</span>
          </button>
        </div>
      </div>

      {/* 2. 학습 진도 (Progress) */}
      <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500 border border-indigo-500/20"><Flag size={22} /></div>
            <div><h3 className="text-xl font-black italic uppercase">전체 진도 대비 달성률</h3></div>
          </div>
          {/* 계획 대비 현재 페이스 표시 (앞서감/뒤처짐) */}
          <div className={`px-4 py-2 rounded-2xl border text-xs font-black uppercase tracking-wide ${stats.gap >= 0 ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400' : 'bg-rose-500/15 border-rose-500/25 text-rose-400'}`}>
            {stats.gap >= 0 ? `+${stats.gap}% 앞서감` : `${stats.gap}% 뒤처짐`}
          </div>
        </div>
        <div className="space-y-6">
          <ProgressBar label="기간 진행" value={stats.elapsedDays} max={state.totalDays} color="bg-slate-400" dark={dark} />
          <ProgressBar label="실제 달성" value={stats.donePct} max={100} color={stats.gap >= 0 ? 'bg-indigo-500' : 'bg-rose-500'} dark={dark} />
        </div>
      </div>

      {/* 3. 할 일 그리드 (Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI 가이드: 분석 결과에 따른 자동 생성 할 일 */}
        <div className={`p-8 md:p-10 rounded-[3rem] border ${t.card}`}>
          <SectionHeading icon={<Zap size={22} />} title="AI 오늘의 가이드" />
          <div className="space-y-3">
            {state.aiTasks.map(task => (
              <button key={task.id} onClick={() => actions.toggleAiTask(task.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${task.done ? 'opacity-40 bg-slate-100/10 border-transparent' : t.subCard}`}>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${task.done ? 'bg-indigo-600 text-white' : 'bg-slate-700 border border-slate-600'}`}>{task.done && <CheckCircle size={14} />}</div>
                <span className={`flex-1 text-sm font-semibold leading-snug ${task.done ? 'line-through' : ''}`}>{task.text}</span>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${task.tagColor}`}>{task.tag}</span>
              </button>
            ))}
          </div>
        </div>
        {/* 개인 스케줄: 사용자가 직접 추가하는 할 일 목록 */}
        <div className={`p-8 md:p-10 rounded-[3rem] border ${t.card}`}>
          <SectionHeading icon={<Calendar size={22} />} title="My Schedule" />
          <div className="space-y-2.5 mb-5 max-h-52 overflow-y-auto pr-1">
            {state.manTasks.length === 0 ? <p className={`text-sm font-semibold py-10 text-center ${t.textMuted}`}>등록된 일정이 없습니다.</p> : state.manTasks.map(task => (
              <div key={task.id} className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? 'bg-slate-800/25 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                <button onClick={() => actions.toggleManTask(task.id)} className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${task.done ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>{task.done && <CheckCircle size={12} className="text-white" />}</button>
                <span className={`flex-1 text-sm font-semibold leading-snug ${task.done ? 'line-through opacity-30' : ''}`}>{task.text}</span>
                <button onClick={() => actions.deleteManTask(task.id)} className={`${t.textMuted} hover:text-rose-500 transition-colors p-1`}><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
          {/* 새로운 할 일 입력창 */}
          <div className="flex gap-2">
            <input type="text" value={state.newTask} onChange={e => actions.setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && actions.addManTask()} placeholder="새 할 일을 입력하세요..." className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold outline-none border-2 transition-all ${t.input}`} />
            <button onClick={actions.addManTask} className="bg-indigo-600 px-4 rounded-xl hover:bg-indigo-700 transition-all text-white"><Plus size={20} /></button>
          </div>
        </div>
      </div>

      {/* 4. 공부 기록 (Study Logs): 실시간 학습 시간 및 내용 수동 기록 */}
      <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card} space-y-6`}>
        <SectionHeading icon={<Clock size={24} />} title="공부 기록" sub="학습 시간을 기록하고 포인트를 획득하세요" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-3">
            <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>공부 시간 (분)</label>
            <input type="number" value={state.studyMin} onChange={e => actions.setStudyMin(e.target.value)} placeholder="예: 60" className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm outline-none border-2 transition-all ${t.input}`} />
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>공부 내용 메모</label>
            <textarea rows={1} value={state.studyMemo} onChange={e => actions.setStudyMemo(e.target.value)} placeholder="공부한 내용을 간단히 기록해보세요" className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm resize-none outline-none border-2 transition-all ${t.input}`} />
          </div>
        </div>
        <button onClick={actions.saveStudyLog} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
          <Save size={18} /> 기록 저장 (+10 PT)
        </button>
        {/* 오늘 작성된 학습 기록 목록 히스토리 */}
        {state.studyLogs.length > 0 && (
          <div className={`pt-5 border-t ${t.divider} space-y-3`}>
            <p className={`text-[11px] font-black uppercase tracking-widest ${t.label}`}>오늘의 학습 기록 ({state.studyLogs.length}건)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {state.studyLogs.map(log => (
                <div key={log.id} className={`p-4 rounded-2xl ${t.sectionBg} flex items-center justify-between border ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div><p className="text-sm font-bold">{log.durationMin}분 학습 완료</p>{log.content && <p className={`text-xs mt-0.5 ${t.textMuted} line-clamp-1`}>{log.content}</p>}</div>
                  <CheckCircle size={18} className="text-indigo-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. AI 학습 제안 (Suggestions): 데이터 기반 맞춤형 코칭 가이드 */}
      <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card} space-y-6`}>
        <SectionHeading icon={<Brain size={24} />} title="AI 학습 제안" action={<button onClick={actions.handleRefreshStudySugg} disabled={state.isRefreshingSugg} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold text-xs transition-all active:scale-95 hover:bg-indigo-700">{state.isRefreshingSugg ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />} 새 제안 받기</button>} />
        <div className="space-y-4">
          {state.studySugg.map(s => {
            const style = STUDY_SUGG_STYLE[s.type];
            return (
              <div key={s.id} className={`p-5 rounded-3xl border ${style.border} flex items-start gap-4`}>
                <div className={`p-3 rounded-2xl border shrink-0 ${style.badge}`}>{style.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5"><span className="text-sm font-bold leading-tight">{s.title}</span>{!s.read && <span className="bg-indigo-600 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide shrink-0">NEW</span>}</div>
                  <p className={`text-xs font-medium leading-relaxed ${t.textMuted}`}>{s.body}</p>
                  <p className={`text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest`}>{s.time}</p>
                </div>
                <button onClick={() => actions.dismissSugg(s.id)} className={`${t.textMuted} hover:text-rose-400 transition-colors p-1 shrink-0`}><Trash2 size={16} /></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}