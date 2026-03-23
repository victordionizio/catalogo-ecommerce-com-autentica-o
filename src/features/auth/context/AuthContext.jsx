import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    clearAuthStorage,
    getStoredUser,
    getToken,
    setStoredUser,
    setToken,
} from '@/shared/services/authStorage.js';
import { fetchCurrentUserApi, loginApi, registerApi } from '@/shared/services/authApi.js';
import { extractApiErrorMessage } from '@/shared/utils/apiError.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredUser());
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function bootstrap() {
            const stored = getStoredUser();
            if (stored) {
                setUser(stored);
            }
            if (!getToken()) {
                setReady(true);
                return;
            }
            // UI disponível já: catálogo carrega em paralelo com a validação do token.
            setReady(true);
            try {
                const res = await fetchCurrentUserApi();
                if (cancelled) {
                    return;
                }
                if (res.success && res.data?.user) {
                    setUser(res.data.user);
                    setStoredUser(res.data.user);
                }
            } catch {
                if (!cancelled) {
                    clearAuthStorage();
                    setUser(null);
                }
            }
        }
        bootstrap();
        return () => {
            cancelled = true;
        };
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            const res = await loginApi({ email, password });
            if (res.success && res.data?.token) {
                setToken(res.data.token);
                setUser(res.data.user);
                setStoredUser(res.data.user);
            }
            return { ok: true, message: res.message ?? '' };
        } catch (err) {
            return { ok: false, message: extractApiErrorMessage(err, 'Falha no início de sessão.') };
        }
    }, []);

    const register = useCallback(async (payload) => {
        try {
            const res = await registerApi(payload);
            if (res.success && res.data?.token) {
                setToken(res.data.token);
                setUser(res.data.user);
                setStoredUser(res.data.user);
            }
            return { ok: true, message: res.message ?? '' };
        } catch (err) {
            return { ok: false, message: extractApiErrorMessage(err, 'Falha no registo.') };
        }
    }, []);

    const logout = useCallback(() => {
        clearAuthStorage();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            ready,
            isAuthenticated: Boolean(user),
            login,
            register,
            logout,
        }),
        [user, ready, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
}
