
import { User, UserRole } from '../types';

const USERS_DB_KEY = 'cinch_users_db';

// Admin emails that can always change roles
const ADMIN_EMAILS = ['stgonzales@cinchhs.com', 'mperdomo@cinchhs.com'];

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

    const emailLower = email.toLowerCase();
    const isAdmin = ADMIN_EMAILS.includes(emailLower);

    // 3. Backend Logic (Simulated with LocalStorage)
    const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
    const existingRole = db[emailLower];

    if (existingRole) {
        // Admins can always change roles
        if (isAdmin) {
            // Update role in database for admin
            db[emailLower] = inputRole;
            localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
        } else {
            // Regular users: role is locked forever
            if (existingRole !== inputRole) {
                return { 
                    success: false, 
                    error: `Your account is registered as '${existingRole.toUpperCase()}'. This role cannot be changed. Please sign in with role: ${existingRole}` 
                };
            }
        }
    } else {
        // Register new user with their chosen role (locked forever unless admin)
        db[emailLower] = inputRole;
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
    }

    return {
        success: true,
        user: {
            email: emailLower,
            role: inputRole as UserRole
        }
    };
};

export const logout = () => {
    // Clear session if we were storing token, but for now state is in App
};
