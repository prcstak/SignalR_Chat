const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

let _inputPlaceholders = ['У меня мурашки от тебя..', 'Ты вдохновила меня на …', 'Ты такая аппетитная!']
let _input = document.getElementById('message'); //message text
let _chat = document.getElementById('chatroom'); //message area
let _username = 'lol';
//client user 
//room id
/*хочу передавать user id
чтобы сравнивать свой и receive user id для отрисовки

хочу передавать room id по нажатию на кнопку 
чтобы отправлять room id на Hub
*/

class Message{
    constructor(username, text, time, id) {
        this.Username = username;
        this.Text = text;
        this.Time = time;
        this.Id = id;
    }
}

//-Receive message-------------------------------------------------------------------------------------

function addMessageToChat(message) {
    console.log(message); 
    
    let messageElem = document.createElement("div");
    let elem = document.createElement("div");
    let name;
    
    if (message.username == _username){
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
        console.log(_username)
        let message = new Message(_username, text, date);
        console.log(message)
        hubConnection.invoke('Send', message);
        clearInput();
    }
}

document.getElementById("sendBtn") //on click send 
    .addEventListener("click", sendMessage);

hubConnection.start();
