/// <reference types="vite/client" />
// src/vite-env.d.ts

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string;
 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}