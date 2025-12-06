
import { User, UserRole } from '../types';

const USERS_DB_KEY = 'cinch_users_db';

interface AuthResponse {
    success: boolean;
    user?: User;
    error?: string;
}

export const login = (email: string, passwordRole: string): AuthResponse => {
    // 1. Validate Email Domain
    if (!email.toLowerCase().endsWith('@cinchhs.com')) {
        return { success: false, error: 'Access restricted to @cinchhs.com emails.' };
    }

    // 2. Validate Password is a valid Role
    const inputRole = passwordRole.toLowerCase();
    const validRoles: UserRole[] = ['wfm', 'supervisor', 'om'];
    
    if (!validRoles.includes(inputRole as UserRole)) {
        return { success: false, error: 'Invalid password. Password must be your role (wfm, supervisor, or om).' };
    }

    // 3. Backend Logic (Simulated with LocalStorage)
    const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
    const existingRole = db[email.toLowerCase()];

    if (existingRole) {
        // Logic: If user exists, they must match the stored role.
        // Exception: WFM users can sign in as other roles (or if the stored role is WFM).
        if (existingRole !== 'wfm' && existingRole !== inputRole) {
             return { 
                 success: false, 
                 error: `Security Alert: This email is registered as '${existingRole.toUpperCase()}'. You cannot sign in as '${inputRole.toUpperCase()}'.` 
             };
        }
    } else {
        // Register new user
        db[email.toLowerCase()] = inputRole;
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
    }

    return {
        success: true,
        user: {
            email: email.toLowerCase(),
            role: inputRole as UserRole
        }
    };
};

export const logout = () => {
    // Clear session if we were storing token, but for now state is in App
};
