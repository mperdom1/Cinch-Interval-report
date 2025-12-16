import { useState, useEffect } from 'react';
import { Agent, StaffingRequirements, StaffingCommitments, User } from '../types';
import {
    subscribeToAgentUpdates,
    subscribeToRosterUpdates,
    subscribeToStaffingUpdates,
    getRosterFromFirebase,
    getStaffingRequirementsFromFirebase,
    getStaffingCommitmentsFromFirebase,
    getAgentsFromFirebase
} from '../services/firebaseService';

interface UseFirebaseSyncReturn {
    agents: Agent[];
    roster: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>;
    rosterDate: string | null;
    staffingRequirements: StaffingRequirements;
    staffingCommitments: StaffingCommitments;
    setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
    setRoster: React.Dispatch<React.SetStateAction<Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>>>;
    setRosterDate: React.Dispatch<React.SetStateAction<string | null>>;
    setStaffingRequirements: React.Dispatch<React.SetStateAction<StaffingRequirements>>;
    setStaffingCommitments: React.Dispatch<React.SetStateAction<StaffingCommitments>>;
}

export const useFirebaseSync = (user: User | null, initialAgents: Agent[]): UseFirebaseSyncReturn => {
    const [agents, setAgents] = useState<Agent[]>(initialAgents);
    const [roster, setRoster] = useState<Record<string, 'HN' | 'PH' | 'Ret' | 'Key'>>({});
    const [rosterDate, setRosterDate] = useState<string | null>(null);
    const [staffingRequirements, setStaffingRequirements] = useState<StaffingRequirements>({ hn: {}, ph: {}, ret: {}, key: {} });
    const [staffingCommitments, setStaffingCommitments] = useState<StaffingCommitments>({ hn: {}, ph: {}, ret: {}, key: {} });

    // Initial Load
    useEffect(() => {
        if (!user) return;

        const loadInitialData = async () => {
            try {
                // Roster
                const rosterData = await getRosterFromFirebase();
                if (rosterData && Array.isArray(rosterData)) {
                    const rosterMap: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'> = {};
                    rosterData.forEach(agent => {
                        if (['HN', 'PH', 'Ret', 'Key'].includes(agent.role)) {
                            rosterMap[agent.id] = agent.role as 'HN' | 'PH' | 'Ret' | 'Key';
                        }
                    });
                    setRoster(rosterMap);
                    const now = new Date();
                    setRosterDate(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());
                }

                // Requirements
                const requirements = await getStaffingRequirementsFromFirebase();
                if (requirements) setStaffingRequirements(requirements);

                // Commitments
                const commitments = await getStaffingCommitmentsFromFirebase();
                if (commitments) setStaffingCommitments(commitments);

                // Agents
                const agentsData = await getAgentsFromFirebase();
                if (agentsData && Array.isArray(agentsData) && agentsData.length > 0) {
                    setAgents(agentsData);
                }
            } catch (error) {
                console.error('❌ Error loading initial data:', error);
            }
        };

        loadInitialData();
    }, [user]);

    // Subscriptions
    useEffect(() => {
        if (!user) return;

        const unsubscribeAgents = subscribeToAgentUpdates((data) => {
            setAgents(data.agents);
            // Notification logic for agents is handled inside the component logic or here?
            // To keep hook clean, we stick to data sync. 
            // However, the original App.tsx triggered notifications here.
            // We can add a simple side effect or just trust the new state will trigger downstream effects if needed.
            // But the NOTIFICATION logic specifically checked `data.updatedBy`.
            // We might want to handle notifications separately or pass a callback.
            // For now, let's just sync data.
            notifyIfExternalUpdate(data.updatedBy, user.email, 'Agent Report Updated');
        });

        const unsubscribeRoster = subscribeToRosterUpdates((data) => {
            const rosterMap: Record<string, 'HN' | 'PH' | 'Ret' | 'Key'> = {};
            data.roster.forEach(agent => {
                if (['HN', 'PH', 'Ret', 'Key'].includes(agent.role)) {
                    rosterMap[agent.id] = agent.role as 'HN' | 'PH' | 'Ret' | 'Key';
                }
            });
            setRoster(rosterMap);
            const now = new Date();
            setRosterDate(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());

            notifyIfExternalUpdate(data.updatedBy, user.email, 'Roster Updated');
        });

        const unsubscribeStaffing = subscribeToStaffingUpdates((data) => {
            setStaffingRequirements(data.requirements);
            setStaffingCommitments(data.commitments);

            notifyIfExternalUpdate(data.updatedBy, user.email, 'Staffing Data Updated');
        });

        return () => {
            unsubscribeAgents();
            unsubscribeRoster();
            unsubscribeStaffing();
        };
    }, [user]);

    return {
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
    };
};

import toast from 'react-hot-toast';

// Helper for local notifications
const notifyIfExternalUpdate = (updatedBy: string, currentUserEmail: string, title: string) => {
    if (updatedBy !== currentUserEmail) {
        // In-App Toast
        toast.success(`${title}\nUpdated by ${updatedBy}`, {
            icon: '🔔',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });

        // Browser Notification
        if ('Notification' in window && Notification.permission === 'granted') {
            try {
                const n = new Notification(title, {
                    body: `Updated by ${updatedBy}`,
                    icon: '/favicon.ico'
                });
                n.onclick = () => {
                    window.focus();
                    n.close();
                };
            } catch (e) {
                console.error('Notification error', e);
            }
        }
    }
};
