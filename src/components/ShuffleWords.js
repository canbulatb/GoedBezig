// src/components/ShuffleWords.js

import React from 'react';

const ShuffleWords = ({ words, path, onWordClick }) => {


  return (
    <div  style={ { marginRight: '10px', fontSize:'30px', color:'red', minHeight:'50px'}}>
      
        {words.map((word, index) => (
          <div key={index} onClick={() => onWordClick(word,path)} style={{ display: 'inline-block', marginRight: '10px', fontSize:'30px', color:'red', minHeight:'50px' }}>
           {word.replace(/\d+/g, '')}
          </div>
        ))}
    </div>
  );
}

export default ShuffleWords;
