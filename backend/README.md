
# Freelance Project Marketplace Backend

This is the FastAPI backend for the Freelance Project Marketplace application.

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

## Endpoints

- `GET /projects` - Get all projects with optional filtering and pagination
- `POST /projects` - Create a new project
- `GET /projects/{project_id}` - Get a specific project by ID
- `PATCH /projects/{project_id}/status` - Update a project's status (mark as completed)
