const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

let inputlabel = ['У меня мурашки от тебя..', 'Ты вдохновила меня на …', 'Ты такая аппетитная!']
let input = document.getElementById('message');
let chat = document.getElementById('chatroom');
let username = user;


class Message{
    constructor(username, text, time, id) {
        this.Username = username;
        this.Text = text;
        this.Time = time;
        this.Id = id;
        this.RoomId;
    }
}

//-Receive message
function addMessageToChat(message) {
    console.log(message);
    let userNameElem = document.createElement("div");
    let elem = document.createElement("div");
    if (message.username == username){
        userNameElem.className = "alert alert-secondary";
        userNameElem.innerHTML = '<strong>'+username+'</strong>'+ '<span>'+ message.time+'</span>' +  '</br> ' + message.text;
        
        elem.className = "d-flex justify-content-end";
        elem.appendChild(userNameElem);
    } else{
        
        userNameElem.className = "alert alert-dark";
        userNameElem.innerHTML = '<strong>'+message.username+'</strong>'+ message.time + '</br> ' + message.text;
        
        elem.className = "d-flex justify-content-start";
        elem.appendChild(userNameElem);
    }

    var firstElem = chat.lastChild;
    chat.insertBefore(elem, firstElem);
}
hubConnection.on('Send', addMessageToChat);


function getMonthName(month){
    const d = new Date();
    d.setMonth(month-1);
    const monthName = d.toLocaleString("default", {month: "long"});
    return monthName;
}

//-Send message
document.getElementById("sendBtn")
    .addEventListener("click", function (e) {
        let now = new Date();
        let date = ' - ' + getMonthName(now.getMonth()) + ' ' +
            now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
        if(input.value != ''){
            let message = new Message(username, input.value, date);
            sendMessage(message);
            input.value = '';
            input.placeholder = inputlabel[Math.floor(Math.random() * inputlabel.length)];
        }
    });

hubConnection.start();

function sendMessage(message){
    
    hubConnection.invoke('Send', message)
}