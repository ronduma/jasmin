import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {NavLink} from 'react-router-dom';
import '../../App.css';
const ImageSlideshow = ({ images }) => {
  return (
    <div className="slideshow-container">
      <Slide 
      autoplay = {false} 
      images={images}    
      indicators = {true}
      >
        {images.map((each, index) => (
          <div key={index} className="each-slide">
            <div style = {{'backgroundColor': "#EADDCA"}}>
              <div className='div-between'>
                <p className='text-slide'>{each.caption}</p>
                <NavLink to="/about" className ='slide-button'>Read More</NavLink>

              </div>
              <div className='div-between'>
                <img className="image-slide" src={each.image} alt='bruh'></img>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlideshow;
