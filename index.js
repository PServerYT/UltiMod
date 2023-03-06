//UltiMod
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js")
const Discord = require("discord.js")
const client = new Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})
const schema = require("./src/models/ticket")
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { QuickDB } = require("quick.db");
const db = new QuickDB;
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const mongoose = require("mongoose");
mongoose.connect(config.mongoDb)
.then(() => console.log("Successfully connected mongoDB."))
.catch(console.error);

client.commands = new Collection()

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command.data);
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(config.clientId),
	        { body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

const https = require("https");
const express = require('express');

const options = {
  key: fs.readFileSync("ssl/privkey.pem"),
  cert: fs.readFileSync("ssl/cert.pem"),
};

const cors = require("cors");
const app = express();

app.use(cors());

app.get("/stats", async (req, res) => {
  const data = await schema.find({ closed: false });       
  const totalCommand = await db.get("total_command") || 0;  
  const count = data?.length || 0
  let tickets = count;
  let guildCount = client.guilds.cache.size;
  let memberCount = 0;
  await client.guilds.cache.forEach(async guild => {
  memberCount += guild.memberCount;
  });
  res.json({ guildCount: guildCount, memberCount: memberCount, tickets: tickets, totalCommand, totalCommand });
});

https.createServer(options, app).listen(811, () => {
  console.log("HTTPS server running on port 811");
});;



client.login(config.token)
