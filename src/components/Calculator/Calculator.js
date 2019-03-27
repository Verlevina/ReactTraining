import React, {Component} from "react";
import axios from 'axios';
import Loader from '../../UI/Loader/Loader';
//import classes from './Calculator.scss'

const calculateTransform = (Rub, Val, Nominal)=> Rub * Val / Nominal;



class Calculator extends Component {
  state = {
    loading: true,
    valute: null,
    selectedValue: "BGN",
    inputValue: 10,
    calculateValue: null
  };

  async componentDidMount () {
    const storage = window.localStorage;
    if (storage.getItem('valute')) {
      this.setState({
        selectedValue: storage.getItem('valute')
      })
    }
    if (storage.getItem('value')) {
      this.setState({
        inputValue: storage.getItem('value')
      })
    }
    await this.getResponceToValute ();
    this.calculateResult();
  }

  selectChangeHandler = (event) => {
    this.calculateResult(null, this.state.valute[event.target.value].Value);
    this.setState ({

      selectedValue: event.target.value
    });



  };
  calculateResult = (rub, val,) => {
    if(!rub) {
     rub = this.state.inputValue;
   }
   if(!val) {
     val = this.state.valute[this.state.selectedValue].Value;
   }
   const nominal = this.state.valute[this.state.selectedValue].Nominal;
   console.log(rub,val,nominal);
  const calculateValue =  calculateTransform(rub,val,nominal);
  this.setState({
    calculateValue
  })
};

  onChangeValueInput = (event) => {
    let inputValue = event.target.value;
    this.calculateResult(inputValue);
    this.setState ({
      inputValue
    });
  };

  getResponceToValute = async function () {
    try {
      const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
      this.setState({
        loading: false,
        valute: response.data.Valute,
      })
    } catch (e) {
      console.log(e);
    }
  };

  onButtonRememberToStorageClick = () => {
   const myStorage = window.localStorage;
    myStorage.setItem('valute', this.state.selectedValue);
    myStorage.setItem('value', this.state.inputValue);
  };




  render() {
    return (
      <div>
        {this.state.loading
          ? <Loader/>
          : <div>
            <select onChange={this.selectChangeHandler.bind(this) }>
            {Object.keys(this.state.valute)
              .map((key, index) => {
                return (
                  <option key={key + index} data={this.state.valute[key]} selected={this.state.selectedValue===key}>
                    {key}
                    </option>)
              })
            }
          </select>
            <br/>
            <label htmlFor="inputValue">Введите сумму для расчета</label>
            <input
              type='number'
              id='inputValue'
              value={this.state.inputValue}
              onChange={this.onChangeValueInput.bind(this)}/>
            <span>{this.state.selectedValue}.</span>
            <p>сумма в руб.= {this.state.calculateValue}</p>
            <button onClick={this.onButtonRememberToStorageClick}>Запомнить значения!</button>
          </div>
        }
      </div>
    )
  }

}
export default Calculator;