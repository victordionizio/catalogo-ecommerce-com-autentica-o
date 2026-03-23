import { Button } from '@/shared/components/Button.jsx';

const iconBox = (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
            d="M4 6h16M4 12h16M4 18h10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
        />
    </svg>
);

export function CategorySidebar({
    categories,
    categoryId,
    onSelectCategory,
    categoriesLoading,
    categoriesError,
}) {
    return (
        <aside id="category-sidebar" className="flex flex-col">
            <div className="mb-6">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Categorias</h2>
                <p className="mt-1 text-sm text-slate-500">Por categoria</p>
            </div>

            {categoriesError && (
                <p className="mb-4 text-xs font-medium text-amber-600" role="status">
                    {categoriesError}
                </p>
            )}

            <nav className="flex flex-col gap-1" aria-label="Categorias">
                <button
                    type="button"
                    onClick={() => onSelectCategory('')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                        categoryId === ''
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-slate-900 hover:bg-slate-100'
                    }`}
                >
                    {iconBox}
                    <span>Todas</span>
                </button>
                {categoriesLoading && (
                    <p className="px-3 py-2 text-sm text-slate-500">A carregar…</p>
                )}
                {!categoriesLoading &&
                    categories.map((c) => {
                        const active = String(categoryId) === String(c.id);
                        return (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => onSelectCategory(String(c.id))}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                                    active
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                {iconBox}
                                <span className="truncate">{c.name}</span>
                            </button>
                        );
                    })}
            </nav>

            <div className="mt-8">
                <Button type="button" variant="secondary" className="w-full text-xs font-bold uppercase tracking-wide">
                    Ver todos os filtros
                </Button>
            </div>
        </aside>
    );
}
