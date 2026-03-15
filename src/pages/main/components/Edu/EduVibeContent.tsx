import { StudyMaterialUpload } from './StudyMaterialUpload';
import { AiSuggestions } from '../../../../components/section/AI/AiSuggestions';

export function EduVibeContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 text-white font-bold">EDU</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edu Vibe</h2>
          <p className="text-gray-500">AI 기반 학습 계획 및 진도 관리</p>
        </div>
      </div>
      <StudyMaterialUpload />
      <AiSuggestions />
    </div>
  );
}