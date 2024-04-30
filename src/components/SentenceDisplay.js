// src/components/SentenceDisplay.js

import React from 'react';

const SentenceDisplay = ({ sentence }) => {
  return (
    <div>
      <h2>Türkçe Cümle:</h2>
      <p>{sentence}</p>
    </div>
  );
}

export default SentenceDisplay;
