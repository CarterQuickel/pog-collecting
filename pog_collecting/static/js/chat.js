var userdata = JSON.parse(document.getElementById("userdata").textContent);

//mode
if (userdata.theme === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.getElementById("message").style.backgroundColor = "black";
    document.getElementById("message").style.color = "white";
} else if (userdata.theme === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}

let socket = io();
let myName = userdata.username;
let messageForm = document.getElementById("messageInput");
let message = document.getElementById("message");
let messageCont = document.getElementById("messageCont");
