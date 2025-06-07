import React from 'react';

const UserTable = ({ users, loading, onViewTree, onUpdateUser }) => {
    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading users...</div>;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    return (
        <table style={styles.table} dir="rtl">
            <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Mobile</th>
                    <th style={styles.th}>O.id</th>
                    <th style={styles.th}>Owner.name</th>
                    <th style={styles.th}>Owner.L.name</th>
                    <th style={styles.th}>Owner.B.D</th>
                    <th style={styles.th}>Country</th>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Created</th>
                    <th style={styles.th}>Updated</th>
                    <th style={styles.th}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td colSpan={8} style={{ textAlign: 'center', padding: 20 }}>No users found</td>
                    </tr>
                ) : (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td style={styles.idCell}>{user.id}</td>
                            <td style={styles.td}>{user.mobile}</td>
                            <td style={styles.td}>{user.OwnerPerson.id}</td>
                            <td style={styles.td}>{user.OwnerPerson.first_name}</td>
                            <td style={styles.td}>{user.OwnerPerson.last_name}</td>
                            <td style={styles.td}>{formatDate(user.OwnerPerson.birth_date)}</td>
                            <td style={styles.td}>{user.country_code}</td>
                            <td style={styles.td}>{user.role}</td>
                            <td style={styles.td}>{user.status}</td>
                            <td style={styles.td}>{formatDate(user.created_at)}</td>
                            <td style={styles.td}>{formatDate(user.updated_at)}</td>

                            <td style={styles.td}>
                                <button
                                    style={{ ...styles.actionButton, backgroundColor: '#2E6FA5FF' }}
                                    onClick={() => onViewTree?.(user)}
                                >
                                    View Tree
                                </button>
                                <button
                                    style={{ ...styles.actionButton, backgroundColor: '#05A6E0FF' }}
                                    onClick={() => onUpdateUser?.(user)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

const styles = {
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#2a2e45' },
    th: { backgroundColor: '#3a3f5c', padding: '12px 8px', borderBottom: '1px solid #444' },
    td: { padding: '10px 8px', borderBottom: '1px solid #333', textAlign: 'center' },
    actionButton: {
        padding: '6px 10px',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        margin: '0 4px',
        cursor: 'pointer',
    },
    idCell: {
        padding: '6px 4px',
        borderBottom: '1px solid #333',
        textAlign: 'center',
        width: '60px',          // Adjust width to your preference
        fontSize: '0.85rem',    // Slightly smaller text
        wordBreak: 'break-word',
      },
      
};

export default UserTable;
