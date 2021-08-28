import React, {useContext, useState} from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContex';


const Formulario = () => {

    // Trayendo los datos de context
    const {categorias} = useContext(CategoriasContext);
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext);

    //Creando un State Local

    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categorias: ''
    })

    // Leer el contenido del formulario 
        const obtenerDatosReceta = e => {
            guardarBusqueda({
                ...busqueda,
                [e.target.name] : e.target.value
            })
        }

    return ( 
        <form
        className="col-12"
        onSubmit={ e=>{
            e.preventDefault();
            buscarRecetas(busqueda);
            guardarConsultar(true);    
        }}
        >
            <fieldset className="text-center">
                <legend>Bebidas por categoría</legend>
            </fieldset>
            <div className="row">
                <div className="col-4">   
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Bebida principal"
                        onChange= {obtenerDatosReceta}
                    />
                </div>

                <div className="col-4">   
                    <select
                        className="form-control"
                        name="categorias"
                        onChange= {obtenerDatosReceta}
                    >
                        <option value="">--Selecciona el acompañante--</option>
                        {categorias.map(categorias => (
                            <option 
                                key={categorias.strCategory}
                                value={categorias.strCategory.replace(' ', '_')}
                            >{categorias.strCategory}</option>
                        ))}
                    </select>
                   
                </div>
                <div className="col-4">   
                <input 
                        className="btn btn-block btn-primary"
                        type="submit"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;