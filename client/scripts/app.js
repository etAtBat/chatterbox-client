// YOUR CODE HERE:

var app = {};

app.server = "https://api.parse.com/1/classes/chatterbox";

app.init = function(){};


app.send = function(msg, username, roomname){

  var message = {
    username: username,
    text: msg,
    //text:"helloooooo",
    roomname: roomname
};

       
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    async: false,
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
  
};

app.updateRooms = function(){

  $("#roomSelect").empty();
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {

      data = data.results;
      var roomObject = {};

      for(var i = 0; i<data.length;i++){//finding all rooms
        var object = data[i];
        var room = object.roomname;
        roomObject[room] = room;
      }

      for(var key in roomObject){
        var addToRoomList = "<option value='"+key+"'>"+key+"</option>"
        $("#roomSelect").append(addToRoomList);
      }

    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

}

app.fetch = function(){
  app.clearMessages();
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      var array = data.results.slice(0, 50);
      var roomObject = {};

      for(var i = 0; i<array.length;i++){//appending messages to chat
        var object = array[i];
        var username = object.username;
        var message = object.text;
        var room = object.roomname
        if($("#roomSelect").val() === room){
          app.addMessage(object);
        }
      }

      var allMessages = $(".chat");
      for(var i = 0; i < allMessages.length; i++){
        if(friendList.indexOf($(".chat")[i].children[0].children[0].text) !== -1){
          $($(".chat")[i].children[1]).addClass("friend")
        }
      }

        // app.updateRooms();

    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
}

app.clearMessages = function(){
 $('#chats').empty(); 

}

app.addMessage = function(obj){
   var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  function escapeHtml(string) {
     return String(string).replace(/[&<>"'\/]/g, function (s) {
       return entityMap[s];
     });
   }
  var beforeEsc = obj.text;
  var afterEsc = escapeHtml(beforeEsc);

  var string = "<div class='chat'><h3><a class ='username' href=#>" + obj.username + "</a>:</h3>" + "<span class='text'>"+afterEsc+"</span> "+ "</div>"; 
  $('#chats').append($(string));
}


var friendList = [];

$(document).on('click','.username',function(){
  var friend = $(this).html();
  if (friendList.indexOf(friend) < 0){
    friendList.push(friend);
  }

  console.log(friendList);
  var allMessages = $(".chat");
  for(var i = 0; i < allMessages.length; i++){
    if(friendList.indexOf($(".chat")[i].children[0].children[0].text) !== -1){
      $($(".chat")[i].children[1]).addClass("friend")
    }
  }

});

$(document).on('submit','#send .submit',function(){
  app.handleSubmit();
});


$(document).on('click','button',function(){
  //if #addRoom.val not in roomList, this is user trying to add new room
    //append to roomlist

  if($("#addRoom").val() !== ""){
    app.addRoom($("#addRoom").val());
    $("#roomSelect").val($("#addRoom").val());
  }

  var roomName = $("#addRoom").val() || $("#roomSelect").val();

  $("#addRoom").val('');

  console.log(roomName);
  app.send($("textarea").val(), $("#username").val(), roomName);
  app.fetch();

});


app.addRoom = function(lobby){
  var string = "<option value=" + lobby + ">" + lobby + "</option>"; 
  $("#roomSelect").prepend(string);
}

app.addFriend = function(){
  console.log("clicked");
};

app.handleSubmit = function(){

};

$(document).on('change', '#roomSelect', function (e) {
  app.fetch();
});

app.updateRooms();
app.fetch();
