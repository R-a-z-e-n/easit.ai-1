#!/bin/bash
# Easit.ai Full Stack Startup Script

echo "Starting Easit.ai Full Stack Application..."
echo ""

# Start backend
echo "Starting FastAPI Backend..."
cd backend
python -m pip install -r requirements.txt -q
python -m uvicorn app:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"
echo ""

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting Frontend (Vite)..."
cd ..
npm run dev &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"
echo ""

echo "Both servers are running!"
echo "Frontend: http://localhost:3000 (or next available port)"
echo "Backend API: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait
