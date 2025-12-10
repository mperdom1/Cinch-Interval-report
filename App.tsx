import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { subscribeToAgentUpdates } from './services/firebaseService';

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
  
  // Initialize Agents from LocalStorage
  const [agents, setAgents] = useState<Agent[]>(() => {
    try {
      const saved = localStorage.getItem('wfm_agents_data');
      if (!saved) return INITIAL_AGENTS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_AGENTS;
    } catch (error) {
      console.error('Failed to load agents from storage:', error);
      return INITIAL_AGENTS;
    }
  });
  
  // Initialize Roster from LocalStorage to persist data across sessions
  const [roster, setRoster] = useState<Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>>(() => {
    try {
      const saved = localStorage.getItem('wfm_roster_data');
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch (error) {
      console.error('Failed to load roster from storage:', error);
      return {};
    }
  });

  const [rosterDate, setRosterDate] = useState<string | null>(() => {
    try {
      return localStorage.getItem('wfm_roster_date');
    } catch (error) {
      console.error('Failed to load roster date:', error);
      return null;
    }
  });

  // Staffing Requirements and Commitments
  const [staffingRequirements, setStaffingRequirements] = useState<StaffingRequirements>(() => {
    try {
      const saved = localStorage.getItem('wfm_staffing_requirements');
      const savedDate = localStorage.getItem('wfm_staffing_requirements_date');
      
      if (!saved || !savedDate) return { hn: {}, ph: {}, ret: {}, key: {} };
      
      // Check if it's Monday and data is from last week
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const savedTimestamp = new Date(savedDate);
      const daysDiff = Math.floor((now.getTime() - savedTimestamp.getTime()) / (1000 * 60 * 60 * 24));
      
      // If it's Monday (1) and data is older than 7 days, clear it
      if (currentDay === 1 && daysDiff >= 7) {
        console.log('🗓️ New week detected - clearing old staffing data');
        localStorage.removeItem('wfm_staffing_requirements');
        localStorage.removeItem('wfm_staffing_requirements_date');
        localStorage.removeItem('wfm_staffing_commitments');
        localStorage.removeItem('wfm_staffing_commitments_date');
        return { hn: {}, ph: {}, ret: {}, key: {} };
      }
      
      const parsed = JSON.parse(saved);
      return typeof parsed === 'object' && parsed !== null ? parsed : { hn: {}, ph: {}, ret: {}, key: {} };
    } catch (error) {
      console.error('Failed to load staffing requirements:', error);
      return { hn: {}, ph: {}, ret: {}, key: {} };
    }
  });

  const [staffingCommitments, setStaffingCommitments] = useState<StaffingCommitments>(() => {
    try {
      const saved = localStorage.getItem('wfm_staffing_commitments');
      const savedDate = localStorage.getItem('wfm_staffing_commitments_date');
      
      if (!saved || !savedDate) return { hn: {}, ph: {}, ret: {}, key: {} };
      
      // Check if it's Monday and data is from last week
      const now = new Date();
      const currentDay = now.getDay();
      const savedTimestamp = new Date(savedDate);
      const daysDiff = Math.floor((now.getTime() - savedTimestamp.getTime()) / (1000 * 60 * 60 * 24));
      
      // If it's Monday (1) and data is older than 7 days, clear it
      if (currentDay === 1 && daysDiff >= 7) {
        return { hn: {}, ph: {}, ret: {}, key: {} };
      }
      
      const parsed = JSON.parse(saved);
      return typeof parsed === 'object' && parsed !== null ? parsed : { hn: {}, ph: {}, ret: {}, key: {} };
    } catch (error) {
      console.error('Failed to load staffing commitments:', error);
      return { hn: {}, ph: {}, ret: {}, key: {} };
    }
  });

  // Calculate initial stats on load
  useEffect(() => {
      const currentInterval = getCurrentInterval();
      const staffing = getIntervalStaffing(staffingRequirements, staffingCommitments, currentInterval);
      
      // Debug logging
      console.log('📊 Staffing Debug Info:', {
          currentInterval,
          currentDay: new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/New_York' }),
          hasRequirements: Object.keys(staffingRequirements.hn || {}).length > 0,
          hasCommitments: Object.keys(staffingCommitments.hn || {}).length > 0,
          requiredValues: staffing.required,
          committedValues: staffing.committed
      });
      
      setIntervalData(calculateIntervalStats(agents, staffing.required, staffing.committed));
  }, [agents, staffingRequirements, staffingCommitments]);

  // Request notification permission on mount
  useEffect(() => {
      if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                  console.log('✅ Notification permission granted.');
              } else if (permission === 'denied') {
                  console.log('❌ Notification permission denied.');
              } else {
                  console.log('⚠️ Notification permission status is default.');
              }
          });
      }
  }, []);

  // Subscribe to agent updates from Firebase
  useEffect(() => {
      if (!user) return;

      console.log('🔥 Subscribing to Firebase agent updates...');
      
      const unsubscribe = subscribeToAgentUpdates((data) => {
          console.log('📡 Received agent update from Firebase:', {
              updatedBy: data.updatedBy,
              count: data.count,
              timestamp: data.timestamp,
              isMyUpdate: data.updatedBy === user.email
          });
          
          // Update local agents state for everyone (including the person who updated)
          setAgents(data.agents);
          const currentInterval = getCurrentInterval();
          const staffing = getIntervalStaffing(staffingRequirements, staffingCommitments, currentInterval);
          setIntervalData(calculateIntervalStats(data.agents, staffing.required, staffing.committed));
          
          // Only show notification if update is from someone else
          if (data.updatedBy !== user.email) {
              if ('Notification' in window && Notification.permission === 'granted') {
                  new Notification('🔔 CINCH Interval Staffing Updated', {
                      body: `Agent report updated by ${data.updatedBy}\n${data.count} active agents`,
                      icon: '/favicon.ico',
                      badge: '/favicon.ico',
                      tag: 'agent-update-realtime',
                      requireInteraction: false
                  });
              }
          }
      });

      return () => {
          console.log('🔥 Unsubscribing from Firebase agent updates...');
          unsubscribe();
      };
  }, [user, staffingRequirements, staffingCommitments]);

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
      const currentInterval = getCurrentInterval();
      const staffing = getIntervalStaffing(staffingRequirements, staffingCommitments, currentInterval);
      const newStats = calculateIntervalStats(newAgents, staffing.required, staffing.committed);
      setIntervalData(newStats);
      setActiveTab('dashboard');
      
      // Save agents to localStorage
      try {
        localStorage.setItem('wfm_agents_data', JSON.stringify(newAgents));
      } catch (error) {
        console.error('Failed to save agents to localStorage:', error);
      }

      // Send notification
      sendNotification(newAgents.length);
  }, [staffingRequirements, staffingCommitments, sendNotification]);

  const handleRosterUpdate = useCallback((newRoster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>) => {
      setRoster(newRoster);
      
      // Save metadata
      const now = new Date();
      const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
      setRosterDate(dateStr);

      // Persist to LocalStorage with error handling
      try {
        localStorage.setItem('wfm_roster_data', JSON.stringify(newRoster));
        localStorage.setItem('wfm_roster_date', dateStr);
      } catch (error) {
        console.error('Failed to save roster to localStorage:', error);
        alert('⚠️ Warning: Could not save roster data. Changes may be lost on refresh.');
      }

      // If agents exist, re-map them immediately
      if (agents.length > 0) {
           const updatedAgents = agents.map(a => {
               // Simple key generation logic matching wfmHelpers
               const nameKey = a.name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().split(/\s+/).sort().join(' ');
               if (newRoster[nameKey]) {
                   return { ...a, role: newRoster[nameKey] };
               }
               return a;
           });
           setAgents(updatedAgents);
           const currentInterval = getCurrentInterval();
           const staffing = getIntervalStaffing(staffingRequirements, staffingCommitments, currentInterval);
           setIntervalData(calculateIntervalStats(updatedAgents, staffing.required, staffing.committed));
      }
  }, [agents, staffingRequirements, staffingCommitments]);

  const handleStaffingUpdate = useCallback((requirements: StaffingRequirements, commitments: StaffingCommitments) => {
      setStaffingRequirements(requirements);
      setStaffingCommitments(commitments);
      
      // Persist to LocalStorage with timestamp
      try {
        const now = new Date().toISOString();
        localStorage.setItem('wfm_staffing_requirements', JSON.stringify(requirements));
        localStorage.setItem('wfm_staffing_requirements_date', now);
        localStorage.setItem('wfm_staffing_commitments', JSON.stringify(commitments));
        localStorage.setItem('wfm_staffing_commitments_date', now);
        console.log('✅ Staffing data saved with timestamp:', now);
      } catch (error) {
        console.error('Failed to save staffing data:', error);
        alert('⚠️ Warning: Could not save staffing data. Changes may be lost on refresh.');
      }

      // Recalculate interval stats with new staffing data
      if (agents.length > 0) {
          const currentInterval = getCurrentInterval();
          const staffing = getIntervalStaffing(requirements, commitments, currentInterval);
          setIntervalData(calculateIntervalStats(agents, staffing.required, staffing.committed));
      }
  }, [agents]);

  const handleLogin = useCallback((loggedInUser: User) => {
      setIsLoading(true);
      setUser(loggedInUser);
      
      // Save user session to localStorage
      try {
        localStorage.setItem('wfm_user_session', JSON.stringify(loggedInUser));
      } catch (error) {
        console.error('Failed to save user session:', error);
      }
      
      // Simulate loading time for data initialization
      setTimeout(() => {
          setIsLoading(false);
      }, 2000);
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
          // Get current interval stats
          const hnRow = intervalData.find(row => row.label === 'HN');
          const phRow = intervalData.find(row => row.label === 'PH');
          const retRow = intervalData.find(row => row.label === 'Ret');
          const keyRow = intervalData.find(row => row.label === 'Key');

          if (!hnRow || !phRow || !retRow || !keyRow) {
              alert('⚠️ No data available to copy');
              return;
          }

          // Calculate attainment percentages
          const calculateAttainment = (actual: number | string, target: number | string, type: 'required' | 'committed') => {
              const act = typeof actual === 'string' ? parseFloat(actual) : actual;
              const tgt = typeof target === 'string' ? parseFloat(target) : target;
              if (tgt === 0) return '0%';
              return Math.round((act / tgt) * 100) + '%';
          };

          // Get HC Required and HC Committed from interval data
          const reqRow = intervalData.find(row => row.label === 'HC Required');
          const comRow = intervalData.find(row => row.label === 'HC Committed');

          const text = `Key Client Support - Actual vs Required Attainment :${calculateAttainment(keyRow.key, reqRow?.key || 0, 'required')}
Key Client Support - Actual vs Committed Attainment :${calculateAttainment(keyRow.key, comRow?.key || 0, 'committed')}

CSR HN - Actual vs Committed Attainment :${calculateAttainment(hnRow.hn, comRow?.hn || 0, 'committed')}
CSR HN - Actual vs Committed Attainment :${calculateAttainment(hnRow.hn, comRow?.hn || 0, 'committed')}

CSR PH - Actual vs Required Attainment :${calculateAttainment(phRow.ph, reqRow?.ph || 0, 'required')}
CSR PH - Actual vs Committed Attainment :${calculateAttainment(phRow.ph, comRow?.ph || 0, 'committed')}

Retention - Actual vs Required Attainment :${calculateAttainment(retRow.ret, reqRow?.ret || 0, 'required')}
Retention Actual vs Committed Attainment :${calculateAttainment(retRow.ret, comRow?.ret || 0, 'committed')}`;

          // Copy to clipboard
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* Top Navigation - Cinch Green Theme (#058623) */}
      <nav className="bg-[#058623] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
              </div>
              <div>
                  <h1 className="font-bold text-lg tracking-tight">CINCH Interval Staffing</h1>
                  <p className="text-[10px] text-green-100 uppercase tracking-wider font-semibold opacity-80">
                      Real-Time Operations | <span className="text-yellow-200">{user.role.toUpperCase()} View</span>
                  </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white text-[#058623] shadow-md' : 'text-green-50 hover:bg-[#046c1c]'}`}
              >
                Dashboard
              </button>
              
              {user.role === 'wfm' && (
                  <>
                    <button 
                        onClick={() => setActiveTab('import')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'import' ? 'bg-white text-[#058623] shadow-md' : 'text-green-50 hover:bg-[#046c1c]'}`}
                    >
                        Data Import
                    </button>
                    <button 
                        onClick={() => setActiveTab('staffing')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'staffing' ? 'bg-white text-[#058623] shadow-md' : 'text-green-50 hover:bg-[#046c1c]'}`}
                    >
                        Staffing
                    </button>
                  </>
              )}
            </div>

            <div className="flex items-center gap-3">
               <button 
                  onClick={copyAttainmentForTeams}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm"
                  aria-label="Copy attainment report for Teams"
               >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  Copy for Teams
               </button>
               <button 
                  onClick={() => setShowHelper(true)}
                  className="flex items-center gap-1 bg-[#5CCC69] hover:bg-[#4abb57] text-[#004d13] px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm"
                  aria-label="Show state mapping legend"
               >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Legend
               </button>
               <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm"
                  aria-label="Logout from application"
               >
                  Logout
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-4">
            
            {/* Top Section: Interval Stats - Visible to ALL */}
            <div className="w-full">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <IntervalTable data={intervalData} />
              </div>
            </div>

            {/* Bottom Section: Conditional based on Role */}
            <div className="w-full h-[450px]">
                {/* WFM and SUPERVISOR see Alerts */}
                {(user.role === 'wfm' || user.role === 'supervisor') && (
                    <AgentAlerts agents={agents} />
                )}

                {/* OM sees Agent Breakdown (The "Agents Considered" view) */}
                {user.role === 'om' && (
                    <AgentBreakdown agents={agents} />
                )}
            </div>
            
            {/* WFM also sees the detailed breakdown below Alerts if they want? 
                Actually prompt says "WFM view and access to data import and staffing". 
                Usually WFM wants to see everything. Let's add Breakdown for WFM too below alerts.
            */}
            {user.role === 'wfm' && (
                <div className="w-full h-[400px]">
                    <AgentBreakdown agents={agents} />
                </div>
            )}

          </div>
        )}

        {/* Import Tab - Restricted to WFM */}
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
           </div>
        )}

        {/* Staffing Tab - Restricted to WFM */}
        {activeTab === 'staffing' && user.role === 'wfm' && (
            <div className="space-y-8">
                <StaffingGrid />
            </div>
        )}
        
        {/* Access Denied message if non-WFM tries to access protected tabs via some glitch (defensive programming) */}
        {activeTab !== 'dashboard' && user.role !== 'wfm' && (
            <div className="text-center py-20 text-gray-500">
                <h3 className="text-xl font-bold">Access Restricted</h3>
                <p>You do not have permission to view this section.</p>
            </div>
        )}

      </main>

      {/* State Helper Modal */}
      {showHelper && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setShowHelper(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-[fadeIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
                    <div>
                        <h3 id="modal-title" className="text-lg font-bold text-gray-800">State Mapping Helper</h3>
                        <p className="text-xs text-gray-500">Reference for Cxone states vs Template codes</p>
                    </div>
                    <button 
                        onClick={() => setShowHelper(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-0">
                    <StateHelper />
                </div>
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
