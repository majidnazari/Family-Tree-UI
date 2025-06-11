import React from 'react';

const PeopleTable = ({ people, loading }) => {
    if (loading) return <div>Loading...</div>;

    return (
        <table style={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Mobile</th>
                    <th>Gender</th>
                    <th>Birth Date</th>
                    <th>Death Date</th>
                    <th>Is Owner</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {people.map(person => (
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.first_name}</td>
                        <td>{person.last_name}</td>
                        <td>{person.mobile || '-'}</td>
                        <td>{person.gender === 1 ? 'Male' : 'Female'}</td>
                        <td>{person.birth_date}</td>
                        <td>{person.death_date || '-'}</td>
                        <td>{person.is_owner ? 'Yes' : 'No'}</td>
                        <td>{person.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const styles = {
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#2a2d3d', color: '#fff' },
    th: { borderBottom: '1px solid #444', padding: '10px' },
    td: { padding: '10px', borderBottom: '1px solid #333' },
};

export default PeopleTable;
