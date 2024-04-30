// App.js

import React, { useState, useEffect } from 'react';
import Boeken from './components/Boeken';
import OefenenPagina from './components/OefenenPagina';
import axios from 'axios';
import OefenenSpreken from './components/OefenenSpreken';
import { words } from './components/words';


function App() {

  //shuffledDutchWords Karıştırılan Hollandaca kelimeler Hollandaca kelimeler alanındaki kelimeler
  // sortedDutchWords Sıralama alanındaki kelimeler

//  const [selectedWord, setSelectedWord] = useState(word); // Seçilen kelime
  const [teller, setTeller] = useState(0);

  const [sentences, setSentences] = useState(words);  
  const [welkePagina, setWelkePagina] = useState(0)
  const [index, setIndex] = useState(0)
  //const [oefenenLes, setOefenenLes]=useState([{ turkish: '', dutch: '', resultaat:0, boek:0 }]);
  const [oefenenLes, setOefenenLes]=useState(words);
  const [lesStatistieken, setLesStatistieken] = useState([{ lengte: 0, waar: 0, fout:0 }]);


  const boeken = [
    { boek: 'Goed Bezig 1 - Giriş/Isınma', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb1"},
    { boek: 'Goed Bezig 2 - Hebben', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb2"},
    { boek: 'Goed Bezig 3 - Kunnen I', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb3"},
    { boek: 'Goed Bezig 4 - Kunnen II', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb4"},
    { boek: 'Goed Bezig 5 - Willen', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb5"},
    { boek: 'Goed Bezig 6 - Gaan', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb6"},
    { boek: 'Goed Bezig 7 - Tekrar 1', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb7"},
    { boek: 'Goed Bezig 8 - Zijn/1', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb8"},
    { boek: 'Goed Bezig 9 - Zijn/2', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb9"},
    { boek: 'Goed Bezig 10 - Tekrar 2', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb10"},
    { boek: 'Goed Bezig 11 - Hebben[Perfectum]', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb11"},
    { boek: 'Goed Bezig 12 - Zijn [Perfectum]', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb12"},
    { boek: 'Goed Bezig 13 - Tekrar 3', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb13"},
    { boek: 'Goed Bezig 14 - [Gaan-gelecek zaman]', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb14"},
    { boek: 'Goed Bezig 15 - Om+te/I', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb15"},
    { boek: 'Goed Bezig 16 - Om+te/II', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb16"},
    { boek: 'Goed Bezig 17 - Tekrar 4 [Hebben-Kunnen]', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb17"},
    { boek: 'Goed Bezig 18 - Tekrar 5 [Willen/kunnen]', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb18"},
    { boek: 'Goed Bezig 19 - Tekrar 6 [gaan/zijn]', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb19"},
    { boek: 'Goed Bezig 20 - Tekrar 7 [perfectum]', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb20"},
    
    //{ boek: 'Goed Bezig  - ', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb10"},
    // Diğer cümleler buraya eklenebilir
  ];
 

useEffect(() => {
  setLesStatistieken([{ lengte: oefenenLes.length, waar: 0, fout:0 }]);
  console.log(oefenenLes);
}, [oefenenLes]);

 function handleBoekClick (pagina, index) {  //Bu fonksiyon, Hollandaca kelimeler alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi sortedDutchWords state'ine ekler ve shuffledDutchWords state'inden kaldırır.
  setOefenenLes(sentences.filter(ogeler => ogeler.boek === index));
  setWelkePagina(pagina);
  setIndex(index);




  //shuffleWords();
};
  function handleLesStatistieken(waar, fout) {
    setLesStatistieken([{ lengte: oefenenLes.length, waar: lesStatistieken[0].waar+waar, fout: lesStatistieken[0].fout+fout }]);
    
  
  }

const handlePreviusMenu  = (welkePaginaComp) => {  
//  setAudioSrc(``); // Kelimenin doğru ses dosyasının yolunu belirtin
//  setShuffledDutchWords([]);
//  setSortedDutchWords([]);
  setWelkePagina(welkePaginaComp)  
};

  
//      <SentenceDisplay sentence={sentences[currentSentenceIndex].turkish} />
  return (
    <div className="App">
    {welkePagina===0 ? 
      <Boeken boeken={boeken} onBoekClick={handleBoekClick} />
      :
      welkePagina===1 ? 
      <OefenenPagina onPreviusMenuClick={handlePreviusMenu} lesSentences={oefenenLes} lesStatistieken={lesStatistieken} handleWaar={handleLesStatistieken} boeken={boeken[index].boek} boekMap={boeken[index].boekMap} />
      :
      welkePagina===2 ? 
      <OefenenSpreken onPreviusMenuClick={handlePreviusMenu} lesSentences={oefenenLes} lesStatistieken={lesStatistieken} handleWaar={handleLesStatistieken} boeken={boeken[index].boek} boekMap={boeken[index].boekMap} />
      :<></>


    }
  
    </div>
  );
}

export default App;
