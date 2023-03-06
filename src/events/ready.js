const { ActivityType } = require("discord.js")
const schema = require("../models/ticket")

module.exports = {
	name: 'ready',
	once: true,
	execute: async (client) => {
    
        setInterval(async() => {
            const data = await schema.find({ closed: false });         
            const count = data?.length || 0
            const servers = `${client.guilds.cache.size.toLocaleString()}`;
            const users = `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`;      
        
            const activities = [`${count} active tickets!`, `Ticket Bot`, `${servers} Guilds`, `${users} Members`];          
            
            let activity = activities[Math.floor(Math.random() * activities.length)];
            client.user.setPresence({activities: [{name: activity, type: ActivityType.Watching }], status: "online"});  
        }, 20 * 1000);        
        //https://discordbotlist.com
        setInterval(async () => {
            try {
                await fetch("https://discordbotlist.com/api/v1/bots/1064554851767427112/stats", {
                    method: "POST",
                    headers: {
                        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjEwNjQ1NTQ4NTE3Njc0MjcxMTIiLCJpYXQiOjE2NzQ0ODgxODV9.ZIZxaG2-QAEj_1JJAEQygx5ikHzk1_Un_PjhYHZ8Ubg",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "servers": client.guilds.cache.size,
                        "users": client.users.cache.size
                    })
                });
            } catch (e) {
                console.error(e);
            }
        }, 1800000);
        //https://botsdo.gg
        setInterval(async () => {
            try {
                await fetch("https://discords.com/bots/api/bot/1064554851767427112", {
                    method: "POST",
                    headers: {
                        "Authorization": "3ad49d0696976e1f9e8beddbbd6245bead11f87066b157e667401c105d05d59a5dc53cd7bfd332f30fcd6cd3dda6359235bbad7d905083843e2c5d19c45b78fd",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "servers": client.guilds.cache.size
                    })
                });
            } catch (e) {
                console.error(e);
            }
        }, 1800000);
    }};
