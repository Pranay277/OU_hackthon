# ACNS - Accessible Campus Navigation System

**Core Philosophy:**
The Accessible Campus Navigation System (ACNS) is designed to empower every individual, regardless of their physical abilities, to navigate a campus environment safely, securely, and efficiently. Our project bridges the gap between complex topographies and accessible paths, ensuring that wheelchair users, visually impaired individuals, and people with temporary mobility challenges can find the most optimal route to their destination. ACNS actively gathers crowdsourced data on infrastructure (ramps, elevators, obstacles) to maintain a dynamically updated map that serves the community.

## Monorepo Project Structure

This repository follows a clean Monorepo structure, separating the logic for the backend (Flask) and frontend (React).

```
ACNS-Project/
├── backend/                
│   ├── app.py             
│   ├── requirements.txt    
│   ├── .env               
│   ├── database_schema.json
│   └── utils/              
├── Frontend/               
│   ├── src/                
│   ├── public/            
│   ├── package.json        
│   └── .env                
├── .gitignore              
├── README.md               
├── package.json            
├── start.bat               
└── Procfile                
```

## Tech Stack Overview

### Backend
- **Python Flask** - Core server logic
- **Firebase Admin SDK** - Database management and authentication
- **NetworkX** - Complex graph logic for pathfinding algorithms

### Frontend
- **React 18** - Dynamic User Interface framework
- **Mapbox GL JS** - Interactive maps
- **Axios** - API communications
- **Chart.js** - Admin analytics

## How to Run the Application Locally

You can run both the backend and frontend at the same time using a single command from the root directory. Make sure you have Node.js and Python installed.

```bash
# 1. Install all dependencies for both Frontend and Backend
npm run install-all

# 2. Start both servers concurrently
npm start
```

*Frontend runs on `http://localhost:3000`*
*Backend runs on `http://localhost:5000`*

## Deployment

A `Procfile` is included in the root directory. When deploying to platforms like Heroku or Render:
- Configure the deployment settings to point to the root `Procfile`.
- Set your target environment variables in the host dashboard.
- The `Procfile` uses `gunicorn` to serve the Flask app located in the `backend/` directory.

---
*Created for the Osmania University Hackathon.*
