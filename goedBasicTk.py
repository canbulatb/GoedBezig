import tkinter as tk
from tkinter import ttk
import os
from playsound import playsound   #pip install playsound==1.2.2 yeni versiyonda hata veriyor. 
import random
from PyQt5 import QtCore, QtGui, QtWidgets
from gbSound import *
from gbKlas import *

global dugmeYeniIsim
global dugme
global textIcerikText
global taal
global lang
global image
global index

def taalChanged(event):
    global taal, taalIndex
    taal=selectedTaalgb.get()
    taalIndex=goedBezigTaalCb.current()+2
    lessChangedDef()

def lessChangedDef():
    global index
    global sheet
    global wb
    global lesRandom
    global loc
    global locDrs
    global pathGbFiles
    global dugmeYeniIsim
    global sonSatir
    global fileLng2
    global fileLng1

    pathGbFiles=selected_gb.get() #combobox'tan seçili olan satırı getirir. 
    locDrs=pathEdit(pathGbFiles)
    sheet = openExcel(pathGbFiles)
      
    sonSatir=len(sheet)
    label1.config(text=sheet[index][1])
    label2.config(text="")
    metin1.delete(0.0,tk.END)
    dugmeYeniIsim=sheet[index][1].split()
    dugmex=[]
    dugmex+=sheet[random.randint(1,len(sheet))][1].split()
    dugmex+=sheet[random.randint(1,len(sheet))][1].split()
    random.shuffle(dugmex)
    
    dugmeYeniIsim+=dugmex[:4]
    
    
    #dugmeYeniIsim+=sheet.cell_value(random.randint(1,sheet.nrows),1).split()
    random.shuffle(dugmeYeniIsim)
    dugmeIsimleriDuzenle()
    #index=0
    changeImage(index,pathGbFiles,image,logo)
    soundPlay()
    


def countWords(event=None):
    global dugmeYeniIsim
    global textIcerik
    
    kontrolTextList=sheet[index][1].split()
    print(kontrolTextList)
    inputText = metin1.get("1.0", "end-1c")
    inputTextList=inputText.split()
    wordCount = len(inputText.split())
    
    print("uzunluk kontrol ",textIcerik)
  
    start_index=0
    endIndex=0
    kutuMetinler=""
    i=0
    for x in range(len(inputTextList)):
        if inputTextList[i]==kontrolTextList[i]:
            endIndex+=len(inputTextList[i])
            i+=1
        else:
            #endIndex-=len(inputTextList[i])
            dugmeKaldirText(i)
            break
    endIndex+=i -1# i kadar boşluk koyuyorum. çünkü 3 elemanlı ise 2 dönüyor ve 2 boşluk var. onu da ekliyorum
   
    if inputTextList[wordCount-1] in kontrolTextList and inputTextList[wordCount-1] not in textIcerikText: 
        sonMetin=inputTextList[wordCount-1]                        
        if inputTextList[:wordCount-1] == kontrolTextList[:wordCount-1] :
        #iki liste karşılaştırılıyor. girilen yere kadar eşit ise aşağıdaki işlemler yapılıyor.
            indexBak=dugmeYeniIsim.index(sonMetin)
            print("son metin :",sonMetin)
            dugmeEkleText(indexBak)  
        #endIndex=0
        #start_index=0
    metin1.tag_remove("highlight", "1.0", tk.END)
    metin1.tag_add("highlight", f"1.0+{start_index}c", f"1.0+{endIndex}c")
    metin1.tag_config("highlight", background="light green")
   


def btnOk_click():
    soundPlay()
    
def enter_click(event):
    global index
    widget = event.widget.winfo_class()
    print("widget",widget)
    if widget=="Spinbox":
        value = int(spinbox.get())
        if index!=value :
                index=value-1
                lessChangedDef() 
    elif widget=="Text":
        soundPlay()


