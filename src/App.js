import React, {Fragment} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import { CategoriasContext } from './context/CategoriasContext';
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContex';
import ListaRecetas from './components/ListarRecetas';
import ModalProvider, { ModalContext } from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
        <Header /> 
        <div className="container mt-5">
          <div className="row">   
            <Formulario />
          </div>
            <ListaRecetas />
        </div>
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
