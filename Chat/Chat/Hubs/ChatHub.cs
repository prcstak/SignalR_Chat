using System;
using System.Threading.Tasks;
using Chat.Data;
using Microsoft.AspNetCore.SignalR;


namespace Chat.Hubs
{
    public class ChatHub : Hub
    {
        public Mock db { get; set; }

        public ChatHub(Mock context)
        {
            db = context;
        }

        public void CreateRoom(string RoomName)
        {
            var userid = Context.UserIdentifier;
            var room = new Room
            {
                Id = Guid.NewGuid().ToString(),
                Name = RoomName,
                Owner = userid,
            };
            db.RoomList.Add(room);
        }

        public async Task JoinRoom(string roomid)
        {
            /*var room = db.RoomList.Find(x => x.Id == roomid);/*
            var user = db.UserList.Find(x => x.Id == Context.UserIdentifier);#1#
            if (room != null /*&& user != null#1#)
            {
                room.Users.Add(Context.UserIdentifier);
                await Groups.AddToGroupAsync(Context.ConnectionId, room.Id);
            }*/
            await Groups.AddToGroupAsync(Context.ConnectionId, roomid);
            await Clients.All.SendAsync("Send", new Message()
            {
                Text = "hello", Username = "Chat", Time = " 00:00", UserId = "0"
            });
        }

        public async Task Send(Message message)
        {
            /*Context.UserIdentifier*/
            await Clients.All.SendAsync("Send", message);
        }

        public async Task SendGroup(Message message, string roomid)
        {
            await Clients.Group(roomid).SendAsync("Send", message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("Send", new Message()
            {
                Text = "hello", Username = "Chat", Time = " 00:00", UserId = "0"
            });
        }
    }
}