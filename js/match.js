$(function(){

	  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

  function compareBinaries(itemBinary, userBinary) {
    var a = String(itemBinary);
    var b = String(userBinary);

    for (i = 0; i < String(itemBinary).length; i++){
      if(a.charAt(i) == 1 && b.charAt(i) == 1){
        return true;
      }
    }
    return false;
  }

  function checkItems(userBinary){
    var i = 0;
    var j = 0;
    var maxItems = 3;

    //loop thru all sections
    while(($("#Sexion"+String(i)).length) > 0){
      $("#Sexion"+String(i)).hide();            
      //loop thru all items
      while(($("#Sexion"+String(i)+"item"+String(j)).length) > 0){ 
        $("#Sexion"+String(i)+"item"+String(j)).hide();
        var a = $("#Sexion"+String(i)+"item"+String(j)).html();
        //console.log(a);
        a = a.split('"');
        var itmbinary = String(a[1]);
        //console.log("ITEMBINARY"+ itmbinary);

        if(compareBinaries(itmbinary, userBinary) == false){
          console.log("Found a match!");
          $("#Sexion"+String(i)+"item"+String(j)).show();
          $("#Sexion"+String(i)).show();      
          //console.log("MAX ITEMS: " + maxItems);  
        }

        else{
          $("#Sexion"+String(i)+"item"+String(j)).hide();
        }
        j++;
    }
    i++;
  }
} 


  var hash = getCookie("honeyUID");
  //ERROR CHECK HERE?
  var userBinary;
  console.log("HERE WE GO: " + hash);
  var ref = new Firebase("https://honeycombapp.firebaseio.com/users/");

  if (hash != ""){
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
      if (snapshot.child(hash).exists()){
        var newref = new Firebase("https://honeycombapp.firebaseio.com/users/"+hash);
        newref.on("value", function(snapshot) {
            a=((snapshot.val()));
            userBinary = a.binary;
            checkItems(userBinary);
            console.log("UserBinary Is" + userBinary);
        }, function (errorObject) {
          console.log("error");
        });
      }
      else {
        console.log("NOUSERLIKETHATEXISTS");
        $("#NOTLOGGED").show();
      }
    }, function (errorObject) {
      console.log("error");
    });
    //look up the hash on firebase, get the user
    }

  });


//});
