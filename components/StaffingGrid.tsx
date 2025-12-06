import React from 'react';
import { STAFFING_GRID_DATA } from '../constants';

interface StaffingTableProps {
    title: string;
    color: 'green' | 'blue' | 'yellow' | 'sky';
    dataPrefix?: number; // Just to vary mock data
}

const StaffingTable: React.FC<StaffingTableProps> = ({ title, color, dataPrefix = 0 }) => {
    
    // Helper to generate consistent mock data
    const getValue = (rowIdx: number, colIdx: number) => {
        // Pseudo-random deterministic number for demo
        return Math.floor(((rowIdx + 1) * (colIdx + 1) + dataPrefix) % 20) + 5;
    };

    const headerColor = {
        green: 'bg-green-100 text-green-800 border-green-200',
        blue: 'bg-blue-100 text-blue-800 border-blue-200',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        sky: 'bg-sky-100 text-sky-800 border-sky-200',
    }[color];

    const titleColor = {
        green: 'text-green-700',
        blue: 'text-blue-700',
        yellow: 'text-yellow-700',
        sky: 'text-sky-700',
    }[color];

    return (
        <div className="border border-gray-300 rounded overflow-hidden text-xs">
            <div className={`p-1.5 font-bold text-center border-b ${headerColor} ${titleColor} uppercase tracking-tight`}>
                {title}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-1 bg-gray-50 w-16">Interval</th>
                            {STAFFING_GRID_DATA.dates.map(d => (
                                <th key={d} className="border p-1 bg-gray-50 min-w-[40px]">{d}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {STAFFING_GRID_DATA.intervals.map((interval, rIdx) => (
                            <tr key={interval}>
                                <td className="border p-1 bg-gray-50 font-medium whitespace-nowrap">{interval}</td>
                                {STAFFING_GRID_DATA.dates.map((d, cIdx) => (
                                    <td key={d} className={`border p-1 hover:bg-gray-50 cursor-pointer ${color === 'green' ? 'bg-green-50/30' : color === 'sky' ? 'bg-sky-50/30' : color === 'yellow' ? 'bg-yellow-50/30' : 'bg-white'}`}>
                                        {getValue(rIdx, cIdx)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StaffingGrid: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Staffing Projections (Requirements vs Commitments)</h2>
                <div className="space-x-2">
                    <button className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">Previous Week</button>
                    <button className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">Next Week</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StaffingTable title="HN CS Requirement" color="green" dataPrefix={1} />
                <StaffingTable title="HN CS Commitment" color="sky" dataPrefix={2} />
                
                <StaffingTable title="Retention Requirement" color="yellow" dataPrefix={3} />
                <StaffingTable title="Retention Commitment" color="sky" dataPrefix={4} />
                
                <StaffingTable title="PH CS Requirement" color="green" dataPrefix={5} />
                <StaffingTable title="PH CS Commitment" color="sky" dataPrefix={6} />
                
                <StaffingTable title="Key Client Support Requirement" color="green" dataPrefix={7} />
                <StaffingTable title="Key Client Support Commitment" color="sky" dataPrefix={8} />
            </div>
        </div>
    );
};

export default StaffingGrid;
