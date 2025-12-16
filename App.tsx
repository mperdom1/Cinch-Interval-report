import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import IntervalTable from './components/IntervalTable';
import AgentAlerts from './components/AgentAlerts';
import StateHelper from './components/StateHelper';
import StaffingGrid from './components/StaffingGrid';
import HeadcountImporter from './components/HeadcountImporter';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import AgentBreakdown from './components/AgentBreakdown';
import { MOCK_INTERVAL_DATA } from './constants';
import { calculateIntervalStats } from './utils/wfmHelpers';
import { Agent, IntervalRow, User, StaffingRequirements, StaffingCommitments } from './types';
import { getCurrentInterval, getIntervalStaffing } from './utils/staffingHelpers';
import { ActiveAgentTable } from './components/ActiveAgentTable';
import { firebaseProvider } from './services/cloudProvider';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useFirebaseSync } from './hooks/useFirebaseSync';
import { useNotifications } from './hooks/useNotifications';

// Initial Mock Agents for display before paste
const INITIAL_AGENTS: Agent[] = [
    { id: '1', name: 'John Doe', state: 'Break', duration: '18:00', station: 'WebRTC', team: 'TM-CS_Collective', skill: 'PH_Skill', role: 'PH' },
    { id: '2', name: 'Jane Smith', state: 'ACW', duration: '08:45', station: 'WebRTC', team: 'TM-CS_Collective', skill: 'HN_Skill', role: 'HN' },
    { id: '3', name: 'Mike Johnson', state: 'Meeting', duration: '35:00', station: 'WebRTC', team: 'TM-RET_Collective', skill: 'Ret_Skill', role: 'Ret' },
    { id: '4', name: 'Sarah Connor', state: 'InboundContact', duration: '05:22', station: 'WebRTC', team: 'TM-CS_Collective', skill: 'HN_Skill', role: 'HN' },
    { id: '5', name: 'Kyle Reese', state: 'Available', duration: '01:10', station: 'WebRTC', team: 'TM-CS_Collective', skill: 'PH_Skill', role: 'PH' },
];

