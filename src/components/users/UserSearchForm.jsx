import React from 'react';

const statusEnum = ['Blocked', 'Active', 'Inactive', 'Suspend', 'New'];
const roleEnum = ['User', 'Admin', 'Supporter'];
const columnEnum = ['id', 'mobile', 'country_code', 'role', 'status', 'created_at', 'updated_at'];
const orderEnum = ['ASC', 'DESC'];

const UserSearchForm = ({ inputs, onChange, onSearch }) => {
    return (
        <div style={styles.form} dir="rtl">
            <input name="mobile" placeholder="Mobile" value={inputs.mobile} onChange={onChange} style={styles.input} />
            <input name="country_code" placeholder="Country Code" value={inputs.country_code} onChange={onChange} style={styles.input} />
            <select name="status" value={inputs.status} onChange={onChange} style={styles.input}>
                <option value="">All Statuses</option>
                {statusEnum.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <select name="role" value={inputs.role} onChange={onChange} style={styles.input}>
                <option value="">All Roles</option>
                {roleEnum.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
            <select name="column" value={inputs.column} onChange={onChange} style={styles.input}>
                {columnEnum.map((col) => <option key={col} value={col}>Sort by {col}</option>)}
            </select>
            <select name="order" value={inputs.order} onChange={onChange} style={styles.input}>
                {orderEnum.map((ord) => <option key={ord} value={ord}>{ord}</option>)}
            </select>
            <button onClick={onSearch} style={styles.button}>Search</button>
        </div>
    );
};

const styles = {
    form: { display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' },
    input: { padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 120 },
    button: { padding: '8px 16px', backgroundColor: '#0D33B0FF', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
};

export default UserSearchForm;
