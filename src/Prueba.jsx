import PrintButton2 from "./PrintButton2";
import { useState } from "react";


const Prueba = ({clientes}) => {
    console.log(clientes)
    const [selectedCliente, setSelectedCliente] = useState(null);

    const handleImprimirClick = (cliente) => {
      setSelectedCliente(cliente);
    };
  
    return ( 
        <div>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nombre}</td>
                <td>{cliente.precio}</td>
                <td>
                  <PrintButton2 onClick={() => handleImprimirClick(cliente)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedCliente && (
          <p>
            Datos del cliente seleccionado: {selectedCliente.nombre}, Precio: {selectedCliente.precio}
          </p>
        )}
      </div>
     );
}
 
export default Prueba;