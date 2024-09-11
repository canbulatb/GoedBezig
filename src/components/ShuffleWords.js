// src/components/ShuffleWords.js

import React from 'react';

const ShuffleWords = ({ words, path, onWordClick }) => {
console.log(words)

  return (
    <div style={{ marginRight: '10px', fontSize: '30px', color: 'red', minHeight: '50px' }}>
    {words.map((item) => (
      <div 
        key={item.index} 
        onClick={() => onWordClick(item.word, item.index, path)} 
        style={{ display: 'inline-block', marginRight: '10px', fontSize: '30px', color: 'red', minHeight: '50px' }}
      >
        {item.word}
      </div>
    ))}
  </div>
    );
}

export default ShuffleWords;
