using System;
using System.Collections.Generic;
using Chat.Hubs;

namespace Chat.Data
{
    public class Mock
    {
        public List<User> UserList;
        public List<Room> RoomList;

        public Mock()
        {
            UserList = new List<User>();
            RoomList = new List<Room>(){new Room()
            {
                Id = "4",
                Name = "MyRoom",
                Owner = "Admin",
                Users = new List<string>(),
            }};
        }
    }
    public class Room
    {
        public string Id { get; set; }
        public string? Name { get; set; }
        public string? Owner { get; set; }
        public List<string> Users { get; set; }

        public Room()
        {
            Users = new List<string>();
        }
    }

    public class Message
    {
        public int Id { get; set; }
        public string?  Username { get; set; }
        public string? UserId { get; set; }
        public string? Text { get; set; }
        public string? Time { get; set; }
        /*public int UserID { get; set; }
        public virtual User User { get; set; }*/
    }
}