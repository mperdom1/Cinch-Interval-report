# Developer Guide - CINCH Interval Staffing

## Architecture Overview

This application follows a component-based architecture with React and TypeScript. The data flow is managed through React state and localStorage for persistence.

### Key Design Patterns

1. **Component Composition** - Small, focused components with clear responsibilities
2. **Props Drilling** - Simple state management via props (suitable for app size)
3. **Local Storage Persistence** - Roster data persists across sessions
4. **Role-Based Rendering** - UI adapts based on user role (WFM, Supervisor, OM)

## Data Flow

```
User Input (HeadcountImporter)
    ↓
Parser Functions (wfmHelpers.ts)
    ↓
Agent Data (App.tsx state)
    ↓
Statistics Calculator (calculateIntervalStats)
    ↓
Components (IntervalTable, AgentAlerts, etc.)
```

## Key Functions

### `parseRosterData(rawData: string)`
Parses monthly roster data to map agent names to their roles.

**Input Format (Tab-separated):**
```
CX Name          Full Name        LOB
Doe, John        John Doe         CSR HN
Smith, Jane      Jane Smith       CSR PH
```

**Output:**
```typescript
{
  "doe john": "HN",
  "jane smith": "PH"
}
```

### `parseAgentData(rawData: string, roster: Record)`
Parses real-time agent state data.

**Input Format (Tab-separated):**
```
ID    Name         State              Duration   Station   Team            Skill
001   John Doe     InboundContact     05:22      WebRTC    TM-CS_Collective  HN_Skill
```

**Output:**
```typescript
[
  {
    id: "001",
    name: "John Doe",
    state: "InboundContact",
    duration: "05:22",
    station: "WebRTC",
    team: "TM-CS_Collective",
    skill: "HN_Skill",
    role: "HN"
  }
]
```

### `calculateIntervalStats(agents: Agent[])`
Calculates statistics from agent data.

**Logic:**
- Counts agents by role (HN, PH, Ret, Key)
- Categorizes by state (Available, AUX, Break, etc.)
- Calculates metrics (Total Active, Actual, etc.)

## State Mapping

The `STATE_MAPPING` constant maps CXone states to template codes:

```typescript
{
  'InboundContact': { code: 'Inbound', type: 'On Queue', color: 'bg-green-100' },
  'ACW': { code: 'ACW', type: 'Off Queue', color: 'bg-yellow-100' },
  // ... etc
}
```

### Categories:
- **On Queue** - Agent is productive (Available, InboundContact, etc.)
- **Off Queue** - Agent is not handling calls (ACW, Break, Meeting, etc.)
- **System** - System-related states

## Adding New Features

### Adding a New Agent State

1. Update `STATE_MAPPING` in `constants.ts`:
```typescript
'NewState': { code: 'Code', type: 'On Queue', color: 'bg-blue-100' }
```

2. Update calculation logic in `wfmHelpers.ts` if needed

3. Update `StateHelper.tsx` component (auto-updates from STATE_MAPPING)

### Adding a New Role

1. Update types in `types.ts`:
```typescript
role: 'HN' | 'PH' | 'Ret' | 'Key' | 'NewRole';
```

2. Update parsers in `wfmHelpers.ts`:
```typescript
const getRoleFromContext = (...contexts: string[]): 'HN' | 'PH' | 'Ret' | 'Key' | 'NewRole' | null => {
  // Add detection logic
  if (s.includes('newrole')) return 'NewRole';
}
```

3. Update `MOCK_INTERVAL_DATA` in `constants.ts` to include new column

4. Update components to display new role

### Adding a New User Role

1. Update `types.ts`:
```typescript
export type UserRole = 'wfm' | 'supervisor' | 'om' | 'newrole';
```

2. Update `authService.ts`:
```typescript
const validRoles: UserRole[] = ['wfm', 'supervisor', 'om', 'newrole'];
```

3. Update `App.tsx` to add view logic for new role

## Performance Optimization

### Current Optimizations
- ✅ `useMemo` for filtered/calculated data
- ✅ `useCallback` for event handlers
- ✅ LocalStorage for data persistence
- ✅ Memoized alert calculations

### Future Optimizations
- Consider React.lazy() for code splitting if app grows
- Use React Query for server data if backend is added
- Implement virtual scrolling for large agent lists

## Testing Strategy

### Unit Tests (To Be Added)
```typescript
// Example test for parseRosterData
describe('parseRosterData', () => {
  it('should parse valid roster data', () => {
    const input = "Name\tLOB\nJohn Doe\tCSR HN";
    const result = parseRosterData(input);
    expect(result['doe john']).toBe('HN');
  });
});
```

### Integration Tests (To Be Added)
- Test full data import flow
- Test role-based view rendering
- Test localStorage persistence

## Error Handling

### Current Strategy
- Try-catch blocks in parsers
- Input validation before processing
- User-friendly error messages
- Console logging for debugging

### Error Scenarios Handled
1. Invalid roster data format
2. Missing agent data columns
3. LocalStorage quota exceeded
4. Invalid user credentials
5. Empty data imports

## Browser Compatibility

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- LocalStorage API
- ES6+ JavaScript
- CSS Grid & Flexbox
- Clipboard API

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview  # Test production build locally
```

### Environment Variables
Create `.env.local` for local development:
```env
GEMINI_API_KEY=your_key_here
VITE_APP_ENV=development
```

## Common Issues & Solutions

### Issue: Dependencies won't install
**Solution:** Use legacy peer deps
```bash
npm install --legacy-peer-deps
```

### Issue: TypeScript errors
**Solution:** Ensure all type definitions are installed
```bash
npm install @types/react @types/react-dom @types/node
```

### Issue: Data not persisting
**Solution:** Check localStorage availability and quota

### Issue: Incorrect role assignment
**Solution:** Verify roster data format matches expected columns (CX Name, LOB)

## Code Style

### Naming Conventions
- Components: PascalCase (`AgentAlerts.tsx`)
- Functions: camelCase (`parseRosterData`)
- Constants: UPPER_SNAKE_CASE (`STATE_MAPPING`)
- Types: PascalCase (`Agent`, `IntervalRow`)

### File Organization
- One component per file
- Group related utilities in same file
- Keep constants separate from logic
- Types in dedicated `types.ts`

## Contributing

1. Create feature branch
2. Make changes with proper TypeScript types
3. Test locally with `npm run dev`
4. Build production with `npm run build`
5. Submit for review

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
