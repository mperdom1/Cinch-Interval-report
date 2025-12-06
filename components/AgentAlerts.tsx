import React, { useMemo } from 'react';
import { Agent } from '../types';
import { Player } from '@lottiefiles/react-lottie-player';

interface Props {
    agents: Agent[];
}

const AgentAlerts: React.FC<Props> = ({ agents }) => {
    // Filter agents who are in alert states - memoized for performance
    const alertAgents = useMemo(() => {
        return agents.filter(a => {
            const state = a.state.toLowerCase();
            return state.includes('break') || 
                   state.includes('acw') || 
                   state.includes('meeting') ||
                   state.includes('offline') ||
                   state.includes('coach');
        }).map(a => {
            let status = 'ok';
            const durParts = a.duration.split(':');
            const minutes = durParts.length >= 2 ? parseInt(durParts[0]) * 60 + parseInt(durParts[1]) : 0;
            
            // Thresholds
            if (a.state.toLowerCase().includes('break') && minutes > 15) status = 'critical';
            else if (a.state === 'ACW' && minutes > 5) status = 'warning';
            
            return { ...a, status, minutes };
        }).sort((a, b) => b.minutes - a.minutes); // Sort by duration descending
    }, [agents]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-red-50 to-white border-b border-red-100 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <div className="bg-red-100 p-1.5 rounded-md text-red-600">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-800">Alerts & Long Duration</h2>
                        <p className="text-[10px] text-gray-500 font-medium">Break &gt; 15m, ACW &gt; 5m</p>
                    </div>
                </div>
                <span className={`${alertAgents.length > 0 ? 'bg-red-500 text-white shadow-red-200' : 'bg-gray-200 text-gray-500'} shadow-md text-xs px-2.5 py-1 rounded-full font-bold transition-colors`}>
                    {alertAgents.length}
                </span>
            </div>
            
            <div className="overflow-y-auto flex-1 p-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {alertAgents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <Player
                            autoplay
                            loop
                            src="https://lottie.host/80e9324c-9f8f-4d43-9828-56847849b257/2Z8fXp82x3.json"
                            style={{ height: '120px', width: '120px' }}
                        />
                        <p className="text-sm text-gray-700 font-bold mt-2">All Clear!</p>
                        <p className="text-xs text-gray-400">Great job, no agents in alert status.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm" role="table" aria-label="Agent alerts table">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold sticky top-0 z-10">
                            <tr>
                                <th className="p-3 pl-4 text-left" scope="col">Agent</th>
                                <th className="p-3 text-center" scope="col">State</th>
                                <th className="p-3 pr-4 text-right" scope="col">Dur</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {alertAgents.map((agent, i) => (
                                <tr key={i} className="hover:bg-red-50/30 transition-colors group">
                                    <td className="p-3 pl-4">
                                        <div className="font-semibold text-gray-800 text-xs">{agent.name}</div>
                                        <div className="text-[10px] text-gray-400 truncate max-w-[100px]">{agent.team}</div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border
                                            ${agent.state.toLowerCase().includes('break') ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                                            agent.state === 'ACW' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                            {agent.state}
                                        </span>
                                    </td>
                                    <td className="p-3 pr-4 text-right">
                                        <div className={`font-mono text-xs font-bold ${agent.status === 'critical' ? 'text-red-600' : agent.status === 'warning' ? 'text-orange-500' : 'text-gray-600'}`}>
                                            {agent.duration}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AgentAlerts;