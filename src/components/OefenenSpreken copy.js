// src/App.js

import React, { useState, useEffect } from 'react';
import ControlPanel from './ControlPanel';
import PictoResimEkle from './PictoResimEkle';
import Spreken from './Spreken';







function OefenenSpreken({onPreviusMenuClick, lesSentences, lesStatistieken, handleWaar, boeken}) {


  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);  // useState hook'u kullanarak bileşenin içinde kullanacağımız state'leri tanımlıyoruz. 
  const [correctControl, setCorrectControl] = useState(false);
  const [controlEinde, setControlEinde] = useState(false);

  const [isListening, setIsListening] = useState(false);

  
  function checkAccuracy (word) {

    const originalSentence = lesSentences[currentSentenceIndex].dutch;
  
    if (word.toLowerCase() === originalSentence.toLowerCase()) {  // siralanan metin ile orjinal metin karsilastiriliyor. 
    // {handleWaar(1,0);}
      setCorrectControl(true);                  // eger dogru ise true set ediliyor ve Goed Gedaan aktif hale getiriliyor. 
      setIsListening(false);

    } else {
     // alert("Yanlış!");
    }
  };


  const handleNextSentenceClick = () => { //Bu fonksiyon, "Sonraki Cümle" düğmesine tıklandığında çalışır ve currentSentenceIndex state'ini bir artırır, böylece bir sonraki cümleyi gösterir.
    if(lesStatistieken[0].lengte!==currentSentenceIndex + 1 ) {
        setCurrentSentenceIndex(currentSentenceIndex + 1);
       if (correctControl) {setCorrectControl(false);}
       //else{
       // handleWaar(0,1);
       //}
       
     }
     else{
        if (!controlEinde) {setControlEinde(true);}
     };
  };

  const handlePreviusSentenceClick = (onPreviusMenu) => { //Bu fonksiyon, "Sonraki Cümle" düğmesine tıklandığında çalışır ve currentSentenceIndex state'ini bir artırır, böylece bir sonraki cümleyi gösterir.
    if(currentSentenceIndex - 1!== -1) {
        setCurrentSentenceIndex(currentSentenceIndex - 1);
       if (correctControl) {setCorrectControl(false);}

     }
     {};
  };
 const handelCorrectControl = () =>{
  lesSentences[currentSentenceIndex].resultaat+=1;
  handleNextSentenceClick();
  setCorrectControl(false);
 };

 function handleControlEinde() {
    setControlEinde(false);
 };

 function handleIsListening(listing){
  setIsListening(listing)

 }
 

//      <SentenceDisplay sentence={sentences[currentSentenceIndex].turkish} />
  return (
    <div className="OefenenPagina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '100vh', textAlign: 'center' }}>
    <div>
      <h1>{boeken}</h1>
      <PictoResimEkle words={lesSentences[currentSentenceIndex].dutch.split(" ")} />
      <Spreken checkAccuracy={checkAccuracy} correctControl={correctControl} isListening={isListening}  handleIsListening={handleIsListening} />
      <ControlPanel onNextSentenceClick={handleNextSentenceClick} onPreviusSentenceClick={handlePreviusSentenceClick} controlClick={handelCorrectControl} correctControl={correctControl} onPreviusMenu={onPreviusMenuClick} controlEinde={controlEinde} handleControlEinde={handleControlEinde} /> 
    </div>




    </div>
  );
}

export default OefenenSpreken;
