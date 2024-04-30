import React from 'react';

function TextGame() {
  const text = "Hallo Paula. Dag @mevrouw. Uit @welk land kom je? Wat zegt @u? Uit @welk land kom je?";
  const words = text.split(' ');

  return (
    <div>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {index > 0 && ' '}
          {word.startsWith('@') ? <Button key={index} /> : word}
        </React.Fragment>
      ))}
    </div>
  );
}

function Button(index) {
  return (
    <button key={index}>
      
    </button>
  );
}

export default TextGame;
