import http from '@/shared/services/httpClient.js';

/**
 * @param {{ name: string, email: string, password: string, password_confirmation: string }} payload
 */
export async function registerApi(payload) {
    const { data } = await http.post('/register', payload);
    return data;
}

/**
 * @param {{ email: string, password: string }} credentials
 */
export async function loginApi(credentials) {
    const { data } = await http.post('/login', credentials);
    return data;
}

export async function fetchCurrentUserApi() {
    const { data } = await http.get('/user');
    return data;
}
