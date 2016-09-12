// Call 'onDocumentReady' when page is loaded
console.log('Script running');
if (document.readyState != 'loading'){
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');

//writeUserData("ogge", "Oskarrrr", "oskar@mail.com", "http://mypics.com")

//readAllBluetoothDevicesLarsPhoneHasSeen(300);
closeToBTDevice("14:32:D1:6F:55:E6",6000);

}

//usefull perhaps
//This method checks which devices that are close to a BT-device and updates result
function closeToBTDevice(btId,timeSinceLastActivity){
  console.log("looking for bt devices");
  var ref = firebase.database().ref();
  var arrayList = {};


  //Her we will have all changes!!!
  ref.on('child_changed', function(snapshot) {
    //Check if it is the BTDevice we are looking for that is changed (Look at the structure)
    var  changed = snapshot.child("BTFound").child(btId).child("MACAddress").val();
    //console.log("still looking" + btId + " " + changed);

    if(changed==btId){

      //Ok check how long time it is since it changed
      //Time now
      var nowInSec = Math.round(Date.now()/1000);
      //Time since the device was seen
      var  lastSeenInSec= (snapshot.child("BTFound").child(btId).child("lastSeen").val())/1000;
      var  friendlyName = (snapshot.child("BTFound").child(btId).child("friendlyName").val());
      var  friendlyNameDiscoveredDevice = (snapshot.child("friendlyName").val());
      var  MACAddressDiscoveredDevice = (snapshot.child("MACAddress").val());
      var timeDiff = Math.round(nowInSec - lastSeenInSec);
      //var counter = 0;



      //console.log("diff: " + timeDiff);
      if (timeDiff<timeSinceLastActivity){
        if(arrayList[MACAddressDiscoveredDevice] === undefined){
          console.log("this is working");
          arrayList[MACAddressDiscoveredDevice] = true;
          console.log("The device "+friendlyNameDiscoveredDevice+" with MACAddress "+MACAddressDiscoveredDevice+" was seen close to "+btId+" with friendlyname "+friendlyName+" "+timeDiff+" seconds ago");
          console.log(Object.keys(arrayList).length);

          if(Object.keys(arrayList).length === 1){

            console.log("ljud1");
          var audio1 = new Audio('ljud1.wav');
          audio1.play();
        }
      /*  else if(Object.keys(arrayList).length === 2){
          console.log("ljud2");
        var audio2 = new Audio('ljud2.wav');
        audio2.play();

      }*/
        }


        //arrayList.push(friendlyNameDiscoveredDevice);
        //console.log("The device "+friendlyNameDiscoveredDevice+" with MACAddress "+MACAddressDiscoveredDevice+" was seen close to "+btId+" with friendlyname "+friendlyName+" "+timeDiff+" seconds ago");
        //console.log(arrayList.length);
      }

    }
  });
}

/*function readAllBluetoothDevicesLarsPhoneHasSeen(timeSinceLastActivity){
  var ref = firebase.database().ref('/0C:B3:19:01:9D:EA/BTFound');
  ref.once('value').then(function(snapshot) {
    var key = snapshot.key; //Gets the key (variablename") "lastActive" in the name value pair {"lastActive" : 1470750295176}
    console.log(key);
    var time = snapshot.val(); //Gets the value for the variable "lastActive" in the name value pair {"lastActive" : 1470750295176}
    console.dir(time);
    var nowInSec = Math.round(Date.now()/1000);
    //Time since the device was seen
    var  lastSeenInSec= (snapshot.child("BTFound").child("lastSeen").val())/1000;

    //Ok lets iterate through them
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
          var friendlyName = childSnapshot.child("friendlyName").val();
          var MACAddress = childSnapshot.child("MACAddress").val();
          var rssi = childSnapshot.child("rssi").val();
          var lastSeen = childSnapshot.child("lastSeen").val()/1000;

          var timeDiff = Math.round(nowInSec - lastSeen);
          console.log(" HEJ HEJ " + timeDiff);
          if (timeDiff<timeSinceLastActivity){
          console.log("key: "+friendlyName,"value: "+MACAddress, "rssi: " +rssi + " sågs senast " + timeConverter(lastSeen));
        }

      });
  });
}*/



function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}



/*function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }*/
