import React from 'react';

const Pagination = ({ page, paginator, goToPage }) => {
    const totalPages = paginator?.lastPage || 1;
    const pageWindow = 3;  // how many pages to show before and after current page

    const createPageButtons = () => {
        const pages = [];

        // Always show first page
        pages.push(1);

        // Add "..." if needed
        if (page - pageWindow > 2) {
            pages.push('...');
        }

        // Pages around current page
        for (let i = Math.max(2, page - pageWindow); i <= Math.min(totalPages - 1, page + pageWindow); i++) {
            pages.push(i);
        }

        // Add "..." if needed
        if (page + pageWindow < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page if more than 1
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = createPageButtons();

    return (
        <div style={styles.pagination} dir="rtl">
            <button onClick={() => goToPage(page - 1)} disabled={page <= 1} style={styles.pageButton}>
                Prev ➡
            </button>

            {pages.map((p, idx) => (
                p === '...' ? (
                    <span key={`ellipsis-${idx}`} style={styles.ellipsis}>...</span>
                ) : (
                    <button
                        key={`page-${p}`}
                        onClick={() => goToPage(p)}
                        style={{
                            ...styles.pageButton,
                            fontWeight: page === p ? 'bold' : 'normal',
                            backgroundColor: page === p ? '#0B4BB9FF' : '#3a3f5c',
                        }}
                    >
                        {p}
                    </button>
                )
            ))}


            <button onClick={() => goToPage(page + 1)} disabled={!paginator?.hasMorePages} style={styles.pageButton}>
                Next  ⬅
            </button>
        </div>
    );
};

const styles = {
    pagination: { marginTop: 20, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' },
    pageButton: { padding: '6px 12px', border: '1px solid #ccc', backgroundColor: '#3a3f5c', color: '#fff', borderRadius: 4, cursor: 'pointer' },
    ellipsis: { padding: '6px 12px', color: '#fff' }
};

export default Pagination;
