:: Created by npm, please don't edit manually.
@SET SCRIPT="%~dp0\.\ares-package.js"

@SET PATH=%PATH:"=%
@IF EXIST "%~dp0\node.exe" (
    @SETLOCAL
    @SET "PATH=%~dp0;%PATH%"
    node %SCRIPT% %*
) ELSE (
  node  %SCRIPT% %*
)
