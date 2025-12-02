// Sistema de armazenamento local com sincronização
export interface StorageData {
  userProfile: any;
  workoutLogs: any[];
  bodyMetrics: any[];
  achievements: string[];
  communityPosts: any[];
  lastSync: string;
}

const STORAGE_KEY = 'gymflow_data';

export function saveData(key: keyof StorageData, data: any): void {
  try {
    const storage = getData();
    storage[key] = data;
    storage.lastSync = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
}

export function getData(): StorageData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
  
  return {
    userProfile: null,
    workoutLogs: [],
    bodyMetrics: [],
    achievements: [],
    communityPosts: [],
    lastSync: new Date().toISOString(),
  };
}

export function getDataByKey<K extends keyof StorageData>(key: K): StorageData[K] {
  const storage = getData();
  return storage[key];
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
