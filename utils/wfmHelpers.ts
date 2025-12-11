import { Agent, IntervalRow } from '../types';
import { STATE_MAPPING, MOCK_INTERVAL_DATA } from '../constants';

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

// --- Name Matching Helpers ---

// Generates a consistent key for a name by:
// 1. Lowercasing
// 2. Removing punctuation (commas, etc)
// 3. Sorting words alphabetically (so "Doe, John" == "John Doe")
const generateNameKey = (name: string): string => {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ') // Replace punctuation with space
        .trim()
        .split(/\s+/) // Split by whitespace
        .sort() // Sort parts alphabetically
        .join(' '); // Rejoin
};

// Helper to deduce role from a string (Team, Skill, or explicit Role column)
const getRoleFromContext = (...contexts: string[]): 'HN' | 'PH' | 'Ret' | 'Key' | null => {
    for (const str of contexts) {
        if (!str) continue;
        const s = str.toLowerCase();
        
        // Priority Keywords matching the specific user file (LOB column)
        if (s.includes('key client') || s.includes('key support')) return 'Key';
        if (s.includes('retention')) return 'Ret';
        if (s.includes('csr hn')) return 'HN';
        if (s.includes('csr ph')) return 'PH';

        // General fallback keywords
        if (s.includes('key') || s.includes('bob')) return 'Key';
        if (s.includes('ret')) return 'Ret';
        if (s.includes('hn') || s.includes('sears')) return 'HN';
        if (s.includes('ph')) return 'PH';
    }
    return null;
};

// Default fallback logic if Roster lookup fails
const getAgentRoleFallback = (team: string, skill: string): 'HN' | 'PH' | 'Ret' | 'Key' => {
    return getRoleFromContext(team, skill) || 'PH';
};

// --- Parsers ---

/**
 * Parses roster data from a tab-separated format.
 * @param rawData - The raw data string to parse
 * @returns A mapping of normalized names to their roles
 * @throws Error if the input data is invalid or empty
 */
export const parseRosterData = (rawData: string): Record<string, 'HN' | 'PH' | 'Ret' | 'Key'> => {
    if (!rawData || typeof rawData !== 'string') {
        throw new Error('Invalid roster data: Input must be a non-empty string');
    }

    const lines = rawData.trim().split('\n');
    if (lines.length === 0) {
        throw new Error('Invalid roster data: No data lines found');
    }

    const roster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'> = {};

    let headerFound = false;
    let cxNameIdx = -1;
    let fullNameIdx = -1;
    let lobIdx = -1;

    let cxoneIdIdx = -1;

    // 1. Detect Header Row to identify columns
    if (lines.length > 0) {
        const header = splitExcelLine(lines[0].toLowerCase());
        cxNameIdx = header.findIndex(h => h.includes('cx name'));
        fullNameIdx = header.findIndex(h => h.includes('full name'));
        lobIdx = header.findIndex(h => h.includes('lob') || h.includes('line of business'));
        cxoneIdIdx = header.findIndex(h => h.includes('cxone id') || h.includes('cx id'));
        
        if (lobIdx !== -1) {
            headerFound = true;
        }
    }

    // 2. If no explicit header, assume structure from user screenshot if applicable
    // Image format: Short Name | Full Name | CX Name | IEX ID | Cxone ID | LOB
    // CXone ID is typically index 4, LOB is index 5, CX Name index 2.
    if (!headerFound) {
        const firstDataRow = splitExcelLine(lines[0]);
        // Check if index 5 looks like an LOB
        if (firstDataRow.length >= 6) {
            const col5 = firstDataRow[5].toLowerCase();
            if (col5.includes('csr') || col5.includes('retention') || col5.includes('key')) {
                lobIdx = 5;
                cxoneIdIdx = 4; // "Cxone ID"
                cxNameIdx = 2; // "CX Name" usually best for "Last, First" matching
                fullNameIdx = 1;
            }
        }
    }

    const startIdx = headerFound ? 1 : 0;

    for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const cols = splitExcelLine(line).map(c => c.trim());
        
        let name = '';
        let roleStr = '';

        if (lobIdx !== -1 && cols[lobIdx]) {
            // We have identified columns
            roleStr = cols[lobIdx];
            
            // Prefer CX Name (Last, First), then Full Name, then Col 0
            if (cxNameIdx !== -1 && cols[cxNameIdx]) name = cols[cxNameIdx];
            else if (fullNameIdx !== -1 && cols[fullNameIdx]) name = cols[fullNameIdx];
            else name = cols[0];
        } else {
            // Fallback: Scan row for known LOB values
            for (const col of cols) {
                const c = col.toLowerCase();
                // Check against specific LOB values from user file
                if (c === 'csr hn' || c === 'csr ph' || c === 'retention' || c.includes('key client')) {
                    roleStr = c;
                    break;
                }
            }
            // If scanning, assume name is first non-numeric long column
            if (!name) {
                for (let j = 0; j < Math.min(cols.length, 3); j++) {
                     if (cols[j].length > 3 && !/^\d+$/.test(cols[j])) {
                         name = cols[j];
                         break;
                     }
                }
            }
        }

        if (roleStr) {
            const role = getRoleFromContext(roleStr);
            if (role) {
                // Priority 1: Use CXone ID if available (most reliable)
                if (cxoneIdIdx !== -1 && cols[cxoneIdIdx]) {
                    const cxoneId = cols[cxoneIdIdx].trim();
                    if (cxoneId && cxoneId.length > 0) {
                        roster[cxoneId] = role;
                        // Also store by name as fallback
                        if (name) {
                            const nameKey = generateNameKey(name);
                            roster[nameKey] = role;
                        }
                        continue;
                    }
                }
                
                // Fallback: Use name-based key
                if (name) {
                    const key = generateNameKey(name);
                    roster[key] = role;
                }
            }
        }
    }
    return roster;
};

