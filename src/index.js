import * as Discord from "discord.js"
import env from "@bergerapi/env"

const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

/**
 * This function is needed to parse the data from the message.
 * @param args
 * @returns {boolean|{week: number, hour: number, day: number, minute: number}}
 */
function collectData(args) {
    let information = {
        week: 0,
        hour: 0,
        day: 0,
        minute: 0
    };

    const keys = Object.keys(information);

    for (let i = 0; i < args.length; i++) {
        let arg = args[ i ]

        if ((i + 1) % 2 === 0) return false
        else {
            if (isNaN(arg))
                return false

            if (i >= args.length - 1)
                return false

            i++;

            const nType = args[ i ];

            if (!keys.includes(nType))
                return false

            information[ nType ] = Number(arg)
        }
    }

    return information
}

/**
 * This function starts the entire discord bot.
 */
async function main() {
    env.default()

    // Check if the bot is ready to start
    if (!process.env.TOKEN)
        throw new Error("No token found! Please create a file called .env with following content: ```TOKEN=your_token```")

    /**
     * Once the bot is ready, it will tell us.
     */
    client.on("ready", () => console.log("Bot is online!"))

    /**
     * This event listens to every message sent in the discord guild.
     */
    client.on("messageCreate", async (message) => {
        let d = new Date()
        let year = d.getUTCFullYear()
        let month = d.getUTCMonth()
        let day = d.getUTCDate()
        let hour = d.getUTCHours()
        let minute = d.getUTCMinutes()
        let second = d.getUTCSeconds()

        let simplified = message.content.replace("!timestamp ", "").replace("!timer ", "").replaceAll(",", "").replaceAll("and", "").replaceAll("s", "").replaceAll(/\s{2,}/g, ' ')
        let data = collectData(simplified.split(" "))
        let datum = new Date(Date.UTC(year, month, day + data.day + data.week * 7, hour + data.hour, minute + data.minute, second))

        if (message.content.startsWith("!timer"))
            if (!data || isNaN(datum.getTime()))
                await message.reply("Error: Please specify `weeks`, `days`, `hours` or `minutes`. It is also possible you entered a number out of range.")
            else
                await message.reply(`Timer ends <t:${datum.getTime() / 1000}:R>`)

        if (message.content.startsWith("!timestamp"))
            if (!data || isNaN(datum.getTime()))
                await message.reply("Error: Please specify `weeks`, `days`, `hours` or `minutes`. It is also possible the numbers you entered were invalid.")
            else
                await message.reply("`<t:" + datum.getTime() / 1000 + ":R>`")
    })

    // Logging the bot in.
    await client.login(process.env.TOKEN)
}

main().then(() => { })