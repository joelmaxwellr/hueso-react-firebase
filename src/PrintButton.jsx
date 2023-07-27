import { useState } from "react";




const PrintButton = ({ objeto, mostrarBoton }) => {

  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleImprimirClick = (objeto) => {
    setSelectedCliente(objeto);
    console.log(selectedCliente)
  };
  useEffect(() => {
    console.log(selectedCliente);
  }, [selectedCliente]);

  const handlePrint = (cliente) => {
    const printContents = `
    <div>
      <h2>${cliente.nombreCliente}</h2>
      <h2>${cliente.precio}</h2>
      <p>This content will be printed.</p>
    </div>
  `;
   
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${printContents}
          <script type="text/javascript">
            window.onload = function() {
              window.print();
            }

            window.onafterprint = function() {
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };



  return (
    <div>
      <button onClick={() => {
        handlePrint(objeto)
        handleImprimirClick(objeto)

      }} disabled={mostrarBoton}>Print</button>
      <div id="print-contents" style={{ display: 'none' }}>
        {/* Contenido específico para imprimir */}

      </div>
    </div>
  );
};

export default PrintButton;