def soundPlay():
        global index
        global sheet
        global wb
        global lesRandom
        global locDrs
        global pathGbFiles
        global dugmeYeniIsim
        
        #locDrs="./files/"+pathGbFiles+"/"
        fileLng2=fileLng(index,"Nl",pathGbFiles)
        fileLng1=fileLng(index,taal,pathGbFiles)
        #fileLng1="./files/"+pathGbFiles+"/"+str(index)+"Tr.mp3"
        #fileLng2="./files/"+pathGbFiles+"/"+str(index)+"Nl.mp3"
        answer=metin1.get(0.0,1000.0)
        answer=answer.replace("\n","")
        answer=answer.lower()
        answerS=sheet[index][1].lower()
        if lesNotDot==True and answer!="":
            punc_str ="""!()-{[]};:/?@#$%^'"\,.&*_~"""
            for degis in range(len(punc_str)-1):
                answerS=answerS.replace(punc_str[degis],'')
            for degis in range(len(punc_str)-1):
                answer=answer.replace(punc_str[degis],'')
        print(answer)
        print(answerS)
        if answer==answerS:
            #label3.config(text="Goed Bezik")
            label2.config(text="")
            label3.config(text="")
            metin1.delete(0.0,tk.END)
            print("Goed Bezig")
            playsound(fileLng2)       

            sonuc=True
            if lesRandom==True:
                index=random.randint(1,len(sheet)) #*********** Burayı kontrol edeceğim...
            else:
                index+=1
                if index>sonSatir:
                    index=0
            changeImage(index,pathGbFiles,image,logo)
            fileLng2=fileLng(index,"Nl",pathGbFiles)
            fileLng1=fileLng(index,taal,pathGbFiles) 
            label3.config(text="")
            label1.config(text=sheet[index][taalIndex])
            dugmeYeniIsim=sheet[index][1].split()
            dugmex=[]
            dugmex+=sheet[random.randint(1,len(sheet))][1].split()
            dugmex+=sheet[random.randint(1,len(sheet))][1].split()
            random.shuffle(dugmex)
            
            dugmeYeniIsim+=dugmex[:4]
            random.shuffle(dugmeYeniIsim)
            textIcerik.clear()
            textIcerikText.clear()
            dugmeIsimleriDuzenle()
            spinbox.delete(0, tk.END)  # Mevcut değeri temizleyin
            spinbox.insert(0, index+1)
            cik=False
            while cik!=True:
                try:    
                    playsound(fileLng1)
                    cik=True
                except :  
                    soundMake(sheet,pathGbFiles,lang)
                    break
                    
        elif answer=="":
                label1.config(text=sheet[index][taalIndex])
                label2.config(text="")
                label3.config(text="")
                metin1.delete(0.0,tk.END)
                fileLng1=fileLng(index,taal,pathGbFiles)
                cik=False
                while cik!=True:
                    try:    
                        playsound(fileLng1)
                        cik=True
                    except :
                        #soundMakeOne(sheet,pathGbFiles,lang) 
                        soundMakeOneAll(sheet,pathGbFiles,lang,index)
                        break
                        
               
        else:    
            fileLng2=fileLng(index,"Nl",pathGbFiles)
            label2.config(text=sheet[index][1])
            playsound(fileLng2)

            
def dugmeIsimleriDuzenle():
    dugmeIsimleri.clear()
    for d in dugme:
        d.config(text="")
        d.grid_forget()
    dugme.clear()
    rowDugme=10
    for i in range(len(dugmeYeniIsim)):
        if i%5==0:
            rowDugme+=1
        dugme.append(tk.Button(root, text=dugmeYeniIsim[i], command=lambda i=i: dugmeEkleKaldir(i)))
        dugme[i].grid(row=rowDugme, column=i%5, padx=5, pady=5)
        dugme[i].configure(bg="light grey")
        #dugme[i].config(text=dugmeYeniIsim[i],state=tk.ACTIVE)
        dugmeIsimleri.append(dugmeYeniIsim[i])

