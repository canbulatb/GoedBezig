import xlrd
import os
import sys
from PIL.ImageTk import PhotoImage

def openExcel(dosyaAdi):
    dirPath = (os.path.dirname(sys.argv[0]))
    loc = dirPath+"/files/"+dosyaAdi+"/"+dosyaAdi+".xlsx"
    wb = xlrd.open_workbook(loc)
    workSheet=wb.sheet_by_name("01")
    sheet = [workSheet.row_values(i) for i in range(workSheet.nrows)]
    return sheet

def changeImage(index,dosyaAdi,image,logo):
    dirPath = (os.path.dirname(sys.argv[0]))
    try:
        imagePath=dirPath+"/files/"+dosyaAdi+"/"+str(index)+".png"
        image.clear()
        image.append(PhotoImage(file=imagePath))
        logo.config(image=image[0],width=220, height=240)
        #logo.grid(row=0, column=0, columnspan=5, padx=5, pady=5)
    except :
        imagePath=dirPath+"/goedBezig.png"
        image.clear()
        image.append(PhotoImage(file=imagePath))
        logo.config(image=image[0],width=220, height=240)    


def pathEdit(klasor):
    dirPath = (os.path.dirname(sys.argv[0]))
    locDrs=dirPath+"/files/"+klasor+"/"
    return locDrs

def fileLng(index,taal,klasor):
    dirPath = (os.path.dirname(sys.argv[0]))
    return dirPath+"/files/"+klasor+"/"+str(index)+taal+".mp3" 