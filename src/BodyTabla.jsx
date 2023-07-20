const BodyTabla = ({ id, cliente, precio, material, descripcion, estatus }) => {
    return (
        <>

            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{cliente}</td>
                    <td>{precio}</td>
                    <td>{material}</td>
                    <td>{descripcion}</td>
                    <td>{estatus}</td>


                </tr>

            </tbody>
        </>
    );
}

export default BodyTabla;