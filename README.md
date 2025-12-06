<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CINCH Interval Staffing - WFM Real-Time Operations Dashboard

A comprehensive workforce management (WFM) dashboard for real-time agent monitoring, interval statistics tracking, and staffing analysis.

## Features

- 📊 **Real-Time Interval Statistics** - Live tracking of agent availability and productivity
- 🚨 **Agent Alerts** - Automatic detection of agents exceeding break/ACW thresholds
- 👥 **Role-Based Access Control** - Different views for WFM, Supervisors, and Operations Managers
- 📈 **Staffing Grid** - Weekly staffing requirements vs. commitments visualization
- 💾 **Persistent Data Storage** - Monthly roster data saved locally
- 🎨 **Modern UI** - Clean, responsive interface with Cinch brand colors

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**

## Installation

1. **Clone or download the repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Copy `.env.example` to `.env.local` and set your configuration:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key (if using AI features):
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

### Login

Use your `@cinchhs.com` email and enter your role as the password:
- `wfm` - Full access (data import, staffing grid, all views)
- `supervisor` - Dashboard and alerts view
- `om` - Dashboard and agent breakdown view

### Data Import (WFM Only)

1. **Monthly Roster Setup** (once per month):
   - Paste your roster spreadsheet with columns: CX Name, LOB
   - Click "Save Monthly Roster"
   - This persists locally and doesn't need to be updated until staff changes

2. **Daily Agent Report**:
   - Copy real-time agent data from your WFM system
   - Paste into the agent report field
   - Click "Generate Interval Report"
   - Dashboard automatically updates with current stats

### Views

- **Interval Table**: Real-time statistics for all agent roles
- **Agent Alerts**: Agents exceeding thresholds (Break > 15min, ACW > 5min)
- **Agent Breakdown**: Detailed view of all agents and their current states
- **Staffing Grid**: Weekly requirements vs commitments across all queues

## Project Structure

```
├── components/          # React components
│   ├── AgentAlerts.tsx       # Alert monitoring
│   ├── AgentBreakdown.tsx    # Detailed agent view
│   ├── HeadcountImporter.tsx # Data import interface
│   ├── IntervalTable.tsx     # Main statistics table
│   ├── LoginScreen.tsx       # Authentication
│   ├── StaffingGrid.tsx      # Weekly staffing view
│   └── StateHelper.tsx       # State mapping reference
├── services/           # Business logic
│   ├── authService.ts        # Authentication
│   └── geminiService.ts      # AI integration
├── utils/              # Utility functions
│   └── wfmHelpers.ts         # Data parsing & calculations
├── constants.ts        # Configuration constants
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── package.json        # Dependencies & scripts

```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling (via CDN)
- **Lottie** - Animations
- **Local Storage** - Data persistence

## Troubleshooting

### Dependencies Issue
If you encounter peer dependency warnings, use:
```bash
npm install --legacy-peer-deps
```

### TypeScript Errors
Ensure all dependencies are installed:
```bash
npm install @types/react @types/react-dom @types/node
```

### Data Not Persisting
Check browser console for localStorage errors. Some browsers block localStorage in private/incognito mode.

## Support

For issues or questions, contact the WFM team or refer to the in-app "Legend" button for state mapping help.

## Version

Current Version: 1.0.0 (December 2025)

---

View your app in AI Studio: https://ai.studio/apps/drive/1zVYGO5kMxMmq_nW_S-nVyXgY8DIO9x5Q
