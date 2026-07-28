@echo off
set GIT="C:\Program Files\Git\cmd\git.exe"
%GIT% config --global user.email "gabrielwaideman@hotmail.com"
%GIT% config --global user.name "Gabriel Waideman"
%GIT% init
%GIT% add .
%GIT% commit -m "feat: integracao Supabase e seguranca"
%GIT% branch -M main
%GIT% remote add origin https://github.com/GabrielWaideman/contratofeito.git
%GIT% push -u origin main
