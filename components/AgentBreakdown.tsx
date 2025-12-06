
import React, { useState, useMemo } from 'react';
import { Agent } from '../types';
import { STATE_MAPPING } from '../constants';

interface Props {
    agents: Agent[];
}

const AgentBreakdown: React.FC<Props> = ({ agents }) => {
    const [filter, setFilter] = useState<'ALL' | 'HN' | 'PH' | 'Ret' | 'Key'>('ALL');

    const filteredAgents = useMemo(() => {
        return agents.filter(a => filter === 'ALL' || a.role === filter);
    }, [agents, filter]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Agent Detail View (OM)</h2>
                    <p className="text-xs text-gray-500">Agents considered in current interval stats</p>
                </div>
                <div className="flex gap-1" role="group" aria-label="Filter agents by role">
                    {['ALL', 'HN', 'PH', 'Ret', 'Key'].map(role => (
                        <button
                            key={role}
                            onClick={() => setFilter(role as any)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-colors ${filter === role ? 'bg-indigo-600 text-white shadow' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                            aria-pressed={filter === role}
                            aria-label={`Filter by ${role}`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="overflow-auto flex-1">
                <table className="w-full text-sm text-left border-collapse" role="table" aria-label="Agent breakdown table">
                    <thead className="bg-gray-50 sticky top-0 z-10 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="p-3 border-b border-gray-200" scope="col">Name</th>
                            <th className="p-3 border-b border-gray-200" scope="col">Role</th>
                            <th className="p-3 border-b border-gray-200" scope="col">Team</th>
                            <th className="p-3 border-b border-gray-200" scope="col">State</th>
                            <th className="p-3 border-b border-gray-200" scope="col">Mapped Category</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredAgents.map((agent, idx) => {
                            const mapping = STATE_MAPPING[agent.state];
                            const mappedCode = mapping ? mapping.code : 'Unknown';
                            const mappedColor = mapping ? mapping.color : 'bg-gray-100';

                            return (
                                <tr key={`${agent.id}-${idx}`} className="hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-900">{agent.name}</td>
                                    <td className="p-3">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border
                                            ${agent.role === 'HN' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                              agent.role === 'PH' ? 'bg-green-50 text-green-700 border-green-100' :
                                              agent.role === 'Ret' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                              'bg-purple-50 text-purple-700 border-purple-100'}`}>
                                            {agent.role}
                                        </span>
                                    </td>
                                    <td className="p-3 text-xs text-gray-500">{agent.team}</td>
                                    <td className="p-3">
                                        <span className="font-mono text-xs">{agent.state} ({agent.duration})</span>
                                    </td>
                                    <td className="p-3">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${mappedColor}`}>
                                            {mappedCode}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                         {filteredAgents.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400">No agents found for this filter.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
                Showing {filteredAgents.length} agents
            </div>
        </div>
    );
};

export default AgentBreakdown;
