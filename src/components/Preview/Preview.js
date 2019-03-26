import React from 'react';

const Preview  = function (props){
  
 return (
   <div>
     <img src={props.currentPhoto.url} alt={props.currentPhoto.alt}/>
   </div>
 )
};

export default Preview;