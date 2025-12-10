import React, { useState, useEffect, useMemo } from 'react';
import { IntervalRow } from '../types';

interface Props {
    data: IntervalRow[];
}

const IntervalTable: React.FC<Props> = ({ data }) => {
    const [currentTimeInterval, setCurrentTimeInterval] = useState('');

    useEffect(() => {
        const updateInterval = () => {
            const now = new Date();
            
            // Get Time in America/New_York (EST/EDT)
            const estTimeString = now.toLocaleTimeString('en-US', { 
                timeZone: 'America/New_York', 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Parse HH:MM from the EST string
            const [h, m] = estTimeString.split(':').map(Number);
            
            const startHour = h; 
            const minutes = m;
            
            // Calculate start time (XX:00 or XX:30)
            const isSecondHalf = minutes >= 30;
            const startMin = isSecondHalf ? 30 : 0;
            
            // Calculate end time
            let endHour = startHour;
            let endMin = startMin + 30;
            if (endMin === 60) {
                endMin = 0;
                endHour = startHour + 1;
                if (endHour === 24) endHour = 0;
            }

            const formatTime = (h: number, m: number) => {
                const ampm = h >= 12 ? 'PM' : 'AM';
                const h12 = h % 12 || 12;
                return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
            };

            setCurrentTimeInterval(`${formatTime(startHour, startMin)} - ${formatTime(endHour, endMin)} EST`);
        };

        updateInterval();
        // Update every minute to catch interval change
        const timer = setInterval(updateInterval, 60000);
        return () => clearInterval(timer);
    }, []);

    const copyTable = async () => {
        try {
            // Create a text version for clipboard
            const header = `Interval: ${currentTimeInterval}\tCSR HN\tCSR PH\tRetention\tKey Client Support\n`;
            const rows = data.map(r => `${r.label}\t${r.hn}\t${r.ph}\t${r.ret}\t${r.key}`).join('\n');
            await navigator.clipboard.writeText(header + rows);
            alert('✅ Table copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy table:', error);
            alert('❌ Failed to copy table. Please try again.');
        }
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-base font-semibold text-gray-800">Interval Stats (Real-Time)</h2>
                    <span className="text-xs font-bold text-[#058623]">
                        Current Interval: {currentTimeInterval}
                    </span>
                </div>
                <button 
                    onClick={copyTable}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    aria-label="Copy table data for chat"
                >
                    Copy for Chat
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse" role="table" aria-label="Interval statistics table">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1 bg-[#5CCC69] font-bold text-white w-1/3 text-left text-xs">Role</th>
                            <th className="border px-2 py-1 bg-white font-bold text-black text-xs">CSR HN</th>
                            <th className="border px-2 py-1 bg-white font-bold text-black text-xs">CSR PH</th>
                            <th className="border px-2 py-1 bg-white font-bold text-black text-xs">Retention</th>
                            <th className="border px-2 py-1 bg-white font-bold text-black text-xs">Key Client Support</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx}>
                                <td className={`border px-2 py-0.5 text-left text-xs ${row.color.includes('bg-white') ? 'bg-white font-medium' : row.color.includes('text-white') ? 'font-bold' : 'font-medium'}`}>
                                    {row.label}
                                </td>
                                <td className={`border py-0.5 text-xs ${row.color}`}>{row.hn}</td>
                                <td className={`border py-0.5 text-xs ${row.color}`}>{row.ph}</td>
                                <td className={`border py-0.5 text-xs ${row.color}`}>{row.ret}</td>
                                <td className={`border py-0.5 text-xs ${row.color}`}>{row.key}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IntervalTable;