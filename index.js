const Discord = require("discord.js")
const token = require("./token.json")
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

let prefix = "!t"

client.on("ready", () => console.log("Bot is online!"))
client.on("messageCreate", message => {
	console.log(message.content)

	if (message.content.includes("pig")) {
		message.reply(message.content.replaceAll("pig", "pog").replaceAll("@", "@ "))
	}
})

client.login(token.token)