/**
 * Parses agent data from a tab-separated format.
 * @param rawData - The raw agent data string
 * @param roster - Optional roster mapping for role assignment
 * @returns Array of parsed agents
 * @throws Error if the input data is invalid
 */
export const parseAgentData = (rawData: string, roster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'> = {}): Agent[] => {
    if (!rawData || typeof rawData !== 'string') {
        throw new Error('Invalid agent data: Input must be a non-empty string');
    }

    const lines = rawData.trim().split('\n');
    if (lines.length === 0) {
        throw new Error('Invalid agent data: No data lines found');
    }

    const agents: Agent[] = [];

    // Detect header row to skip it
    const startIdx = lines[0]?.toLowerCase().includes('agent') ? 1 : 0;

    for (let i = startIdx; i < lines.length; i++) {
        const cols = splitExcelLine(lines[i]).map(c => c.trim());
        if (cols.length < 3) continue; // Skip invalid lines

        // Mapping columns based on real-time report:
        // 0: Agent ID (CXone ID), 1: Name, 2: State, 3: Duration, 4: Station, 5: Team, 6: Skill
        const id = cols[0]?.trim();
        const name = cols[1]?.trim();
        const state = cols[2]?.trim();
        const duration = cols[3]?.trim();
        const station = cols[4]?.trim();
        const team = cols[5]?.trim();
        const skill = cols[6]?.trim();

        if (id && name) {
            // 1. Try matching by CXone ID (Agent ID) first - most reliable
            let role = roster[id];

            // 2. Fallback: Try normalized name match
            if (!role) {
                const nameKey = generateNameKey(name);
                role = roster[nameKey];
            }

            // 3. Final fallback: Guess from Team/Skill in the report
            if (!role) {
                role = getAgentRoleFallback(team, skill);
            }

            agents.push({
                id,
                name,
                state,
                duration,
                station,
                team,
                skill,
                role
            });
        }
    }
    return agents;
};

/**
 * Calculates interval statistics from agent data.
 * @param agents - Array of agents to calculate statistics from
 * @param required - Required staffing levels for each role
 * @param committed - Committed staffing levels for each role
 * @returns Array of interval rows with calculated statistics
 */
