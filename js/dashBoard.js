function finishedItem(itemName) {
    $("#" + itemName).hide();
    ($("#top9items").hide());
    pushItemInfo($('#restaurantName').html(), itemName);
}

function loadItem(itemName){
	var newitemName = itemName.split(' ').join('');
	var itemCode = ($("#" + itemName+'binary').html());
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
    itemRealName = $("#" + itemName + "NAME").html();
    ($("#itemNotifier")).text(itemRealName);
}
function pushItemInfo(zerestname, zeItem) {
	var ref = new Firebase("https://honeycombapp.firebaseio.com/restaurants/" + zerestname);

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

	ref.child(zeItem).set({
	  binary: newBinary
	});	

}


