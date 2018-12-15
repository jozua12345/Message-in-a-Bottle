//make connection
var socket = io.connect("http://104.248.153.44:4000");


//query DOM
var message = document.getElementById("textArea");
var btn = document.getElementById("sendButton");
var outputMessage = document.getElementById("chatlogs");
var myName = prompt("Please enter your name:");

//Emit events
btn.addEventListener("click", function(){
	socket.emit("chat", {message: message.value, socketID: socket.id, name: myName});
	outputMessage.appendChild(createMyMessageElement(message.value));
	message.value = "";
	
});	

//Listen for events
socket.on("chat", function(data){
	if(socket.id != data.socketID){
		outputMessage.appendChild(createOtherMessageElement(data.message, data.name));
	}
	
});

function createMyMessageElement(message){
	var div1 = document.createElement("div");
	div1.setAttribute("id", "self");
	div1.setAttribute("class", "chat");
	var para = document.createElement("p");
	para.setAttribute("class", "chat-message");
	div1.appendChild(para);
	para.innerHTML = message;	
	return div1;
}

function createOtherMessageElement(message, name){
	var div1 = document.createElement("div");
	div1.setAttribute("id", "friend");
	div1.setAttribute("class", "chat");
	var para = document.createElement("p");
	para.setAttribute("class", "chat-message");
	div1.appendChild(para);
	para.innerHTML = name + ": " + message;	
	return div1;
}