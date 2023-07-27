import React from 'react';
import { useState } from 'react';
import { useUser, useFirebaseApp, useAuth } from 'reactfire';
import firebaseConfig from './firebase-config';
import "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

import PrintButton from './PrintButton';
import Prueba from './Prueba';
import Crud from './Crud.jsx';

export default function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logStatus, setLogStatus] = useState(null);
  const auth = getAuth();

  // Establecer la persistencia de sesión local
  setPersistence(auth, browserSessionPersistence);

  const create = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        setLogStatus(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signingOut = () => {
    signOut(auth).then(() => {
      setLogStatus(null); // Establece logStatus a null para indicar que no hay usuario autenticado
    }).catch((error) => {
      // Un error ocurrió
    });
  };

  return (
    <div>
      {!logStatus && (
        <div>
          
          
          <label htmlFor="email">Correo electronico</label>
          <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Contraseña</label>
          <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} />
          <button className='btn btn-primary' onClick={create}>Crear cuenta</button>
          <button className='btn btn-success' onClick={signIn}>Iniciar Sesión</button>
        </div>
      )}
      {logStatus && (
        <div>
          <button onClick={signingOut}>Cerrar Sesión</button>
          <Crud />
        </div>
      )}
    </div>
  );
}
