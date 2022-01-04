const Discord = require("discord.js")
const token = require("./token.json")
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

let prefix = "!t"

client.on("ready", () => console.log("Bot is online!"))
client.on("messageCreate", message => {
	// var error = false

	let d = new Date()
	let year = d.getUTCFullYear()
	let month = d.getUTCMonth()
	let day = d.getUTCDate()
	let hour = d.getUTCHours()
	let minute = d.getUTCMinutes()
	let second = d.getUTCSeconds()

	let simplified = message.content.replace("!timestamp ", "").replace("!timer ", "").replaceAll(",", "").replaceAll("and", "").replaceAll("s", "").replaceAll(/\s{2,}/g, ' ')
	let data = collectData(simplified.split(" "))
	let datum = new Date(Date.UTC(year, month, day + data.day + data.week*7, hour + data.hour, minute + data.minute, second))

	if (message.content.startsWith("!timer")) {
		if (!data || isNaN(datum.getTime()) ) {
			message.reply("Error: Please specify `weeks`, `days`, `hours` or `minutes`. It is also possible you entered a number out of range.")
		} else {
			message.reply(`Timer ends <t:${datum.getTime()/1000}:R>`)
		}
	}
	if (message.content.startsWith("!timestamp")) {
		if (!data || isNaN(datum.getTime()) ) {
			message.reply("Error: Please specify `weeks`, `days`, `hours` or `minutes`. It is also possible the numbers you entered were invalid.")
		} else {
			message.reply("`<t:" + datum.getTime()/1000 + ":R>`")
		}
	}
	// console.log(simplified)
	// console.log(collectData(simplified.split(" ")))
	// if (collectData(simplified.split(" "))) { message.reply(JSON.stringify(collectData(simplified.split(" ")))) }
})

function collectData(args) {
	let information = {  
		week: 0,
		hour: 0,
		day: 0,
		minute: 0
	};

	const keys = Object.keys(information);

	for (let i = 0; i < args.length; i++) {
		let arg = args[i]
		
		if ((i + 1) % 2 == 0) {
			// Error
				// error = "Something went horrible wrong."
				return false
		} else {
			// Expecting a number here
			if (isNaN(arg)) {
				// Error
				// error = "Please use the correct format: '!timestamp 5 hours'"
				return false 
			}
			if (i >= args.length - 1) {
				// Error
				// error = "Please use the correct format: '!timestamp 5 hours 3 minutes'"
				return false 
			}

			// Checking what kind of number
			i++;

			const nType = args[i];
			
			if (!keys.includes(nType)) {
				// Error
				// error = "Please specify weeks, days, hours or minutes"
				return false
			}
			
			// Workaround to access a variable in an object by string in ts
			information[nType] = Number(arg)
		}
	}
	
	return information
}


client.login(token.token)