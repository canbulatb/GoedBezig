// src/App.js

import React, { useState, useEffect } from 'react';
import SentenceDisplay from './SentenceDisplay';
import ShuffleWords from './ShuffleWords';
import SortingArea from './SortingArea';
import ControlPanel from './ControlPanel';
import ResimPanel from './ResimPanel';
import PictoResimEkle from './PictoResimEkle';
import AudioPlayer from './AudioPlayer';
import Boeken from './Boeken';
import TextGame from './TextGame';
import Spreken from './Spreken';







function OefenenPagina({onPreviusMenuClick, lesSentences, lesStatistieken, handleWaar, boeken, boekMap}) {
  function splitSentences(lesSentences) {
    const result = [];
    lesSentences.forEach(sentence => {
        const turkishWords = sentence.turkish.split(' '); // Türkçe cümleyi kelimelere ayır
        const dutchWords =  sentence.dutch.split(' '); //sentence.dutch.join(' '); // Hollandaca kelimeleri birleştir ve cümleyi kelimelere ayır
        result.push({ turkish: turkishWords, dutch: dutchWords});
    });
    return result;
}


  //shuffledDutchWords Karıştırılan Hollandaca kelimeler Hollandaca kelimeler alanındaki kelimeler
  // sortedDutchWords Sıralama alanındaki kelimeler

  const [boekMapp, setBoekMapp] =useState("./sound/"+boekMap+"/");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);  // useState hook'u kullanarak bileşenin içinde kullanacağımız state'leri tanımlıyoruz. 
  const [shuffledDutchWords, setShuffledDutchWords] = useState([]);  
  const [sortedDutchWords, setSortedDutchWords] = useState([]);
  const [audioSrc, setAudioSrc] = useState("");
  const [correctControl, setCorrectControl] = useState(false);
  const [controlEinde, setControlEinde] = useState(false);

  
  

 
  useEffect(() => {
    shuffleWords();
    
  }, [currentSentenceIndex]);    //useEffect hook'u kullanarak, bileşenin yüklendiğinde veya currentSentenceIndex değiştiğinde shuffleWords fonksiyonunu çağırıyoruz.



  useEffect(()=> {
    //setAudioSrc(boekMapp+currentSentenceIndex+'nl.mp3');
    //console.log(boekMapp+currentSentenceIndex+'nl.mp3');

  },[correctControl])

  const shuffleWords = () => {   //Bu fonksiyon, seçilen cümleye ait Hollandaca kelimeleri karıştırıp shuffledDutchWords state'ine atar.
    const shuffledWords = [...lesSentences[currentSentenceIndex].dutch.split(" ")].sort(() => Math.random() - 0.5);
    setShuffledDutchWords(shuffledWords);
    console.log(lesSentences[currentSentenceIndex].turkish);
    handleWordxClick();
    setSortedDutchWords([]);  //Belki bu satıra gerekyok. Kontrol edeceğim
  };

  function checkAccuracy (word) {
    const sortedSentence = sortedDutchWords.join(' ')+ " "+ word;
    const originalSentence = lesSentences[currentSentenceIndex].dutch;
  
    if (sortedSentence === originalSentence) {  // siralanan metin ile orjinal metin karsilastiriliyor. 
      setCorrectControl(true);                  // eger dogru ise true set ediliyor ve Goed Gedaan aktif hale getiriliyor. 
      handleWordNlClick();
      handleWaar(1,0);
    } else {
     // alert("Yanlış!");
    }
  };

  const handleWordClick = (word,path) => {  //Bu fonksiyon, Hollandaca kelimeler alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi sortedDutchWords state'ine ekler ve shuffledDutchWords state'inden kaldırır.
    //setAudioSrc(`./sound/${word}.mp3`); // Kelimenin doğru ses dosyasının yolunu belirtin
    setShuffledDutchWords(shuffledDutchWords.filter((w) => w !== word));
    setSortedDutchWords([...sortedDutchWords, word]);
    checkAccuracy(word); // word eklendikten sonra dogruluk kontrolunu yaptiriyoruz.  
    console.log(path);
    //setAudioSrc(path+word+'.mp3'); // Kelimenin doğru ses dosyasının yolunu belirtin
    
  };

  const handleWordxClick = () => {  //Bu fonksiyon, Hollandaca kelimeler alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi sortedDutchWords state'ine ekler ve shuffledDutchWords state'inden kaldırır.
    //setAudioSrc(`./sound/${word}.mp3`); // Kelimenin doğru ses dosyasının yolunu belirtin
    setAudioSrc(boekMapp+currentSentenceIndex+'tr.mp3'); // Kelimenin doğru ses dosyasının yolunu belirtin
    
  };

  const handleWordNlClick = () => {  //Bu fonksiyon, Hollandaca kelimeler alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi sortedDutchWords state'ine ekler ve shuffledDutchWords state'inden kaldırır.
    //setAudioSrc(`./sound/${word}.mp3`); // Kelimenin doğru ses dosyasının yolunu belirtin
    setAudioSrc(boekMapp+currentSentenceIndex+'nl.mp3'); // Kelimenin doğru ses dosyasının yolunu belirtin
    console.log("sese geldik")
    
  };

  const handleSortedWordClick = (word) => {  //Bu fonksiyon, sıralama alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi shuffledDutchWords state'ine ekler ve sortedDutchWords state'inden kaldırır.
    setSortedDutchWords(sortedDutchWords.filter((w) => w !== word));
    setShuffledDutchWords([...shuffledDutchWords, word]);

  };

  const handleNextSentenceClick = () => { //Bu fonksiyon, "Sonraki Cümle" düğmesine tıklandığında çalışır ve currentSentenceIndex state'ini bir artırır, böylece bir sonraki cümleyi gösterir.
    if(lesStatistieken[0].lengte!==currentSentenceIndex + 1 ) {
        setCurrentSentenceIndex(currentSentenceIndex + 1);
       if (correctControl) {setCorrectControl(false);}
       else{
        handleWaar(0,1);
       }
       
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
 

//      <SentenceDisplay sentence={sentences[currentSentenceIndex].turkish} />
  return (
    <div className="OefenenPagina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '100vh', textAlign: 'center' }}>
    <div>
      <h1>{boeken}</h1>
      <AudioPlayer src={audioSrc} />
      <PictoResimEkle wordsx={lesSentences[currentSentenceIndex].turkish} wordPath={boekMap} onWordClick={handleWordxClick} wordsNl={lesSentences[currentSentenceIndex].dutch} onWordNlClick={handleWordNlClick} />      
      <ShuffleWords words={shuffledDutchWords} onWordClick={handleWordClick} path={"./sound/"} />
      <SortingArea sortedWords={sortedDutchWords} onSortedWordClick={handleSortedWordClick} />
      <ControlPanel onNextSentenceClick={handleNextSentenceClick} onPreviusSentenceClick={handlePreviusSentenceClick} controlClick={handelCorrectControl} correctControl={correctControl} onPreviusMenu={onPreviusMenuClick} controlEinde={controlEinde} handleControlEinde={handleControlEinde} /> 
    </div>
    <h3>Waar: {lesStatistieken[0].waar} / {lesStatistieken[0].lengte} </h3>
    <h3>fout: {lesStatistieken[0].fout} / {lesStatistieken[0].lengte} </h3>
    </div>
  );
}

export default OefenenPagina;