# bind the selected value changes
def lessChanged(event):
   lessChangedDef()


def dugme_ekle(i):
    global textIcerik
    global dugme
    dugme.append(tk.Button(root, text=dugmeIsimleri[i], command=lambda i=i: dugmeEkleKaldir(i)))
    if i<5:
        dugme[i].grid(row=10, column=i, padx=5, pady=5,background="red")
        #dugme.pack(fill=tk.Y, side=tk.LEFT, padx=5, pady=5)
    else:
        dugme[i].grid(row=11, column=i-5, padx=5, pady=5,background="red")
        #dugme.pack(fill=tk.Y,side=tk.BOTTOM, padx=5, pady=5)
        #dugme.pack()
  
def dugmeKaldirText(i):
    global textIcerik
    text=''
    if i == (len(textIcerik)-1):
        dugmeIndex=textIcerik[i]
        dugme[dugmeIndex].configure(bg="light grey")
        del textIcerik[i]
        del textIcerikText[i]   
    for t in textIcerik:
        if text=='':
            text=dugmeIsimleri[t]
        else:
            text=text+" "+dugmeIsimleri[t]

def dugmeEkleText(i):
    text=''
    if i not in textIcerik:
        textIcerik.append(i)
        textIcerikText.append(dugmeIsimleri[i])
        dugme[i].configure(bg="light green")
    
    for t in textIcerik:
        if text=='':
            text=dugmeIsimleri[t]
        else:
            text=text+" "+dugmeIsimleri[t]
    

def dugmeEkleKaldir(i):
    text=''
    if i in textIcerik:
        textIcerik.remove(i)
        textIcerikText.remove(dugmeIsimleri[i])
        dugme[i].configure(bg="light grey")
    else:
        textIcerik.append(i)
        textIcerikText.append(dugmeIsimleri[i])
        dugme[i].configure(bg="red")
    
    for t in textIcerik:
        if text=='':
            text=dugmeIsimleri[t]
        else:
            text=text+" "+dugmeIsimleri[t]
    #text = textbox.get(1.0, "end-1c")
    uzunluk=len(text)
    # if dugmeIsimleri[i] in text:
    #     text = text.replace(dugmeIsimleri[i], '')
    # else:
    #     text += dugmeIsimleri[i]
    metin1.delete(0.0,tk.END)
    metin1.insert(0.0, text)

def logoClick():
    global index
    file=fileLng(index,"Nl",pathGbFiles)
    playsound(file) 


def solClick():
    global index
    if index<=0:
        index=0
    else:
        index-=1
    lessChangedDef()
    spinbox.delete(0, tk.END)  # Mevcut değeri temizleyin
    spinbox.insert(0, index+1)

def sagClick():
    global index
    if index>=sonSatir:
        index=sonSatir
    else:
        index+=1
    lessChangedDef()
    spinbox.delete(0, tk.END)  # Mevcut değeri temizleyin
    spinbox.insert(0, index+1)

def spinboxChange():
    global index
    value = int(spinbox.get())
    if index!=value :
            index=value-1
            lessChangedDef()
    



lang=["Tr","Ar"]
taal=""
taalIndex=2
textIcerikText=[]
dugmeYeniIsim=[]
image=[]
pathGbFiles=""
lesRandom=False
lesNotDot=True
index=0
dirPath = (os.path.dirname(sys.argv[0]))
print("dir path", dirPath)
#print(sys.argv[0]) #çalışan py dosyasının yolunu gösteriyor. 
os.chdir(dirPath) # çalışma dizini olarak bu py dosyasının yeri seçiliyor. 
locDrs=dirPath+"/files/"+pathGbFiles+"/"

dugme=[]
textIcerik=[]
dugmeIsimleri = []

root = tk.Tk()




