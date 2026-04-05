const env = {
    apiUrl: import.meta.env.VITE_API_URL,
} as const;

if (!env.apiUrl) {
    throw new Error('VITE_API_URL is not set');
}

export default env;
