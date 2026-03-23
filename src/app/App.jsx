import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext.jsx';
import { useProductCatalog } from '@/features/products/context/ProductCatalogContext.jsx';
import { Button } from '@/shared/components/Button.jsx';
import { SiteFooter } from '@/shared/components/SiteFooter.jsx';

function SearchIcon() {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M6 7h15l-1.5 9h-12L6 7zm0 0L5 3H2M9 20a1 1 0 102 0 1 1 0 00-2 0zm8 0a1 1 0 102 0 1 1 0 00-2 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function App() {
    const { user, logout, ready } = useAuth();
    const { searchInput, setSearchInput, searchPending } = useProductCatalog();
    const location = useLocation();

    if (!ready) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"
                        aria-hidden
                    />
                    <p className="ds-body-sm text-slate-600">Carregando…</p>
                </div>
            </div>
        );
    }

    const isAuthRoute = location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            {!isAuthRoute && (
                <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-container flex-wrap items-center gap-3 px-4 py-4 sm:gap-4 sm:px-8">
                        <Link
                            to="/"
                            className="order-1 min-w-0 flex-1 truncate text-lg font-bold tracking-tight text-slate-900 no-underline hover:text-indigo-600 sm:text-xl lg:flex-none lg:overflow-visible lg:whitespace-normal"
                            style={{ letterSpacing: '-0.025em' }}
                        >
                            Rock Encantec — teste de entrevista
                        </Link>

                        <nav className="order-4 hidden w-full justify-center gap-8 text-sm font-medium text-slate-600 lg:order-2 lg:flex lg:w-auto lg:flex-1">
                            <Link to="/" className="transition hover:text-indigo-600">
                                Loja
                            </Link>
                            <a href="/#category-sidebar" className="transition hover:text-indigo-600">
                                Categorias
                            </a>
                        </nav>

                        <div className="relative order-3 min-w-0 w-full basis-full lg:order-3 lg:w-auto lg:max-w-sm lg:flex-1 lg:basis-auto">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <SearchIcon />
                            </span>
                            <input
                                type="search"
                                name="catalog-search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Pesquisar catálogo…"
                                autoComplete="off"
                                className="ds-input w-full py-2 pl-10 pr-3 text-sm"
                                aria-label="Pesquisar catálogo"
                            />
                            {searchPending && (
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-600">
                                    …
                                </span>
                            )}
                        </div>

                        <div className="order-2 flex shrink-0 items-center gap-2 sm:gap-3 lg:order-4">
                            <button
                                type="button"
                                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                                aria-label="Carrinho (em breve)"
                            >
                                <CartIcon />
                            </button>
                            <Link
                                to={user ? '/' : '/login'}
                                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                                aria-label={user ? 'Conta' : 'Iniciar sessão'}
                            >
                                <UserIcon />
                            </Link>

                            {user ? (
                                <>
                                    <span className="hidden text-sm text-slate-600 xl:inline">
                                        {user.name}
                                    </span>
                                    <Button type="button" variant="secondary" onClick={() => logout()}>
                                        Sair
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="ds-btn-ghost ds-btn hidden px-3 py-2 text-sm sm:inline-flex"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="ds-btn-primary ds-btn px-3 py-2 text-sm no-underline"
                                    >
                                        Criar conta
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>
            )}

            <main className={isAuthRoute ? 'flex-1' : 'flex-1 pb-0'}>
                <Outlet />
            </main>

            {!isAuthRoute && <SiteFooter />}
        </div>
    );
}
