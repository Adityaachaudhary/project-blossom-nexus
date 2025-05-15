
# FreelanceHub Server

This is the server-side application for FreelanceHub, providing API endpoints for the client application.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

5. Run the development server:
```bash
python main.py
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Features
- User authentication and management
- Project CRUD operations
- Search and filtering functionality
- File uploads
- Payment processing

## Technology Stack
- FastAPI
- Python
- MongoDB (with Motor)
- JWT Authentication
- Python-dotenv
