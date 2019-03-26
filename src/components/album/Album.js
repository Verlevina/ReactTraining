import React from 'react';
import classes from './Album.scss';
import Preview from '../Preview/Preview';

class Album extends React.Component {
  state = {
    currentPhoto: null,
    currentPhotoID: null,
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
    isClicked: false
  };
  onPictureClickHandler (evt, id) {
    evt.preventDefault();
    const currentPhoto = this.state.photoList.find((item) => item.id === id);
    this.setState({
      isClicked: true,
      currentPhotoID: id,
      currentPhoto
    })
  }

render(){
    return (
     <React.Fragment>
      <div className={classes.album}>
        <ul className={classes.albumList}>
        {this.state.photoList.map((photo) => {
          return (<li key = {photo.id} className={classes.albumItem}>
              <a href={photo.url} className={classes.albumLink} onClick={(evt) => this.onPictureClickHandler(evt, photo.id)}>
                <img src={photo.url} alt={photo.alt} className={classes.albumImage}/>
              </a>
          </li>)
        })}
        </ul>
      </div>
  {this.state.isClicked
    ? <Preview currentPhoto = {this.state.currentPhoto} photoList = {this.state.photoList} />
  : null}
     </React.Fragment>
    )
  }
}

export default Album;