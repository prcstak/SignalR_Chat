﻿using Microsoft.AspNetCore.Identity;

namespace Chat.Data
{
    public class User : IdentityUser
    {
        public int Year { get; set; }
    }
}