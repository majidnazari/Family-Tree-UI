import React from 'react';
import useAllUsers from '../../hooks/user/useAllUsers';

const UsersView = () => {
    const { users, loading } = useAllUsers();

    if (loading) return <div style={styles.loading}>Loading users...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>👤 Active Users</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Mobile</th>
                        <th style={styles.th}>Country</th>
                        <th style={styles.th}>Role</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Created</th>
                        <th style={styles.th}>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={styles.td}>{user.id}</td>
                            <td style={styles.td}>{user.mobile}</td>
                            <td style={styles.td}>{user.country_code}</td>
                            <td style={styles.td}>{user.role}</td>
                            <td style={styles.td}>{user.status}</td>
                            <td style={styles.td}>{user.created_at}</td>
                            <td style={styles.td}>{user.updated_at}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: 24,
        backgroundColor: '#1f2235',
        borderRadius: 8,
    },
    title: {
        marginBottom: 16,
        fontSize: 20,
        color: '#fff',
    },
    loading: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 18,
        color: '#aaa',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#2a2e45',
        color: '#e4e6eb',
    },
    th: {
        backgroundColor: '#3a3f5c',
        padding: '12px 8px',
        textAlign: 'left',
        borderBottom: '1px solid #444',
    },
    td: {
        padding: '10px 8px',
        borderBottom: '1px solid #333',
        backgroundColor: '#2a2e45',
      },
      
};

export default UsersView;
