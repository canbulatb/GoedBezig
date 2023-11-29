import xlrd
import os
import sys
from gtts import gTTS

def soundMakeOne(savePath,language,word):
    Sound = gTTS(text=word, lang=language.lower(), slow=False)
    Sound.save(savePath+language+".mp3")

def soundMakeOneAll(sheet,pathGbFiles,lang,i):
    dirPath = (os.path.dirname(sys.argv[0]))
    savePath=dirPath+"/files/"+pathGbFiles+"/"
    soundMakeOne(savePath+str(i),lang[0],sheet[i][2])
    soundMakeOne(savePath+str(i),lang[1],sheet[i][3])
    soundMakeOne(savePath+str(i),"Nl",sheet[i][1])

        
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
