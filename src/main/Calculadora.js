import React from 'react';
import './Calculadora.css';
//Components
import Display from '../componentes/Display/Display';
import Botao from '../componentes/Botao/Botao'
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}
export default class Calculadora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initialState}
        this.adicionarOperador = this.adicionarOperador.bind(this);
        this.limparCalculadora = this.limparCalculadora.bind(this);
        this.adicionarNumero = this.adicionarNumero.bind(this);
        this.salvarValoresPorOperador = this.salvarValoresPorOperador.bind(this);
    }

    salvarValoresPorOperador(operador,values, igual){
        values[1] = 0;
        this.setState({
            displayValue: values[0],
            operador: igual ? null : operador,
            current: igual ? 0 : 1,
            clearDisplay: !igual,
            values
        })
    }

    limparCalculadora(){
        this.setState({...initialState})
    }
    adicionarOperador(operador){
        if(this.state.current === 0){
            this.setState({operador,current:1,clearDisplay: true})
        } else {
            const igual = operador === '='
            const currentOperation = this.state.operador
            const values = [...this.state.values];
            switch (currentOperation) {
                case '+':
                    values[0] = values[0] + values[1];
                    this.salvarValoresPorOperador(operador,values,igual);
                    break;
                case '-':
                    values[0] = values[0] - values[1];
                    this.salvarValoresPorOperador(operador,values,igual);
                    break;
                case 'x':
                    values[0] = values[0] * values[1];
                    this.salvarValoresPorOperador(operador,values,igual);
                    break;
                case '/':
                    values[0] = values[0] / values[1];
                    this.salvarValoresPorOperador(operador,values,igual);
                    break;
                default:
                    return;
            }
        }
    }
    adicionarNumero(numero){
        if(numero === '.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + numero;
        this.setState({ displayValue, clearDisplay: false})
        if(numero !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue
            this.setState({values})
        }
    }
    render() {
        return(
          <div className="calculadora">
              <Display valor={this.state.displayValue}/>
              <div className="areaButtons">
                  <Botao label={7} click={this.adicionarNumero}/>
                  <Botao label={8} click={this.adicionarNumero}/>
                  <Botao label={9} click={this.adicionarNumero}/>
                  <Botao label={'/'} operador={true} click={this.adicionarOperador}/>
                  <Botao label={4} click={this.adicionarNumero}/>
                  <Botao label={5} click={this.adicionarNumero}/>
                  <Botao label={6} click={this.adicionarNumero}/>
                  <Botao label={'x'} operador={true} click={this.adicionarOperador}/>
                  <Botao label={1} click={this.adicionarNumero}/>
                  <Botao label={2} click={this.adicionarNumero}/>
                  <Botao label={3} click={this.adicionarNumero}/>
                  <Botao label={'-'} operador={true} click={this.adicionarOperador}/>
                  <Botao label={0} duplo={true} click={this.adicionarNumero}/>
                  <Botao label={'.'} operador={true} click={this.adicionarNumero}/>
                  <Botao label={'+'} operador={true} click={this.adicionarOperador}/>
                  <Botao label={'AC'} operador={true} click={this.limparCalculadora} duplo={true}/>
                  <Botao label={'='} operador={true} click={this.adicionarOperador} duplo={true}/>
              </div>
          </div>
        );
    }
}
