// src/lib/stores/auth.js
import { writable } from 'svelte/store';

export const isAuthenticated = writable(false); // por defecto: no logueado
