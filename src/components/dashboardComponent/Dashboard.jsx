import { useState } from 'react';
import MergeManager from '../familyTreeComponent/MergeManager';
import FamilyTreeOnlyView from '../familyTreeComponent/FamilyTreeOnlyView';
import { LogOut } from 'lucide-react';
import { toast } from "react-toastify";
import { clearAuthToken } from '../../utils/authToken';

function Dashboard() {
    const [mode, setMode] = useState('normal'); // 'normal' or 'merge'

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (!confirmed) return;

        localStorage.removeItem('auth_token');
        clearAuthToken(); //  clean abstraction
        toast.info('Logged out');
        window.location.reload(); // or navigate to login page
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
                <LogOut
                    onClick={handleLogout}
                    style={styles.logoutIcon}
                    title="Logout"
                />
                <button onClick={() => setMode('normal')}>🌳 View Family Tree</button>
                <button onClick={() => setMode('merge')} style={{ marginLeft: 10 }}>
                    🔀 Merge Mode
                </button>

            </div>

            {mode === 'normal' ? <FamilyTreeOnlyView /> : <MergeManager />}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    logoutIcon: {
        cursor: 'pointer',
        color: '#333',
    },
};


export default Dashboard;