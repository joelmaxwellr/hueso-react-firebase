import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from "./firebase-config.jsx"
import {FirebaseAppProvider} from "reactfire"
import { useState, useEffect } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={"Cargando..."}>
    <App />
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
)
