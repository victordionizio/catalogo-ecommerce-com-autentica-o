export function CategoryChips({
    categories,
    categoryId,
    onSelectCategory,
    categoriesLoading,
}) {
    return (
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-2 pt-1" role="tablist" aria-label="Categorias">
            <button
                type="button"
                role="tab"
                aria-selected={categoryId === ''}
                onClick={() => onSelectCategory('')}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                    categoryId === ''
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-200'
                }`}
            >
                Todas
            </button>
            {categoriesLoading && (
                <span className="shrink-0 self-center text-sm text-slate-500">…</span>
            )}
            {!categoriesLoading &&
                categories.map((c) => {
                    const active = String(categoryId) === String(c.id);
                    return (
                        <button
                            key={c.id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => onSelectCategory(String(c.id))}
                            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                                active
                                    ? 'bg-indigo-600 text-white'
                                    : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-200'
                            }`}
                        >
                            {c.name}
                        </button>
                    );
                })}
        </div>
    );
}
