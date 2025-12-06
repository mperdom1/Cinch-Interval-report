import { StaffingRequirements, StaffingCommitments } from '../types';

// --- Helper to split Excel data more reliably ---
const splitExcelLine = (line: string): string[] => {
    // Try tab first (most common from Excel)
    if (line.includes('\t')) {
        return line.split('\t');
    }
    // Try comma (CSV format)
    if (line.includes(',')) {
        return line.split(',');
    }
    // Try multiple spaces (2 or more)
    if (/\s{2,}/.test(line)) {
        return line.split(/\s{2,}/);
    }
    // Fallback: single space
    return line.split(/\s+/);
};

/**
 * Gets the current day of week (0=Sunday, 6=Saturday) in EST timezone
 */
const getCurrentDayOfWeek = (): number => {
    const now = new Date();
    const estDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    return estDate.getDay();
};

/**
 * Parses staffing requirements from pasted spreadsheet data
 * Expected format: Interval | 1-Dec | 2-Dec | 3-Dec | 4-Dec | 5-Dec | 6-Dec | 7-Dec
 * Uses today's column based on current date
 */
export const parseStaffingRequirements = (rawData: string): StaffingRequirements => {
    const requirements: StaffingRequirements = {
        hn: {},
        ph: {},
        ret: {},
        key: {}
    };

    if (!rawData || !rawData.trim()) {
        return requirements;
    }

    const lines = rawData.trim().split('\n');
    let currentRole: 'hn' | 'ph' | 'ret' | 'key' | null = null;
    let headerLine: string[] = [];
    let dayColumnIndex = -1;

    for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Detect role section headers
        if (trimmedLine.toLowerCase().includes('hn cs requirement')) {
            currentRole = 'hn';
            dayColumnIndex = -1; // Reset for each section
            console.log('✅ Found HN CS Requirement section');
            continue;
        } else if (trimmedLine.toLowerCase().includes('ph cs requirement')) {
            currentRole = 'ph';
            dayColumnIndex = -1;
            console.log('✅ Found PH CS Requirement section');
            continue;
        } else if (trimmedLine.toLowerCase().includes('retention requirement')) {
            currentRole = 'ret';
            dayColumnIndex = -1;
            console.log('✅ Found Retention Requirement section');
            continue;
        } else if (trimmedLine.toLowerCase().includes('key client support requirement')) {
            currentRole = 'key';
            dayColumnIndex = -1;
            console.log('✅ Found Key Client Support Requirement section');
            continue;
        }

        if (!currentRole) continue;

        const cols = splitExcelLine(line).map(c => c.trim());
        
        // Detect header row with dates (Interval | 1-Dec | 2-Dec ...)
        if (trimmedLine.toLowerCase().includes('interval') && cols.length > 1) {
            headerLine = cols;
            // Find today's date column
            const today = new Date();
            const estDate = new Date(today.toLocaleString('en-US', { timeZone: 'America/New_York' }));
            const todayDate = estDate.getDate(); // 1-31
            const todayMonth = estDate.toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short' }); // "Dec"
            
            console.log(`🔍 [Requirements] Looking for date column: ${todayDate}-${todayMonth}`);
            console.log('📋 [Requirements] Available columns:', headerLine);
            
            // Look for column matching today's date (e.g., "6-Dec")
            for (let i = 1; i < headerLine.length; i++) {
                const col = headerLine[i].trim();
                // Match formats: "6-Dec", "06-Dec", "6-DEC", etc.
                const match = col.match(/(\d{1,2})[-\s]?(\w{3})/i);
                if (match) {
                    const colDay = parseInt(match[1]);
                    const colMonth = match[2];
                    if (colDay === todayDate && colMonth.toLowerCase() === todayMonth.toLowerCase()) {
                        dayColumnIndex = i;
                        console.log(`✅ [Requirements] Found matching column at index ${i}: "${col}"`);
                        break;
                    }
                }
            }
            
            if (dayColumnIndex === -1) {
                console.warn('⚠️ [Requirements] No matching date column found, using fallback');
                // Fallback: use first data column
                dayColumnIndex = 1;
            }
            continue;
        }

        // Skip empty lines
        if (!trimmedLine) continue;

        const interval = cols[0];
        
        // Parse time interval (e.g., "8:00 AM", "9:30 PM")
        if (interval && interval.includes(':')) {
            // Use today's column if found, otherwise use first data column
            const columnToUse = dayColumnIndex !== -1 && dayColumnIndex < cols.length ? dayColumnIndex : 1;
            const value = parseInt(cols[columnToUse]);
            
            console.log(`📝 [${currentRole}] Interval: "${interval}", Column: ${columnToUse}, Value: ${value}`);
            
            if (!isNaN(value)) {
                requirements[currentRole][interval] = value;
            }
        }
    }

    console.log('📊 [Requirements] Parsed data:', requirements);
    return requirements;
};

