import React from 'react';

const ResimPanel = ({ words, onWordClick }) => {
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
  
    return (
        <div><section class="carousel" aria-label="Gallery">
            
            <ol class="carousel__viewport">
            
                <li id="carousel__slide1"
                    tabindex="0"
                    class="carousel__slide">
                </li>
                <div class="carousel__prev"></div>
            <div class="carousel__next"></div>
            
                
            </ol>
        </section></div>      
    );
  }
  
  export default ResimPanel;
  