function App() {
    // Initialize user from localStorage
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = localStorage.getItem('wfm_user_session');
            if (!saved) return null;
            return JSON.parse(saved);
        } catch (error) {
            console.error('Failed to load user session:', error);
            return null;
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'import' | 'staffing'>('dashboard');
    const [showHelper, setShowHelper] = useState(false);
    const [intervalData, setIntervalData] = useState<IntervalRow[]>(MOCK_INTERVAL_DATA);

    // Custom Hooks
    useNotifications(user);
    const {
        agents,
        roster,
        rosterDate,
        staffingRequirements,
        staffingCommitments,
        setAgents,
        setRoster,
        setRosterDate,
        setStaffingRequirements,
        setStaffingCommitments
    } = useFirebaseSync(user, INITIAL_AGENTS);

    // Calculate Interval Stats whenever data changes
    useEffect(() => {
        const currentInterval = getCurrentInterval();
        const staffing = getIntervalStaffing(staffingRequirements, staffingCommitments, currentInterval);
        setIntervalData(calculateIntervalStats(agents, staffing.required, staffing.committed));
    }, [agents, staffingRequirements, staffingCommitments]);

    // Real-Time Interval Updates (Legacy System or Cloud Provider)
    useEffect(() => {
        const unsubscribe = firebaseProvider.subscribe?.((data) => {
            if (data && Array.isArray(data)) {
                setIntervalData(data);
            }
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const sendNotification = useCallback((agentCount: number) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            const currentInterval = getCurrentInterval();
            new Notification('CINCH Interval Staffing Updated', {
                body: `Agent report updated for ${currentInterval}\n${agentCount} active agents`,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'agent-update',
                requireInteraction: false
            });
        }
    }, []);

    const handleDataUpdate = useCallback((newAgents: Agent[]) => {
        setAgents(newAgents);
        sendNotification(newAgents.length);
        setActiveTab('dashboard');
    }, [setAgents, sendNotification]);

    const handleRosterUpdate = useCallback((newRoster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>) => {
        setRoster(newRoster);
        const now = new Date();
        setRosterDate(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());

        // If agents exist, re-map them immediately
        if (agents.length > 0) {
            const updatedAgents = agents.map(a => {
                const nameKey = a.name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().split(/\s+/).sort().join(' ');
                if (newRoster[nameKey]) {
                    return { ...a, role: newRoster[nameKey] };
                }
                return a;
            });
            setAgents(updatedAgents);
        }
    }, [agents, setAgents, setRoster, setRosterDate]);

    const handleStaffingUpdate = useCallback((requirements: StaffingRequirements, commitments: StaffingCommitments) => {
        setStaffingRequirements(requirements);
        setStaffingCommitments(commitments);
    }, [setStaffingRequirements, setStaffingCommitments]);

    const handleLogin = useCallback((loggedInUser: User) => {
        setIsLoading(true);
        setUser(loggedInUser);
        try {
            localStorage.setItem('wfm_user_session', JSON.stringify(loggedInUser));
        } catch (error) {
            console.error('Failed to save user session:', error);
        }
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    const handleLogout = useCallback(() => {
        setUser(null);
        try {
            localStorage.removeItem('wfm_user_session');
        } catch (error) {
            console.error('Failed to remove user session:', error);
        }
    }, []);

    const copyAttainmentForTeams = useCallback(() => {
        try {
            const hnRow = intervalData.find(row => row.label === 'HN');
            const phRow = intervalData.find(row => row.label === 'PH');
            const retRow = intervalData.find(row => row.label === 'Ret');
            const keyRow = intervalData.find(row => row.label === 'Key');
            const reqRow = intervalData.find(row => row.label === 'HC Required');
            const comRow = intervalData.find(row => row.label === 'HC Committed');

            if (!hnRow || !phRow || !retRow || !keyRow) {
                alert('⚠️ No data available to copy');
                return;
            }

            const calculateAttainment = (actual: number | string, target: number | string) => {
                const act = typeof actual === 'string' ? parseFloat(actual) : actual;
                const tgt = typeof target === 'string' ? parseFloat(target) : target;
                if (tgt === 0) return '0%';
                return Math.round((act / tgt) * 100) + '%';
            };

            const text = `Key Client Support - Actual vs Required Attainment :${calculateAttainment(keyRow.key, reqRow?.key || 0)}
Key Client Support - Actual vs Committed Attainment :${calculateAttainment(keyRow.key, comRow?.key || 0)}

CSR HN - Actual vs Committed Attainment :${calculateAttainment(hnRow.hn, comRow?.hn || 0)}
CSR HN - Actual vs Committed Attainment :${calculateAttainment(hnRow.hn, comRow?.hn || 0)}

CSR PH - Actual vs Required Attainment :${calculateAttainment(phRow.ph, reqRow?.ph || 0)}
CSR PH - Actual vs Committed Attainment :${calculateAttainment(phRow.ph, comRow?.ph || 0)}

Retention - Actual vs Required Attainment :${calculateAttainment(retRow.ret, reqRow?.ret || 0)}
Retention Actual vs Committed Attainment :${calculateAttainment(retRow.ret, comRow?.ret || 0)}`;

            navigator.clipboard.writeText(text).then(() => {
                alert('✅ Attainment report copied to clipboard!\n\nYou can now paste it in Teams.');
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('❌ Failed to copy to clipboard. Please try again.');
            });
        } catch (error) {
            console.error('Error generating Teams report:', error);
            alert('❌ Error generating report. Please try again.');
        }
    }, [intervalData]);

    if (!user) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 font-sans text-gray-900 pb-20">
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            {/* Top Navigation */}
            <nav className="bg-gradient-to-r from-cinch-600 to-cinch-700 text-white shadow-xl sticky top-0 z-40 backdrop-blur-md bg-opacity-95 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                <DotLottieReact
                                    src="https://lottie.host/a38f3f7a-0bbd-4d68-998b-dfb3b94f9834/bEjM9oOwmj.lottie"
                                    loop
                                    autoplay
                                    style={{ width: 32, height: 32, background: 'transparent' }}
                                />
                            </div>
                            <div>
                                <h1 className="font-bold text-xl tracking-tight drop-shadow-sm">CINCH Interval Staffing</h1>
                                <p className="text-[10px] text-green-50 uppercase tracking-wider font-bold opacity-90">
                                    Real-Time Operations | <span className="text-yellow-200">{user.role.toUpperCase()} View</span>
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-2 bg-black/10 p-1 rounded-full backdrop-blur-sm">
                            <button onClick={() => setActiveTab('dashboard')} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform ${activeTab === 'dashboard' ? 'bg-white text-cinch-700 shadow-lg scale-105' : 'text-green-50 hover:bg-white/10 hover:text-white'}`}>Dashboard</button>
                            {user.role === 'wfm' && (
                                <>
                                    <button onClick={() => setActiveTab('import')} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform ${activeTab === 'import' ? 'bg-white text-cinch-700 shadow-lg scale-105' : 'text-green-50 hover:bg-white/10 hover:text-white'}`}>Data Import</button>
                                    <button onClick={() => setActiveTab('staffing')} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform ${activeTab === 'staffing' ? 'bg-white text-cinch-700 shadow-lg scale-105' : 'text-green-50 hover:bg-white/10 hover:text-white'}`}>Staffing</button>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={copyAttainmentForTeams} className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                Copy for Teams
                            </button>
                            <button onClick={() => setShowHelper(true)} className="flex items-center gap-1 bg-[#5CCC69] hover:bg-[#4abb57] text-[#004d13] px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Legend
                            </button>
                            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
                {activeTab === 'dashboard' && (
                    <div className="flex flex-col gap-3">
                        <div className="w-full">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <IntervalTable data={intervalData} />
                            </div>
                        </div>
                        <div className="w-full h-[380px]">
                            {(user.role === 'wfm' || user.role === 'supervisor') && <AgentAlerts agents={agents} />}
                            {user.role === 'om' && <AgentBreakdown agents={agents} />}
                        </div>
                        {user.role === 'wfm' && (
                            <div className="w-full h-[350px]">
                                <AgentBreakdown agents={agents} />
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'import' && user.role === 'wfm' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <HeadcountImporter
                            onDataUpdate={handleDataUpdate}
                            onRosterUpdate={handleRosterUpdate}
                            onStaffingUpdate={handleStaffingUpdate}
                            currentRoster={roster}
                            lastUpdated={rosterDate}
                            userEmail={user.email}
                        />
                        <ActiveAgentTable agents={agents} />
                    </div>
                )}

                {activeTab === 'staffing' && user.role === 'wfm' && (
                    <div className="space-y-8">
                        <StaffingGrid />
                    </div>
                )}

                {activeTab !== 'dashboard' && user.role !== 'wfm' && (
                    <div className="text-center py-20 text-gray-500">
                        <h3 className="text-xl font-bold">Access Restricted</h3>
                        <p>You do not have permission to view this section.</p>
                    </div>
                )}
            </main>

            {/* State Helper Modal */}
            {showHelper && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowHelper(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">State Mapping Helper</h3>
                                <p className="text-xs text-gray-500">Reference for Cxone states vs Template codes</p>
                            </div>
                            <button onClick={() => setShowHelper(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-0"><StateHelper /></div>
                        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                            <button className="text-xs text-blue-600 font-medium hover:underline" onClick={() => {
                                const content = document.getElementById('state-helper-table')?.innerText || "";
                                navigator.clipboard.writeText(content);
                                alert("Helper table copied!");
                            }}>Copy Table Content</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

