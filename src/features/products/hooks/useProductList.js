import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue.js';
import { fetchCategoriesApi } from '@/shared/services/categoryApi.js';
import { fetchProductsApi } from '@/shared/services/productApi.js';
import { extractApiErrorMessage } from '@/shared/utils/apiError.js';

const PER_PAGE = 12;

export function useProductList() {
    const location = useLocation();
    /** Só carrega listagem na página inicial do catálogo (evita pedidos em PDP / auth). */
    const isCatalogIndex = location.pathname === '/';

    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebouncedValue(searchInput, 400);
    const [categoryId, setCategoryId] = useState('');
    const [page, setPage] = useState(1);

    const filterRef = useRef({ search: debouncedSearch, category: categoryId });

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState('');

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const searchPending = useMemo(
        () => searchInput.trim() !== debouncedSearch.trim(),
        [searchInput, debouncedSearch]
    );

    const hasActiveFilters = useMemo(
        () => Boolean(debouncedSearch.trim() || categoryId),
        [debouncedSearch, categoryId]
    );

    useEffect(() => {
        if (!isCatalogIndex) {
            setCategoriesLoading(false);
            return;
        }
        let cancelled = false;
        async function loadCategories() {
            try {
                setCategoriesLoading(true);
                setCategoriesError('');
                const res = await fetchCategoriesApi({ page: 1, perPage: 100 });
                if (cancelled) {
                    return;
                }
                if (res.success && Array.isArray(res.data)) {
                    setCategories(res.data);
                } else {
                    setCategoriesError(res.message || 'Não foi possível carregar as categorias.');
                    setCategories([]);
                }
            } catch (err) {
                if (!cancelled) {
                    setCategoriesError(extractApiErrorMessage(err, 'Erro ao carregar categorias.'));
                    setCategories([]);
                }
            } finally {
                if (!cancelled) {
                    setCategoriesLoading(false);
                }
            }
        }
        loadCategories();
        return () => {
            cancelled = true;
        };
    }, [isCatalogIndex]);

    const loadProducts = useCallback(async () => {
        if (!isCatalogIndex) {
            setLoading(false);
            return;
        }

        const prev = filterRef.current;
        const filterChanged =
            prev.search !== debouncedSearch || prev.category !== categoryId;
        const effectivePage = filterChanged ? 1 : page;

        if (filterChanged) {
            filterRef.current = { search: debouncedSearch, category: categoryId };
            // Evita dois GET /products: um com page antigo e outro após setPage(1).
            if (page !== 1) {
                setLoading(true);
                setPage(1);
                return;
            }
        }

        setLoading(true);
        setError('');
        try {
            const res = await fetchProductsApi({
                page: effectivePage,
                perPage: PER_PAGE,
                search: debouncedSearch.trim() || undefined,
                categoryId: categoryId ? Number(categoryId) : undefined,
            });
            if (!res.success) {
                setError(res.message || 'Não foi possível carregar os produtos.');
                setProducts([]);
                setPagination(null);
                return;
            }
            setProducts(Array.isArray(res.data) ? res.data : []);
            const meta = res.meta?.pagination;
            if (
                meta &&
                typeof meta === 'object' &&
                meta.current_page !== undefined &&
                meta.per_page !== undefined &&
                meta.total !== undefined
            ) {
                const lastPage = Math.max(1, Math.ceil(meta.total / meta.per_page));
                setPagination({
                    currentPage: meta.current_page,
                    perPage: meta.per_page,
                    total: meta.total,
                    lastPage,
                });
            } else {
                setPagination(null);
            }
        } catch (err) {
            setError(extractApiErrorMessage(err, 'Erro ao carregar produtos.'));
            setProducts([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearch, categoryId, isCatalogIndex]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const clearError = useCallback(() => setError(''), []);

    return {
        searchInput,
        setSearchInput,
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
        searchPending,
        perPage: PER_PAGE,
    };
}
