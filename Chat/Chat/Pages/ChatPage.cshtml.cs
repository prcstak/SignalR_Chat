using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Chat.Pages;

[Authorize]
public class ChatPage : PageModel
{
    public void OnGet(string id)
    {
        
    }
}