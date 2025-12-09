import { realtimeDb } from '../firebase';
import { ref, set, get, update, onValue, off } from 'firebase/database';
import type { Agent, StaffingRequirements, StaffingCommitments } from '../types';

// Save roster data to Firebase
export const saveRosterToFirebase = async (roster: Agent[]): Promise<void> => {
  try {
    const rosterRef = ref(realtimeDb, 'roster');
    await set(rosterRef, {
      data: roster,
      lastUpdated: new Date().toISOString()
    });
    console.log('Roster saved to Firebase');
  } catch (error) {
    console.error('Error saving roster to Firebase:', error);
    throw error;
  }
};

// Save staffing requirements to Firebase
export const saveStaffingRequirementsToFirebase = async (requirements: StaffingRequirements): Promise<void> => {
  try {
    const reqRef = ref(realtimeDb, 'staffingRequirements');
    await set(reqRef, {
      data: requirements,
      lastUpdated: new Date().toISOString()
    });
    console.log('Staffing requirements saved to Firebase');
  } catch (error) {
    console.error('Error saving staffing requirements to Firebase:', error);
    throw error;
  }
};

// Save staffing commitments to Firebase
export const saveStaffingCommitmentsToFirebase = async (commitments: StaffingCommitments): Promise<void> => {
  try {
    const commRef = ref(realtimeDb, 'staffingCommitments');
    await set(commRef, {
      data: commitments,
      lastUpdated: new Date().toISOString()
    });
    console.log('Staffing commitments saved to Firebase');
  } catch (error) {
    console.error('Error saving staffing commitments to Firebase:', error);
    throw error;
  }
};

// Save agent data to Firebase
export const saveAgentsToFirebase = async (agents: Agent[]): Promise<void> => {
  try {
    const agentsRef = ref(realtimeDb, 'agents');
    await set(agentsRef, {
      data: agents,
      lastUpdated: new Date().toISOString()
    });
    console.log('Agents data saved to Firebase');
  } catch (error) {
    console.error('Error saving agents to Firebase:', error);
    throw error;
  }
};

// Get roster from Firebase
export const getRosterFromFirebase = async (): Promise<Agent[] | null> => {
  try {
    const rosterRef = ref(realtimeDb, 'roster');
    const snapshot = await get(rosterRef);
    if (snapshot.exists()) {
      return snapshot.val().data;
    }
    return null;
  } catch (error) {
    console.error('Error getting roster from Firebase:', error);
    return null;
  }
};

// Get staffing requirements from Firebase
export const getStaffingRequirementsFromFirebase = async (): Promise<StaffingRequirements | null> => {
  try {
    const reqRef = ref(realtimeDb, 'staffingRequirements');
    const snapshot = await get(reqRef);
    if (snapshot.exists()) {
      return snapshot.val().data;
    }
    return null;
  } catch (error) {
    console.error('Error getting staffing requirements from Firebase:', error);
    return null;
  }
};

// Get staffing commitments from Firebase
export const getStaffingCommitmentsFromFirebase = async (): Promise<StaffingCommitments | null> => {
  try {
    const commRef = ref(realtimeDb, 'staffingCommitments');
    const snapshot = await get(commRef);
    if (snapshot.exists()) {
      return snapshot.val().data;
    }
    return null;
  } catch (error) {
    console.error('Error getting staffing commitments from Firebase:', error);
    return null;
  }
};

// Get agents from Firebase
export const getAgentsFromFirebase = async (): Promise<Agent[] | null> => {
  try {
    const agentsRef = ref(realtimeDb, 'agents');
    const snapshot = await get(agentsRef);
    if (snapshot.exists()) {
      return snapshot.val().data;
    }
    return null;
  } catch (error) {
    console.error('Error getting agents from Firebase:', error);
    return null;
  }
};

// Listen to agent report updates in real-time
export const subscribeToAgentUpdates = (callback: (data: { agents: Agent[], timestamp: string, updatedBy: string }) => void) => {
  const agentUpdateRef = ref(realtimeDb, 'agentUpdates/latest');
  
  const unsubscribe = onValue(agentUpdateRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data);
    }
  });

  // Return unsubscribe function
  return () => off(agentUpdateRef);
};

// Trigger agent update notification for all users
export const triggerAgentUpdateNotification = async (agents: Agent[], updatedBy: string): Promise<void> => {
  try {
    const updateRef = ref(realtimeDb, 'agentUpdates/latest');
    await set(updateRef, {
      agents: agents,
      timestamp: new Date().toISOString(),
      updatedBy: updatedBy,
      count: agents.length
    });
    console.log('Agent update notification triggered');
  } catch (error) {
    console.error('Error triggering agent update notification:', error);
    throw error;
  }
};
