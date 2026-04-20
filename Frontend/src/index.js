import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Fix: Create a dedicated container inside #root so browser extensions
// (Grammarly, ad blockers, etc.) that inject into #root don't crash React.
const rootElement = document.getElementById('root');
const appContainer = document.createElement('div');
appContainer.id = 'app-container';
rootElement.appendChild(appContainer);

const root = ReactDOM.createRoot(appContainer);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
