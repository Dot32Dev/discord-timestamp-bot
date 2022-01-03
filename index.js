const Discord = require("discord.js")
const token = require("./token.json")
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

let prefix = "!t"

client.on("ready", () => console.log("Bot is online!"))
client.on("messageCreate", message => {
	let simplified = message.content.replace("!timestamp ", "").replace("!timer ", "").replaceAll(",", "").replaceAll("and", "").replaceAll("s", "").replaceAll(/\s{2,}/g, ' ')
	let data = collectData(simplified.split(" "))

	if (message.content.startsWith("!timer")) {
		message.reply(JSON.stringify(collectData(simplified.split(" "))))
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
				console.log("Something went horrible wrong.")
				return false
		} else {
			// Expecting a number here
			if (isNaN(arg)) {
				// Error
				console.log("Please use the correct format: '!timestamp 5 hours'")
				return false 
			}
			if (i >= args.length - 1) {
				// Error
				console.log("Please use the correct format: '!timestamp 5 hours 3 minutes'")
				return false 
			}

			// Checking what kind of number
			i++;

			const nType = args[i];
			
			if (!keys.includes(nType)) {
				// Error
				console.log("Please specify weeks, days, hours or minutes")
				return false
			}
			
			// Workaround to access a variable in an object by string in ts
			information[nType] = Number(arg)
		}
	}
	
	return information
}


client.login(token.token)