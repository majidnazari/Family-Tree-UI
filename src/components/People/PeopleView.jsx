import React, { useState } from 'react';
import useAllPeople from '../../hooks/People/getAllPeople';
import paginationConfig from '../../config/paginationConfig';
import PeopleSearchForm from './PeopleSearchForm';
import PeopleTable from './PeopleTable';
import Pagination from '../shared/Pagination';


const PeopleView = () => {
    const [inputs, setInputs] = useState({
        status: '',
        country_code: '',
        mobile: '',
        creator_id: '',
        editor_id: '',
        gender: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        death_date: '',
        is_owner: '',
        column: 'id',
        order: 'ASC',
    });

    const [filters, setFilters] = useState({
        ...inputs,
        orderBy: { column: 'id', order: 'ASC' },
        page: paginationConfig.DEFAULT_PAGE,
        first: paginationConfig.DEFAULT_FIRST,
    });

    const { people, paginator, loading } = useAllPeople(filters);

    const handleSearch = () => {
        setFilters({
            ...inputs,
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
            <h2 style={styles.title}>👥 People</h2>
            <PeopleSearchForm inputs={inputs} onChange={(e) => setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))} onSearch={handleSearch} />
            <PeopleTable people={people} loading={loading} />
            <Pagination page={filters.page} paginator={paginator} goToPage={goToPage} />
        </div>
    );
};

const styles = {
    container: { padding: 24, backgroundColor: '#1f2235', borderRadius: 8, color: '#fff' },
    title: { marginBottom: 16, fontSize: 20 },
};

export default PeopleView;
