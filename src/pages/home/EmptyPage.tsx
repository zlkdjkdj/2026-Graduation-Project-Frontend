export function EmptyPage({ title }: { title: string }) {
  return (
    <div className="flex-grow flex items-center justify-center text-gray-400 animate-pulse text-lg font-medium">
      해당 모드({title})는 준비 중입니다.
    </div>
  );
}
