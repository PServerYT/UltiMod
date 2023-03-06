const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require("../config")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows the UltiMod about."),
    run: async (interaction, client) => {
        
        const row = new ActionRowBuilder()
			.addComponents(              
  				new ButtonBuilder()
					.setLabel('Support Server')
                    .setURL(config.link.supportServer)
					.setStyle(ButtonStyle.Link),

				new ButtonBuilder()
					.setLabel('Invite Me')
                    .setURL(config.link.inviteUrl)
					.setStyle(ButtonStyle.Link),                
			);
        
        const userCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
        const serverCount = client.guilds.cache.size.toLocaleString();
        
        const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle("About Me")
        .setDescription(`UltiMod advanced and simple ticket bot.  It has started to serve users from <t:1673872620:D>.  It provides convenient service to its users with its 24/7 open time.`)
        .addFields(
            { name: "🚀 Stats", value: `> User Count: ${userCount}\n> Server Count: ${serverCount}` }
)
        
        await interaction.reply({ embeds: [embed], components: [row] })       
    }
}