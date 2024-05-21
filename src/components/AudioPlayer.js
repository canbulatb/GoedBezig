import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);


  
  useEffect(() => {
    if (audioRef.current) {
        if (audioRef.current && src) { // Ses dosyası varsa ve src prop'u doluysa

            audioRef.current.load(); // Ses dosyasını yükle
            try {
            audioRef.current.play(); // Ses dosyasını otomatik olarak çal  
            } catch (error) {
            }
            
        }
    }
  }, [src]);


//  const playAudio = () => {
//    if (audioRef.current) {
//      audioRef.current.play();
//    }
//  };

  return (
    <>
      <audio ref={audioRef}>
        <source src={src} type="audio/mpeg" />
        Tarayıcınız ses etiketini desteklemiyor. Lütfen güncel bir tarayıcı kullanın.
      </audio>
    </>
  );
}

export default AudioPlayer;
