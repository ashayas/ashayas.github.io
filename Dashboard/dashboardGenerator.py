#2016-02-15
import csv
import os
from bs4 import BeautifulSoup

MENU = 1;


def addNewItem(itemName, itemBinary, itemNumber):
    itemName.replace("*", ' ');
    '''<a href="#" onclick="loadItem('ZEITEMNAME')"><div class="card" id="ZEITEMNAME"><div class="card-block" style="background-color: ZECOLOR;"><h1 class="card-title">ZEITEMNAME</h1><p id="ZEITEMNAMEbinary" hidden>ZEBINARY</p><button type="submit" onclick="finishedItem('ZEITEMNAME')" class="btn btn-default">Done</button></div></div></a>'    addedItem = addedItem.replace("ZEBINARY", itemBinary)'''
    addedItem = addedItem.replace("ZEITEMNAME", itemName)
    addedItem = addedItem.replace("ZEBINARY", itemBinary)
    if (itemNumber % 2 == 0):
        addedItem = addedItem.replace("ZECOLOR", "#caeba1")
    else:
        addedItem = addedItem.replace("ZECOLOR", "#f5f5f5") 

    return(addedItem)

def generateIt(filename):

    r = csv.reader(open(filename))
    lines = [l for l in r]
    rows = len(lines)
    columns = len(lines[1])

    inputFileName = "template_copy.html"
    
    ecj_data = open(inputFileName,'r').read()
    soup = BeautifulSoup(ecj_data, "html5lib")
    newSite= str(soup)

    restaurantName = lines[0][1]
    restaurantAddress = lines[0][2]
    restaurantNumber = lines[0][5]
    restaurantReserve = lines[0][6]
    restaurantDescription = lines[0][7]
    restaurantSite = lines[0][8]

    newSite = newSite.replace("ZERESTNAME", restaurantName)
    newSite = newSite.replace("ZERESTADDY", restaurantAddress)
    newSite = newSite.replace("ZESITE", "http://"+restaurantSite)
    newSite = newSite.replace("ZERNUMBER", restaurantNumber)
    newSite = newSite.replace("ZERDESCRIPTION", restaurantDescription)
    newSite = newSite.replace("ZEOPENTAB", restaurantReserve)

    newSite = newSite.split('<!--**-->')
    addedText = ""

    itemBinary = ""
    itemNumber = ""
    itemDes = ""
    itemPrice = ""
    currentSectionName = ""

    sectionCode = "Sexion"
    dezSection = "";
    sectionCounter = 0;
    itemCounter = 0;

    for x in range(2, rows):

        if(lines[x][4] != currentSectionName):
            dezSection = sectionCode + str(sectionCounter);
            sectionCounter = sectionCounter + 1;
            currentSectionName = lines[x][4]

        itemBinary = ""
        itemNumber = lines[x][0];
        itemName = lines[x][1];
        itemDes = lines[x][2];
        itemPrice = lines[x][3];
        for y in range(0, columns):
                if(y >= 5):
                    itemBinary = itemBinary + lines[x][y];
        
        addedText = addedText + addNewItem(itemName, itemBinary, itemNumber)
    
    newSite = newSite[0] + addedText + newSite[1]
    newDirectory = filename[:-3]
    os.makedirs(newDirectory)
    outputFileName = ""
    if (MENU == 1):
        outputFileName = "/menu.html"
    else:
        outputFileName = "/index.html"
    with open(newDirectory+ outputFileName, "w") as myfile:
        myfile.write(newSite)





urls = [
"Arriva Ristorante.csv","Aura Waterfront Restaurant + Patio.csv","Bacchus Restaurant _ Lounge - Wedgewood Hotel.csv","Ban Chok Dee Thai Cuisine.csv","Bibo pizzeria con cucina.csv","Big Ridge Brewing Co.csv","Big Rock Urban Eatery.csv","Blue Water Cafe.csv","Catch 122 Cafe _ Bistro.csv","CHOP Steakhouse _ Bar - Richmond.csv","Ciao Bella Ristorante _ Piano Bar.csv","Copper Chimney - Hotel Le Soleil.csv","Cottage Bistro.csv","De Dutch - Burrard Landing.csv","De Dutch - Port Coquitlam.csv","De Dutch - Robson St.csv","Diva at the Met.csv","Ebisu on Robson.csv","EBO Restaurant _ Lounge.csv","Elisabeth's Chalet.csv","Francesco's.csv","Homer Street Cafe _ Bar.csv","Horizons Restaurant.csv","Italian Kitchen at Park Royal.csv","Judge's Indian Cuisine.csv","Kamei Royale Downtown.csv","Kaya Malay Bistro.csv","Kingston Taphouse _ Grille.csv","Kobe Izakaya Lounge.csv","La Pentola.csv","Las Margaritas.csv","Lupo Restaurant _ Vinoteca.csv","Mahony _ Sons - Burrard Landing.csv","Mahony _ Sons - Stamps Landing.csv","Mahony _ Sons - UBC.csv","Mangia E Bevi.csv","Match Eatery and Public House.csv","Maurya Indian Cuisine.csv","Miku Restaurant.csv","Minami Restaurant.csv","Morgans Restaurant and Wine Bar.csv","Mosaic Grille and Grain Tasting Bar - Hyatt Regency Vancouver.csv", "Bistro Pastis.csv", "Bistro Verde.csv", "Cafe il Nido.csv", "Cotto Enoteca Pizzeria.csv", "Hy's Steakhouse Encore.csv", "La Terrazza.csv", 
]


for url in urls:
    print(url)
    generateIt(url)

