// src/components/ControlPanel.js

import React from 'react';

const ControlPanel = ({ onNextSentenceClick, onPreviusSentenceClick, controlClick, correctControl, onPreviusMenu, controlEinde, handleControlEinde }) => {
  return (
   <div>
   <div>
      <button onClick={onPreviusSentenceClick}>Vorige</button>
      <button onClick={onNextSentenceClick}>Volgende</button>
      <button onClick={() => onPreviusMenu(0)}>Terug naar menu</button>
    </div>
    <div>
    {correctControl ? (      
      <button onClick={controlClick} style={{ marginRight: '10px', fontSize:'30px', color:'green' }}>Goed gedaan</button>
      ):
      (<></>)}
      </div>
      <div>
      {controlEinde ? (      
      <button onClick={handleControlEinde} style={{ marginRight: '10px', fontSize:'30px', color:'green' }}>Einde</button>
      ):
      (<></>)}
      </div>
    </div>
  );
}

export default ControlPanel;
