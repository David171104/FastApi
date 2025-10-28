// src/libs/helpers/permissions.js
import axios from 'axios';
import Swal from 'sweetalert2';
import { goto } from '$app/navigation';

const API_URL = "http://127.0.0.1:8000";


let permissionsCache = null;


async function fetchPermissions(roleId) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        goto("/login");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/permissions/get/${roleId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        permissionsCache = response.data.resultado;
        return permissionsCache;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los permisos. Intenta recargar la página.'
        });
        console.error('fetchPermissions:', error);
        return [];
    }
}


export async function getPermission(user, moduleName, action = 'can_view') {
    if (!permissionsCache) {
        await fetchPermissions(user.role_id);
    }

    const module = permissionsCache.find(m => m.module_name === moduleName);
    if (!module) return { permiso: false, route: null };

    // la ruta viene en formato JSON, parseamos si viene como string
    console.log('module', module);
    let routes = module.routes;
    if (typeof routes === 'string') {
        try { routes = JSON.parse(routes); } catch { routes = {}; }
    }

    // seleccionamos la ruta según role_id
    let roleKey = '';
    switch(user.role_id) {
        case 1: roleKey = 'admin'; break;
        case 2: roleKey = 'technician'; break;
        case 3: roleKey = 'client'; break;
        default: roleKey = null;
    }

    const route = roleKey && routes ? routes[roleKey] || null : null;
    console.log('route', route);
    return { permiso: !!module[action], route };
}

/**
 * Funciones específicas por acción
 */
export async function hasPermissionView(user, moduleName) {
    return getPermission(user, moduleName, 'can_view');
}
export async function hasPermissionCreate(user, moduleName) {
    return getPermission(user, moduleName, 'can_create');
}
export async function hasPermissionEdit(user, moduleName) {
    return getPermission(user, moduleName, 'can_edit');
}
export async function hasPermissionDelete(user, moduleName) {
    return getPermission(user, moduleName, 'can_delete');
}

export function clearPermissionsCache() {
    permissionsCache = null;
}