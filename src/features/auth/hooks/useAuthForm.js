import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext.jsx';

/**
 * Lógica de formulário de login (submissão + estado de erro).
 */
export function useLoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        const result = await login(email, password);
        setSubmitting(false);
        if (result.ok) {
            navigate('/');
            return;
        }
        setError(result.message);
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        submitting,
        error,
        handleSubmit,
    };
}

/**
 * Lógica de formulário de registo.
 */
export function useRegisterForm() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        const result = await register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
        setSubmitting(false);
        if (result.ok) {
            navigate('/');
            return;
        }
        setError(result.message);
    }

    return {
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
    };
}
