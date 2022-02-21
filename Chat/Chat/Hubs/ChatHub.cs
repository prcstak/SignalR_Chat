using System;
using System.Collections.Generic;
using System.Security.Claims;
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
        
        public async Task CreateRoom(string RoomName)
        {
            var room = new Room
            {
                Name = RoomName,
                RoomId = Guid.NewGuid().ToString().ToUpper()
            };
            var isRoomExist = db.RoomList.Find(x => x.Name == room.Name);
            if (isRoomExist == null)
            {
                db.RoomList.Add(room);
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, room.Name);
        }

        public async Task JoinRoom(string RoomId, string current_Id)
        {
            var room = db.RoomList.Find(x => x.RoomId == RoomId);
            var u = db.UserList.Find(x => x.Id == current_Id);
            if (room != null)
            {
                    
            }
        }

        public async Task Send(Message message)
        {/*Context.UserIdentifier*/
            await Clients.All.SendAsync("Send", message);
        }

        public async Task SendGroup(string message, string RoomID)
        {
            await Clients.Group(RoomID).SendAsync("Send", message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("Send",new Message() {
                Text = "hello", Username = "Chat", Time = " 00:00"
            });
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Clients.Others.SendAsync("Disconnect");
            await base.OnDisconnectedAsync(exception);
        }
    }
}