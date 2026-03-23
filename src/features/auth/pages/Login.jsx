import { Link } from 'react-router-dom';
import { useLoginForm } from '@/features/auth/hooks/useAuthForm.js';
import { AlertBanner } from '@/shared/components/AlertBanner.jsx';
import { Button } from '@/shared/components/Button.jsx';

export function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        submitting,
        error,
        handleSubmit,
    } = useLoginForm();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md rounded-lg border border-slate-100 bg-white p-8 shadow-card">
                <h1 className="ds-h2 mb-2 text-center text-3xl">Entrar</h1>
                <p className="ds-body-sm mb-8 text-center text-slate-600">
                    Acesse sua conta para continuar.
                </p>

                {error ? (
                    <div className="mb-6">
                        <AlertBanner variant="error">{error}</AlertBanner>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="ds-label">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            className="ds-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="ds-label">
                            Palavra-passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            className="ds-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                        {submitting ? 'A entrar…' : 'Entrar'}
                    </Button>
                </form>

                <p className="ds-body-sm mt-8 text-center text-slate-600">
                    Não tem conta?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
                        Criar conta
                    </Link>
                </p>
            </div>
        </div>
    );
}
