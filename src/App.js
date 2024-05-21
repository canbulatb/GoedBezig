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
    { boek:"Goed Bezig 21 - [Tekrar:gaan/gelecek zaman]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb21"}, 
    { boek:"Goed Bezig 23 - Kendimizi Tanitma 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb23"  }, 
{ boek:"Goed Bezig 24 - Kendimizi Tanitma 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb24"  }, 
{ boek:"Goed Bezig 25 - Kennismaking vragen/Tanisma sorulari" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb25"  }, 
{ boek:"Goed Bezig 26 - Kennismaking vragen/tanisma sorulari 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb26"  }, 
{ boek:"Goed Bezig 27 - Moeten/Hoeven/Mogen 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb27"  }, 
{ boek:"Goed Bezig 28 - Moeten/Hoeven/Mogen 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb28"  }, 
{ boek:"Goed Bezig 29 - Moeten/Hoeven/Mogen 3" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb29"  }, 
{ boek:"Goed Bezig 30 - Dat'li cumleler 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb30"  }, 
{ boek:"Goed Bezig 31 - Dat'li cumleler 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb31"  }, 
{ boek:"Goed Bezig 32 - Soru zarflariyla cumleleri birlestirme" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb32"  }, 
{ boek:"Goed Bezig 33 - Bedanken/Tesekkur etme senaryolari" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb33"  }, 
{ boek:"Goed Bezig 34 - Dat cumle basinda" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb34"  }, 
{ boek:"Goed Bezig 35 - Want en omdat" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb35"  }, 
{ boek:"Goed Bezig 36 - [Als je vragen hebt, mag je altijd bellen]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb36"  }, 
{ boek:"Goed Bezig 37-39 [Randevulasma - Afspreken]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb37"  }, 
{ boek:"Goed Bezig 40 - Havadan sudan konusma ornekleri [praten over koetjes en kalfjes]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb40"  }, 
{ boek:"Goed Bezig 41 - Geçmiş zaman 1/4 [imperfectum] Ik deed. Ik maakte…" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb41"  }, 
{ boek:"Goed Bezig 42 - Geçmiş zaman 2/4 [Imperfectum] Ik kwam, ik ging, ik had, ik gaf (...)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb42"  }, 
{ boek:"Goed Bezig 43 - Geçmiş zaman 3/4 [imperfectum] Ik kon/mocht/moest/sprak ..." , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb43"  }, 
{ boek:"Goed Bezig 44 - Geçmiş zaman 4/4 [imperfectum] Ik wist; ik wilde; ik studeerde" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb44"  }, 
{ boek:"Goed Bezig 45 - Ayrilabilen fiiller 1/5 (scheidbare werkwoorden) meedoen, oplossen, meenemen, ophalen" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb45"  }, 
{ boek:"Goed Bezig 46 - Ayrilabilen fiiller 2/5 (scheidbare werkwoorden) Uitleggen, overslaan, doorgaan" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb46"  }, 
{ boek:"Goed Bezig 47 - Ayrilabilen fiiller 3/5 (scheidbare werkwoorden) Super fiiller" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb47"  }, 
{ boek:"Goed Bezig 48 - Ayrilabilen fiiller 4/5 (scheidbare werkwoorden) Super fiillere devam" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb48"  }, 
{ boek:"Goed Bezig 49 - Ayrilabilen fiiller 5/5 (scheidbare werkwoorden)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb49"  }, 
{ boek:"Goed Bezig 50 - Simdiki zaman [Ik ben aan het lezen] + emir kipi (gundelik kisa ve hos cumleler) 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb50"  }, 
{ boek:"Goed Bezig 51 - Fiillerin emir kipinde (yumusatilmis) kullanimlari/2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb51"  }, 
{ boek:"Goed Bezig 52 - Zouden 1/3 [Dat zou ik niet weten] Kritik konu!!!" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb52"  }, 
{ boek:"Goed Bezig 53 - Zouden 2/3 [Ik zou het heel leuk vinden]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb53"  }, 
{ boek:"Goed Bezig 54 - Zouden 3/3 [Semih zou wat minder moeten gamen]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb54"  }, 
{ boek:"Goed Bezig 55 - Relatief pronomen 1 [die/dat ile yan cumle kurma]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb55"  }, 
{ boek:"Goed Bezig 56 - Relatief pronomen 2 [wat ile isim hakkinda bilgi verme]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb56"  }, 
{ boek:"Goed Bezig 57 - Relatief pronomen 3 [die, dat, wat ile yan cumle kurma]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb57"  }, 
{ boek:"Goed Bezig 58 - Relatief pronomen 4 [die, dat, wat ile yan cumle kurma]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb58"  }, 
{ boek:"Goed Bezig 59 - Relatief pronomen 5 [die, dat, wat ile yan cumle kurma]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb59"  }, 
{ boek:"Goed Bezig 60 - Er is/er zijn [Er is grote vraag naar leraren]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb60"  }, 
{ boek:"Goed Bezig 61 - Er is/er zijn [Zijn er nog vragen?]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb61"  }, 
{ boek:"Goed Bezig 62 - Yaz tatilinden konusmak [Praten over vakantie]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb62"  }, 
{ boek:"Goed Bezig 63 - Onemli bir er kullanimi [Ik begrijp er niets van]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb63"  }, 
{ boek:"Goed Bezig 64 - Reflexieve werkwoorden 1 (Ik maak me geen zorgen)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb64"  }, 
{ boek:"Goed Bezig 65 - Reflexieve werkwoorden 2 (Ik vraag me af of hij komt)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb65"  }, 
{ boek:"Goed Bezig 66 - Alisverislerde hangi cumleleri kullaniyoruz?" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb66"  }, 
{ boek:"Goed Bezig 67 - Edilgen/pasif cumleler nasil kurulur? [Hoe worden passieve zinnen gemaakt?]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb67"  }, 
{ boek:"Goed Bezig 68 - Edilgen/pasif cumleler nasil kurulur? [Hoe worden passieve zinnen gemaakt?]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb68"  }, 
{ boek:"Goed Bezig 70 - Lijdende vorm [Edilgen yapi] 4/4" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb70"  }, 
{ boek:"Goed Bezig 71 - Handige zinnen 1 (Kullanisli cumleler)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb71"  }, 
{ boek:"Goed Bezig 72 - ''Laten'' we beginnen (laten fiili ile ilgili hersey)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb72"  }, 
{ boek:"Goed Bezig 73 - Dat had ik moeten weten (hadden fiiliyle yapabileceklerimiz)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb73"  }, 
{ boek:"Goed Bezig 74 - Kritik edat, baglac ve zarflar 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb74"  }, 
{ boek:"Goed Bezig 75 - Kritik edat, baglac ve zarflar 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb75"  }, 
{ boek:"Goed Bezig 76 - Helemaal & Allemaal" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb76"  }, 
{ boek:"Goed Bezig 77 - Vroeg, vroeger, te vroeg, eerder, in het verleden" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb77"  }, 
{ boek:"Goed Bezig 78 - Een paar/aantal/heleboel/hoop/beetje" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb78"  }, 
{ boek:"Goed Bezig 79 - Wel 1 tussenwoordje=ara kelimeler-duruma gore anlami yumasatiyor,sertligi azaltiyor samimilestiriyor,ihtiyatli hale getiriyor,sevk derecesini azaltiyor" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb79"  }, 
{ boek:"Goed Bezig 80 - Wel 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb80"  }, 
{ boek:"Goed Bezig 81 - Naar/naartoe/heen, enz." , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb81"  }, 
{ boek:"Goed Bezig 82 - Isiga yaklastiracak bir ''er'' kullanimi" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb82"  }, 
{ boek:"Goed Bezig 83 - Noel/yilbasi kartlari hazirlama + konu tekrari" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb83"  }, 
{ boek:"Goed Bezig 84 - Hizli genel tekrar 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb84"  }, 
{ boek:"Goed Bezig 85 - Hizli genel tekrar 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb85"  }, 
{ boek:"Goed Bezig 86 - Zelfs, zelf, eigen, alleen, niet eens" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb86"  }, 
{ boek:"Goed Bezig 87 - Pas & al" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb87"  }, 
{ boek:"Goed Bezig 88 - Genel tekrar 3" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb88"  }, 
{ boek:"Goed Bezig 89 - Zo & zoiets kullanimiyla gundelik devrik cumle ornekleri" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb89"  }, 
{ boek:"Goed Bezig 90 - Ook" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb90"  }, 
{ boek:"Goed Bezig 91 - Duruma gore degisir" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb91"  }, 
{ boek:"Goed Bezig 92/A - en vriend/mijn vriend arasindaki kritik fark ve ''muhtelif'' onemli konular" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb92"  }, 
{ boek:"Goed Bezig 93 - Sık karşılaşacağınız atasözleri ve deyimler 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb93"  }, 
{ boek:"Goed Bezig 94 - Sık karşılaşacağınız atasözleri ve deyimler (2) Spreekwoorden en uitdrukkingen" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb94"  }, 
{ boek:"Goed Bezig 95 - De Het" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb95"  }, 
{ boek:"Goed Bezig 96 - Zullen we koffie gaan halen? Had ik al gezegd dat ze zwanger is?" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb96"  }, 
{ boek:"Goed Bezig 97 - Zeggen, praten, vertellen, spreken, bespreken, uitleggen, bellen" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb97"  }, 
{ boek:"Goed Bezig 98 - Meevallen, tegenvallen, bevallen, per se, eruit zien" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb98"  }, 
{ boek:"Goed Bezig 99 - Wat ve Dat kelimelerinin cumle basinda (soru cumlesi olmaksizin) kullanilisi" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb99"  }, 
{ boek:"Goed Bezig 100 - Yeni konu oncesi isinma turu" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb100"  }, 
{ boek:"Goed Bezig 101 - Voor, voordat, terwijl, tijdens, zolang, zodra, als, wanneer" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb101"  }, 
{ boek:"Goed Bezig 102 - Toen (Imperfectum genelde) O zaman - Dan (Als kullanilir) " , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb102"  }, 
{ boek:"Goed Bezig 103 - Konusmalariniza zenginlik/nuanslar katacak 15 giris yapisi" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb103"  }, 
{ boek:"Goed Bezig 104 - Zitliklari belirtmede gerekli 5 anahtar kelime" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb104"  }, 
{ boek:"Goed Bezig 105 - Birkaç tüyo ve işyerlerinde sıkça kullanılan ifadeler 1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb105"  }, 
{ boek:"Goed Bezig 106 - Işyerlerinde sıkça kullanılan gundelik ifadeler 2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb106"  }, 
{ boek:"Goed Bezig 108 - Hizli genel tekrar" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb108"  }, 
{ boek:"Goed Bezig 109 - Iki fiilli cumlelerde ''te'', ''om te'' kullanimi" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb109"  }, 
{ boek:"Goed Bezig 110 - Tam oturmadigi gorulen geen/niet konusu" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb110"  }, 
{ boek:"Goed Bezig 111 - Het opbouwen van complexere zinnen-1" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb111"  }, 
{ boek:"Goed Bezig 112 - Het opbouwen van complexere zinnen-2" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb112"  }, 
{ boek:"Goed Bezig 113 - Uzun cumleler son bolum (3) [Het opbouwen van complexere zinnen 3]" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb113"  }, 
{ boek:"Goed Bezig 114 - Bu defa kisa cumleler" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb114"  }, 
{ boek:"Goed Bezig 115 - 'Hoe'' soru zarfinin muhtelif fonksiyonlari" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb115"  }, 
{ boek:"Goed Bezig 116 - Başlangıç Seviyesi Kelimeleri Keşfet Video 1 (A Harfi)" , resultaat:0, path: 'goedBezig.png' ,boekMap: "gb116"  }, 

    //{ boek: 'Goed Bezig  - ', resultaat:0, path: 'goedBezig.png' ,boekMap: "gb10"},
    // Diğer cümleler buraya eklenebilir
  ];
 

useEffect(() => {
  setLesStatistieken([{ lengte: oefenenLes.length, waar: 0, fout:0 }]);
  console.log(oefenenLes);
}, [oefenenLes]);

 function handleBoekClick (pagina, index, boekMap) {  //Bu fonksiyon, Hollandaca kelimeler alanındaki bir kelimeye tıklandığında çalışır. Seçilen kelimeyi sortedDutchWords state'ine ekler ve shuffledDutchWords state'inden kaldırır.
  setOefenenLes(sentences.filter(ogeler => ogeler.boek === boekMap));
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
