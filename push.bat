@echo off
echo ====================================================
echo   CONTRATO FEITO - ENVIANDO ATUALIZACOES (GIT PUSH)
echo ====================================================
"C:\Program Files\Git\cmd\git.exe" push origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCESSO] Codigo enviado para o GitHub com sucesso!
) else (
    echo [ERRO] Ocorreu uma falha no envio. Verifique suas credenciais.
)
echo ====================================================
pause
