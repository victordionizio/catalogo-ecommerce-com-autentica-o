/**
 * Mensagem legível a partir de erros Axios / respostas Laravel (message, errors, 404, rede).
 */
export function extractApiErrorMessage(error, fallback = 'Ocorreu um erro.') {
    if (!error) {
        return fallback;
    }

    const status = error.response?.status;
    const data = error.response?.data;

    if (data && typeof data === 'object') {
        if (data.errors && typeof data.errors === 'object') {
            const lines = Object.values(data.errors)
                .flat()
                .filter((x) => typeof x === 'string' && x.length);
            if (lines.length) {
                return lines.join(' ');
            }
        }
        if (typeof data.message === 'string' && data.message.length) {
            return data.message;
        }
    }

    if (status === 404) {
        return 'Recurso não encontrado.';
    }
    if (status === 401) {
        return 'Sessão expirada ou credenciais inválidas.';
    }
    if (status === 403) {
        return 'Não tem permissão para esta operação.';
    }
    if (status === 422) {
        return fallback;
    }
    if (status >= 500) {
        return 'Servidor indisponível. Tente mais tarde.';
    }

    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        return 'Não foi possível ligar ao servidor. Verifique a rede e se a API está a correr.';
    }

    if (typeof error.message === 'string' && error.message !== 'Request failed with status code 404') {
        return error.message;
    }

    return fallback;
}
