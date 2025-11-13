@echo off
title Sistema de Mantenimiento de Aires - Inicio Automático
color 0a
echo ======================================================
echo 🚀 INICIANDO SISTEMA DE MANTENIMIENTO DE AIRES
echo ======================================================
echo.

echo Iniciando backend (Express.js)...
start cmd /k "cd backend && npm start"

timeout /t 5 /nobreak >nul
echo.
echo Iniciando frontend (SvelteKit)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ======================================================
echo ✅ Todo se ha iniciado correctamente.
echo Puedes abrir tu navegador en: http://localhost:5173
echo ======================================================
pause