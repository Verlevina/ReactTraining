import React from 'react';
import classes from './MenuButton.scss';

const MenuButton = function(props) {
  let cls = [classes.MenuButton];
  if(!props.isClicked){
    cls.push(classes.MenuButtonClose)
  }
return(
  <button onClick={props.onClickHandler} className={cls.join(' ')}>меню
  </button>
)
};
export default MenuButton;