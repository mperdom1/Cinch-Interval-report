// Mapping logic from the user's images
export const STATE_MAPPING: Record<string, { code: string; type: 'On Queue' | 'Off Queue' | 'System'; color: string }> = {
  'InboundContact': { code: 'Inbound', type: 'On Queue', color: 'bg-green-100' },
  'ACW': { code: 'ACW', type: 'On Queue', color: 'bg-green-100' },
  'OutboundContact': { code: 'Outbound', type: 'On Queue', color: 'bg-green-100' },
  'SCHD_Offline_Ldr_Approved': { code: 'Off Phone', type: 'Off Queue', color: 'bg-yellow-100' },
  'UNSCHD_System_Issues': { code: 'System Issue', type: 'Off Queue', color: 'bg-yellow-100' },
  'ACW_Outbound': { code: 'ACW_Outbound', type: 'Off Queue', color: 'bg-yellow-100' },
  'SCHD_Break': { code: 'Break', type: 'Off Queue', color: 'bg-yellow-100' },
  'UNSCHD_Break': { code: 'Unscheduled break', type: 'Off Queue', color: 'bg-yellow-100' },
  'InboundPending': { code: 'RING', type: 'On Queue', color: 'bg-green-100' },
  'Refused': { code: 'RING', type: 'On Queue', color: 'bg-green-100' },
  'Unavailable': { code: 'Off Phone', type: 'Off Queue', color: 'bg-yellow-100' },
  'SCHD_Group_Meeting': { code: 'Meeting', type: 'Off Queue', color: 'bg-yellow-100' },
  'Available': { code: 'Available', type: 'On Queue', color: 'bg-green-100' },
  'SCHD_Training': { code: 'Training', type: 'Off Queue', color: 'bg-yellow-100' },
  'SCHD_Coaching_1x1': { code: 'Coaching', type: 'Off Queue', color: 'bg-yellow-100' },
  'InboundConsult': { code: 'Inbound', type: 'On Queue', color: 'bg-green-100' },
  'OutboundConsult': { code: 'Outbound', type: 'On Queue', color: 'bg-green-100' },
  'OutboundPending': { code: 'Outbound', type: 'On Queue', color: 'bg-green-100' },
  'ConsultPending': { code: 'RING', type: 'On Queue', color: 'bg-green-100' },
  'CallbackPending': { code: 'Outbound', type: 'On Queue', color: 'bg-green-100' },
  'HeldPartyAbandoned': { code: 'Unavailable', type: 'Off Queue', color: 'bg-yellow-100' },
  'TransferPending': { code: 'Transfer', type: 'On Queue', color: 'bg-green-100' },
};

// Colors based on request:
// Dark Green: #058623
// Medium Green: #5CCC69
// Light Green: #73FF83

export const MOCK_INTERVAL_DATA = [
  { label: 'Total Active', hn: 24, ph: 44, ret: 18, key: 7, isHeader: false, color: 'bg-white' },
  // Avail Status - Dark Green
  { label: 'Avail Status', hn: 6, ph: 13, ret: 8, key: 1, isHeader: false, color: 'bg-[#058623] text-white font-bold' },
  { label: 'AUX', hn: 1, ph: 7, ret: 2, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'Actual', hn: 23, ph: 37, ret: 16, key: 7, isHeader: false, color: 'bg-white font-bold' },
  { label: 'HC Required', hn: 11, ph: 24, ret: 9, key: 4, isHeader: false, color: 'bg-white' },
  { label: 'Commits', hn: 11, ph: 24, ret: 9, key: 4, isHeader: false, color: 'bg-white' },
  // Attainment - Medium Green
  { label: 'Actual vs Required Attainment', hn: '209%', ph: '154%', ret: '178%', key: '175%', isHeader: false, color: 'bg-[#5CCC69] text-black font-bold' },
  { label: 'Actual vs Committed Attainment', hn: '209%', ph: '154%', ret: '178%', key: '175%', isHeader: false, color: 'bg-[#5CCC69] text-black font-bold' },
  { label: 'FTE before 98%', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: '+/- FTE before 100%', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: '+/- FTE before 110%', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  // Break/Meal - Light Green
  { label: 'Break', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-[#73FF83] font-bold text-black' },
  { label: 'Meal', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-[#73FF83] font-bold text-black' },
  // Total Offlines - Dark Green (Was red, requested green)
  { label: 'Total Offlines', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-[#058623] text-white font-bold' },
  { label: '', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-[#73FF83]' },
  { label: '', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-[#73FF83]' },
  { label: 'ACW_Outbound', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'Training', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'Meeting', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'Coaching', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'Off Phone', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'Unscheduled Break', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'System Issue', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
  { label: 'Mentoring', hn: 0, ph: 0, ret: 0, key: 0, isHeader: false, color: 'bg-white' },
];

export const STAFFING_GRID_DATA = {
  intervals: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
  dates: ["1-Dec", "2-Dec", "3-Dec", "4-Dec", "5-Dec", "6-Dec", "7-Dec"]
}