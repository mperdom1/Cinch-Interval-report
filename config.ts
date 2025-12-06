/**
 * Theme Colors for CINCH Branding
 */
export const COLORS = {
  // Primary Cinch Green
  primary: {
    dark: '#058623',      // Dark Green - Headers, important stats
    medium: '#5CCC69',    // Medium Green - Buttons, highlights
    light: '#73FF83',     // Light Green - Backgrounds, subtle highlights
  },
  
  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Neutral Colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
} as const;

/**
 * Cinch Logo SVG Icon Component Props
 */
export const CINCH_ICON_SVG = {
  viewBox: "0 0 24 24",
  path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
} as const;

/**
 * Alert Thresholds (in minutes)
 */
export const ALERT_THRESHOLDS = {
  BREAK_CRITICAL: 15,  // Break exceeding 15 minutes
  ACW_WARNING: 5,      // ACW exceeding 5 minutes
  MEETING_WARNING: 30, // Meeting exceeding 30 minutes
} as const;

/**
 * Storage Keys for LocalStorage
 */
export const STORAGE_KEYS = {
  ROSTER_DATA: 'wfm_roster_data',
  ROSTER_DATE: 'wfm_roster_date',
  USERS_DB: 'cinch_users_db',
} as const;

/**
 * Valid email domain for authentication
 */
export const VALID_EMAIL_DOMAIN = '@cinchhs.com';

/**
 * Default interval duration in minutes
 */
export const INTERVAL_DURATION_MINUTES = 30;
