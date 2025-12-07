# Easit.ai Backend API

A FastAPI-based backend service for the Easit.ai AI assistant application, providing RESTful APIs for managing conversations, messages, and users with SQLite database integration.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **SQLAlchemy ORM**: Powerful SQL toolkit and object-relational mapper
- **SQLite Database**: Lightweight, file-based database
- **CORS Support**: Cross-origin requests enabled for frontend communication
- **RESTful API Design**: Standard HTTP methods and status codes
- **Interactive API Documentation**: Automatic Swagger UI at `/docs`

## Prerequisites

- Python 3.8+
- pip (Python package manager)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

### Option 1: Direct Python Execution
```bash
python app.py
```

### Option 2: Using Uvicorn
```bash
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```

### Option 3: With Auto-Reload (Development)
```bash
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at:
- **API Base**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs (Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc (ReDoc)

## Database

The application uses SQLite for data persistence. The database file (`easit_app.db`) will be automatically created in the backend directory on first run.

### Database Models

#### Users Table
- `id`: Unique identifier
- `name`: User name
- `email`: Email address (unique)
- `picture`: Profile picture URL
- `created_at`: Timestamp

#### Conversations Table
- `id`: Unique identifier
- `title`: Conversation title
- `user_email`: Associated user email
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

#### Messages Table
- `id`: Unique identifier
- `conversation_id`: Associated conversation
- `role`: 'user' or 'model'
- `text`: Message content
- `timestamp`: Message timestamp

## API Endpoints

### Health Check
- **GET** `/health` - Check server status

### Conversations
- **POST** `/api/conversations` - Create a new conversation
  ```json
  {
    "title": "My First Chat",
    "user_email": "user@example.com"
  }
  ```
- **GET** `/api/conversations?email={email}` - Get all conversations for a user
- **GET** `/api/conversations/{id}` - Get a specific conversation

### Messages
- **POST** `/api/messages` - Create a new message
  ```json
  {
    "conversation_id": "conv-id",
    "role": "user",
    "text": "Hello!"
  }
  ```
- **GET** `/api/conversations/{conversation_id}/messages` - Get all messages in a conversation

### Users
- **POST** `/api/users` - Create or update a user
  ```json
  {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "picture": "https://..."
  }
  ```
- **GET** `/api/users/{email}` - Get user information

## Environment Variables

Create a `.env` file in the backend directory (optional):
```
DATABASE_URL=sqlite:///./easit_app.db
BACKEND_PORT=8000
```

## CORS Configuration

The backend is configured to accept requests from any origin. To restrict CORS in production, modify the `CORSMiddleware` configuration in `app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Development

### Auto-reload Mode
```bash
python -m uvicorn app:app --reload
```

### Testing with cURL
```bash
# Create a conversation
curl -X POST http://localhost:8000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","user_email":"test@example.com"}'

# Get conversations
curl http://localhost:8000/api/conversations?email=test@example.com

# Health check
curl http://localhost:8000/health
```

## Production Deployment

For production, use a production-grade ASGI server:

```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app
```

## Troubleshooting

### Port Already in Use
```bash
# Change the port
python -m uvicorn app:app --port 8001
```

### Import Error
Ensure you're in the `backend` directory and have installed all requirements

### Database Lock
If you get database locked errors, ensure only one instance is running

## API Documentation

Comprehensive API documentation is available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Security Considerations

- Always validate user input
- Use HTTPS in production
- Implement proper authentication
- Use environment variables for sensitive data
- Add rate limiting for production
- Implement request validation with Pydantic

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Advanced query filtering
- [ ] Message search functionality
- [ ] Conversation archiving
- [ ] Analytics dashboard
- [ ] WebSocket support for real-time updates
- [ ] File upload support

## Support

For issues or questions, please refer to:
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
