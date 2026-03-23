/**
 * Alertas semânticos (Indigo Archive): fundos claros e bordas suaves
 */
export function AlertBanner({ children, variant = 'error', type, title, message, onDismiss }) {
    const v = type ?? variant;
    const styles = {
        error: 'border-red-200 bg-red-50 text-red-800',
        warning: 'border-amber-200 bg-amber-50 text-amber-900',
        info: 'border-slate-200 bg-slate-50 text-slate-800',
    };

    const body = message ?? children;

    return (
        <div
            className={`rounded-lg border px-4 py-3 text-sm ${styles[v] ?? styles.error}`}
            role="alert"
        >
            <div className="flex gap-3">
                <div className="min-w-0 flex-1">
                    {title && <p className="font-semibold">{title}</p>}
                    <div className={title ? 'mt-1' : ''}>{body}</div>
                </div>
                {onDismiss && (
                    <button
                        type="button"
                        onClick={onDismiss}
                        className="shrink-0 text-slate-400 hover:text-slate-600"
                        aria-label="Fechar"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}
