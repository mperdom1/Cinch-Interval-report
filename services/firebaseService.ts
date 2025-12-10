import { realtimeDb } from '../firebase';
import { ref, set, get, update, onValue, off } from 'firebase/database';
import type { Agent, StaffingRequirements, StaffingCommitments } from '../types';

// Save roster data to Firebase
export const saveRosterToFirebase = async (roster: Agent[]): Promise<void> => {
  try {
    // Clean roster data to ensure all properties are defined
    const cleanedRoster = roster.map(agent => ({
      id: agent.id || '',
      name: agent.name || '',
      state: agent.state || '',
      duration: agent.duration || '',
      station: agent.station || '',
      team: agent.team || '',
      skill: agent.skill || '',
      role: agent.role || 'HN'
    }));
    
    const rosterRef = ref(realtimeDb, 'roster');
    await set(rosterRef, {
      data: cleanedRoster,
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
    // Clean agents data to ensure all properties are defined
    const cleanedAgents = agents.map(agent => ({
      id: agent.id || '',
      name: agent.name || '',
      state: agent.state || '',
      duration: agent.duration || '',
      station: agent.station || '',
      team: agent.team || '',
      skill: agent.skill || '',
      role: agent.role || 'HN'
    }));
    
    const agentsRef = ref(realtimeDb, 'agents');
    await set(agentsRef, {
      data: cleanedAgents,
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
export const subscribeToAgentUpdates = (callback: (data: { agents: Agent[], timestamp: string, updatedBy: string, count: number }) => void) => {
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

// Subscribe to roster updates
export const subscribeToRosterUpdates = (callback: (data: { roster: Agent[], timestamp: string, updatedBy: string }) => void) => {
  const rosterUpdateRef = ref(realtimeDb, 'rosterUpdates/latest');
  
  const unsubscribe = onValue(rosterUpdateRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data);
    }
  });

  return () => off(rosterUpdateRef);
};

// Subscribe to staffing updates
export const subscribeToStaffingUpdates = (callback: (data: { requirements: StaffingRequirements, commitments: StaffingCommitments, timestamp: string, updatedBy: string }) => void) => {
  const staffingUpdateRef = ref(realtimeDb, 'staffingUpdates/latest');
  
  const unsubscribe = onValue(staffingUpdateRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data);
    }
  });

  return () => off(staffingUpdateRef);
};

// Trigger agent update notification for all users
export const triggerAgentUpdateNotification = async (agents: Agent[], updatedBy: string): Promise<void> => {
  try {
    // Clean agents data to ensure all properties are defined
    const cleanedAgents = agents.map(agent => ({
      id: agent.id || '',
      name: agent.name || '',
      state: agent.state || '',
      duration: agent.duration || '',
      station: agent.station || '',
      team: agent.team || '',
      skill: agent.skill || '',
      role: agent.role || 'HN'
    }));
    
    const updateRef = ref(realtimeDb, 'agentUpdates/latest');
    await set(updateRef, {
      agents: cleanedAgents,
      timestamp: new Date().toISOString(),
      updatedBy: updatedBy,
      count: cleanedAgents.length
    });
    console.log('Agent update notification triggered');
  } catch (error) {
    console.error('Error triggering agent update notification:', error);
    throw error;
  }
};

// Trigger roster update notification
export const triggerRosterUpdateNotification = async (roster: Agent[], updatedBy: string): Promise<void> => {
  try {
    // Clean roster data to ensure all properties are defined
    const cleanedRoster = roster.map(agent => ({
      id: agent.id || '',
      name: agent.name || '',
      state: agent.state || '',
      duration: agent.duration || '',
      station: agent.station || '',
      team: agent.team || '',
      skill: agent.skill || '',
      role: agent.role || 'HN'
    }));
    
    const updateRef = ref(realtimeDb, 'rosterUpdates/latest');
    await set(updateRef, {
      roster: cleanedRoster,
      timestamp: new Date().toISOString(),
      updatedBy: updatedBy
    });
    console.log('Roster update notification triggered');
  } catch (error) {
    console.error('Error triggering roster update notification:', error);
    throw error;
  }
};

// Trigger staffing update notification
export const triggerStaffingUpdateNotification = async (requirements: StaffingRequirements, commitments: StaffingCommitments, updatedBy: string): Promise<void> => {
  try {
    const updateRef = ref(realtimeDb, 'staffingUpdates/latest');
    await set(updateRef, {
      requirements: requirements,
      commitments: commitments,
      timestamp: new Date().toISOString(),
      updatedBy: updatedBy
    });
    console.log('Staffing update notification triggered');
  } catch (error) {
    console.error('Error triggering staffing update notification:', error);
    throw error;
  }
};
