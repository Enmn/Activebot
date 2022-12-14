const { Client, GatewayIntentBits, Events, Collection, REST, Routes } = require("discord.js");
const { readdirSync } = require("fs")
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});

function register(client, server, token) {
    const commands = []
    const commandList = readdirSync('./commands');
    for (let file of commandList) {
        commands.push(require('./commands/' + file).data.toJSON());
    }
    const rest = new REST().setToken(token);
    (async () => {
        await rest.put(Routes.applicationGuildCommands(client.user.id, server), {body:commands});
    })();
}

readline.question("Welcome to the active badge bot.\nAfter you put the token, you must invite the bot to your server\nEven if it exists, expel it, then enter it with the invitation that I will give you.\n\nEnter the bot's token here\n> ", token => {
    const client = new Client({intents: [GatewayIntentBits.Guilds] })
    client.commands = new Collection();
    const commandList = readdirSync('./commands')
     for (let file of commandList) {
          let cmd = require('./commands/' + file)
          client.commands.set(cmd.data.name, cmd)
    }

    client.once(Events.ClientReady, client => {
        let guilds = client.guilds.cache.map(guild => guild.id);
        guilds.forEach(guild => {
            register(client, guild, token);
        })
        console.log(`\nUse this URL to invite ${client.user.tag} to your server:\nhttps://discord.com/api/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands%20bot\n`)
    });
    
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        let command = interaction.client.commands.get(interaction.commandName);
        await command.execute(interaction)
        console.log(`command was used by ${interaction.user.tag}`)
    })
    client.login(token)
});

