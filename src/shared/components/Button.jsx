/**
 * Botões Indigo Archive: primary / secondary / ghost
 */
export function Button({ variant = 'primary', className = '', type = 'button', ...props }) {
    const base =
        variant === 'primary'
            ? 'ds-btn-primary'
            : variant === 'secondary'
              ? 'ds-btn-secondary'
              : 'ds-btn-ghost';

    return <button type={type} className={`${base} ${className}`.trim()} {...props} />;
}
