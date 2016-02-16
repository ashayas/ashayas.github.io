$(function(){

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
      maxItems = 3;
      $("#Sexion"+String(i)).hide();            
      //loop thru all items
      while(($("#Sexion"+String(i)+"item"+String(j)).length) > 0){
        console.log($("#Sexion"+String(i)+"item"+String(j)));
        console.log("ITEM:"+ j);
        $("#Sexion"+String(i)+"item"+String(j)).hide();
        var a = $("#Sexion"+String(i)+"item"+String(j)).html();
        //console.log(a);
        a = a.split('"');
        var itmbinary = String(a[1]);
        //console.log("ITEMBINARY"+ itmbinary);

        if(compareBinaries(itmbinary, userBinary) == false && maxItems > 0){
          $("#Sexion"+String(i)+"item"+String(j)).show();
          $("#Sexion"+String(i)).show();      
          maxItems --;
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

  var url = String(window.location.href);

  //ERROR CHECK HERE?
  var hash = url.substring(url.indexOf('?')+1);
  console.log(hash);
  var userBinary;
  var ref = new Firebase("https://honeycombapp.firebaseio.com/users/");

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


});