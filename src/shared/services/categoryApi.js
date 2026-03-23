import http from '@/shared/services/httpClient.js';

let categoriesCache = null;
/** @type {Promise<unknown> | null} */
let categoriesInflight = null;

/**
 * Lista categorias (para filtros); usa per_page alto para carregar opções.
 * Resultado é memorizado na sessão (categorias mudam pouco).
 */
export async function fetchCategoriesApi({ page = 1, perPage = 100 } = {}) {
    if (categoriesCache) {
        return categoriesCache;
    }
    if (categoriesInflight) {
        return categoriesInflight;
    }
    categoriesInflight = http
        .get('/categories', {
            params: { page, per_page: perPage },
        })
        .then(({ data }) => {
            categoriesCache = data;
            categoriesInflight = null;
            return data;
        })
        .catch((err) => {
            categoriesInflight = null;
            throw err;
        });
    return categoriesInflight;
}

/** Para testes ou após mutações no back-office (opcional). */
export function clearCategoriesCache() {
    categoriesCache = null;
    categoriesInflight = null;
}