logo=tk.Button(text="",width=220, height=20)
#logo.place(relx=0.2,rely=0.1,width=120,height=140)
logo.config(command=logoClick)
logo.grid(row=1, column=0, columnspan=5, padx=5, pady=5)
changeImage(999,pathGbFiles,image,logo)
# logo.pack(fill=tk.X, padx=5, pady=5)
#logo.create_image((1, 1), image=img, anchor="nw")
#logo.config(state=tk.DISABLED)

sol=tk.Button(text="<<<")
sol.config(command=solClick)
sol.grid(row=0, column=0, padx=5, pady=5)
spinbox=tk.Spinbox(root, from_=1, to=100, width=2,font=("Arial", 16), command=spinboxChange)
spinbox.grid(row=0, column=2, padx=5, pady=5)

sag=tk.Button(text=">>>")
sag.config(command=sagClick)
sag.grid(row=0, column=4, columnspan=2, padx=5, pady=5)



# config the root window
root.geometry('320x640')
#root.resizable(False, False)
root.title('Goed Bezig Nederlands Taal Offening')

# label
label = ttk.Label(text="Çalışmak istediğiniz dersi seçiniz")
label.grid(row=3, column=0, columnspan=5)
#label.pack(fill=tk.X, padx=5, pady=5)
# create a combobox

selectedTaalgb = tk.StringVar()
goedBezigTaalCb = ttk.Combobox(root, textvariable=selectedTaalgb)
goedBezigTaalCb['values']=["Tr","Ar"]
goedBezigTaalCb['state'] = 'readonly'
goedBezigTaalCb.grid(row=2, column=0, columnspan=5)
goedBezigTaalCb.current(0)


selected_gb = tk.StringVar()
goedBezigCb = ttk.Combobox(root, textvariable=selected_gb)
filesDir=dirPath+"\\files\\"
p=os.listdir(dirPath+"\\files\\")
# get first 3 letters of every month name
goedBezigCb['values'] = [i for i in p if os.path.isdir(filesDir+i)]
# prevent typing a value
goedBezigCb['state'] = 'readonly'
# place the widget
goedBezigCb.grid(row=4, column=0, columnspan=5)
#goedBezigCb.pack(fill=tk.X, padx=5, pady=5)
goedBezigCb.current(0)


label1_gb = tk.StringVar()
label1 = ttk.Label(root, textvariable=label1_gb)
label1 = ttk.Label(text="")
label1.grid(row=5, column=0, columnspan=5)
#label1.pack(fill=tk.X, padx=5, pady=5)

label2_gb = tk.StringVar()
label2 = ttk.Label(root, textvariable=label2_gb)
label2 = ttk.Label(text="")
label2.grid(row=6, column=0, columnspan=5)
#label2.pack(fill=tk.X, padx=5, pady=5)

#metin1_gb = tk.Text(height=3)
metin1 = tk.Text(root,height=3,width=35)#, textvariable=metin1_gb)
metin1.grid(row=7, column=0, columnspan=5,padx=5, pady=5)
#metin1.pack(fill=tk.X, padx=5, pady=5)

# btn_gb = tk.StringVar()
btn = ttk.Button(root, text="Kontol et")
btn.config(command=btnOk_click)
btn.grid(row=8, column=0, columnspan=5)
#btn.pack(fill=tk.X, padx=5, pady=5)


label3_gb = tk.StringVar()
label3 = ttk.Label(root, textvariable=label3_gb)
label3 = ttk.Label(text="Çalışılacak text burada yazılacak.")
label3.grid(row=9, column=0, columnspan=5)
#label3.pack(fill=tk.X, padx=5, pady=5)

for i in range(len(dugmeYeniIsim)):
    dugme_ekle(i)
    
goedBezigCb.bind('<<ComboboxSelected>>', lessChanged)
goedBezigTaalCb.bind('<<ComboboxSelected>>', taalChanged)
root.bind('<Return>', enter_click)
metin1.bind("<KeyRelease>", countWords)
taal=selectedTaalgb.get()
lessChangedDef()
root.mainloop()