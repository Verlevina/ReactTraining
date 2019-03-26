import React, {Component} from 'react';
import classes from './Navigation.scss';
import MenuButton from '../../UI/MenuButton/MenuButton';

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
    console.log(cls)
    console.log(this.state.isClicked)

    return(
      <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>
          <li>1 пункт</li>
          <li>2 пункт</li>
          <li>3 пункт</li>
          <li>4 пункт</li>
        </ul>
      </nav>
      <MenuButton isClicked = {this.state.isClicked} onClickHandler = {this.onCloseButtonClickHandler}/>
      </React.Fragment>
    )
  }
}
export default Navigate;