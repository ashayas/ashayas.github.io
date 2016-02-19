from shutil import copyfile

lastItem = 52

for x in range (0, lastItem+1):
	copyfile("../La Terrazza/images/item.jpg", "../La Terrazza/images/item"+str(x)+".jpg")