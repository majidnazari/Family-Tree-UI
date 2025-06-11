import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FamilyTree from '../familyTree/FamilyTree'; // Make sure this exists and accepts `personId` prop

const UserTable = ({ users, loading, onUpdateUser }) => {
    const [open, setOpen] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(null);

    const handleOpenTree = (personId) => {
        setSelectedPersonId(personId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPersonId(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading users...</div>;

    return (
        <>
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
                            <td colSpan={12} style={{ textAlign: 'center', padding: 20 }}>No users found</td>
                        </tr>
                    ) : (
                        users.map((user) => {
                            const personId = user?.OwnerPerson?.id;
                            return (
                                <tr key={user.id}>
                                    <td style={styles.idCell}>{user.id}</td>
                                    <td style={styles.td}>{user.mobile}</td>
                                    <td style={styles.td}>{personId || ''}</td>
                                    <td style={styles.td}>{user?.OwnerPerson?.first_name || ''}</td>
                                    <td style={styles.td}>{user?.OwnerPerson?.last_name || ''}</td>
                                    <td style={styles.td}>{formatDate(user?.OwnerPerson?.birth_date)}</td>
                                    <td style={styles.td}>{user.country_code}</td>
                                    <td style={styles.td}>{user.role}</td>
                                    <td style={styles.td}>{user.status}</td>
                                    <td style={styles.td}>{formatDate(user.created_at)}</td>
                                    <td style={styles.td}>{formatDate(user.updated_at)}</td>
                                    <td style={styles.td}>
                                        <button
                                            style={{
                                                ...styles.actionButton,
                                                backgroundColor: personId ? '#2E6FA5FF' : '#555',
                                                cursor: personId ? 'pointer' : 'not-allowed',
                                                opacity: personId ? 1 : 0.5,
                                            }}
                                            onClick={() => personId && handleOpenTree(personId)}
                                            disabled={!personId}
                                            title={!personId ? 'No owner assigned' : 'View family tree'}
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
                            );
                        })
                    )}
                </tbody>
            </table>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                PaperProps={{ style: { minHeight: '600px', backgroundColor: '#1e1e2f', color: 'white' } }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #444' }}>
                    <h2 style={{ margin: 0 }}>Family Tree</h2>
                    <IconButton onClick={handleClose} style={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div style={{ padding: 16 }}>
                    {selectedPersonId && <FamilyTree personId={selectedPersonId} />}
                </div>
            </Dialog>
        </>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#2a2e45',
    },
    th: {
        backgroundColor: '#3a3f5c',
        padding: '12px 8px',
        borderBottom: '1px solid #444',
        color: '#fff',
    },
    td: {
        padding: '10px 8px',
        borderBottom: '1px solid #333',
        textAlign: 'center',
        color: '#eee',
    },
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
        width: '60px',
        fontSize: '0.85rem',
        wordBreak: 'break-word',
        color: '#eee',
    },
};

export default UserTable;
