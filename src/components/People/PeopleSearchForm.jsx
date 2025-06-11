import React from 'react';

const PeopleSearchForm = ({ inputs, onChange, onSearch }) => {
    return (
        <div style={styles.form}>
            <input style={styles.input} type="text" name="first_name" placeholder="First Name" value={inputs.first_name} onChange={onChange} />
            <input style={styles.input} type="text" name="last_name" placeholder="Last Name" value={inputs.last_name} onChange={onChange} />
            <input style={styles.input} type="text" name="mobile" placeholder="Mobile" value={inputs.mobile} onChange={onChange} />
            <input style={styles.input} type="text" name="creator_id" placeholder="Creator ID" value={inputs.creator_id} onChange={onChange} />
            <input style={styles.input} type="text" name="editor_id" placeholder="Editor ID" value={inputs.editor_id} onChange={onChange} />
            <select style={styles.input} name="gender" value={inputs.gender} onChange={onChange}>
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>
            <select style={styles.input} name="is_owner" value={inputs.is_owner} onChange={onChange}>
                <option value="">Is Owner</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
            <select style={styles.input} name="status" value={inputs.status} onChange={onChange}>
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>

            <button style={styles.button} onClick={onSearch}>Search</button>
        </div>
    );
};

const styles = {
    form: { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
    input: { padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 120 },
    button: { padding: '8px 16px', borderRadius: 4, backgroundColor: '#4caf50', color: '#fff', border: 'none' }
};

export default PeopleSearchForm;
