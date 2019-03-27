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

  onChangeValueInput = function (event) {
    console.log(event.target.value);

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
            <input type='number' id='inputValue' value={this.state.inputValue}  onChange={this.onChangeValueInput.bind(this)}/>{this.state.selectedValue}.
            <p>сумма в руб.= {this.state.calculateValue}</p>
          </div>
        }
      </div>
    )
  }

}
export default Calculator;