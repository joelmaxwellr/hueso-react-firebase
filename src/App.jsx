import { useState, useContext } from 'react'
import Auth from './Auth'
import { useFirebaseApp } from 'reactfire'
import ReactToPrint from 'react-to-print';
import IdPrintProvider from './IdPrintProvider';

function App() {
  const [IdPrint, setIdPrint] = useState()
  const a = ReactToPrint
  console.log(a)

  return (
    <>
      <IdPrintProvider.Provider value={{IdPrint:IdPrint, setIdPrint:setIdPrint}}>
        <Auth />
      </IdPrintProvider.Provider>
    </>
  )
}

export default App
