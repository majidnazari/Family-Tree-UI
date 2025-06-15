import React, { useState, useEffect } from 'react';
import UserSelect from './UserSelect'; // Your separate Select component

const PeopleSearchForm = ({ inputs, onChange, onSearch, onUserSelect }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({ ...inputs });

    // Update filters when inputs or selectedUser changes
    useEffect(() => {
        //alert(selectedUser.value);
        const newFilters = { ...inputs };
        if (selectedUser) {
            newFilters.creator_id = selectedUser.value; // assuming option.value is user_id
        } else {
            delete newFilters.creator_id;
        }
        setFilters(newFilters);
    }, [inputs, selectedUser]);

    const handleUserSelect = (userOption) => {
        setSelectedUser(userOption);
    };

    const handleSearchClick = () => {
        onSearch(filters);
    };

    return (
        <div style={styles.form} dir="rtl">
            {/* Your existing inputs */}
            <input name="first_name" placeholder="First Name" value={filters.first_name} onChange={onChange} style={styles.input} />
            <input name="last_name" placeholder="Last Name" value={filters.last_name} onChange={onChange} style={styles.input} />
            <input name="mobile" placeholder="Mobile" value={filters.mobile} onChange={onChange} style={styles.input} />
            <input name="birth_date" placeholder="Birth Date" value={filters.birth_date} onChange={onChange} style={styles.input} />
            <input name="death_date" placeholder="Death Date" value={filters.death_date} onChange={onChange} style={styles.input} />
            <input name="country_code" placeholder="Country Code" value={filters.country_code} onChange={onChange} style={styles.input} />

            <select name="gender" value={filters.gender} onChange={onChange} style={styles.input}>
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>

            <select name="is_owner" value={filters.is_owner} onChange={onChange} style={styles.input}>
                <option value="">Owner?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>

            <div style={{ minWidth: 300 }}>
                <UserSelect
                    onUserSelect={onUserSelect}
                    defaultValue={inputs.creator_id}  // pass selected creator_id if exists
                />
            </div>


            <button onClick={handleSearchClick} style={styles.button}>Search</button>
        </div>
    );
};

const styles = {
    form: {
        marginBottom: 16,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'flex-start',
        backgroundColor: '#1f2235',
        padding: '16px',
        borderRadius: 8
    },
    input: {
        padding: '10px 12px',
        borderRadius: 4,
        border: '1px solid #555',
        backgroundColor: '#2a2e45',
        color: '#fff',
        minWidth: 140
    },
    button: {
        padding: '10px 16px',
        borderRadius: 4,
        backgroundColor: '#0B4BB9FF',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    }
};

export default PeopleSearchForm;
