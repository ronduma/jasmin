import {useState, useEffect} from 'react';
import './slider-styles.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

const images = [
  { url: "/imgs/homepage/slider/slide_img1.jpg" },
  { url: "/imgs/homepage/slider/slide_img2.jpg" },
  { url: "/imgs/homepage/slider/slide_img3.jpg" }
];
const messages = [
  "Mental health platform that brings patients and therapists together",
  "Assistance for mental health with just a click of a button",
  "Start now and improve your mental strength"
]
const Slider = () => {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(timer); // Clear the timer when the component is unmounted
    };
  }, []);

  return (
    <section
      aria-label="Image Slider"
      style={{ width: "75%", height: "75%", position: "relative" }}
    >
      <a href="#after-image-slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map(({ url, alt }, index) => (
          <img
            key={url}
            src={url}
            alt={alt}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ transform: `translateX(-${100 * imageIndex}%)` }} // Adjusted here
          />
        ))}
        <div className="gradient"></div>
        <div className="caption">
         {messages[imageIndex]}
          <div className="image-btns">
            <Button color="white"><Link to='/speciallist' className='link-button'>Choose your specialist</Link></Button>
            <Button color="white"><Link to='/all_matching' className='link-button'>See all</Link></Button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right:"4rem",
          display: "flex",
          gap: "2rem",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <div className="selected" aria-hidden></div>
            ) : (
              <div aria-hidden></div>
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  );
};

export default Slider;