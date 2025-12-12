import React, { useState, useCallback } from 'react';
import FileDropZone from './FileDropZone';
import { Agent, StaffingRequirements, StaffingCommitments } from '../types';
import {
    parseAgentData,
    parseRosterData,
    readWorkbookData
} from '../utils/wfmHelpers';
import {
    parseStaffingRequirements,
    parseStaffingCommitments,
    splitExcelLine
} from '../utils/staffingHelpers';
import { saveRosterToFirebase, saveStaffingRequirementsToFirebase, saveStaffingCommitmentsToFirebase, saveAgentsToFirebase, triggerAgentUpdateNotification, triggerRosterUpdateNotification, triggerStaffingUpdateNotification } from '../services/firebaseService';

interface Props {
    onDataUpdate: (agents: Agent[]) => void;
    onRosterUpdate: (roster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>) => void;
    onStaffingUpdate: (requirements: StaffingRequirements, commitments: StaffingCommitments) => void;
    currentRoster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>;
    lastUpdated: string | null;
    userEmail: string;
}

const HeadcountImporter: React.FC<Props> = ({ onDataUpdate, onRosterUpdate, onStaffingUpdate, currentRoster, lastUpdated, userEmail }) => {
    const [reportText, setReportText] = useState('');
    const [rosterText, setRosterText] = useState('');
    const [staffingText, setStaffingText] = useState('');
    const [processedCount, setProcessedCount] = useState<number | null>(null);
    const [isEditingRoster, setIsEditingRoster] = useState(false);
    const [isEditingStaffing, setIsEditingStaffing] = useState(false);

    // Individual staffing boxes
    const [hnReqText, setHnReqText] = useState('');
    const [hnComText, setHnComText] = useState('');
    const [phReqText, setPhReqText] = useState('');
    const [phComText, setPhComText] = useState('');
    const [retReqText, setRetReqText] = useState('');
    const [retComText, setRetComText] = useState('');
    const [keyReqText, setKeyReqText] = useState('');
    const [keyComText, setKeyComText] = useState('');

    // Save the Roster Mapping
    const handleRosterProcess = async () => {
        try {
            if (!rosterText.trim()) {
                alert('⚠️ Please paste roster data before processing.');
                return;
            }

            const rosterMap = parseRosterData(rosterText);
            const count = Object.keys(rosterMap).length;

            if (count === 0) {
                alert("❌ Could not find any valid agent rows with 'LOB' information.\n\nPlease ensure you are pasting the correct columns (including CX Name and LOB).\n\nCheck that your data includes roles like 'CSR HN', 'CSR PH', 'Retention', or 'Key Client Support'.");
                return;
            }

            // Save to Firebase
            const rosterArray: Agent[] = Object.entries(rosterMap).map(([name, role]) => ({
                id: name,
                name: name,
                state: '',
                duration: '',
                station: '',
                team: '',
                skill: '',
                role: role
            }));

            await saveRosterToFirebase(rosterArray);
            await triggerRosterUpdateNotification(rosterArray, userEmail);

            onRosterUpdate(rosterMap);
            setIsEditingRoster(false);
            setRosterText(''); // Clear text to keep it clean
            alert(`✅ Roster updated successfully!\n\n${count} agents mapped.\n\nThis roster is now saved. You don't need to update it again until next month.`);
        } catch (error) {
            console.error('Error processing roster:', error);
            alert(`❌ Error processing roster data:\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}\n\nPlease check your data format and try again.`);
        }
    };

    const handleReportProcess = async () => {
        try {
            if (!reportText.trim()) {
                alert('⚠️ Please paste agent report data before processing.');
                return;
            }

            // Priority: 1. Text Area (if user typed something new), 2. Parent State (loaded from storage)
            let mapToUse = currentRoster;

            if (rosterText.trim()) {
                // If user entered roster text but didn't hit "Update Roster Logic", let's be nice and use it/save it
                try {
                    const tempMap = parseRosterData(rosterText);
                    if (Object.keys(tempMap).length > 0) {
                        mapToUse = tempMap;
                        onRosterUpdate(tempMap);
                    }
                } catch (error) {
                    console.warn('Could not parse inline roster data, using existing roster:', error);
                }
            }

            const agents = parseAgentData(reportText, mapToUse);

            if (agents.length === 0) {
                alert('⚠️ No valid agents found in the report.\n\nPlease check your data format.');
                return;
            }

            // Guardar agentes en Firebase antes de notificar y actualizar
            await saveAgentsToFirebase(agents);

            // Guardar agentes en Firebase antes de notificar y actualizar
            await saveAgentsToFirebase(agents);

            // Trigger notification for all users
            await triggerAgentUpdateNotification(agents, userEmail);

            setProcessedCount(agents.length);
            onDataUpdate(agents);
        } catch (error) {
            console.error('Error processing report:', error);
            alert(`❌ Error processing report data:\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}\n\nPlease check your data format and try again.`);
        }
    };

    // Parse individual staffing box
    const parseStaffingBox = (text: string): Record<string, number> => {
        const result: Record<string, number> = {};
        if (!text.trim()) return result;

        const lines = text.trim().split('\n');

        // Find today's date column
        const today = new Date();
        const estDate = new Date(today.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const todayDate = estDate.getDate();
        const todayMonth = estDate.toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short' });

        let dayColumnIndex = -1;
        let headerLine: string[] = [];

        // Parse individual staffing box
        const parseStaffingBox = (text: string): Record<string, number> => {
            const result: Record<string, number> = {};
            if (!text.trim()) return result;

            const lines = text.trim().split('\n');

            // Find today's date column
            const today = new Date();
            const estDate = new Date(today.toLocaleString('en-US', { timeZone: 'America/New_York' }));
            const todayDate = estDate.getDate();
            const todayMonth = estDate.toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short' });

            let dayColumnIndex = -1;
            let headerLine: string[] = [];

            for (const line of lines) {
                // Use robust splitter for messy pastes
                const cols = splitExcelLine(line).map(c => c.trim());

                // Find header with dates
                if (line.toLowerCase().includes('interval') && cols.length > 1) {
                    headerLine = cols;

                    for (let i = 1; i < headerLine.length; i++) {
                        const col = headerLine[i].trim();
                        const match = col.match(/(\d{1,2})[-\s]?(\w{3})/i);
                        if (match) {
                            const colDay = parseInt(match[1]);
                            const colMonth = match[2];
                            if (colDay === todayDate && colMonth.toLowerCase() === todayMonth.toLowerCase()) {
                                dayColumnIndex = i;
                                break;
                            }
                        }
                    }

                    if (dayColumnIndex === -1) dayColumnIndex = 1; // Fallback
                    continue;
                }

                // Parse data rows
                if (cols[0] && cols[0].includes(':')) {
                    const interval = cols[0];
                    const value = parseInt(cols[dayColumnIndex] || '0');
                    if (!isNaN(value)) {
                        result[interval] = value;
                    }
                }
            }

            return result;
        };

        const handleStaffingProcess = async () => {
            try {
                // Check if using box-by-box or single paste
                const usingBoxes = hnReqText || hnComText || phReqText || phComText || retReqText || retComText || keyReqText || keyComText;

                let requirements: StaffingRequirements;
                let commitments: StaffingCommitments;

                if (usingBoxes) {
                    // Parse each box individually
                    requirements = {
                        hn: parseStaffingBox(hnReqText),
                        ph: parseStaffingBox(phReqText),
                        ret: parseStaffingBox(retReqText),
                        key: parseStaffingBox(keyReqText)
                    };

                    commitments = {
                        hn: parseStaffingBox(hnComText),
                        ph: parseStaffingBox(phComText),
                        ret: parseStaffingBox(retComText),
                        key: parseStaffingBox(keyComText)
                    };
                } else {
                    // Original method - parse from single paste
                    if (!staffingText.trim()) {
                        alert('⚠️ Please paste staffing data.');
                        return;
                    }

                    requirements = parseStaffingRequirements(staffingText);
                    commitments = parseStaffingCommitments(staffingText);
                }

                const reqCount = Object.keys(requirements.hn).length + Object.keys(requirements.ph).length +
                    Object.keys(requirements.ret).length + Object.keys(requirements.key).length;
                const comCount = Object.keys(commitments.hn).length + Object.keys(commitments.ph).length +
                    Object.keys(commitments.ret).length + Object.keys(commitments.key).length;

                // Show detailed breakdown
                const summary = `
Requirements Found:
- HN: ${Object.keys(requirements.hn).length} intervals
- PH: ${Object.keys(requirements.ph).length} intervals  
- Retention: ${Object.keys(requirements.ret).length} intervals
- Key: ${Object.keys(requirements.key).length} intervals

Commitments Found:
- HN: ${Object.keys(commitments.hn).length} intervals
- PH: ${Object.keys(commitments.ph).length} intervals
- Retention: ${Object.keys(commitments.ret).length} intervals  
- Key: ${Object.keys(commitments.key).length} intervals

Sample Requirements:
- HN 8:00 AM: ${requirements.hn['8:00 AM'] || 'NOT FOUND'}
- PH 8:00 AM: ${requirements.ph['8:00 AM'] || 'NOT FOUND'}
- Retention 8:00 AM: ${requirements.ret['8:00 AM'] || 'NOT FOUND'}
- Key 8:00 AM: ${requirements.key['8:00 AM'] || 'NOT FOUND'}
            `.trim();

                console.log('📊 STAFFING DATA SUMMARY:\n' + summary);

                if (reqCount === 0 && comCount === 0) {
                    alert('❌ Could not find any valid staffing data.\\n\\nPlease ensure you are pasting the correct format with:\\n- "HN CS Requirement" / "HN CS Commitment"\\n- "PH CS Requirement" / "PH CS Commitment"\\n- "Retention Requirement" / "Retention Commitment"\\n- "Key Client Support Requirement" / "Key Client Support Commitment"\\n\\nCheck browser console (F12) for more details.');
                    return;
                }

                // Save to Firebase
                await saveStaffingRequirementsToFirebase(requirements);
                await saveStaffingCommitmentsToFirebase(commitments);
                await triggerStaffingUpdateNotification(requirements, commitments, userEmail);

                onStaffingUpdate(requirements, commitments);
                setIsEditingStaffing(false);

                // Clear all inputs
                setStaffingText('');
                setHnReqText('');
                setHnComText('');
                setPhReqText('');
                setPhComText('');
                setRetReqText('');
                setRetComText('');
                setKeyReqText('');
                setKeyComText('');

                alert(`✅ Staffing data updated successfully!\\n\\n${summary}`);
            } catch (error) {
                console.error('Error processing staffing:', error);
                alert(`❌ Error processing staffing data:\\n\\n${error instanceof Error ? error.message : 'Unknown error occurred'}\\n\\nPlease check your data format and try again.`);
            }
        };

        const rosterCount = Object.keys(currentRoster).length;

        // Check if staffing data needs update (Monday check)
        const needsStaffingUpdate = () => {
            const savedDate = localStorage.getItem('wfm_staffing_requirements_date');
            if (!savedDate) return true;

            const now = new Date();
            const currentDay = now.getDay();
            const savedTimestamp = new Date(savedDate);
            const daysDiff = Math.floor((now.getTime() - savedTimestamp.getTime()) / (1000 * 60 * 60 * 24));

            // If it's Monday and data is older than 7 days
            return currentDay === 1 && daysDiff >= 7;
        };

        const hasStaffingData = () => {
            const savedReq = localStorage.getItem('wfm_staffing_requirements');
            const savedCom = localStorage.getItem('wfm_staffing_commitments');
            return savedReq && savedCom;
        };

        return (
            <div className="space-y-6">

                {/* Step 1: Headcount / Roster */}
                <div className="bg-white p-4 rounded-lg shadow border-2 border-indigo-100">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                                <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                                Headcount / Roster Setup (Monthly)
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Setup the Master Roster. Only needed <strong>once a month</strong> or when staff changes.
                            </p>
                        </div>
                    </div>

                    {lastUpdated && !isEditingRoster ? (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex items-center justify-between animate-[fadeIn_0.5s]">
                            <div className="flex items-start gap-3">
                                <div className="bg-green-100 text-green-700 p-2 rounded-full">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-indigo-900 text-sm">Active Roster Loaded</h4>
                                    <p className="text-xs text-indigo-700 mt-1">
                                        Contains <strong>{rosterCount}</strong> agents.
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">
                                        Last Updated: {lastUpdated}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditingRoster(true)}
                                className="bg-white border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded text-xs font-bold hover:bg-indigo-50 hover:text-indigo-800 transition-colors shadow-sm"
                            >
                                Edit / Replace Roster
                            </button>
                        </div>
                    ) : (
                        <div className={`transition-all ${isEditingRoster ? 'animate-[fadeIn_0.2s]' : ''}`}>
                            <p className="text-xs text-gray-500 mb-2">
                                Paste your spreadsheet with columns: <strong>CX Name, LOB</strong> (and optionally Full Name).
                            </p>
                            <textarea
                                className="w-full h-24 p-3 border border-gray-300 rounded text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none mb-2 bg-gray-50"
                                placeholder="Paste your Master Roster here..."
                                value={rosterText}
                                onChange={(e) => setRosterText(e.target.value)}
                                aria-label="Master roster data input"
                            />
                            <div className="mb-3">
                                <FileDropZone
                                    label="Or upload Roster File (Excel/CSV)"
                                    readAsBinary={true}
                                    onFileContent={(content) => {
                                        try {
                                            const text = typeof content === 'string' ? content : readWorkbookData(content);
                                            setRosterText(text);
                                            // Optional: we can try to parse immediately to validate, but maybe just setting text is safer for now
                                        } catch (e: any) {
                                            alert('Failed to read file: ' + e.message);
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                {lastUpdated && (
                                    <button
                                        onClick={() => setIsEditingRoster(false)}
                                        className="text-gray-500 hover:text-gray-700 text-xs font-medium px-3 py-1.5"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    onClick={handleRosterProcess}
                                    className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                                >
                                    {lastUpdated ? 'Save New Roster' : 'Save Monthly Roster'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 1.5: Staffing Requirements & Commitments (Monthly) */}
                <div className="bg-white p-4 rounded-lg shadow border-2 border-purple-100">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1.5</span>
                                Staffing Requirements & Commitments (Weekly)
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Import staffing forecast data. Update <strong>weekly</strong> or when schedules change.
                            </p>
                        </div>
                    </div>

                    {/* Monday Alert - Needs New Data */}
                    {needsStaffingUpdate() && (
                        <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-3 animate-pulse">
                            <div className="flex items-start gap-3">
                                <div className="bg-orange-200 text-orange-800 p-2 rounded-full">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-orange-900 text-sm">⚠️ New Week - Update Required</h4>
                                    <p className="text-xs text-orange-800 mt-1">
                                        It's Monday! Please import new staffing data for this week.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isEditingStaffing ? (
                        <div className={`${needsStaffingUpdate() ? 'bg-orange-50 border-orange-300' : hasStaffingData() ? 'bg-green-50 border-green-200' : 'bg-purple-50 border-purple-200'} border rounded-lg p-4 flex items-center justify-between`}>
                            <div className="flex items-start gap-3">
                                <div className={`${needsStaffingUpdate() ? 'bg-orange-200 text-orange-700' : hasStaffingData() ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'} p-2 rounded-full`}>
                                    {hasStaffingData() && !needsStaffingUpdate() ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                                    )}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm ${needsStaffingUpdate() ? 'text-orange-900' : hasStaffingData() ? 'text-green-900' : 'text-purple-900'}`}>
                                        {hasStaffingData() && !needsStaffingUpdate() ? 'Staffing Data Active' : 'Staffing Data'}
                                    </h4>
                                    <p className={`text-xs mt-1 ${needsStaffingUpdate() ? 'text-orange-700' : hasStaffingData() ? 'text-green-700' : 'text-purple-700'}`}>
                                        {hasStaffingData() && !needsStaffingUpdate()
                                            ? 'Valid for this week'
                                            : 'Click to import or update requirements and commitments'}
                                    </p>
                                    {hasStaffingData() && !needsStaffingUpdate() && (
                                        <p className="text-[10px] text-gray-500 mt-0.5">
                                            Last Updated: {new Date(localStorage.getItem('wfm_staffing_requirements_date') || '').toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditingStaffing(true)}
                                className={`bg-white border px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-sm ${needsStaffingUpdate()
                                    ? 'border-orange-300 text-orange-600 hover:bg-orange-50'
                                    : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                                    }`}
                            >
                                {needsStaffingUpdate() ? '⚠️ Update Now' : 'Import Staffing Data'}
                            </button>
                        </div>
                    ) : (
                        <div className="animate-[fadeIn_0.2s]">
                            <div className="mb-4">
                                <FileDropZone
                                    label="Upload Full Staffing File (Excel/CSV)"
                                    placeholder="Drag & Drop the Staffing Requirements Excel here"
                                    readAsBinary={true}
                                    onFileContent={(content) => {
                                        try {
                                            const text = typeof content === 'string' ? content : readWorkbookData(content);
                                            // When uploading full file, we use the main staffingText processor
                                            setStaffingText(text);

                                            // Auto-triggering process would be complex because we need to differentiate 
                                            // between individual boxes workflow and single file workflow.
                                            // For now, populate the specialized text (staffingText) and let logic handle it.
                                            // To enable the "Update Now" button to work for this mode, we need to ensure "usingBoxes" check works.
                                            // Actually, our handleStaffingProcess checks "staffingText" as fallback.
                                            // But the UI hides the "Upload" button if "isEditingStaffing" is true... wait, no.
                                            // We are INSIDE !isEditingStaffing ? ... wait.
                                            // If !isEditingStaffing is FALSE (meaning IS editing), we show this block.
                                            // So we just need to ensure the user knows to click "Save Staffing Data" at bottom?
                                            // There is no single "Save" button for the form, only "Import Staffing Data" button opens this view.
                                            // The Save button is... missing in this view? 
                                            // Ah, looking at code below... there is NO save button shown in the `else` block of `!isEditingStaffing` (line 449).
                                            // The parsing logic is triggered by... wait, strictly speaking `handleStaffingProcess` triggers it.
                                            // But where is it called? It looks like I need to add a "Process / Save" button here if it's missing.
                                            // Let's check lines 550+ in previous `view_file`.
                                            // Line 549 was `</button>` (end of Import/Cancel).
                                            // Wait, the block at 449 is the EDIT form.
                                            // Let's ensure we add the FileDropZone at the top of this form.
                                        } catch (e: any) {
                                            // To ensure the "Save Staffing Data" works for this, we must ensure handleStaffingProcess checks staffingText if boxes are empty.
                                            // Note: We need to clear the boxes if this is set to avoid conflict, or handleStaffingProcess should prioritize staffingText if boxes are empty?
                                            // Logic: "usingBoxes" checks if ANY box has text. 
                                            // So we should probably clear boxes when file is dropped.
                                            setHnReqText(''); setHnComText('');
                                            setPhReqText(''); setPhComText('');
                                            setRetReqText(''); setRetComText('');
                                            setKeyReqText(''); setKeyComText('');
                                        } catch (e: any) {
                                            alert('Failed to read file: ' + e.message);
                                        }
                                    }}
                                />
                                {staffingText && (
                                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                                        ✅ File loaded and ready to process. Click "Save Staffing Data" below.
                                    </div>
                                )}
                                <p className="text-xs text-gray-400 text-center my-2">- OR -</p>
                            </div>

                            <p className="text-xs text-gray-500 mb-3">
                                Paste each staffing table separately below. Copy from Excel/Sheets box by box.
                            </p>

                            {/* Box-by-Box Input Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                {/* HN CS */}
                                <div>
                                    <label className="text-xs font-bold text-blue-700 mb-1 block">HN CS Requirement</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-blue-300 rounded text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  10&#10;8:30 AM  12..."
                                        value={hnReqText}
                                        onChange={(e) => setHnReqText(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-green-700 mb-1 block">HN CS Commitment</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-green-300 rounded text-xs font-mono focus:ring-2 focus:ring-green-500 outline-none bg-green-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  10&#10;8:30 AM  12..."
                                        value={hnComText}
                                        onChange={(e) => setHnComText(e.target.value)}
                                    />
                                </div>

                                {/* PH CS */}
                                <div>
                                    <label className="text-xs font-bold text-blue-700 mb-1 block">PH CS Requirement</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-blue-300 rounded text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  23&#10;8:30 AM  25..."
                                        value={phReqText}
                                        onChange={(e) => setPhReqText(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-green-700 mb-1 block">PH CS Commitment</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-green-300 rounded text-xs font-mono focus:ring-2 focus:ring-green-500 outline-none bg-green-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  23&#10;8:30 AM  25..."
                                        value={phComText}
                                        onChange={(e) => setPhComText(e.target.value)}
                                    />
                                </div>

                                {/* Retention */}
                                <div>
                                    <label className="text-xs font-bold text-blue-700 mb-1 block">Retention Requirement</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-blue-300 rounded text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  0&#10;8:30 AM  0..."
                                        value={retReqText}
                                        onChange={(e) => setRetReqText(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-green-700 mb-1 block">Retention Commitment</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-green-300 rounded text-xs font-mono focus:ring-2 focus:ring-green-500 outline-none bg-green-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  0&#10;8:30 AM  0..."
                                        value={retComText}
                                        onChange={(e) => setRetComText(e.target.value)}
                                    />
                                </div>

                                {/* Key Client Support */}
                                <div>
                                    <label className="text-xs font-bold text-blue-700 mb-1 block">Key Client Support Requirement</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-blue-300 rounded text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  0&#10;8:30 AM  0..."
                                        value={keyReqText}
                                        onChange={(e) => setKeyReqText(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-green-700 mb-1 block">Key Client Support Commitment</label>
                                    <textarea
                                        className="w-full h-24 p-2 border border-green-300 rounded text-xs font-mono focus:ring-2 focus:ring-green-500 outline-none bg-green-50"
                                        placeholder="Interval  10-Dec&#10;8:00 AM  0&#10;8:30 AM  0..."
                                        value={keyComText}
                                        onChange={(e) => setKeyComText(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setIsEditingStaffing(false)}
                                    className="text-gray-500 hover:text-gray-700 text-xs font-medium px-3 py-1.5"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleStaffingProcess}
                                    className="bg-purple-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm"
                                >
                                    Save Staffing Data
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 2: Real-Time Report */}
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                        Import Real-Time Agent Report (Daily)
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                        Copy and paste the table from your WFM Real-Time View (Active Agents).
                    </p>
                    <textarea
                        className="w-full h-32 p-3 border border-gray-300 rounded text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none mb-3"
                        placeholder="Paste Agent ID | Name | State | Duration | Station | Team | Skill ..."
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        aria-label="Real-time agent report data input"
                    />

                    <div className="mb-4">
                        <FileDropZone
                            label="Upload Agent Report File (Excel/CSV)"
                            placeholder="Drag & Drop the daily agent report here"
                            readAsBinary={true}
                            onFileContent={(content) => {
                                try {
                                    const text = typeof content === 'string' ? content : readWorkbookData(content);
                                    setReportText(text);
                                } catch (e: any) {
                                    alert('Failed to read file: ' + e.message);
                                }
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            {processedCount !== null && (
                                <span className="text-green-600 font-medium">Successfully processed {processedCount} agents using {rosterCount > 0 ? 'Monthly Roster' : 'fallback logic'}.</span>
                            )}
                        </div>
                        <button
                            onClick={handleReportProcess}
                            className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Generate Interval Report
                        </button>
                    </div>
                </div >
            </div >
        );
    };

    export default HeadcountImporter;