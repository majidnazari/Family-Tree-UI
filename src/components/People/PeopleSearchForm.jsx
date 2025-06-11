import React from 'react';

const PeopleSearchForm = ({ inputs, onChange, onSearch }) => {
    return (
        <div style={styles.form} dir="rtl">
            <input name="first_name" placeholder="First Name" value={inputs.first_name} onChange={onChange} style={styles.input} />
            <input name="last_name" placeholder="Last Name" value={inputs.last_name} onChange={onChange} style={styles.input} />
            <input name="mobile" placeholder="Mobile" value={inputs.mobile} onChange={onChange} style={styles.input} />
            <input name="birth_date" placeholder="Birth Date" value={inputs.birth_date} onChange={onChange} style={styles.input} />
            <input name="death_date" placeholder="Death Date" value={inputs.death_date} onChange={onChange} style={styles.input} />
            <input name="country_code" placeholder="Country Code" value={inputs.country_code} onChange={onChange} style={styles.input} />

            <select name="gender" value={inputs.gender} onChange={onChange} style={styles.input}>
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>

            <select name="is_owner" value={inputs.is_owner} onChange={onChange} style={styles.input}>
                <option value="">Owner?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>

            <button onClick={onSearch} style={styles.button}>Search</button>
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
