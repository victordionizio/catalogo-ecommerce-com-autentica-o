import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    fetchProductByIdApi,
    peekProductDetailCache,
} from '@/shared/services/productApi.js';
import { extractApiErrorMessage } from '@/shared/utils/apiError.js';

function productFromCache(id) {
    if (!id) {
        return null;
    }
    const raw = peekProductDetailCache(id);
    if (raw?.success && raw.data) {
        return raw.data;
    }
    return null;
}

export function useProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        if (!id) {
            setProduct(null);
            setLoading(false);
            setError('Identificador inválido.');
            return;
        }

        const cached = productFromCache(id);
        if (cached) {
            setProduct(cached);
            setLoading(false);
            setError('');
            return;
        }

        setProduct(null);
        setLoading(true);
        setError('');

        (async () => {
            try {
                const res = await fetchProductByIdApi(id);
                if (cancelled) {
                    return;
                }
                if (!res.success) {
                    setError(res.message || 'Produto não encontrado.');
                    setProduct(null);
                    return;
                }
                setProduct(res.data);
            } catch (err) {
                if (!cancelled) {
                    setError(
                        extractApiErrorMessage(err, 'Não foi possível carregar o produto.')
                    );
                    setProduct(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [id]);

    const clearError = () => setError('');

    return { product, loading, error, id, clearError };
}
