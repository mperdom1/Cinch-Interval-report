import React from 'react';
import { Agent } from '../types';

interface ActiveAgentTableProps {
  agents: Agent[];
}

const columns = [
  { key: 'duration', label: 'Time IN Session' },
  { key: 'state', label: 'AUX' },
  { key: 'id', label: 'Cxone ID' },
  { key: 'name', label: 'Agent Name' },
  { key: 'team', label: 'Team Manager' },
  { key: 'role', label: 'LOB' },
];

export const ActiveAgentTable: React.FC<ActiveAgentTableProps> = ({ agents }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border text-xs">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="border px-2 py-1 bg-blue-100">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, idx) => (
            <tr key={agent.id + idx}>
              {columns.map(col => (
                <td key={col.key} className="border px-2 py-1 text-center">{(agent as any)[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
