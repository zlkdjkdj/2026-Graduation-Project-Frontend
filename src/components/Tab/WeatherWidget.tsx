import { Sun, Cloud, CloudRain, Snowflake, CloudLightning } from 'lucide-react';

interface WeatherWidgetProps {
  weather: {
    temp: number;
    desc: string;
    icon: string;
  };
  isDark: boolean;
  theme: {
    card: string;
  };
}

export function WeatherWidget({ weather, isDark, theme }: WeatherWidgetProps) {
  // 날씨 상태에 따른 아이콘 매칭 함수
  const getWeatherIcon = (desc: string) => {
    switch (desc.toLowerCase()) {
      case 'clouds': return <Cloud size={100} />;
      case 'rain': return <CloudRain size={100} />;
      case 'snow': return <Snowflake size={100} />;
      case 'thunderstorm': return <CloudLightning size={100} />;
      default: return <Sun size={100} />;
    }
  };

  return (
    <div className={`${theme.card} p-10 rounded-[3.5rem] border shadow-2xl text-center relative overflow-hidden transition-all duration-500`}>
      <div className="text-yellow-400 mb-6 flex justify-center drop-shadow-[0_0_25px_rgba(253,224,71,0.4)]">
        {getWeatherIcon(weather.desc)}
      </div>
      <div className={`text-7xl font-light tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        {weather.temp}°
      </div>
      <p className="text-lg font-medium opacity-40 uppercase tracking-[0.2em]">
        {weather.desc}
      </p>
    </div>
  );
}