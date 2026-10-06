
export interface IntervalRow {
    label: string;
    hn: number | string;
    ph: number | string;
    ret: number | string;
    key: number | string;
    color: string;
    isHeader: boolean;
}

export interface Agent {
    id: string;
    name: string;
    state: string;
    duration: string;
    station: string;
    team: string;
    skill: string;
    role: 'HN' | 'PH' | 'Ret' | 'Key' | 'Unknown';
}

export interface StaffingCell {
    req: number;
    commit: number;
}

export interface StaffingRequirements {
    hn: Record<string, number>;
    ph: Record<string, number>;
    ret: Record<string, number>;
    key: Record<string, number>;
}

export interface StaffingCommitments {
    hn: Record<string, number>;
    ph: Record<string, number>;
    ret: Record<string, number>;
    key: Record<string, number>;
}

export type UserRole = 'wfm' | 'supervisor' | 'om';

export interface User {
    email: string;
    role: UserRole;
}

/** Estado de intervalos guardado en Firebase (ruta 'intervals') */
export type AppState = IntervalRow[];
