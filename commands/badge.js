const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("badge")
        .setDescription("Send anything"),
    async execute(interaction) {
        await interaction.reply(`🎉 Congratulations, you have completed the steps, now all you have to do is log in to this site to claim your badge\n<https://discord.com/developers/active-developer>\n\nIf it does not work for you, all you have to do is wait **24 hours**`)
    }
}