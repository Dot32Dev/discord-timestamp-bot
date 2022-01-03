const Discord = require("discord.js")
const token = require("./token.json")
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

console.log(token.token)
client.login(token.token)

let prefix = "!t"