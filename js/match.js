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
    console.log('Yo');

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
