import React from 'react';
import classes from './Preview.scss'

const Preview  = function (props){
  
 return (
   <div className={classes.Preview}>
     <img src={props.currentPhoto.url} alt={props.currentPhoto.alt}/>
   </div>
 )
};

export default Preview;