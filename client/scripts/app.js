// YOUR CODE HERE:

var app = {};

app.server = "https://api.parse.com/1/classes/chatterbox";
app.init = function(){};
app.send = function(message){
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
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
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
  var string = "<div><h3><a class ='username' href=#>" + obj.username + "</a>:</h3>" + obj.text + "</div>"; 
  $('#chats').prepend(string);
}

$(document).on('click','.username',function(){
  app.addFriend();
});

$(document).on('submit','#send .submit',function(){
  app.handleSubmit();
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