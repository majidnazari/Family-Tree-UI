import React, { useState, useEffect } from 'react';
import useAllUsers from '../../hooks/user/useAllUsers';
import paginationConfig from '../../config/paginationConfig';


const statusEnum = ['Blocked', 'Active', 'Inactive','Suspend','New'];
const roleEnum = ['User', 'Admin', 'Supporter'];

const UsersView = () => {
    // Controlled input states (do NOT immediately fetch)
    const [inputs, setInputs] = useState({
        status: '',
        country_code: '',
        mobile: '',
        role: '',
    });

    // Filters state used to fetch data (updated only on search or pagination)
    const [filters, setFilters] = useState({
        status: '',
        country_code: '',
        mobile: '',
        role: '',
        page: paginationConfig.DEFAULT_PAGE,
        first: paginationConfig.DEFAULT_FIRST,
    });

    // Destructure users data and pagination from hook
    const { users, paginator, loading } = useAllUsers(filters);

    // Update inputs state on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // On search button click, set filters state, reset page to 1
    const handleSearch = () => {
        setFilters({
            ...inputs,
            page: paginationConfig.DEFAULT_PAGE,
            first: paginationConfig.DEFAULT_FIRST,
        });
    };

    // Go to new page on pagination click
    const goToPage = (newPage) => {
        if (newPage < 1 || (paginator?.lastPage && newPage > paginator.lastPage)) return;
        setFilters(prev => ({
            ...prev,
            page: newPage,
        }));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>👤 Active Users</h2>

            {/* Filter Form */}
            <div style={styles.searchForm}>
                <input
                    name="mobile"
                    placeholder="Mobile"
                    value={inputs.mobile}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <input
                    name="country_code"
                    placeholder="Country Code"
                    value={inputs.country_code}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <select name="status" value={inputs.status} onChange={handleInputChange} style={styles.input}>
                    <option value="">All Statuses</option>
                    {statusEnum.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <select name="role" value={inputs.role} onChange={handleInputChange} style={styles.input}>
                    <option value="">All Roles</option>
                    {roleEnum.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                <button onClick={handleSearch} style={styles.button}>Search</button>
            </div>

            {/* Table */}
            {loading ? (
                <div style={styles.loading}>Loading users...</div>
            ) : (
                <table style={styles.table} dir="rtl">
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
                        {users.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: 'center', padding: 20 }}>No users found</td></tr>
                        ) : users.map(user => (
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
            )}

            {/* Pagination */}
            <div style={styles.pagination}>
                <button
                    onClick={() => goToPage(filters.page - 1)}
                    disabled={filters.page <= 1}
                    style={styles.pageButton}
                >
                    ⬅ Prev
                </button>

                {[...Array(paginator?.lastPage || 1)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            style={{
                                ...styles.pageButton,
                                fontWeight: filters.page === pageNum ? 'bold' : 'normal',
                                backgroundColor: filters.page === pageNum ? '#4caf50' : '#3a3f5c',
                            }}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button
                    onClick={() => goToPage(filters.page + 1)}
                    disabled={!paginator?.hasMorePages}
                    style={styles.pageButton}
                >
                    Next ➡
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: 24,
        backgroundColor: '#1f2235',
        borderRadius: 8,
        color: '#fff',
    },
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    loading: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 18,
        color: '#aaa',
    },
    searchForm: {
        display: 'flex',
        gap: 10,
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    input: {
        padding: 8,
        borderRadius: 4,
        border: '1px solid #ccc',
        minWidth: 120,
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#2a2e45',
    },
    th: {
        backgroundColor: '#3a3f5c',
        padding: '12px 8px',
        borderBottom: '1px solid #444',
    },
    td: {
        padding: '10px 8px',
        borderBottom: '1px solid #333',
        textAlign: 'center',
    },
    pagination: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
    pageButton: {
        padding: '6px 12px',
        border: '1px solid #ccc',
        backgroundColor: '#3a3f5c',
        color: '#fff',
        borderRadius: 4,
        cursor: 'pointer',
    },
};

export default UsersView;
