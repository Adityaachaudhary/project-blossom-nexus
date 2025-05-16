
# Project Name

This project follows a client-server architecture with a React frontend and FastAPI backend.

## Project Structure

```
project-root/  
├── client/                 # Frontend (React + TailwindCSS + Redux)  
│   ├── public/             # Public assets (like images, icons)  
│   ├── src/  
│   │   ├── components/     # Reusable UI components  
│   │   ├── features/       # Redux slices or feature-based components  
│   │   ├── pages/          # Page components (Home, Projects, etc.)  
│   │   ├── hooks/          # Custom React hooks  
│   │   ├── utils/          # Utility functions (like API calls)  
│   │   ├── store/          # Redux store configuration  
│   │   ├── styles/         # Global styles (Tailwind configuration)  
│   │   ├── App.tsx  
│   │   └── main.tsx  
│   ├── .env                # Environment variables (frontend-specific)  
│   ├── package.json  
│   ├── tsconfig.json  
│   └── vite.config.ts      # Vite configuration  
├── server/                 # Backend (FastAPI)  
│   ├── app/  
│   │   ├── main.py         # Entry point  
│   │   ├── models/         # Pydantic models  
│   │   ├── routes/         # API routes  
│   │   ├── schemas/        # Data validation schemas  
│   │   ├── services/       # Business logic  
│   │   ├── database/       # MongoDB connection  
│   │   └── utils/          # Helper functions  
│   ├── .env                # Environment variables (backend-specific)  
│   ├── requirements.txt    # Python dependencies  
│   └── uvicorn.config.py   # Uvicorn configuration  
├── .gitignore  
└── README.md  
```

## Getting Started

### Frontend (Client)

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start development server:
   ```
   npm run dev
   ```

### Backend (Server)

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start development server:
   ```
   python uvicorn.config.py
   ```
