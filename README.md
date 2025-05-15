
# FreelanceHub

A modern freelance marketplace that connects talented freelancers with businesses and individuals seeking their services.

## Project Structure

This project is organized into two main directories:

- `client/` - Frontend React application
- `server/` - Backend FastAPI application

## Getting Started

### Client

Navigate to the client directory:

```bash
cd client
npm install
npm run dev
```

### Server

Navigate to the server directory:

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Features

- Browse available projects
- Post new projects
- User authentication
- Project details and management
- Responsive design

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Redux Toolkit
- React Router
- Framer Motion

### Backend
- FastAPI
- Python
- MongoDB (with Motor)
- JWT Authentication
- Python-dotenv

## Deployment

Follow the instructions in each directory's README file for deployment options.
