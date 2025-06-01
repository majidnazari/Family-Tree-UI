import React, { useState } from 'react';
import useAllUsers from '../../hooks/user/useAllUsers';
import paginationConfig from '../../config/paginationConfig';
import UserSearchForm from './UserSearchForm';
import UserTable from './UserTable';
import Pagination from './Pagination';

const UsersView = () => {
    const [inputs, setInputs] = useState({
        status: '',
        country_code: '',
        mobile: '',
        role: '',
        column: 'id',
        order: 'ASC',
    });

    const [filters, setFilters] = useState({
        status: '',
        country_code: '',
        mobile: '',
        role: '',
        orderBy: { column: 'id', order: 'ASC' },
        page: paginationConfig.DEFAULT_PAGE,
        first: paginationConfig.DEFAULT_FIRST,
    });

    const { users, paginator, loading } = useAllUsers(filters);

    const handleViewTree = (user) => {
        console.log('Viewing tree for user:', user);
        // Navigate or show modal
    };

    const handleUpdateUser = (user) => {
        console.log('Updating user:', user);
        // Open update form or navigate to update page
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        setFilters({
            status: inputs.status,
            country_code: inputs.country_code,
            mobile: inputs.mobile,
            role: inputs.role,
            orderBy: { column: inputs.column, order: inputs.order },
            page: paginationConfig.DEFAULT_PAGE,
            first: paginationConfig.DEFAULT_FIRST,
        });
    };

    const goToPage = (newPage) => {
        if (newPage < 1 || (paginator?.lastPage && newPage > paginator.lastPage)) return;
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>👤  Users</h2>
            <UserSearchForm inputs={inputs} onChange={handleInputChange} onSearch={handleSearch} />
            <UserTable
                users={users}
                loading={loading}
                onViewTree={handleViewTree}
                onUpdateUser={handleUpdateUser}
            />
            <Pagination page={filters.page} paginator={paginator} goToPage={goToPage} />
        </div>
    );
};

const styles = {
    container: { padding: 24, backgroundColor: '#1f2235', borderRadius: 8, color: '#fff' },
    title: { marginBottom: 16, fontSize: 20 },
};

export default UsersView;
