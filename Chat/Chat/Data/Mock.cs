using System;
using System.Collections.Generic;
using Chat.Hubs;

namespace Chat.Data
{
    public class Mock
    {
        public List<User> UserList = new List<User>();
        public List<Room> RoomList = new List<Room>();
    }
    public class Room
    {
        public string Name { get; set; }
        public string Owner { get; set; }
        public List<User> Users { get; set; }
        public string RoomId { get; set; }
    }

    public class Message
    {
        public int Id { get; set; }
        public string  Username { get; set; }
        public string Text { get; set; }
        public string Time { get; set; }
        /*
        public int UserId { get; set; }
        public virtual User User { get; set; }*/
    }
}