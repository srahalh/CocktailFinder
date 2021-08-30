import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container } from '@material-ui/core';

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
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3, 4),
        overflow: 'scroll',
        overflowX: 'hidden',
        height: '90%',
        maxHeight: 'auto',
        display: 'block'
        },
    none:{
        border: 'none',
        background: 'transparent',
    }

        
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
                            <div style={modalStyle} className={`${classes.paper} container`}>
                                <div className="row justify-content-end">
                                    <div className="col-1">
                                        <button type="button" className={classes.none} onClick={handleClose}>
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mb-2"><h2 id="transition-modal-title col-12">{informacion.strDrink}</h2></div>
                                </div>
                                <div className="rounded row transition-modal-description">
                                        <div className="col-md-8 col-xl-8 col-sm-12 text-center mt-2">
                                            <img className="rounded img-fluid" src={informacion.strDrinkThumb} />
                                        </div>
                                        <div className= "col-md-4 col-xl-4 col-sm-12 mt-2">
                                            <h3>Instrucciones</h3>
                                            <p>
                                                {informacion.strInstructions}
                                            </p>
                                            <h3>Ingredientes y cantidades</h3>
                                            <ul>
                                                {mostrarIngredientes(informacion)}
                                            </ul>
                                        </div>
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