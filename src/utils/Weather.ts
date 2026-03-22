import { useState, useEffect } from 'react';

// 역할: 날씨 API 호출 제한 및 로컬 캐싱 관리 | 구성: 시간 비교 로직, 데이터 보존 기간 설정

const CACHE_KEY = 'learn_time_weather';
const CACHE_DURATION = 30 * 60 * 1000; // 30분 (밀리초 단위)

export const useWeather = () => {
  const [weather, setWeather] = useState({ temp: 0, desc: 'Loading...', icon: 'Sun' });

  useEffect(() => {
    const fetchWeather = async () => {
      // 1. 기존에 저장된 데이터 확인
      const cachedData = localStorage.getItem(CACHE_KEY);
      const now = new Date().getTime();

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // 저장된 지 30분이 지나지 않았다면 저장된 데이터 사용
        if (now - timestamp < CACHE_DURATION) {
          setWeather(data);
          return;
        }
      }

      // 2. 캐시가 없거나 만료된 경우에만 API 호출
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        
        const weatherInfo = {
          temp: Math.round(data.main.temp),
          desc: data.weather[0].main,
          icon: data.weather[0].main
        };

        // 3. 새로운 데이터와 현재 시간 저장
        const cacheObj = { data: weatherInfo, timestamp: now };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
        
        setWeather(weatherInfo);
      } catch (e) {
        console.error("Weather Fetch Error:", e);
      }
    };

    fetchWeather();
  }, []);

  return { weather };
};