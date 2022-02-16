using Microsoft.AspNetCore.SignalR;

namespace Chat.Hubs;    

public class ChatHub: Hub
{
    public async Task Send(string message, string username)
    {
        await Clients.All.SendAsync("Send", message, username);
    }
    
    public async Task SendTest(string username)
    {
        await Clients.All.SendAsync("Send", "disconnected", username);
    }

    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("Greetings");
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Clients.Others.SendAsync("Disconnect");
        await base.OnDisconnectedAsync(exception);
    }
}
