const socket = io()

socket.on("connect", () => {
    $(".messages").append(`
        <div class="msgcont-s">
            <div class="msgbox-s">
                <p class="you">You Connected</p>
            </div>
        </div>    
    `)
    scrollToBottom()
})

const send = () => {
    var msg = document.getElementById("msg").value
    if (msg.trim() != "") {
        socket.emit("msg", encodeHTML(msg))
        $(".messages").append(`
            <div class="msgcont-s">
                <div class="msgbox-s">
                    <p class="you">You</p>
                    <p class="yourmsg" id="yourmsg">${encodeHTML(msg)}</p>
                </div>
            </div>
        `)
        document.getElementById("msg").value = ""
        scrollToBottom()
    }
}

$("#msg").on("keypress", (e) => {
    if (e.keyCode === 13) {
        send()
    }
    e.preventDefault
})

$("#send").click(() => {
   send()
})

socket.on("msg-recieve", data => {
    $(".messages").append(`
        <div class="msgcont-r">
            <div class="msgbox-r">
                <p class="senderip">${data.ip}</p>
                <p class="sendermsg" id="sendermsg">${data.msg}</p>
            </div>
        </div>    
    `)
    scrollToBottom()
})

socket.on("usr-connect", ip => {
    $(".messages").append(`
        <div class="msgcont-r">
            <div class="msgbox-r">
                <p class="senderip">${ip} Connected</p>
            </div>
        </div>    
    `)
    scrollToBottom()
})

socket.on("usr-disconnect", ip => {
    $(".messages").append(`
        <div class="msgcont-r">
            <div class="msgbox-r">
                <p class="senderip">${ip} disconnected</p>
            </div>
        </div>    
    `)
    scrollToBottom()
})

function scrollToBottom() {
    let messages = $('.messages');
    messages.scrollTop(messages[0].scrollHeight);
}

function encodeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}