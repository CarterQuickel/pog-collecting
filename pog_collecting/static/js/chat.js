const userdata = (() => { try { return JSON.parse(document.getElementById("userdata")?.textContent || '{}'); } catch (e) { return {}; } })();

// theme 
if (userdata.theme === "light") { document.body.style.backgroundColor = "white"; 
    document.body.style.color = "black"; const messageInputEl = document.getElementById("messageInput"); 
    if (messageInputEl) { messageInputEl.style.backgroundColor = "black"; messageInputEl.style.color = "white"; } } 
    else if (userdata.theme === "dark") { document.body.style.backgroundColor = "black"; document.body.style.color = "white"; }

const socket = io(); 
const myName = userdata.displayName || userdata.displayname || 'Guest';

const form = document.querySelector('form'); 
const messageInput = document.getElementById("messageInput"); 
const messageCont = document.getElementById("messageCont");

// escape HTML 
function escapeHtml(s = '') {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return String(s).replace(/[&<>"']/g, (m) => map[m]);
}

function renderMessage(chat) {
    if (!chat) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-line';
    const time = chat.time ? new Date(Number(chat.time)) : new Date();
    const timeStr = time.toLocaleTimeString();
    const pfp = userdata.pfp || '';
    if (pfp) {
        const img = document.createElement('img');
        img.src = pfp;
        img.alt = `${chat.name}'s profile picture`;
        img.className = 'chat-pfp';
        wrapper.appendChild(img);
    }
    wrapper.innerHTML += `<span class="chat-time">${escapeHtml(timeStr)}</span> <strong class="chat-name">${escapeHtml(chat.name)}</strong>: <span class="chat-msg">${escapeHtml(chat.msg)}</span>`;
    messageCont.appendChild(wrapper);
    messageCont.scrollTop = messageCont.scrollHeight;
}


socket.on('chat history', (rows) => { messageCont.innerHTML = ''; (rows || []).forEach(renderMessage); });


socket.on('chat message', (chat) => { renderMessage(chat); });

form.addEventListener("submit", (e) => { e.preventDefault(); const text = (messageInput.value || '').trim(); if (!text) return; socket.emit("chat message", { name: myName, msg: text }); messageInput.value = ""; });



setTimeout(() => { if (messageCont.children.length === 0) { fetch('/api/chat/recent').then(r => r.ok ? r.json() : []).then(rows => { messageCont.innerHTML = ''; (rows || []).forEach(renderMessage); }).catch(()=>{}); } }, 300);