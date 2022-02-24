const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();


let _inputPlaceholders = ['У меня мурашки от тебя..', 'Ты вдохновила меня на …', 'Ты такая аппетитная!']
let _input = document.getElementById('message'); //message text
let _chat = document.getElementById('chatroom'); //message area
var params = new URLSearchParams(document.location.search);
let _roomid = params.get('id');
//let _roomName = document.getElementById("addRoomName").value;
//let _username = '';
//room id

/*
хочу передавать room id по нажатию на кнопку 
чтобы отправлять room id на Hub
*/

class Message{
    constructor(username, userid, text, time, id, ) {
        this.Username = username;
        this.UserId = userid
        this.Text = text;
        this.Time = time;
        this.Id = id;
    }
}

//-Create Room----------------------------------------------------------------------------------------
/*

function addRoom(e){
    hubConnection.invoke('CreateRoom', _roomName, _userid);
    /!*window.location.replace()*!/
}

document.getElementById("addRoom") //on click add room
    .addEventListener("click", addRoom);
*/

//-Receive message-------------------------------------------------------------------------------------

function addMessageToChat(message) {
    console.log(message); //loggerrrrr
    let messageElem = document.createElement("div");
    let elem = document.createElement("div");
    let name;
    
    if (message.userId == _userid){
        messageElem.className = "alert alert-secondary";
        elem.className = "d-flex justify-content-end";
        name = _username;
    } else{
        messageElem.className = "alert alert-dark";
        elem.className = "d-flex justify-content-start";
        name = message.username;
    }

    messageElem.innerHTML = '<strong>'+name+'</strong>'+ '<span>'+ message.time+'</span>' +  '</br> ' + message.text;
    elem.appendChild(messageElem);
    var firstElem = _chat.lastChild;
    _chat.insertBefore(elem, firstElem);
}

hubConnection.on('Send', addMessageToChat);



//-Send message-----------------------------------------------------------------------------------

function getMonthName(month){
    const d = new Date();
    d.setMonth(month-1);
    const monthName = d.toLocaleString("default", {month: "long"});
    return monthName;
}

function getDate(){
    let now = new Date();
    return ' ' + getMonthName(now.getMonth()) + ' ' +
        now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
}

function clearInput(){
    _input.value = '';
    _input.placeholder = _inputPlaceholders[Math.floor(Math.random() * _inputPlaceholders.length)];
}

//-формирует сообщение
function sendMessage(e) {
    let date = getDate();
    let text = _input.value;
    if(text != ''){
        console.log(_username)//loggers
        console.log(_userid)
        console.log(_roomid)
        let message = new Message(_username, _userid, text, date);
        console.log(message)
        hubConnection.invoke('SendGroup', message, _roomid);
        clearInput();
    }
}

document.getElementById("sendBtn") //on click send 
    .addEventListener("click", sendMessage);

_input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("sendBtn").click();
    }
});

//-ChatJoin---------------------------------------------------------------------



hubConnection.start().then(function () {hubConnection.invoke('JoinRoom', _roomid)});

