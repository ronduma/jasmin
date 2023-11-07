import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../../App.css';
const TextSlideshow = ({ texts }) => {
    return(
        <div className = "slideshow-container">
            <Slide arrows = {false}  autoplay = {true} texts = {texts}>
                {texts.map((each, index) => (
                    <div key = {index} className ="each-slide">
                        <span className = "textStyle" >
                            {each}
                        </span>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default TextSlideshow;