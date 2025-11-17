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



const chatInput = document.getElementById('messageInput');
const mesasageCont = document.getElementById('messageCont');
const submitButton = document.getElementById('submitBtn');

submitButton.addEventListener('click', function() {
    const message = chatInput.value.trim();
    if (message) {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = message;
        messageCont.appendChild(messageElement);
        // clear input box
        chatInput.value = '';
    }
});