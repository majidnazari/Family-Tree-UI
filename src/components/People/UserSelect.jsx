import React, { useState } from 'react';
import Select from 'react-select';
import useUserSearch from '../../hooks/user/useUserSearch';

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#2a2e45',
        borderColor: '#555',
        color: '#fff',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#fff',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#2a2e45',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#3a3f60' : '#2a2e45',
        color: '#fff',
        cursor: 'pointer',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#aaa',
    }),
    input: (provided) => ({
        ...provided,
        color: '#fff',
    }),
};

const UserSelect = ({ onUserSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { options, loading } = useUserSearch(searchTerm);

    return (
        <Select
            placeholder="Search Users (type at least 3 chars)"
            onInputChange={(value) => setSearchTerm(value)}
            options={options}
            isLoading={loading}
            onChange={onUserSelect}
            isClearable
            styles={customStyles}
        />
    );
};

export default UserSelect;
