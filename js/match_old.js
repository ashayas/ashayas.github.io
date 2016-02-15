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
    $("#MENU").show()
    var i = 0;
    var j = 0;
    while(($("#ZEMENUNUMBER"+String(i)).length) > 0){
      console.log($("#ZEMENUNUMBER"+String(i)).text());
      var sectionFlag = 1;
      while(($("#item"+String(j)).length) > 0){
        console.log(j);
        var a = $("#item"+String(j)).html();
        a = a.split('hidden="');
        var itmbinary = String(a[1]);
        itmbinary = String(itmbinary.split('"')[0]);
        console.log(itmbinary + " " + a[0] + userBinary);
        if (compareBinaries(itmbinary, userBinary) == true){
          $("#item"+String(j)).hide();
          sectionFlag = sectionFlag & 1;
        }

        else {
          sectionFlag = sectionFlag & 0;
        }

        j = j + 1;
      }
      i = i + 1;
      if (sectionFlag == 1){
        //$("#ZEMENUNUMBER" + String(i)).hide();
      }
    }
  } 

  var url = String(window.location.href);
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
          userBinary = a.honeyValue;
          checkItems(userBinary);
          console.log("UserBinary Is" + userBinary)
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
