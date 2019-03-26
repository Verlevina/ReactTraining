import React from 'react';
//import classes from './Album.scss';

class Album extends React.Component {
  state = {
    currentPhoto: null,
    photoList: [
      {
        id: 1,
        url: '../../../img/1.jpg',
        alt: '1 alt',
      },
      {
        id: 2,
        url: '../../../img/2.jpg',
        alt: '2 alt',
      },
      {
        id: 3,
        url: '../../../img/3.jpg',
        alt: '3 alt',
      },      {
        id: 4,
        url: '../../../img/4.jpg',
        alt: '4 alt',
      },      {
        id: 5,
        url: '../../../img/5.jpg',
        alt: '5 alt',
      },      {
        id: 6,
        url: '../../../img/6.jpg',
        alt: '6 alt',
      },      {
        id: 7,
        url: '../../../img/7.webp',
        alt: '7 alt',
      } ,
      {
        id: 8,
        url: '../../../img/8.webp',
        alt: '8 alt',
      }
      ],
    isClick: false
  };

render(){
    return (
     <React.Fragment>
      <div>
        <ul>
        {this.state.photoList.map((photo) => {
          return (<li key = {photo.id}>
              <a href={photo.url}>
                <img src={photo.url} alt={photo.alt}/>
              </a>
          </li>)
        })}
        </ul>
      </div>
  {this.state.isClicked
    ? /*<Previev/>*/null
  : null}
     </React.Fragment>
    )
  }
}

export default Album;