import React from 'react';

const Pagination = ({ page, paginator, goToPage }) => {
    if (!paginator) return null;

    const { currentPage, lastPage } = paginator;

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={() => goToPage(1)} disabled={currentPage === 1}>First</button>
            <button style={styles.button} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
            <span style={styles.pageInfo}>
                Page {currentPage} of {lastPage}
            </span>
            <button style={styles.button} onClick={() => goToPage(currentPage + 1)} disabled={currentPage === lastPage}>Next</button>
            <button style={styles.button} onClick={() => goToPage(lastPage)} disabled={currentPage === lastPage}>Last</button>
        </div>
    );
};

const styles = {
    container: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    button: {
        padding: '6px 12px',
        borderRadius: 4,
        border: '1px solid #555',
        backgroundColor: '#333',
        color: '#fff',
        cursor: 'pointer',
        minWidth: 60,
    },
    pageInfo: {
        padding: '0 10px',
        fontWeight: 'bold',
    },
};

export default Pagination;
