type VideoData = {
  id: string;
  title: string;
  videoId: string;
};

type FitnessVideosProps = {
  selectedParts: string[];
};

// 운동 부위별 유튜브 영상 데이터 (실제 한국어 운동 영상들)
const videoDatabase: Record<string, VideoData[]> = {
  '가슴': [
    { id: '1', title: '집에서 하는 가슴 운동 루틴', videoId: 'QsYre4CF_0Y' },
    { id: '2', title: '완벽한 푸시업 자세', videoId: 'IODxDxX7oi4' },
    { id: '3', title: '덤벨 가슴 운동 5가지', videoId: 'vxG4bJW5YQs' },
  ],
  '등': [
    { id: '4', title: '등 근육 키우는 운동', videoId: 'eE7ZrXrMxvA' },
    { id: '5', title: '광배근 운동 루틴', videoId: '4Y2ZdHCOXok' },
    { id: '6', title: '집에서 하는 등 운동', videoId: 'mSx_Au4c_sQ' },
  ],
  '어깨': [
    { id: '7', title: '어깨 넓어지는 운동', videoId: 'qEwKCR5JCog' },
    { id: '8', title: '3D 어깨 만들기', videoId: 'q5sNYB1Q6aM' },
    { id: '9', title: '덤벨 어깨 운동', videoId: 'ge4L1CfKJWw' },
  ],
  '팔': [
    { id: '10', title: '팔 근육 키우기', videoId: '8Pq8lNwLdao' },
    { id: '11', title: '이두 삼두 운동', videoId: 'sAq_ocpRh_I' },
    { id: '12', title: '굵은 팔 만들기', videoId: 'EV96fzr2IrY' },
  ],
  '다리': [
    { id: '13', title: '하체 운동 루틴', videoId: '9zJeNYFKwCA' },
    { id: '14', title: '스쿼트 정석', videoId: 'ultWZbUMPL8' },
    { id: '15', title: '집에서 하는 하체 운동', videoId: 'WxQdYdO2FeE' },
  ],
  '복근': [
    { id: '16', title: '11자 복근 만들기', videoId: 'PWmEAvia6N8' },
    { id: '17', title: '복근 운동 루틴', videoId: '7b3NO7FOeP8' },
    { id: '18', title: '서서 하는 복근 운동', videoId: '54yz5bhomPI' },
  ],
};

export function FitnessVideos({ selectedParts }: FitnessVideosProps) {
  // 선택된 부위가 없으면 기본 영상 표시
  const defaultVideos: VideoData[] = [
    { id: 'default1', title: '초보자를 위한 전신 운동', videoId: '3HH92OKk-1E' },
    { id: 'default2', title: '홈트레이닝 루틴', videoId: '50kH47ZztHs' },
    { id: 'default3', title: '스트레칭 가이드', videoId: 'g_tea8ZNk5A' },
  ];

  // 선택된 부위에 따른 영상 수집
  const getVideosForSelectedParts = (): VideoData[] => {
    if (selectedParts.length === 0) {
      return defaultVideos;
    }

    const videos: VideoData[] = [];
    selectedParts.forEach(part => {
      if (videoDatabase[part]) {
        videos.push(...videoDatabase[part]);
      }
    });

    return videos.length > 0 ? videos : defaultVideos;
  };

  const displayVideos = getVideosForSelectedParts();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {selectedParts.length > 0 
          ? `${selectedParts.join(', ')} 운동 추천 영상` 
          : '추천 운동 영상'}
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayVideos.map((video) => (
          <div key={video.id} className="group">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <h4 className="mt-2 text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
              {video.title}
            </h4>
          </div>
        ))}
      </div>

      {selectedParts.length === 0 && (
        <div className="mt-4 p-4 bg-purple-50 rounded-xl">
          <p className="text-sm text-purple-900 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            위에서 운동 부위를 선택하면 맞춤 영상이 표시됩니다
          </p>
        </div>
      )}
    </div>
  );
}
