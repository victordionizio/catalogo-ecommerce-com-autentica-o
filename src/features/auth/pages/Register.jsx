import { Link } from 'react-router-dom';
import { useRegisterForm } from '@/features/auth/hooks/useAuthForm.js';
import { AlertBanner } from '@/shared/components/AlertBanner.jsx';
import { Button } from '@/shared/components/Button.jsx';

export function Register() {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        submitting,
        error,
        handleSubmit,
    } = useRegisterForm();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md rounded-lg border border-slate-100 bg-white p-8 shadow-card">
                <h1 className="ds-h2 mb-2 text-center text-3xl">Criar conta</h1>
                <p className="ds-body-sm mb-8 text-center text-slate-600">
                    Preencha os dados para se cadastrar.
                </p>

                {error ? (
                    <div className="mb-6">
                        <AlertBanner variant="error">{error}</AlertBanner>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="ds-label">
                            Nome
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            className="ds-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-email" className="ds-label">
                            E-mail
                        </label>
                        <input
                            id="reg-email"
                            type="email"
                            autoComplete="email"
                            className="ds-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-password" className="ds-label">
                            Palavra-passe
                        </label>
                        <p className="mb-2 text-xs text-slate-500">
                            Mín. 10 caracteres, maiúsculas, minúsculas, números e símbolos.
                        </p>
                        <input
                            id="reg-password"
                            type="password"
                            autoComplete="new-password"
                            className="ds-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={10}
                        />
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className="ds-label">
                            Confirmar palavra-passe
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            className="ds-input"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            minLength={10}
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                        {submitting ? 'A criar…' : 'Registar'}
                    </Button>
                </form>

                <p className="ds-body-sm mt-8 text-center text-slate-600">
                    Já tem conta?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    );
}
