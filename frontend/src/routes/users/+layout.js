import { redirect } from '@sveltejs/kit';

export const load = async () => {

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    if (!token) {
      throw redirect(302, '/login');
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { user };
  }

  // Si es SSR (en el servidor), simplemente no redirige
  return {};
};
