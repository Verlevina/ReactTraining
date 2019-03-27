import React, {Component} from "react";
import axios from 'axios';
import Loader from '../../UI/Loader/Loader';
import classes from './Currency.scss'


class Currency extends Component {
  state = {
    loading: true,
    valute: null,
    valuteGetDay: null
  };
  async componentDidMount () {
    await this.getResponceToValute ()
  }

  onButtonClickReload = () => {
    this.setState({
      loading: true
    });
    this.getResponceToValute();
  };

  getResponceToValute = async function () {
    try {
      const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
      this.setState({
        loading: false,
        valute: response.data.Valute,
        valuteGetDay: response.data.Date
      })
    } catch (e) {
      console.log(e);
    }
  };

  render(){
    return (
      <div style={{color:'red', border:'2px solid #ccc'}} className={classes.Currency}>
        <h1>Данные от:<br/>
          <strong>{this.state.loading
            ? 'Подождите, данные загружаются'
            : (this.state.valuteGetDay)
              .toString()
              .slice(0,19)
              .split('T')
              .join(' ')}</strong>
        </h1>
        {this.state.loading
          ? <Loader/>
            : <table>
            <tbody>
            <tr>
              <th>Name</th>
              <th>Nominal</th>
              <th>Value</th>
              <th>Previous</th>
            </tr>
            {Object.keys(this.state.valute).map((key, index) => {
              let element = this.state.valute[key];
              return (
                <tr key = {key + index}>
                  <td>
                    {element.Name}
                  </td>
                  <td>
                    {element.Nominal}
                  </td>
                  <td>
                    {element.Value} руб.
                  </td>
                  <td>
                    {element.Previous} руб.
                  </td>

                </tr>)
            })
            }
            </tbody>
          </table>
            }
            <button onClick = {this.onButtonClickReload.bind(this)}>Обновить</button>

      </div>)
  }

}

export default Currency;