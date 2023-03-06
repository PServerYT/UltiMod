const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require("../config")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Informations about UltiMo."),
    run: async (interaction, client) => {
        
        const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setThumbnail(client.user.avatarURL({dynamic:true}))
        .setAuthor({ name: `${client.user.username} | Support`, iconURL: client.user.avatarURL() })
        .addFields(
          { name: ':question: Support', value: `> [Support Server](https://discord.gg/w6uPGUxc) \n> [Website](https://ultimod.xyz)` },
          { name: ':bookmark: Vote', value: `> [Discords](https://discords.com/bots/bot/1064554851767427112) \n> [DiscordBotList](https://discordbotlist.com/bots/ultimod)\n> [BotList](https://discordlist.gg/bot/1064554851767427112)` },
          { name: ':handshake: Others', value: `> [AlphaMod](https://discord.com/oauth2/authorize?client_id=1066413685490323536&scope=bot) 🚧 IN DEVELOPEMENT` }
        ) 
        
        await interaction.reply({ content: 'Pong 🏓', embeds: [embed]})       
    }
}