import '../resources/js/bootstrap.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/context/AuthContext.jsx';
import { ProductCatalogProvider } from '@/features/products/context/ProductCatalogContext.jsx';
import { App } from '@/app/App.jsx';
import { ProductList } from '@/features/products/pages/ProductList.jsx';
import { ProductDetail } from '@/features/products/pages/ProductDetail.jsx';
import { Login } from '@/features/auth/pages/Login.jsx';
import { Register } from '@/features/auth/pages/Register.jsx';

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <ProductCatalogProvider>
                        <Routes>
                            <Route path="/" element={<App />}>
                            <Route index element={<ProductList />} />
                            <Route path="products/:id" element={<ProductDetail />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Route>
                        </Routes>
                    </ProductCatalogProvider>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}
