function ChevronLeft() {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
    );
}

function ChevronRight() {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
    );
}

function buildPageList(current, last) {
    if (last <= 9) {
        return Array.from({ length: last }, (_, i) => i + 1);
    }
    const pages = new Set([1, last, current, current - 1, current + 1]);
    const sorted = [...pages].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
            out.push('…');
        }
        out.push(sorted[i]);
    }
    return out;
}

export function PaginationBar({ pagination, onPageChange, disabled }) {
    if (!pagination || pagination.lastPage <= 1) {
        return null;
    }

    const { currentPage, lastPage, total, perPage } = pagination;
    const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, total);
    const pageItems = buildPageList(currentPage, lastPage);

    return (
        <div className="flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="ds-body-sm text-slate-600">
                A mostrar {from}–{to} de {total} produtos
            </p>
            <div className="flex flex-wrap items-center justify-end gap-1">
                <button
                    type="button"
                    disabled={disabled || currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Página anterior"
                >
                    <ChevronLeft />
                </button>
                {pageItems.map((item, idx) =>
                    item === '…' ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
                            …
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            disabled={disabled}
                            onClick={() => onPageChange(item)}
                            className={`inline-flex min-w-[2.25rem] items-center justify-center rounded-lg px-2 py-2 text-sm font-medium transition ${
                                item === currentPage
                                    ? 'bg-indigo-600 text-white'
                                    : 'border border-transparent text-slate-700 hover:border-slate-200 hover:bg-white'
                            }`}
                            aria-label={`Página ${item}`}
                            aria-current={item === currentPage ? 'page' : undefined}
                        >
                            {item}
                        </button>
                    )
                )}
                <button
                    type="button"
                    disabled={disabled || currentPage >= lastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Página seguinte"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
