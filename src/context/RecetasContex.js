import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {


    const [recetas, guardarRecetas] = useState([]) // resultado de la busqueda
    
    const [consultar, guardarConsultar] = useState(false)

    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categorias: ''
    })

    const {nombre, categorias} = busqueda;

    useEffect(() => {
        if(consultar){
            const obtenerRecetas = async () =>{
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categorias}`; //Se le aplico un .replace a la categoria antes de guardarlo en el state para que no se rompa
            const resultado = await axios.get(url);
            guardarRecetas(resultado.data.drinks);
       }
       obtenerRecetas();
    }

       
    }, [busqueda]);

    return ( 
        <RecetasContext.Provider
        value={{
            recetas,
            buscarRecetas,
            guardarConsultar,
            
        }}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;