import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import usePropiedades from '../hooks/usepropiedades';
import PropiedadPreview from './propiedadPreview';
import listadoPropiedadesCSS from '../css/listadoPropiedades.module.css';
import UseFiltro from '../hooks/usefiltro';

const ListadoPropiedades = () => {

    const resultado = usePropiedades();
    const [propiedades] = useState(resultado);
    const [filtradas, guardarFiltradas] = useState([]);

    // filtrado de propiedades
    const { categoria, FiltroUI } = UseFiltro();

    useEffect(() => {
        if(categoria){
            const filtro = propiedades.filter(propiedad => propiedad.categoria.nombre === categoria);
            guardarFiltradas(filtro);
        }else{
            guardarFiltradas(propiedades);
        }
    }, [categoria, propiedades]);

    return (
        <>
            <h2 css={css`
                margin-top: 5rem;
            `}>Nuestras Propiedades</h2>

            {FiltroUI()}

            <ul className={listadoPropiedadesCSS.propiedades}>
                {filtradas.map(propiedad => (
                    <PropiedadPreview 
                        key={propiedad.id}
                        propiedad={propiedad}
                    />
                ))}
            </ul>
        </>
    );
};

export default ListadoPropiedades;