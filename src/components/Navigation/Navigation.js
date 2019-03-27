import React, {Component} from 'react';
import classes from './Navigation.scss';
import {Link} from "react-router-dom";
import MenuButton from "../../UI/MenuButton/MenuButton";

class Navigate extends Component {
  state = {
    isClicked: false,
  };

  onCloseButtonClickHandler = () => {
    let isClicked = !this.state.isClicked;
    this.setState({
      isClicked
      })
  };

  render () {

    const cls = [classes.Navigation];
    if(!this.state.isClicked) {
      cls.push(classes.menuClose);
    }
    return(
      <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>
          <li>
            <Link to={`/Album`}>Альбом</Link>
          </li>
          <li>
            <Link to={`/Currency`}>Валюты</Link>
          </li>
          <li>
            <Link to={`/Calculator`}>Калькулятор</Link>
          </li>
          <li>4 пункт</li>
        </ul>
      </nav>
      <MenuButton isClicked = {this.state.isClicked} onClickHandler = {this.onCloseButtonClickHandler}/>
      </React.Fragment>
    )
  }
}
export default Navigate;