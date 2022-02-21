using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Chat.Data
{
    public class User : IdentityUser
    {
        public int Year { get; set; }

        /*public User()
        {
            Messages = new HashSet<Message>();
        }
        public virtual ICollection<Message> Messages { get; set; }*/
    }
}