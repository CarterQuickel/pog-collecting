const userdata = (() => {
    try {
        return JSON.parse(document.getElementById("userdata")?.textContent || '{}');
    } catch (e) {
        return {};
    }
})();

function normPfp(u) {
    if (!u) return '';
    u = String(u).trim();
    // keep absolute URLs and data URLs as-is
    if (/^(https?:\/\/|data:)/i.test(u)) return u;
    // already absolute path
    if (u.charAt(0) === '/') return u;
    // make relative storage paths absolute for the server
    return '/' + u.replace(/^\/+/, '');
}
const myPfp = normPfp(userdata.pfp);


if (userdata.theme === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    const messageInputEl = document.getElementById("messageInput");
    if (messageInputEl) {
        messageInputEl.style.backgroundColor = "black";
        messageInputEl.style.color = "white";
    }
} else if (userdata.theme === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}

const socket = io();
const myName = userdata.displayName || userdata.displayname || 'Guest';

const form = document.querySelector('form');
const messageInput = document.getElementById("messageInput");
const messageCont = document.getElementById("messageCont");


function escapeHtml(s = '') {
    return String(s).replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function renderMessage(chat) {
    if (!chat) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-line';

    const time = chat.time ? new Date(Number(chat.time)) : new Date();
    const timeStr = `[${time.toLocaleTimeString()}]`;

    // profile picture WHY IS THIS SO COMPLICATED ???
    const pfpSrc = normPfp(chat.pfp) || myPfp || '/static/icons/pfp/defaultpfp.png';
    if (pfpSrc) {
        const img = document.createElement('img');
        img.src = pfpSrc;
        img.alt = `${chat.name}'s profile picture`;
        img.className = 'chat-pfp';

        img.onerror = () => {
            console.warn('pfp failed to load, falling back:', pfpSrc);
            img.onerror = null;
            img.src = '/static/icons/pfp/defaultpfp.png';
        };
        wrapper.appendChild(img);
    }

    const metaSpan = document.createElement('span');
    metaSpan.className = 'chat-meta';
    metaSpan.innerHTML = `<span class="chat-time">${escapeHtml(timeStr)}</span> <strong class="chat-name">${escapeHtml(chat.name)}</strong>: `;
    wrapper.appendChild(metaSpan);

    const msgSpan = document.createElement('span');
    msgSpan.className = 'chat-msg';
    msgSpan.textContent = chat.msg;
    wrapper.appendChild(msgSpan);

    messageCont.appendChild(wrapper);
    messageCont.scrollTop = messageCont.scrollHeight;
}


socket.on('chat history', (rows) => {
    messageCont.innerHTML = '';
    (rows || []).forEach(renderMessage);
});


socket.on('chat message', (chat) => {
    renderMessage(chat);
});



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = (messageInput.value || '').trim();
    if (!text) return;
    socket.emit("chat message", { name: myName, msg: text, pfp: myPfp || null });
    messageInput.value = "";
});


setTimeout(() => {
    if (messageCont.children.length === 0) {
        fetch('/api/chat/recent').then(r => r.ok ? r.json() : []).then(rows => {
            messageCont.innerHTML = '';
            (rows || []).forEach(renderMessage);
        }).catch(()=>{});
    }
}, 300);

