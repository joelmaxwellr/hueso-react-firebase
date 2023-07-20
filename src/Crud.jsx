import React, { useState, useEffect, createContext } from 'react'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { set } from 'firebase/database';
import PrintButton from './PrintButton';
import Prueba from './Prueba';
import { useContext } from 'react';
import IdPrintProvider from './IdPrintProvider';





export default function Crud() {
    const [nombreCliente, setNombreCliente] = useState("")
    const [material, setMaterial] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState(0)
    const [data, setData] = useState([])
    const [actualizando, setActualizando] = useState(false)
    const [mostrarBoton, setMostrarBoton] = useState(false)
    const [clienteActualizando, setClienteActualizando] = useState(null);

    const db = getFirestore()

    const limpiarCampos = () => {
        setNombreCliente("");
        setMaterial("");
        setPrecio(0);
        setDescripcion("");
    }


    const crear = async () => {

        try {
            const docRef = await addDoc(collection(db, "ordenes"), {
                nombreCliente: nombreCliente,
                material: material,
                descripcion: descripcion,
                precio: precio
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        fetchData();
        limpiarCampos()
    }

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "ordenes")); // Reemplaza 'nombre_coleccion' con el nombre de tu colección en Firestore
        const newArray = []
        querySnapshot.docs.map(doc => {
            newArray.push({ ...doc.data(), id: doc.id })
        });
        setData(newArray);
        console.log(newArray)
    };

    useEffect(() => {
        fetchData();

    }, []);

    const borrar = async (id) => {
        console.log(id)
        await deleteDoc(doc(db, "ordenes", id));
        fetchData()
    }
    const actualizar = (item) => {
        setNombreCliente(item.nombreCliente);
        setMaterial(item.material);
        setPrecio(item.precio);
        setDescripcion(item.descripcion);
        setActualizando(true);
        setClienteActualizando(item);
        setMostrarBoton(true)



    }

    const guardarActualizacion = async () => {
        try {
            await setDoc(doc(db, "ordenes", clienteActualizando.id), {
                nombreCliente: nombreCliente,
                material: material,
                descripcion: descripcion,
                precio: precio,
            });
            console.log("Document successfully updated!");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
        setActualizando(false);
        limpiarCampos();
        fetchData();
        setMostrarBoton(false)
    }
    
    const cancelar = () => {
        setActualizando(false);
        limpiarCampos();
        fetchData();
        setMostrarBoton(false)
    }

    return (
        <div>

            <input type="text" id='nombreCliente' placeholder='cliente' value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
            <input type="text" id='material' placeholder='material' value={material} onChange={(e) => setMaterial(e.target.value)} />
            <input type="number" id='precio' placeholder='precio' value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <input type="text" id='descripcion' placeholder='descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            {!actualizando ? <button onClick={crear}>Crear</button> : <div><button onClick={guardarActualizacion}>Guardar Actualización</button> <button onClick={cancelar}>Cancelar</button></div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Material</th>
                            <th scope="col">descripcion</th>
                            <th scope="col">Estatus</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map(item => (
                                <tr key={item.id}>

                                    <th scope="row">1</th>
                                    <td>{item.nombreCliente}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.material}</td>
                                    <td>{item.descripcion}</td>
                                    <td></td>

                                    <td><PrintButton objeto={item} mostrarBoton={mostrarBoton} /></td>
                                    <td><button onClick={() => borrar(item.id)} disabled={mostrarBoton}>Borrar</button></td>
                                    <td><button onClick={(e) => actualizar(item, e)} >Actualizar</button></td>

                                    {/* <td>{item.estatus}</td> */}
                                </tr>
                            ))

                        }
                    </tbody>

                </table>

            </div>



        </div >
    )
}
