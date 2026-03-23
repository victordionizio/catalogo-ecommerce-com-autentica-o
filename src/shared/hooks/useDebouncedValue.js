import { useEffect, useRef, useState } from 'react';

/**
 * Debounce de valor; na primeira montagem aplica o valor sem esperar o delay
 * (evita atraso artificial no primeiro carregamento da listagem).
 */
export function useDebouncedValue(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            setDebounced(value);
            return;
        }
        const id = window.setTimeout(() => setDebounced(value), delay);
        return () => window.clearTimeout(id);
    }, [value, delay]);

    return debounced;
}
