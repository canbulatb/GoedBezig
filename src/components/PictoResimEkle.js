import React from 'react';
const PictoResimEkle = ({ words, wordsx, wordPath , onWordClick, wordsNl, onWordNlClick}) => {
const path="./sound/"+wordPath+"/";
//{words.map((word, index) => (
//  <img src={`./GoedBezig/pictohareket/${word}.png`} alt={word} style={{ width: '100px', height: 'auto' }}   key={index} />
//))}

return (

    <div>
    <div><img src={`./pictohareket/goedBezig.png`}  style={{ width: '300px', height: 'auto' }}  /> </div>
    <div key={0} onClick={() => onWordClick(wordsx,path )} style={{ display: 'inline-block', marginRight: '10px', fontSize:'30px', color:'blue' }}>
        {wordsx}
    </div>
    <div key={1} onClick={() => onWordNlClick(wordsNl,path )}><h2>Antwoord:</h2> </div>
    </div>
  );
}

export default PictoResimEkle;
