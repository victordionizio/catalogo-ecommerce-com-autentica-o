import { useMemo, useState } from 'react';
import { ProductCard } from '@/features/products/components/ProductCard.jsx';
import { CategoryChips } from '@/features/products/components/CategoryChips.jsx';
import { CategorySidebar } from '@/features/products/components/CategorySidebar.jsx';
import { useProductCatalog } from '@/features/products/context/ProductCatalogContext.jsx';
import { AlertBanner } from '@/shared/components/AlertBanner.jsx';
import { PaginationBar } from '@/shared/components/PaginationBar.jsx';
import { ProductGridSkeleton } from '@/shared/components/ProductGridSkeleton.jsx';

function EmptyState({ hasActiveFilters }) {
    if (hasActiveFilters) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white px-6 py-16 text-center shadow-card">
                <p className="ds-h3 text-xl">Nenhum resultado</p>
                <p className="ds-body-sm mt-2">Tente outro termo de pesquisa ou escolha outra categoria.</p>
            </div>
        );
    }
    return (
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-16 text-center shadow-card">
            <p className="ds-h3 text-xl">Catálogo vazio</p>
            <p className="ds-body-sm mt-2">
                Ainda não há produtos. Adicione dados na API ou na base de dados.
            </p>
        </div>
    );
}

export function ProductList() {
    const {
        categoryId,
        setCategoryId,
        page,
        setPage,
        categories,
        categoriesLoading,
        categoriesError,
        products,
        pagination,
        loading,
        error,
        clearError,
        hasActiveFilters,
    } = useProductCatalog();

    const [sortBy, setSortBy] = useState('featured');

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (sortBy === 'price-asc') {
            list.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === 'price-desc') {
            list.sort((a, b) => Number(b.price) - Number(a.price));
        } else if (sortBy === 'name') {
            list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
        }
        return list;
    }, [products, sortBy]);

    const showGrid = !loading && !error;
    const isEmpty = showGrid && sortedProducts.length === 0;

    const selectedCategory = useMemo(
        () => categories.find((c) => String(c.id) === String(categoryId)),
        [categories, categoryId]
    );

    const breadcrumbSuffix = selectedCategory?.name ?? 'Todos';
    const pageTitle = selectedCategory?.name ?? 'Catálogo';

    return (
        <div className="mx-auto max-w-container px-4 py-10 sm:px-8">
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
                <div className="hidden w-64 shrink-0 lg:block">
                    <CategorySidebar
                        categories={categories}
                        categoryId={categoryId}
                        onSelectCategory={(id) => {
                            setCategoryId(id);
                            setPage(1);
                        }}
                        categoriesLoading={categoriesLoading}
                        categoriesError={categoriesError}
                    />
                </div>

                <div className="lg:hidden">
                    <CategoryChips
                        categories={categories}
                        categoryId={categoryId}
                        onSelectCategory={(id) => {
                            setCategoryId(id);
                            setPage(1);
                        }}
                        categoriesLoading={categoriesLoading}
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <nav className="text-xs font-medium uppercase tracking-wider text-slate-500" aria-label="Trilho">
                        Catálogo / {breadcrumbSuffix}
                    </nav>

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <h1 className="ds-h1 text-4xl sm:text-5xl">{pageTitle}</h1>
                        <div className="shrink-0">
                            <label htmlFor="sort" className="sr-only">
                                Ordenar
                            </label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="ds-input rounded-full border-slate-200 py-2 pl-4 pr-10 text-sm font-medium text-slate-700"
                            >
                                <option value="featured">Ordenar: em destaque</option>
                                <option value="price-asc">Preço: menor</option>
                                <option value="price-desc">Preço: maior</option>
                                <option value="name">Nome A–Z</option>
                            </select>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-6">
                            <AlertBanner title="Erro ao carregar produtos" onDismiss={clearError}>
                                {error}
                            </AlertBanner>
                        </div>
                    )}

                    <div className="mt-8">
                        {loading && <ProductGridSkeleton count={12} />}

                        {showGrid && !isEmpty && (
                            <>
                                <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {sortedProducts.map((p) => (
                                        <li key={p.id}>
                                            <ProductCard product={p} />
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-12">
                                    <PaginationBar
                                        pagination={pagination}
                                        onPageChange={setPage}
                                        disabled={loading}
                                    />
                                </div>
                            </>
                        )}

                        {showGrid && isEmpty && <EmptyState hasActiveFilters={hasActiveFilters} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
