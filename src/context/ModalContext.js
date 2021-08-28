import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    //State del provider

    const [idreceta, guardarIdReceta] = useState(null);

    const [ informacion, guardarReceta ] = useState({});


    //Obtenido el ID de la receta, llamamos a la API

    useEffect(() => {
        if(!idreceta) return;
        
        const obtenerRecetas = async () =>{
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`; 
        const resultado = await axios.get(url);
        guardarReceta(resultado.data.drinks[0])
    }
        obtenerRecetas();
       
    }, [idreceta]);

    return ( 

        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}

        </ModalContext.Provider>



     );
}
 
export default ModalProvider;

