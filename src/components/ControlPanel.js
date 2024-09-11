// src/components/ControlPanel.js

import React, { useState } from 'react';

function ControlPanel({ 
  lesSentences, 
  onNextSentenceClick, 
  onPreviusSentenceClick, 
  controlClick, 
  correctControl, 
  onPreviusMenu, 
  controlEinde, 
  handleControlEinde 
}) {

  const [showLesSentences, setShowLesSentences] = useState(false); // State tanımlamaları
  // correctControl state'i kaldırıldı çünkü prop olarak kullanılıyor.

  const clickShowLesSentences = () => {
    setShowLesSentences(!showLesSentences);
    console.log(lesSentences);
  };

  return (
    <div>
      <div>
        <button onClick={onPreviusSentenceClick}>Vorige</button>
        <button onClick={onNextSentenceClick}>Volgende</button>
        <button onClick={() => onPreviusMenu(0)}>Terug naar menu</button>
        <button onClick={clickShowLesSentences}>
  {showLesSentences ? "Hide Antword" : "Show Antword"}
</button>

      </div>
      <div>
        {correctControl ? (
          <button onClick={controlClick} style={{ marginRight: '10px', fontSize: '30px', color: 'green' }}>Goed gedaan</button>
        ) : (
          <></>
        )}
      </div>
      <div>
        {controlEinde ? (
          <button onClick={handleControlEinde} style={{ marginRight: '10px', fontSize: '30px', color: 'green' }}>Einde</button>
        ) : (
          <></>
        )}
      </div>
      {showLesSentences && (
        <div className="correct-message">{lesSentences}</div>
      )}
    </div>
  );
}

export default ControlPanel;
