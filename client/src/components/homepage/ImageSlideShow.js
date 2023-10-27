import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../../App.css';
const ImageSlideshow = ({ images }) => {
  return (
    <div className="slideshow-container">
      <Slide autoplay = {false} images={images}>
        {images.map((each, index) => (
          <div key={index} className="each-slide">
            <div style={{'backgroundImage': `url(${each.image})` }}>
                <span className = "spanStyle">{each.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlideshow;
