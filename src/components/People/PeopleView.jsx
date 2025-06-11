import React, { useState } from 'react';
import useAllPeople from '../../hooks/People/getAllPeople';
import paginationConfig from '../../config/paginationConfig';
import PeopleSearchForm from './PeopleSearchForm';
import PeopleTable from './PeopleTable';
import Pagination from '../shared/Pagination';
import UpdatePersonDialog from './UpdatePersonDialog';

const PeopleView = () => {
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleUpdatePerson = (personId) => {
        setSelectedPersonId(personId);
        setDialogOpen(true);
    };

    const handleCloseUpdateDialog = () => {
        setSelectedPersonId(null);
        setDialogOpen(false);
    };

    const [inputs, setInputs] = useState({
        status: '',
        country_code: '',
        mobile: '',
        birth_date: '',
        death_date: '',
        first_name: '',
        last_name: '',
        gender: '',
        is_owner: '',
        column: 'id',
        order: 'ASC',
    });

    const [filters, setFilters] = useState({
        status: '',
        country_code: '',
        mobile: '',
        birth_date: '',
        death_date: '',
        first_name: '',
        last_name: '',
        gender: '',
        is_owner: '',
        orderBy: { column: 'id', order: 'ASC' },
        page: paginationConfig.DEFAULT_PAGE,
        first: paginationConfig.DEFAULT_FIRST,
    });


    const handleSearch = () => {
        setFilters({
            ...inputs,
            orderBy: { column: inputs.column, order: inputs.order },
            page: paginationConfig.DEFAULT_PAGE,
            first: paginationConfig.DEFAULT_FIRST,
        });
    };

    const { people, paginator, loading, refetch } = useAllPeople(filters);

    const goToPage = (newPage) => {
        if (newPage < 1 || (paginator?.lastPage && newPage > paginator.lastPage)) return;
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>👥 People</h2>
            <PeopleSearchForm inputs={inputs} onChange={(e) => setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))} onSearch={handleSearch} />
            <PeopleTable people={people} loading={loading} onUpdatePerson={handleUpdatePerson} />
            <Pagination page={filters.page} paginator={paginator} goToPage={goToPage} />

            <UpdatePersonDialog
                open={dialogOpen}
                onClose={handleCloseUpdateDialog}
                personId={selectedPersonId}
                onUpdateSuccess={refetch}
            />
        </div>
    );
};

const styles = {
    container: { padding: 24, backgroundColor: '#1f2235', borderRadius: 8, color: '#fff' },
    title: { marginBottom: 16, fontSize: 20 },
};

export default PeopleView;
