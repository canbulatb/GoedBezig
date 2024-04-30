import React, { useState, useEffect } from 'react';

function Spreken ({checkAccuracy, correctControl, isListening, handleIsListening}) {

  
  const [transcript, setTranscript] = useState('');
  const recognition = new window.webkitSpeechRecognition();


 // recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

    setTranscript(transcript);
  };

  const startListening = () => {
    handleIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    handleIsListening (false);
    recognition.stop();
  };

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop met luisteren' : 'Begin te luisteren'}
      </button>
      <p>
      {transcript}
      {checkAccuracy(transcript)}</p>
    </div>
  );
};

export default Spreken;
