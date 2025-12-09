import React, { useState } from 'react';
import { Agent, StaffingRequirements, StaffingCommitments } from '../types';
import { parseAgentData, parseRosterData } from '../utils/wfmHelpers';
import { parseStaffingRequirements, parseStaffingCommitments } from '../utils/staffingHelpers';
import { saveRosterToFirebase, saveStaffingRequirementsToFirebase, saveStaffingCommitmentsToFirebase } from '../services/firebaseService';

interface Props {
    onDataUpdate: (agents: Agent[]) => void;
    onRosterUpdate: (roster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>) => void;
    onStaffingUpdate: (requirements: StaffingRequirements, commitments: StaffingCommitments) => void;
    currentRoster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>;
    lastUpdated: string | null;
}

const HeadcountImporter: React.FC<Props> = ({ onDataUpdate, onRosterUpdate, onStaffingUpdate, currentRoster, lastUpdated }) => {
    const [reportText, setReportText] = useState('');
    const [rosterText, setRosterText] = useState('');
    const [staffingText, setStaffingText] = useState('');
    const [processedCount, setProcessedCount] = useState<number | null>(null);
    const [isEditingRoster, setIsEditingRoster] = useState(false);
    const [isEditingStaffing, setIsEditingStaffing] = useState(false);

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

            setProcessedCount(agents.length);
            onDataUpdate(agents);
        } catch (error) {
            console.error('Error processing report:', error);
            alert(`❌ Error processing report data:\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}\n\nPlease check your data format and try again.`);
        }
    };

    const handleStaffingProcess = async () => {
        try {
            if (!staffingText.trim()) {
                alert('⚠️ Please paste staffing requirements and commitments data before processing.');
                return;
            }

            const requirements = parseStaffingRequirements(staffingText);
            const commitments = parseStaffingCommitments(staffingText);
            
            const reqCount = Object.keys(requirements.hn).length + Object.keys(requirements.ph).length + 
                           Object.keys(requirements.ret).length + Object.keys(requirements.key).length;
            const comCount = Object.keys(commitments.hn).length + Object.keys(commitments.ph).length + 
                           Object.keys(commitments.ret).length + Object.keys(commitments.key).length;
            
            if (reqCount === 0 && comCount === 0) {
                alert('❌ Could not find any valid staffing data.\\n\\nPlease ensure you are pasting the correct format with:\\n- "HN CS Requirement" / "HN CS Commitment"\\n- "PH CS Requirement" / "PH CS Commitment"\\n- "Retention Requirement" / "Retention Commitment"\\n- "Key Client Support Requirement" / "Key Client Support Commitment"');
                return;
            }

            // Save to Firebase
            await saveStaffingRequirementsToFirebase(requirements);
            await saveStaffingCommitmentsToFirebase(commitments);

            onStaffingUpdate(requirements, commitments);
            setIsEditingStaffing(false);
            setStaffingText('');
            alert(`✅ Staffing data updated successfully!\\n\\nRequirements: ${reqCount} intervals\\nCommitments: ${comCount} intervals\\n\\nData is saved and will be used for all interval calculations.`);
        } catch (error) {
            console.error('Error processing staffing:', error);
            alert(`❌ Error processing staffing data:\\n\\n${error instanceof Error ? error.message : 'Unknown error occurred'}\\n\\nPlease check your data format and try again.`);
        }
    };

    const rosterCount = Object.keys(currentRoster).length;

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
                           Import staffing forecast data. Update weekly or when schedules change.
                        </p>
                    </div>
                </div>
                
                {!isEditingStaffing ? (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-purple-900 text-sm">Staffing Data</h4>
                                <p className="text-xs text-purple-700 mt-1">
                                    Click to import or update requirements and commitments
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsEditingStaffing(true)}
                            className="bg-white border border-purple-200 text-purple-600 px-3 py-1.5 rounded text-xs font-bold hover:bg-purple-50 hover:text-purple-800 transition-colors shadow-sm"
                        >
                            Import Staffing Data
                        </button>
                    </div>
                ) : (
                    <div className="animate-[fadeIn_0.2s]">
                         <p className="text-xs text-gray-500 mb-2">
                            Paste your staffing tables (Requirements and Commitments). Include all 4 queues: <strong>HN CS, PH CS, Retention, Key Client Support</strong>.
                        </p>
                        <textarea
                            className="w-full h-40 p-3 border border-gray-300 rounded text-xs font-mono focus:ring-2 focus:ring-purple-500 outline-none mb-2 bg-gray-50"
                            placeholder="Paste your Staffing Requirements and Commitments tables here (from the screenshot you shared)..."
                            value={staffingText}
                            onChange={(e) => setStaffingText(e.target.value)}
                            aria-label="Staffing requirements and commitments data input"
                        />
                        <div className="flex justify-end gap-2">
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
            </div>
        </div>
    );
};

export default HeadcountImporter;