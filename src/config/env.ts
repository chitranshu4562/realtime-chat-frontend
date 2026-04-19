const env = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    apiUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
} as const;

if (!env.baseUrl) {
    throw new Error('VITE_BASE_URL is not set');
}

export default env;
