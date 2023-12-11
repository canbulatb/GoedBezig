import xlrd
import os
import sys
from gtts import gTTS

def soundMakeOne(savePath,language,word):
    Sound = gTTS(text=word, lang=language.lower(), slow=False)
    Sound.save(savePath+language+".mp3")

def soundMakeOneAll(sheet,pathGbFiles,taal,i,):
    dirPath = (os.path.dirname(sys.argv[0]))
    savePath=dirPath+"/files/"+pathGbFiles+"/"
    try:
        soundMakeOne(savePath+str(i),taal,sheet[i][2])
        return True
    except:
        return False
    
        
def soundMake(sheet,pathGbFiles,lang):  
    dirPath = (os.path.dirname(sys.argv[0]))
    savePath=dirPath+"/files/"+pathGbFiles+"/"
    for i in range(len(sheet)):
            index = sheet[i][0] #row[0]
            if index=="":
                break
            for j in range(len(lang)):
                soundMakeOne(savePath+str(i),lang[j],sheet[i][j+2])
            soundMakeOne(savePath+str(i),"Nl",sheet[i][1])

def soundPlayOne(pathGbFiles,index):
    dirPath = (os.path.dirname(sys.argv[0]))
    savePath=dirPath+"/files/"+pathGbFiles+"/"
    pass
