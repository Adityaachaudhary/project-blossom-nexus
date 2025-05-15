
# Freelance Project Marketplace

A full-stack web application for posting and browsing freelance projects. Built with React, FastAPI, and MongoDB.

## Features

- View available freelance projects
- Post new projects with details and tech stack
- Filter and search projects by technology, budget, and status
- View project details
- Mark projects as completed

## Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- FastAPI (Python)
- MongoDB
- Pydantic

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB

### Frontend Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the project root:
   ```
   VITE_API_URL=http://localhost:8000
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:8080`

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Create a `.env` file:
   ```
   MONGODB_URL=mongodb://localhost:27017
   SECRET_KEY=your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```
6. Run the FastAPI server:
   ```
   python main.py
   ```
7. The API will be available at `http://localhost:8000`

## API Documentation

Once the backend server is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── store/              # Redux store
│   ├── services/           # API services
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── backend/
│   ├── main.py             # FastAPI entry point
│   └── requirements.txt    # Python dependencies
└── README.md
```

## License
MIT
