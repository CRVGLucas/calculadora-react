import React from 'react';
import './Botao.css';

function clickFunction(value){
    console.log('clicou no', value)
}
export default props =>
        <button className={`botao
          ${props.operador ? "operador" : ""} 
          ${props.duplo ? "duplo" : ""}
        `} onClick={e => props.click && props.click(props.label)}>
            {props.label}
        </button>

