import http from '@/shared/services/httpClient.js';

/** Pedidos de listagem em curso (Strict Mode / re-renders partilham a mesma Promise). */
/** @type {Map<string, Promise<unknown>>} */
const listInflight = new Map();

/** @type {Map<string, Promise<unknown>>} */
const inflight = new Map();
/** @type {Map<string, unknown>} */
const resolved = new Map();

function productsListCacheKey(page, perPage, search, categoryId) {
    return JSON.stringify({
        page,
        perPage,
        s: search ?? null,
        c: categoryId ?? null,
    });
}

/**
 * Respostas JSON do Laravel (`success`, `data`, `meta`). Erros HTTP disparam exceção Axios.
 *
 * @param {{ page?: number, perPage?: number, search?: string, categoryId?: number }} params
 */
export async function fetchProductsApi(params = {}) {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 15;
    const search = params.search;
    const categoryId = params.categoryId;
    const query = {
        page,
        per_page: perPage,
    };
    if (search) {
        query.search = search;
    }
    if (categoryId) {
        query.category = categoryId;
    }
    const key = productsListCacheKey(page, perPage, search, categoryId);
    if (listInflight.has(key)) {
        return listInflight.get(key);
    }
    const p = http
        .get('/products', { params: query })
        .then(({ data }) => {
            listInflight.delete(key);
            return data;
        })
        .catch((err) => {
            listInflight.delete(key);
            throw err;
        });
    listInflight.set(key, p);
    return p;
}

/**
 * Leitura síncrona do cache do detalhe (hidratação imediata após prefetch).
 * @param {string|number} id
 */
export function peekProductDetailCache(id) {
    return resolved.get(String(id));
}

/**
 * Pré-carrega o detalhe ao passar o rato / foco na grelha.
 * @param {string|number} id
 */
export function prefetchProductById(id) {
    const k = String(id);
    if (resolved.has(k) || inflight.has(k)) {
        return;
    }
    fetchProductByIdApi(id).catch(() => {});
}

export async function fetchProductByIdApi(id) {
    const k = String(id);
    if (resolved.has(k)) {
        return resolved.get(k);
    }
    if (inflight.has(k)) {
        return inflight.get(k);
    }
    const p = http
        .get(`/products/${k}`)
        .then(({ data }) => {
            resolved.set(k, data);
            inflight.delete(k);
            return data;
        })
        .catch((err) => {
            inflight.delete(k);
            throw err;
        });
    inflight.set(k, p);
    return p;
}
