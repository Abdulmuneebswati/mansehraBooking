import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { SearchContextProvider } from './Context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SearchContextProvider>
  <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </SearchContextProvider>

  </React.StrictMode>
);


