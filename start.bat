@echo off
title Iniciando Proyecto Fullstack

echo ===============================
echo Iniciando servidor FastAPI...
echo ===============================
REM Activar entorno virtual
call myvenv\Scripts\activate

REM Iniciar servidor FastAPI
start cmd /k "fastapi dev main.py"

timeout /t 3 > nul

echo ===============================
echo Iniciando servidor Svelte...
echo ===============================
start cmd /k "cd frontend && npm run dev"

echo ===============================
echo Ambos servidores fueron iniciados.
echo FastAPI: http://127.0.0.1:8000
echo Svelte:  http://localhost:5173
echo ===============================

pause


