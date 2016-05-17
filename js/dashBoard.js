function finishedItem(itemName) {
    $("#" + itemName).hide();
    ($("#top9items").show());
    pushItemInfo($('#restaurantName').html(), itemName);
}

function loadItem(itemName){
	console.log(itemName);
	var newitemName = itemName.split(' ').join('');
	console.log(itemName);
	var itemCode = ($("#" + itemName+'binary').html());
    console.log(itemCode);
	var itemArray = ["#peanuts", "#treenuts", "#dairy", "#eggs", "#gluten", "#soy", "#sesame", "#shellfish", "#corn"]

    for (var i = 0; i < itemArray.length; i++) {
    	if(itemCode[i] == 0){
    		($(itemArray[i]).prop('checked', false));
    	}
    	else{
    		($(itemArray[i]).prop('checked', true));            
    	}
    }
    ($("#top9items").show());
    ($("#itemNotifier")).text(itemName);
}
function pushItemInfo(zerestname, zeItem) {
	console.log(zerestname + zeItem);
	var ref = new Firebase("https://honeycombapp.firebaseio.com/restaurants/" + zerestname + '/' + zeItem);

	//Get the binary code from the item
	var newBinary = "";
	var itemArray = ["#peanuts", "#treenuts", "#dairy", "#eggs", "#gluten", "#soy", "#sesame", "#shellfish", "#corn"]

	for (var i = 0; i < itemArray.length; i++) {
		if ($(itemArray[i]).prop('checked')){
			newBinary = newBinary + '1';
		}
		else{
			newBinary = newBinary + '0';
		}
	}

	console.log("NEWBINARY" + newBinary);

	ref.child(zeItem).set({
	  binary: newBinary
	});	

}


