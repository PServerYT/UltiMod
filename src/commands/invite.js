const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require("../config")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite UltiMod."),
    run: async (interaction, client) => {
        
        const row = new ActionRowBuilder()
			.addComponents(              
				new ButtonBuilder()
					.setLabel('Invite Me')
                    .setURL(config.link.inviteUrl)
					.setStyle(ButtonStyle.Link),                
			);
        
        const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setTitle("Invite Me")
        .setDescription(`Invite UltiMod to your Server!`)
        
        await interaction.reply({ embeds: [embed], components: [row] })       
    }
}