/**
 * Parses staffing commitments from pasted spreadsheet data
 * Uses today's column based on current date
 */
export const parseStaffingCommitments = (rawData: string): StaffingCommitments => {
    const commitments: StaffingCommitments = {
        hn: {},
        ph: {},
        ret: {},
        key: {}
    };

    if (!rawData || !rawData.trim()) {
        return commitments;
    }

    const lines = rawData.trim().split('\n');
    let currentRole: 'hn' | 'ph' | 'ret' | 'key' | null = null;
    let headerLine: string[] = [];
    let dayColumnIndex = -1;

    for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Detect role section headers
        if (trimmedLine.toLowerCase().includes('hn cs commitment')) {
            currentRole = 'hn';
            dayColumnIndex = -1;
            continue;
        } else if (trimmedLine.toLowerCase().includes('ph cs commitment')) {
            currentRole = 'ph';
            dayColumnIndex = -1;
            continue;
        } else if (trimmedLine.toLowerCase().includes('retention commitment')) {
            currentRole = 'ret';
            dayColumnIndex = -1;
            continue;
        } else if (trimmedLine.toLowerCase().includes('key client support commitment')) {
            currentRole = 'key';
            dayColumnIndex = -1;
            continue;
        }

        if (!currentRole) continue;

        const cols = splitExcelLine(line).map(c => c.trim());
        
        // Detect header row with dates
        if (trimmedLine.toLowerCase().includes('interval') && cols.length > 1) {
            headerLine = cols;
            const today = new Date();
            const estDate = new Date(today.toLocaleString('en-US', { timeZone: 'America/New_York' }));
            const todayDate = estDate.getDate();
            const todayMonth = estDate.toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short' });
            
            console.log(`🔍 [Commitments] Looking for date column: ${todayDate}-${todayMonth}`);
            console.log('📋 [Commitments] Available columns:', headerLine);
            
            for (let i = 1; i < headerLine.length; i++) {
                const col = headerLine[i].trim();
                const match = col.match(/(\d{1,2})[-\s]?(\w{3})/i);
                if (match) {
                    const colDay = parseInt(match[1]);
                    const colMonth = match[2];
                    if (colDay === todayDate && colMonth.toLowerCase() === todayMonth.toLowerCase()) {
                        dayColumnIndex = i;
                        console.log(`✅ [Commitments] Found matching column at index ${i}: "${col}"`);
                        break;
                    }
                }
            }
            
            if (dayColumnIndex === -1) {
                console.warn('⚠️ [Commitments] No matching date column found, using fallback');
                dayColumnIndex = 1;
            }
            continue;
        }

        if (!trimmedLine) continue;

        const interval = cols[0];
        
        if (interval && interval.includes(':')) {
            const columnToUse = dayColumnIndex !== -1 && dayColumnIndex < cols.length ? dayColumnIndex : 1;
            const value = parseInt(cols[columnToUse]);
            
            if (!isNaN(value)) {
                commitments[currentRole][interval] = value;
            }
        }
    }

    console.log('📊 [Commitments] Parsed data:', commitments);
    return commitments;
};

/**
 * Gets the current 30-minute interval time string
 * Returns format like "8:00 AM", "8:30 AM", etc.
 */
export const getCurrentInterval = (): string => {
    const now = new Date();
    
    // Get Time in America/New_York (EST/EDT)
    const estTimeString = now.toLocaleTimeString('en-US', { 
        timeZone: 'America/New_York', 
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
    });
    
    const [time, ampm] = estTimeString.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    
    // Round to nearest 30-minute interval
    const roundedMinute = minute >= 30 ? '30' : '00';
    
    return `${hour}:${roundedMinute} ${ampm}`;
};

/**
 * Gets requirements and commitments for the current interval
 */
export const getIntervalStaffing = (
    requirements: StaffingRequirements,
    commitments: StaffingCommitments,
    interval: string
): { required: { hn: number; ph: number; ret: number; key: number }; committed: { hn: number; ph: number; ret: number; key: number } } => {
    return {
        required: {
            hn: requirements.hn[interval] || 0,
            ph: requirements.ph[interval] || 0,
            ret: requirements.ret[interval] || 0,
            key: requirements.key[interval] || 0
        },
        committed: {
            hn: commitments.hn[interval] || 0,
            ph: commitments.ph[interval] || 0,
            ret: commitments.ret[interval] || 0,
            key: commitments.key[interval] || 0
        }
    };
};
