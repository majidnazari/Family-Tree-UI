import { useState } from 'react';
import MergeManager from '../familyTreeComponent/MergeManager';
import FamilyTreeOnlyView from '../familyTreeComponent/FamilyTreeOnlyView';
import { LogOut, Bell } from 'lucide-react';
import { toast } from "react-toastify";
import { clearAuthToken } from '../../utils/authToken';

function Dashboard() {
  const [mode, setMode] = useState('normal');
  const [menuOpen, setMenuOpen] = useState({ tree: true, reports: false });

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('auth_token');
      clearAuthToken();
      toast.info('Logged out');
      window.location.reload();
    }
  };

  const renderContent = () => {
    switch (mode) {
      case 'normal': return <FamilyTreeOnlyView />;
      case 'merge': return <MergeManager />;
      case 'report1': return <div style={styles.pagePlaceholder}>📊 Report 1 Page</div>;
      default: return <div style={styles.pagePlaceholder}>Select a page</div>;
    }
  };

  const toggleMenu = (key) => {
    setMenuOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.leftHeader}>
          <Bell size={20} color="#ddd" />
        </div>
        <div style={styles.rightHeader}>
          <LogOut onClick={handleLogout} style={styles.logoutIcon} title="Logout" />
        </div>
      </header>

      {/* Main layout */}
      <div style={styles.main}>
        {/* Content area */}
        <main style={styles.content}>
          {renderContent()}
        </main>

        {/* Sidebar menu (Right side) */}
        <aside style={styles.sidebar}>
          <div style={styles.accordion}>
            {/* Family Tree Section */}
            <div>
              <div style={styles.accordionHeader} onClick={() => toggleMenu('tree')}>
                🌳 Family Tree
              </div>
              {menuOpen.tree && (
                <div style={styles.subMenu}>
                  <div onClick={() => setMode('normal')} style={styles.subMenuItem}>View Tree</div>
                  <div onClick={() => setMode('merge')} style={styles.subMenuItem}>Merge Tool</div>
                </div>
              )}
            </div>

            {/* Reports Section */}
            <div>
              <div style={styles.accordionHeader} onClick={() => toggleMenu('reports')}>
                📊 Reports
              </div>
              {menuOpen.reports && (
                <div style={styles.subMenu}>
                  <div onClick={() => setMode('report1')} style={styles.subMenuItem}>Report 1</div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <small>© {new Date().getFullYear()} My Family App. All rights reserved.</small>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#101322',
    color: '#e4e6eb',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#1a1d2d',
    borderBottom: '1px solid #2a2d3d',
  },
  leftHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  rightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logoutIcon: {
    cursor: 'pointer',
    color: '#ccc',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
    minHeight: 0,
  },
  content: {
    flex: 1,
    padding: '24px',
    backgroundColor: '#161926',
    overflowY: 'auto',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#1d2033',
    padding: '20px',
    borderLeft: '1px solid #2a2d3d',
    overflowY: 'auto',
  },
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  accordionHeader: {
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#2a2e45',
    userSelect: 'none',
  },
  subMenu: {
    marginTop: '8px',
    marginLeft: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  subMenuItem: {
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#323650',
    color: '#ccc',
    transition: 'background 0.2s',
  },
  footer: {
    padding: '12px 24px',
    backgroundColor: '#1a1d2d',
    borderTop: '1px solid #2a2d3d',
    textAlign: 'center',
    fontSize: '13px',
    color: '#888',
  },
  pagePlaceholder: {
    textAlign: 'center',
    marginTop: '80px',
    fontSize: '18px',
    color: '#aaa',
  },
};

export default Dashboard;
