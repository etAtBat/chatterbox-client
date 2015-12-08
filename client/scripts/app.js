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

app.fetch = function(){
  app.clearMessages();
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      var array = data.results.slice(0, 10);
      console.log(array.length);
      for(var i = 0; i<array.length;i++){
        var object = array[i];
        var username = object.username;
        var message = object.text;
        var room = object.roomname;
        app.addMessage(object);
      }
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

$(document).on('click','.username',function(){
  app.addFriend();
});

$(document).on('submit','#send .submit',function(){
  app.handleSubmit();
});


$(document).on('click','button',function(){
  app.send($("textarea").val(), $("input").val(), $("#roomSelect").val());
  app.fetch();
});


app.addRoom = function(lobby){
  var string = "<option value=" + lobby + ">" + lobby + "</option>"; 
  $("#roomSelect").append(string);
}

app.addFriend = function(){
  console.log("clicked");
};

app.handleSubmit = function(){

};

// setInterval(function(){
//   app.fetch();
// }, 1000)


