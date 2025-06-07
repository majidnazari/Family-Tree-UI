import React from 'react';

const Pagination = ({ page, paginator, goToPage }) => {
    const totalPages = paginator?.lastPage || 1;

    return (
        <div style={styles.pagination}>
            <button onClick={() => goToPage(page - 1)} disabled={page <= 1} style={styles.pageButton}>
                ⬅ Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        style={{
                            ...styles.pageButton,
                            fontWeight: page === pageNum ? 'bold' : 'normal',
                            backgroundColor: page === pageNum ? '#0B4BB9FF' : '#3a3f5c',
                        }}
                    >
                        {pageNum}
                    </button>
                );
            })}
            <button onClick={() => goToPage(page + 1)} disabled={!paginator?.hasMorePages} style={styles.pageButton}>
                Next ➡
            </button>
        </div>
    );
};

const styles = {
    pagination: { marginTop: 20, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' },
    pageButton: { padding: '6px 12px', border: '1px solid #ccc', backgroundColor: '#3a3f5c', color: '#fff', borderRadius: 4, cursor: 'pointer' },
};

export default Pagination;
