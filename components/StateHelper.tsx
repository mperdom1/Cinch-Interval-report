import React, { useState } from 'react';
import { STATE_MAPPING } from '../constants';

const StateHelper: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStates = Object.entries(STATE_MAPPING).filter(([key]) => 
        key.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full" id="state-helper-table">
            <div className="p-4 bg-white sticky top-0 border-b border-gray-100 z-10">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Filter by state name..." 
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#5CCC69] focus:border-transparent outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider sticky top-[73px]">
                        <tr>
                            <th className="p-3 pl-6 border-b border-gray-200">Cxone State</th>
                            <th className="p-3 border-b border-gray-200">Template Code</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredStates.map(([key, value]) => (
                            <tr key={key} className="hover:bg-gray-50 transition-colors group">
                                <td className={`p-3 pl-6 font-medium text-gray-900 group-hover:text-black`}>
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs border border-transparent ${value.color.replace('bg-', 'bg-opacity-50 ')}`}>
                                        {key}
                                    </span>
                                </td>
                                <td className="p-3 text-gray-600">
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${value.color}`}>
                                        {value.code}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filteredStates.length === 0 && (
                            <tr>
                                <td colSpan={2} className="p-8 text-center text-gray-400 italic">No matching states found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StateHelper;