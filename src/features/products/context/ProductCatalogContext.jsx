import { createContext, useContext } from 'react';
import { useProductList } from '@/features/products/hooks/useProductList.js';

const ProductCatalogContext = createContext(null);

export function ProductCatalogProvider({ children }) {
    const value = useProductList();
    return <ProductCatalogContext.Provider value={value}>{children}</ProductCatalogContext.Provider>;
}

export function useProductCatalog() {
    const ctx = useContext(ProductCatalogContext);
    if (!ctx) {
        throw new Error('useProductCatalog deve ser usado dentro de ProductCatalogProvider.');
    }
    return ctx;
}
