var activeItem;
var remainingItems = parseInt($("#totalItems").html());
var completedItems = 0;
var completedFlag = 0;

$(function() {
      $("#top9").hide();

        for (var i = 0; i < $("#totalItems").html(); i++) {
              $("#item" + i + 'F').hide();
        }

        $("#remaining").html("Remaining" + ' (' + String(remainingItems) + ')')
});

function pushItemInfo(flag, itemNumber) {
	var zerestname = $("#restaurantName").html();
  if(flag == 1){
    var ref = new Firebase("https://honeycombapp.firebaseio.com/restaurants/" + zerestname);
  }
	var zeItem = $("#" + itemNumber + "Name").html();

	//Get the binary code from the item
	var newBinary = "";
	var itemArray = ["#peanuts", "#treenuts", "#dairy", "#eggs", "#gluten", "#soy", "#sesame", "#shellfish", "#corn"]

	for (var i = 0; i < itemArray.length; i++) {
      if ($(itemArray[i]).css("background-color") == "rgb(45, 62, 79)") {
			newBinary = newBinary + '1';
		}
		else{
			newBinary = newBinary + '0';
		}
	}

  $('#' + itemNumber + "binary").html(newBinary);
	console.log(newBinary + '\t' + zerestname + '\t' + zeItem);

  if(flag == 1){
    ref.child(zeItem).set({
      binary: newBinary
    });    
  }

}



    /* TODO
    * Load each item's binary from firebase and see when last updated
    */

    /* TODO
    * Ability to add a new item
    */

    function changeCode(flag, id) {
      var itemArray = ["peanuts", "treenuts", "dairy", "eggs", "gluten", "soy", "sesame", "shellfish", "corn"];
      var tempValue = $("#item" + activeItem+"binary").html();
      console.log("one " + tempValue)
      for (var i = 0; i < itemArray.length; i++) {
        if(id == itemArray[i]){
          console.log("GOT HERE" + id + i);
          tempValue[i] = flag;
        }
      }
      console.log("two " + tempValue);
      $("#item" + activeItem+"binary").html(tempValue);

      // body...
    }

  	 function changeColor(id) {
      if ($("#" + id).css("background-color") == "rgb(45, 62, 79)") {
        $("#" + id).css("background-color", "#fff");
        $("#" + id).css("color", "#333");
      }
      else{
        $("#" + id).css("background-color", "#2d3e4f");
        $("#" + id).css("color", "#fff");
      }

  	}

    function loadItem(itemNumberDes) {
      if(completedFlag == 1){
      	completedFlag = 0;
      	return 0;
      }
      $("#selectClass").html("");
      $("#top9").show();
      var itemNumber = itemNumberDes.substring(0, itemNumberDes.length-1);
      var intItemNum = parseInt(itemNumber.split('item')[1]);
      var itemCode = ($("#" + itemNumber+'binary').html());
      var itemArray = ["#peanuts", "#treenuts", "#dairy", "#eggs", "#gluten", "#soy", "#sesame", "#shellfish", "#corn"];

      for (var i = 0; i < itemArray.length; i++) {
        if(itemCode[i] == 1){
            $(itemArray[i]).css("background-color", "#2d3e4f");
            $(itemArray[i]).css("color", "#fff");        
        }

        else{
            $(itemArray[i]).css("background-color", "#fff");
            $(itemArray[i]).css("color", "#333");
        }
      }

      $(".instruction-intro").hide();
      $("#menu-item-page-div").show();
      if (activeItem != -1){
        $("#" + "item" + activeItem + 'F').css("background-color", "#fff");
        $("#" + "item" + activeItem + 'N').css("background-color", "#fff");
      }
        activeItem = intItemNum;
        $("#" + itemNumberDes).css("background-color", "#f0f0f0");

      
      $(".menu-item-title").html($("#" + itemNumber + "Name").html());
      $(".menu-item-description").html($("#" + itemNumber + "Description").html());      
      $(".menu-item-category").html($("#" + itemNumber + "Category").html());      

    }

    function undoItem(itemNumber){
      completedFlag = 1;
      remainingItems++;
      completedItems--;
      $("#remaining").html("Remaining" + ' (' + String(remainingItems) + ')');
      $("#completed").html("Completed" + ' (' + String(completedItems) + ')');

      $("#" + itemNumber + 'N').show();
      $("#" + itemNumber + 'F').hide();
      $("#top9").hide();      
      pushItemInfo(0, itemNumber);

    }


    function finishedItem(itemNumber) {
      completedFlag = 1;
      var itemArray = ["#peanuts", "#treenuts", "#dairy", "#eggs", "#gluten", "#soy", "#sesame", "#shellfish", "#corn"];

      remainingItems--;
      completedItems++;
      $("#remaining").html("Remaining" + ' (' + String(remainingItems) + ')');
      $("#completed").html("Completed" + ' (' + String(completedItems) + ')');

      $("#" + itemNumber + 'N').hide();
      $("#" + itemNumber + 'F').show();
      
      pushItemInfo(1, itemNumber);
      $("#top9").hide();
      $("#selectClass").html("Select a new item!");

    }

