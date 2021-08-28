import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        overflowX: 'hidden',
        height: '100%',
        maxHeight: 800,
        display: 'block'
        },
        
}));



const Receta = ({receta}) => {
    
    //Configuracion del modal de materialUI

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();
    
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const {informacion, guardarIdReceta, guardarReceta} = useContext(ModalContext);
    
     // Muestra y formatea los ingredientes
     const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            if( informacion[`strIngredient${i}`] ) {
                ingredientes.push(
                    <li> { informacion[`strIngredient${i}`] } - { informacion[`strMeasure${i}`] }</li>
                )
            }
        }

        return ingredientes;
    }


    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb}/>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={ () => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={() =>{
                            guardarIdReceta(null);
                            guardarReceta({})
                            handleClose();
                        }}
                        className={classes.modal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div style={modalStyle} className={classes.paper}>
                                <h2 id="transition-modal-title">{informacion.strDrink}</h2>
                                <div id="transition-modal-description" className="mt-4">
                                    <h3>Instrucciones</h3>
                                    <p>
                                        {informacion.strInstructions}
                                    </p>

                                    <img className="img-fluid my-4" src={informacion.strDrinkThumb} />

                                    <h3>Ingredientes y cantidades</h3>
                                    <ul>
                                        {mostrarIngredientes(informacion)}
                                    </ul>
                                </div>
                            </div>
                         </Fade>
                    </Modal>
                </div>
            </div>
        </div>

    );
}
 
export default Receta;