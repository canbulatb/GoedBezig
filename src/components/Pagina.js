// src/App.js

import React, { useState, useEffect } from 'react';
import '../App.css';
import SentenceDisplay from './SentenceDisplay';
import ShuffleWords from './ShuffleWords';
import SortingArea from './SortingArea';
import ControlPanel from './ControlPanel';
import ResimPanel from './ResimPanel';
import PictoResimEkle from './PictoResimEkle';
import AudioPlayer from './AudioPlayer';

import axios from 'axios';



function Pagina() {





  function splitSentences(sentences) {
    const result = [];
    sentences.forEach(sentence => {
        const turkishWords = sentence.turkish.split(' '); // Türkçe cümleyi kelimelere ayır
        const dutchWords =  sentence.dutch.split(' '); //sentence.dutch.join(' '); // Hollandaca kelimeleri birleştir ve cümleyi kelimelere ayır
        result.push({ turkish: turkishWords, dutch: dutchWords});
    });
    return result;
}


  //shuffledDutchWords Karıştırılan Hollandaca kelimeler Hollandaca kelimeler alanındaki kelimeler
  // sortedDutchWords Sıralama alanındaki kelimeler


  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);  // useState hook'u kullanarak bileşenin içinde kullanacağımız state'leri tanımlıyoruz. 
  const [shuffledDutchWords, setShuffledDutchWords] = useState([]);  
  const [sortedDutchWords, setSortedDutchWords] = useState([]);
  const [audioSrc, setAudioSrc] = useState("");
  const [correctControl, setCorrectControl] = useState(false);
  const [sentences, setSentences] = useState([{ turkish: '', dutch: 'In het bos staat een boom', resultaat:0 }]);

  const splitSentencesResult = splitSentences(sentences);
  

  useEffect(() => {
    axios.get('http://localhost:8000/api/sentences/')
        .then(response => {
            setSentences(response.data);
            console.log(sentences)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []);


  useEffect(() => {
    shuffleWords();
  }, [currentSentenceIndex]);    //useEffect hook'u kullanarak, bileşenin yüklendiğinde veya currentSentenceIndex değiştiğinde shuffleWords fonksiyonunu çağırıyoruz.




  const shuffleWords = () => {   //Bu fonksiyon, seçilen cümleye ait Hollandaca kelimeleri karıştırıp shuffledDutchWords state'ine atar.
    const shuffledWords = [...sentences[currentSentenceIndex].dutch.split(" ")].sort(() => Math.random() - 0.5);
    setShuffledDutchWords(shuffledWords);
    setSortedDutchWords([]);  //Belki bu satıra gerekyok. Kontrol edeceğim
  };

  function checkAccuracy (word) {
    const sortedSentence = sortedDutchWords.join(' ')+ " "+ word;
    const originalSentence = sentences[currentSentenceIndex].dutch;
  
    if (sortedSentence === originalSentence) {
      setCorrectControl(true);

    } else {
     // alert("Yanlış!");
    }
  };

  const handleWordClick = (word) => {  //Bu fonksiyon, Hollandaca kelimeler alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi sortedDutchWords state'ine ekler ve shuffledDutchWords state'inden kaldırır.
    setAudioSrc(`./sound/${word}.mp3`); // Kelimenin doğru ses dosyasının yolunu belirtin
    setShuffledDutchWords(shuffledDutchWords.filter((w) => w !== word));
    setSortedDutchWords([...sortedDutchWords, word]);
    checkAccuracy(word);
    
  };

  const handleSortedWordClick = (word) => {  //Bu fonksiyon, sıralama alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi shuffledDutchWords state'ine ekler ve sortedDutchWords state'inden kaldırır.
    setSortedDutchWords(sortedDutchWords.filter((w) => w !== word));
    setShuffledDutchWords([...shuffledDutchWords, word]);

  };

  const handleNextSentenceClick = () => { //Bu fonksiyon, "Sonraki Cümle" düğmesine tıklandığında çalışır ve currentSentenceIndex state'ini bir artırır, böylece bir sonraki cümleyi gösterir.
    setCurrentSentenceIndex(currentSentenceIndex + 1);
  };

  const handlePreviusSentenceClick = () => { //Bu fonksiyon, "Sonraki Cümle" düğmesine tıklandığında çalışır ve currentSentenceIndex state'ini bir artırır, böylece bir sonraki cümleyi gösterir.
    setCurrentSentenceIndex(currentSentenceIndex - 1);
  };
 const handelCorrectControl = () =>{
  sentences[currentSentenceIndex].resultaat+=1;
  console.log(sentences[currentSentenceIndex].resultaat);
  setCurrentSentenceIndex(currentSentenceIndex + 1);
  setCorrectControl(false);


 };


  
//      <SentenceDisplay sentence={sentences[currentSentenceIndex].turkish} />
  return (
    <div className="App">
      <h1>Dil Çalışma Programı</h1>
      <AudioPlayer src={audioSrc} />
      <PictoResimEkle words={sentences[currentSentenceIndex].dutch.split(" ")} />
      <ShuffleWords words={shuffledDutchWords} onWordClick={handleWordClick} />
      <SortingArea sortedWords={sortedDutchWords} onSortedWordClick={handleSortedWordClick} />
      <ControlPanel onNextSentenceClick={handleNextSentenceClick} onPreviusSentenceClick={handlePreviusSentenceClick} controlClick={handelCorrectControl} correctControl={correctControl} />

    </div>
  );
}

export default Pagina;
