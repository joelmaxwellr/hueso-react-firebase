import React, { useState, useEffect, createContext } from 'react'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc, query, orderBy } from "firebase/firestore";
import { async } from '@firebase/util';
import { set } from 'firebase/database';
import PrintButton from './PrintButton';
import Prueba from './Prueba';
import { useContext } from 'react';
import IdPrintProvider from './IdPrintProvider';





export default function Crud() {
    const [nombreCliente, setNombreCliente] = useState("")
    const [material, setMaterial] = useState("DTF")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState(0)
    const [data, setData] = useState([])
    const [fecha, setFecha] = useState("")
    const [fechaOrden, setFechaOrden] = useState("")
    const [orden, setOrden] = useState("")
    const [estadoImpresion, setEstadoImpresion] = useState("En Espera")
    const [hora, setHora] = useState("")
    const [actualizando, setActualizando] = useState(false)
    const [mostrarBoton, setMostrarBoton] = useState(false)
    const [clienteActualizando, setClienteActualizando] = useState(null);

    const db = getFirestore()

    const limpiarCampos = (e) => {
        setNombreCliente("");
        setMaterial("");
        setPrecio(0);
        setDescripcion("");
        setMaterial("DTF")
        setEstadoImpresion("En Espera")
    }


    const crear = async () => {
        const fechaActual = new Date().toLocaleDateString()
        const fechaOrdens = new Date().getTime()
        const horaActual = new Date().toLocaleTimeString()
        setFecha(fechaActual)
        setFechaOrden(fechaOrdens)
        setHora(horaActual)
        console.log(material)
        try {
            const docRef = await addDoc(collection(db, "ordenes"), {
                nombreCliente: nombreCliente,
                material: material,
                descripcion: descripcion,
                precio: precio,
                /* orden: data.length == 0 ? 1 : data[0].orden + 1, */
                fecha: fecha,
                fechaOrden: fechaOrden,
                hora: hora,
                estadoImpresion: estadoImpresion
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        fetchData();
        limpiarCampos()
    }

    const fetchData = async () => {
        const querySnapshot = await getDocs(query(collection(db, "ordenes"), orderBy("fechaOrden", "desc"))); // Reemplaza 'nombre_coleccion' con el nombre de tu colección en Firestore
        const newArray = []
        querySnapshot.docs.map(doc => {
            newArray.push({ ...doc.data(), fechaOrden: doc.fechaOrden , id: doc.id })
        });
        /* newArray.sort((a, b) => b.fecha - a.fecha); */

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
                orden: orden,
                fecha: fecha,
                hora: hora,
                estadoImpresion: estadoImpresion
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
            {/*  <input type="text" id='material' placeholder='material' value={material} onChange={(e) => setMaterial(e.target.value)} /> */}
            <select name="material" id="material" value={material} onChange={(e) => setMaterial(e.target.value)}>
                <option value="DTF">DTF</option>
                <option value="UV">UV</option>
                <option value="Sublimación">Sublimación</option>
                <option value="Impresión Directa">Impresion Directa</option>
            </select>
            <input type="number" id='precio' placeholder='Precio' value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <input type="text" id='descripcion' placeholder='Descripción' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <select name="estadoImpresion" id="estadoImpresion" value={estadoImpresion} onChange={(e) => setEstadoImpresion(e.target.value)}>
                <option value="En Espera">En Espera</option>
                <option value="Aprobado" >Aprobado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Imprimiendo">Imprimiendo</option>
                <option value="Listo">Listo</option>
            </select>
            {!actualizando ? <button onClick={crear}>Crear</button> : <div><button onClick={guardarActualizacion}>Guardar Actualización</button> <button onClick={cancelar}>Cancelar</button></div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Material</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Estatus</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.length == 0 ? "No hay ordenes de trabajo" : data.map(item => (
                                <tr key={item.id}>

                                    <th scope="row">{item.orden}</th>
                                    <td>{item.nombreCliente}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.material}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.estadoImpresion}</td>
                                    <td>{item.fecha}</td>
                                    <td>{item.hora}</td>



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
