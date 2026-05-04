import {
  ExerciseRecordBox, ExerciseGuideBox, DietBox,
  AiExerciseGuideBox, ExerciseDiaryBox, BodyCompositionBox, ExerciseDashboardBox
} from '../../components/section/exercise/ExerciseSection';

export function ExercisePage() {
  return (
    <div className="flex flex-col gap-6 flex-grow animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-0">
        <div className="flex flex-col gap-6 h-full">
          <ExerciseRecordBox />
          <BodyCompositionBox />
          <ExerciseGuideBox />
        </div>
        <div className="flex flex-col gap-6 h-full">
          <DietBox />
          <AiExerciseGuideBox />
        </div>
      </div>
      <div className="flex-grow flex flex-col min-h-[200px]">
        <ExerciseDiaryBox />
      </div>
      <ExerciseDashboardBox />
    </div>
  );
}
