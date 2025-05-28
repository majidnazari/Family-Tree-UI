import { useState } from 'react';
import MergeManager from '../familyTreeComponent/MergeManager';
import FamilyTreeOnlyView from '../familyTreeComponent/FamilyTreeOnlyView';

export default function Dashboard() {
    const [mode, setMode] = useState('normal'); // 'normal' or 'merge'

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
                <button onClick={() => setMode('normal')}>🌳 View Family Tree</button>
                <button onClick={() => setMode('merge')} style={{ marginLeft: 10 }}>
                    🔀 Merge Mode
                </button>
            </div>

            {mode === 'normal' ? <FamilyTreeOnlyView /> : <MergeManager />}
        </div>
    );
}
