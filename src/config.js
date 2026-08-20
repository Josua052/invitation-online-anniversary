// GAS URL dibaca dari environment variable VITE_GAS_URL
// Set di file .env (lokal) atau Vercel Dashboard → Settings → Environment Variables
export const GAS_URL = import.meta.env.VITE_GAS_URL || 'REPLACE_THIS_WITH_YOUR_GAS_URL';
