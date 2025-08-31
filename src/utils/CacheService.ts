// src/utils/CacheService.ts
export const getCache = (key: string, duration: number) => {
  const cache = localStorage.getItem(key);
  if (!cache) return null;

  const parsed = JSON.parse(cache);
  if (new Date().getTime() - parsed.timestamp > duration) return null;

  return parsed.data;
};

export const setCache = (key: string, data: any) => {
  localStorage.setItem(
    key,
    JSON.stringify({ timestamp: new Date().getTime(), data })
  );
};
