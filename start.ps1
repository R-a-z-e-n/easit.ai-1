# Easit.ai Full Stack Startup Script for Windows PowerShell

Write-Host "Starting Easit.ai Full Stack Application..." -ForegroundColor Green
Write-Host ""

# Start backend
Write-Host "Starting FastAPI Backend..." -ForegroundColor Cyan
Set-Location backend
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
python -m pip install -r requirements.txt -q
Write-Host "Launching backend server on port 8000..." -ForegroundColor Yellow
Start-Process -FilePath python -ArgumentList "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000" -NoNewWindow

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting Frontend (Vite)..." -ForegroundColor Cyan
Set-Location ..
Write-Host "Launching frontend server..." -ForegroundColor Yellow
Start-Process -FilePath npm -ArgumentList "run", "dev" -NoNewWindow

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "Both servers are running!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000 (or next available port)" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop all services, close the command windows manually" -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to exit this script (servers will continue running)"
