// src/components/SortingArea.js

import React from 'react';

const SortingArea = ({ sortedWords, onSortedWordClick }) => {
  return (
    <div  style={{ marginRight: '10px', fontSize:'30px', color:'red', minHeight:'50px'}}>
      
        {sortedWords.map((word, index) => (
          <div key={index} onClick={() => onSortedWordClick(word)} style={{ display: 'inline-block', marginRight: '10px', fontSize:'30px' , color:'blue' , minHeight:'50px' }}>
            {word.replace(/\d+/g, '')}
          </div>
        ))}
    </div>
  );
}

export default SortingArea;
