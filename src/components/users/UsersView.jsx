import React, { useState } from 'react';
import useAllUsers from '../../hooks/user/useAllUsers';
import paginationConfig from '../../config/paginationConfig';
import UserSearchForm from './UserSearchForm';
import UserTable from './UserTable';
import Pagination from './Pagination';
import UpdateUserDialog from './UpdateUserDialog'; // ✅ New Import

const UsersView = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleUpdateUser = (user) => {
        setSelectedUserId(user.id);
        setDialogOpen(true);
    };

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
            <h2 style={styles.title}>👤 Users</h2>
            <UserSearchForm inputs={inputs} onChange={(e) => setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))} onSearch={handleSearch} />
            <UserTable users={users} loading={loading} onUpdateUser={handleUpdateUser} />
            <Pagination page={filters.page} paginator={paginator} goToPage={goToPage} />

            {/* Update Dialog */}
            {dialogOpen && (
                <UpdateUserDialog
                    userId={selectedUserId}
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                />
            )}
        </div>
    );
};

const styles = {
    container: { padding: 24, backgroundColor: '#1f2235', borderRadius: 8, color: '#fff' },
    title: { marginBottom: 16, fontSize: 20 },
};

export default UsersView;
