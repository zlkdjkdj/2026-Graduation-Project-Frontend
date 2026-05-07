import {
  TrainingSessionBox, ExerciseGuideBox, DietBox,
  AiExerciseGuideBox, BodyCompositionBox, ExerciseDashboardBox,
} from '../../components/section/exercise';

export function ExercisePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tightest mb-2 border-l-8 border-rose-600 pl-6">운동 랩</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium ml-2">정밀한 데이터를 통해 당신의 신체적 한계를 돌파하세요.</p>
      </header>

      <div className="bento-grid">
        <div className="col-span-12 lg:col-span-12">
          <ExerciseDashboardBox />
        </div>
        
        <div className="col-span-12 lg:col-span-8">
          <ExerciseGuideBox />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <TrainingSessionBox />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <DietBox />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <AiExerciseGuideBox />
        </div>

        <div className="col-span-12 md:col-span-12 lg:col-span-4">
          <BodyCompositionBox />
        </div>
      </div>
    </div>
  );
}
