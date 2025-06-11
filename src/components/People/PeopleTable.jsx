import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FamilyTree from '../familyTree/FamilyTree';
import StarIcon from '@mui/icons-material/Star';
import UpdatePersonDialog from './UpdatePersonDialog';

const PeopleTable = ({ people, loading, onUpdatePerson }) => {
    const [openTree, setOpenTree] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleOpenUpdate = (person) => {
        setSelectedPerson(person);
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setSelectedPerson(null);
    };

    const handleOpenTree = (personId) => {
        setSelectedPersonId(personId);
        setOpenTree(true);
    };

    const handleCloseTree = () => {
        setOpenTree(false);
        setSelectedPersonId(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    const getGenderStyle = (gender) => {
        return {
            color: gender === 1 ? '#6EC1E4' : '#E46EC1',
            fontWeight: 'bold',
        };
    };

    const getRowStyle = (isOwner) => {
        return isOwner
            ? { backgroundColor: '#3a3f5caa' }
            : {};
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading people...</div>;

    return (
        <>
            <table style={styles.table} dir="rtl">
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>First Name</th>
                        <th style={styles.th}>Last Name</th>
                        <th style={styles.th}>Mobile</th>
                        <th style={styles.th}>Gender</th>
                        <th style={styles.th}>Birth Date</th>
                        <th style={styles.th}>Owner</th>
                        <th style={styles.th}>Creator</th>
                        <th style={styles.th}>Editor</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {people.length === 0 ? (
                        <tr>
                            <td colSpan={10} style={{ textAlign: 'center', padding: 20 }}>No people found</td>
                        </tr>
                    ) : (
                        people.map((person) => (
                            <tr key={person.id} style={getRowStyle(person.is_owner)}>
                                <td style={styles.idCell}>
                                    {person.id}
                                    {person.is_owner && (
                                        <StarIcon style={{ color: '#FFD700', fontSize: 18, marginLeft: 5 }} />
                                    )}
                                </td>
                                <td style={styles.td}>{person.first_name}</td>
                                <td style={styles.td}>{person.last_name}</td>
                                <td style={styles.td}>{person.mobile}</td>
                                <td style={{ ...styles.td, ...getGenderStyle(person.gender) }}>
                                    {person.gender === 1 ? "Male" : "Female"}
                                </td>
                                <td style={styles.td}>{formatDate(person.birth_date)}</td>
                                <td style={styles.td}>{person.is_owner ? "Yes" : "No"}</td>
                                <td style={styles.td}>
                                    {person.Creator ? `${person.Creator.id} - ${person.Creator.mobile} - ${person.Creator.role}` : "-"}
                                </td>
                                <td style={styles.td}>
                                    {person.Editor ? `${person.Editor.id} - ${person.Editor.mobile} - ${person.Editor.role}` : "-"}
                                </td>
                                <td style={styles.td}>
                                    <button
                                        style={{ ...styles.actionButton, backgroundColor: '#2E6FA5FF' }}
                                        onClick={() => handleOpenTree(person.id)}
                                    >
                                        View Tree
                                    </button>
                                    <button
                                        style={{ ...styles.actionButton, backgroundColor: '#05A6E0FF' }}
                                        onClick={() => onUpdatePerson(person.id)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Family Tree Dialog */}
            <Dialog
                open={openTree}
                onClose={handleCloseTree}
                fullWidth
                maxWidth="lg"
                PaperProps={{ style: { minHeight: '600px', backgroundColor: '#1e1e2f', color: 'white' } }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #444' }}>
                    <h2 style={{ margin: 0 }}>Family Tree</h2>
                    <IconButton onClick={handleCloseTree} style={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div style={{ padding: 16 }}>
                    {selectedPersonId && <FamilyTree personId={selectedPersonId} />}
                </div>
            </Dialog>

            {/* Update Person Dialog */}
            {selectedPerson && (
                <Dialog
                    open={openUpdate}
                    onClose={handleCloseUpdate}
                    fullWidth
                    maxWidth="md"
                    PaperProps={{ style: { minHeight: '500px', backgroundColor: '#1e1e2f', color: 'white' } }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #444' }}>
                        <h2 style={{ margin: 0 }}>Update Person</h2>
                        <IconButton onClick={handleCloseUpdate} style={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div style={{ padding: 16 }}>
                        <UpdatePersonDialog person={selectedPerson} onClose={handleCloseUpdate} />
                    </div>
                </Dialog>
            )}
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

export default PeopleTable;
