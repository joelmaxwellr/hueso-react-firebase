import React from 'react'
import { useState } from 'react';
import { useUser, useFirebaseApp, useAuth } from 'reactfire';
import firebaseConfig from './firebase-config';
import "firebase/auth"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import Crud from './Crud.JSX';
import PrintButton from './PrintButton';
import Prueba from './Prueba';



export default function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logStatus, setLogStatus] = useState(null);
  /*   const user = useUser() */
  const auth = getAuth()

  const create = () => {
    createUserWithEmailAndPassword(auth, email, password)

  }


  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)

        setLogStatus(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  const signingOut = () => {

    signOut(auth).then((userCredential) => {
      const user = userCredential;
      console.log(user)
      setLogStatus(user)

      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const clientes = [
    { nombre: 'Cliente 1', precio: 100 },
    { nombre: 'Cliente 2', precio: 200 },
    { nombre: 'Cliente 3', precio: 150 },
    // Agrega más clientes si es necesario
  ];

  return (

    <div>{!logStatus &&
      <div>
           <PrintButton />
           <Prueba clientes={clientes} />
        <label htmlFor="email">Correo electronico</label>
        <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} />
        <button className='btn btn-primary' onClick={create}>Crear cuenta</button>
        <button className='btn btn-success' onClick={signIn}>Iniciar Sesión</button>
      </div>}
      {logStatus && <div>
        <button onClick={signingOut}>Cerrar Sesión</button>
        <Crud />
      </div>

      }

    </div>





  )
}
