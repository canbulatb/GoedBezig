// src/components/SortingArea.js

import React from 'react';

const SortingArea = ({ sortedWords, onSortedWordClick }) => {
  return (

   <div  style={{ marginRight: '10px', fontSize:'30px', color:'red', minHeight:'50px'}}>
      
        {sortedWords.map((item) => (
          <div key={item.index} onClick={() => onSortedWordClick(item.word, item.index)} style={{ display: 'inline-block', marginRight: '10px', fontSize:'30px' , color:'blue' , minHeight:'50px' }}>
            {item.word.replace(/\d+/g, '')}
          </div>
        ))}
    </div>
  );
}

export default SortingArea;
