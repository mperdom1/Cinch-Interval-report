// Utilidades para persistencia local y exportación/importación de datos en el dashboard
import { Agent } from "../types";

const STORAGE_KEY = 'intervalStaffingData';
const HEADCOUNT_KEY = 'intervalStaffingHeadcount';

export interface IntervalAppState {
  agents: Agent[];
  rawReport: string;
  rawHeadcount: string;
  timestamp: string;
}

// Guardar estado en localStorage
export const saveLocalState = (data: IntervalAppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Local Storage Error:", e);
  }
};

// Cargar estado desde localStorage
export const loadLocalState = (): IntervalAppState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Local Storage Error:", e);
    return null;
  }
};

// Guardar headcount personalizado
export const saveHeadcountLocal = (headcount: string) => {
  try {
    localStorage.setItem(HEADCOUNT_KEY, headcount);
  } catch (e) {
    console.error("Headcount Storage Error:", e);
  }
};

// Cargar headcount (local o hardcodeado)
export const loadHeadcountLocal = (HARDCODED_HEADCOUNT: string): string => {
  try {
    const local = localStorage.getItem(HEADCOUNT_KEY);
    if (local && local.trim().length > 0) return local;
    return HARDCODED_HEADCOUNT.trim();
  } catch (e) {
    return HARDCODED_HEADCOUNT.trim();
  }
};

// Exportar datos a JSON
export const exportIntervalData = (data: IntervalAppState, filename: string = 'interval-staffing-data.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Importar datos desde JSON
export const importIntervalData = async (file: File): Promise<IntervalAppState> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const parsed = JSON.parse(result);
        if (!parsed.agents && !parsed.rawReport) {
          throw new Error("Invalid file format");
        }
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};
