@echo off
REM Clean Next.js Turbopack cache to fix SST file errors
echo Cleaning Next.js build cache...

cd /d "%~dp0"

if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next
    echo .next removed successfully
) else (
    echo .next directory not found
)

if exist node_modules\.cache (
    echo Removing node_modules cache...
    rmdir /s /q node_modules\.cache
    echo node_modules cache removed successfully
) else (
    echo node_modules cache not found
)

echo.
echo Build cache cleaned successfully!
echo Run 'npm run dev' to start with fresh cache
echo.
pause