export const calculateIntervalStats = (
    agents: Agent[], 
    required = { hn: 0, ph: 0, ret: 0, key: 0 },
    committed = { hn: 0, ph: 0, ret: 0, key: 0 }
): IntervalRow[] => {
    if (!Array.isArray(agents)) {
        console.error('Invalid agents data: Expected array, got', typeof agents);
        return JSON.parse(JSON.stringify(MOCK_INTERVAL_DATA));
    }

    // Clone the template structure
    const stats = JSON.parse(JSON.stringify(MOCK_INTERVAL_DATA));

    // Initialize counts
    const counts = {
        HN: { 
            total: 0, avail: 0, aux: 0, break: 0, meal: 0, meeting: 0, coaching: 0, training: 0, acw: 0,
            offPhone: 0, unscheduledBreak: 0, systemIssue: 0, mentoring: 0, acwOutbound: 0
        },
        PH: { 
            total: 0, avail: 0, aux: 0, break: 0, meal: 0, meeting: 0, coaching: 0, training: 0, acw: 0,
            offPhone: 0, unscheduledBreak: 0, systemIssue: 0, mentoring: 0, acwOutbound: 0
        },
        Ret: { 
            total: 0, avail: 0, aux: 0, break: 0, meal: 0, meeting: 0, coaching: 0, training: 0, acw: 0,
            offPhone: 0, unscheduledBreak: 0, systemIssue: 0, mentoring: 0, acwOutbound: 0
        },
        Key: { 
            total: 0, avail: 0, aux: 0, break: 0, meal: 0, meeting: 0, coaching: 0, training: 0, acw: 0,
            offPhone: 0, unscheduledBreak: 0, systemIssue: 0, mentoring: 0, acwOutbound: 0
        }
    };

    agents.forEach(agent => {
        const role = agent.role as keyof typeof counts;
        const mapping = STATE_MAPPING[agent.state];
        
        // Safety check if role is somehow invalid
        if (!counts[role]) return;

        // Count Total Active (Everyone logged in)
        counts[role].total++;

        if (!mapping) {
            // Default bucket if unknown state
            counts[role].aux++; 
            return;
        }

        // Categorize
        if (mapping.code === 'Available') {
            counts[role].avail++;
        } else if (mapping.type === 'Off Queue') {
            counts[role].aux++;
            // Sub-categories (solo suma 1 por estado)
            if (mapping.code === 'Break') counts[role].break++;
            if (mapping.code === 'Meeting') counts[role].meeting++;
            if (mapping.code === 'Coaching') counts[role].coaching++;
            if (mapping.code === 'Training') counts[role].training++;
            if (mapping.code === 'ACW_Outbound') counts[role].acwOutbound++;
            if (mapping.code === 'Off Phone') counts[role].offPhone++;
            if (mapping.code === 'Unscheduled break') counts[role].unscheduledBreak++;
            if (mapping.code === 'System Issue') counts[role].systemIssue++;
            if (mapping.code === 'Mentoring') counts[role].mentoring++;
        }
    });

    // Update the rows in the stats array by matching the label
    stats.forEach((row: any) => {
        const cat = row.label;
        
        if (cat === 'Total Active') {
            row.hn = counts.HN.total; row.ph = counts.PH.total; row.ret = counts.Ret.total; row.key = counts.Key.total;
        }
        // Total Offlines = suma de todos los estados Off Queue (AUX)
        if (cat === 'Total Offlines') {
            row.hn = counts.HN.aux;
            row.ph = counts.PH.aux;
            row.ret = counts.Ret.aux;
            row.key = counts.Key.aux;
        }
        if (cat === 'Avail Status') {
            // Contar solo agentes con estado 'Available' y LOB correspondiente
            row.hn = agents.filter(a => a.state === 'Available' && (a.role === 'HN' || (a.lob && a.lob.toLowerCase().includes('hn')))).length;
            row.ph = agents.filter(a => a.state === 'Available' && (a.role === 'PH' || (a.lob && a.lob.toLowerCase().includes('ph')))).length;
            row.ret = agents.filter(a => a.state === 'Available' && (a.role === 'Ret' || (a.lob && a.lob.toLowerCase().includes('ret')))).length;
            row.key = agents.filter(a => a.state === 'Available' && (a.role === 'Key' || (a.lob && a.lob.toLowerCase().includes('key')))).length;
        }
        if (cat === 'AUX') {
            // AUX = Total Offlines + Break + Meal (usando los valores ya calculados en las filas)
            const totalOfflinesRow = stats.find(r => r.label === 'Total Offlines');
            const breakRow = stats.find(r => r.label === 'Break');
            const mealRow = stats.find(r => r.label === 'Meal');
            row.hn = (totalOfflinesRow?.hn || 0) + (breakRow?.hn || 0) + (mealRow?.hn || 0);
            row.ph = (totalOfflinesRow?.ph || 0) + (breakRow?.ph || 0) + (mealRow?.ph || 0);
            row.ret = (totalOfflinesRow?.ret || 0) + (breakRow?.ret || 0) + (mealRow?.ret || 0);
            row.key = (totalOfflinesRow?.key || 0) + (breakRow?.key || 0) + (mealRow?.key || 0);
        }
        if (cat === 'Break') {
            row.hn = counts.HN.break; row.ph = counts.PH.break; row.ret = counts.Ret.break; row.key = counts.Key.break;
        }
        if (cat === 'Meeting') {
            row.hn = counts.HN.meeting; row.ph = counts.PH.meeting; row.ret = counts.Ret.meeting; row.key = counts.Key.meeting;
        }
        if (cat === 'Coaching') {
            row.hn = counts.HN.coaching; row.ph = counts.PH.coaching; row.ret = counts.Ret.coaching; row.key = counts.Key.coaching;
        }
        if (cat === 'Training') {
            row.hn = counts.HN.training; row.ph = counts.PH.training; row.ret = counts.Ret.training; row.key = counts.Key.training;
        }
        // "Actual" ahora es Total Active - Total Offlines
        if (cat === 'Actual') {
              // Actual = Total Active - AUX
              const auxRow = stats.find(r => r.label === 'AUX');
              row.hn = counts.HN.total - (auxRow?.hn || 0);
              row.ph = counts.PH.total - (auxRow?.ph || 0);
              row.ret = counts.Ret.total - (auxRow?.ret || 0);
              row.key = counts.Key.total - (auxRow?.key || 0);
        }
        // HC Required - from staffing data
        if (cat === 'HC Required') {
            row.hn = required.hn;
            row.ph = required.ph;
            row.ret = required.ret;
            row.key = required.key;
        }
        // Commits - from staffing data
        if (cat === 'Commits') {
            row.hn = committed.hn;
            row.ph = committed.ph;
            row.ret = committed.ret;
            row.key = committed.key;
        }
        // Calculate attainment percentages
        if (cat === 'Actual vs Required Attainment') {
            const actual = { hn: counts.HN.total - counts.HN.break, ph: counts.PH.total - counts.PH.break, ret: counts.Ret.total - counts.Ret.break, key: counts.Key.total - counts.Key.break };
            row.hn = required.hn > 0 ? Math.round((actual.hn / required.hn) * 100) + '%' : (actual.hn > 0 ? '100%' : '0%');
            row.ph = required.ph > 0 ? Math.round((actual.ph / required.ph) * 100) + '%' : (actual.ph > 0 ? '100%' : '0%');
            row.ret = required.ret > 0 ? Math.round((actual.ret / required.ret) * 100) + '%' : (actual.ret > 0 ? '100%' : '0%');
            row.key = required.key > 0 ? Math.round((actual.key / required.key) * 100) + '%' : (actual.key > 0 ? '100%' : '0%');
        }
        if (cat === 'Actual vs Committed Attainment') {
            const actual = { hn: counts.HN.total - counts.HN.break, ph: counts.PH.total - counts.PH.break, ret: counts.Ret.total - counts.Ret.break, key: counts.Key.total - counts.Key.break };
            row.hn = committed.hn > 0 ? Math.round((actual.hn / committed.hn) * 100) + '%' : (actual.hn > 0 ? '100%' : '0%');
            row.ph = committed.ph > 0 ? Math.round((actual.ph / committed.ph) * 100) + '%' : (actual.ph > 0 ? '100%' : '0%');
            row.ret = committed.ret > 0 ? Math.round((actual.ret / committed.ret) * 100) + '%' : (actual.ret > 0 ? '100%' : '0%');
            row.key = committed.key > 0 ? Math.round((actual.key / committed.key) * 100) + '%' : (actual.key > 0 ? '100%' : '0%');
        }
        
        // FTE Calculations
        // Formula from Excel: =IF(K7>K8, K7-(K8*98%), (K8*98%)-K7)
        // K7 = Actual (Total Active - Break), K8 = HC Required
        if (cat === 'FTE before 98%') {
            const actual = { hn: counts.HN.total - counts.HN.break, ph: counts.PH.total - counts.PH.break, ret: counts.Ret.total - counts.Ret.break, key: counts.Key.total - counts.Key.break };
            const target98 = { hn: required.hn * 0.98, ph: required.ph * 0.98, ret: required.ret * 0.98, key: required.key * 0.98 };
            
            row.hn = required.hn > 0 ? Math.round(Math.abs(actual.hn - target98.hn)) : 0;
            row.ph = required.ph > 0 ? Math.round(Math.abs(actual.ph - target98.ph)) : 0;
            row.ret = required.ret > 0 ? Math.round(Math.abs(actual.ret - target98.ret)) : 0;
            row.key = required.key > 0 ? Math.round(Math.abs(actual.key - target98.key)) : 0;
        }
        
        // +/- FTE before 100%: Difference between Actual and Required
        if (cat === '+/- FTE before 100%') {
            const actual = { hn: counts.HN.total - counts.HN.break, ph: counts.PH.total - counts.PH.break, ret: counts.Ret.total - counts.Ret.break, key: counts.Key.total - counts.Key.break };
            
            row.hn = required.hn > 0 ? actual.hn - required.hn : 0;
            row.ph = required.ph > 0 ? actual.ph - required.ph : 0;
            row.ret = required.ret > 0 ? actual.ret - required.ret : 0;
            row.key = required.key > 0 ? actual.key - required.key : 0;
        }
        
        // +/- FTE before 110%: Difference between Actual and 110% of Required
        if (cat === '+/- FTE before 110%') {
            const actual = { hn: counts.HN.total - counts.HN.break, ph: counts.PH.total - counts.PH.break, ret: counts.Ret.total - counts.Ret.break, key: counts.Key.total - counts.Key.break };
            const target110 = { hn: required.hn * 1.10, ph: required.ph * 1.10, ret: required.ret * 1.10, key: required.key * 1.10 };
            
            row.hn = required.hn > 0 ? Math.round(actual.hn - target110.hn) : 0;
            row.ph = required.ph > 0 ? Math.round(actual.ph - target110.ph) : 0;
            row.ret = required.ret > 0 ? Math.round(actual.ret - target110.ret) : 0;
            row.key = required.key > 0 ? Math.round(actual.key - target110.key) : 0;
        }
        
        // Specific state counts
        if (cat === 'ACW_Outbound') {
            row.hn = counts.HN.acwOutbound;
            row.ph = counts.PH.acwOutbound;
            row.ret = counts.Ret.acwOutbound;
            row.key = counts.Key.acwOutbound;
        }
        if (cat === 'Off Phone') {
            row.hn = counts.HN.offPhone;
            row.ph = counts.PH.offPhone;
            row.ret = counts.Ret.offPhone;
            row.key = counts.Key.offPhone;
        }
        if (cat === 'Unscheduled Break') {
            row.hn = counts.HN.unscheduledBreak;
            row.ph = counts.PH.unscheduledBreak;
            row.ret = counts.Ret.unscheduledBreak;
            row.key = counts.Key.unscheduledBreak;
        }
        if (cat === 'System Issue') {
            row.hn = counts.HN.systemIssue;
            row.ph = counts.PH.systemIssue;
            row.ret = counts.Ret.systemIssue;
            row.key = counts.Key.systemIssue;
        }
        if (cat === 'Mentoring') {
            row.hn = counts.HN.mentoring;
            row.ph = counts.PH.mentoring;
            row.ret = counts.Ret.mentoring;
            row.key = counts.Key.mentoring;
        }
        // Total Offlines = sum of all offline states (no Total Active)
        if (cat === 'Total Offlines') {
            row.hn = counts.HN.aux;
            row.ph = counts.PH.aux;
            row.ret = counts.Ret.aux;
            row.key = counts.Key.aux;
        }
    });

    return stats;
};
