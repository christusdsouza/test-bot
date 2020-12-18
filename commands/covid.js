const MessageEmbed = require("discord.js").MessageEmbed;
const tracker = require("covid19-api");
const facts = require("covid-facts");
let lastCmdTime;
module.exports = {
    syntax: "\n/covid <country>",
    description: "Get COVID-19 stats\nGlobal and Country\nExample:`/covid` --Global stats, `/covid us` --US stats",
    alias: [],
    cooldown: "30s",
    async execute(message, args, client) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) {
            if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
            else now = message.createdTimestamp;
            if ((now - lastCmdTime) <= 30000)
                return message
                    .reply('Cooldown: ' + `${new Date(now - lastCmdTime).getSeconds}` + 
                    ', **cough cough** Give me a little break here...')
                        .then((msg) => msg.delete({ timeout: 3000 }));
        }
        if (args.length) {
            const country = args.join(" ").toLowerCase();
            const response = await tracker
                .getReportsByCountries([country])
                .catch((error) => {
                    message.channel.send("Unable to fetch");
                    console.log(error);
                });
            const randFact = await facts.random();
            const jsonObj = response[0][0];
            const flag = jsonObj.flag;
            await message.channel
                .send(createEmbed(message, jsonObj, flag, randFact))
                .catch((error) => {
                    message.channel.send("Embed Error");
                    console.log(error);
                });
        } else {
            const response = await tracker.getReports().catch((error) => {
                message.channel.send("Unable to fetch");
                console.log(error);
            });
            const jsonObj = response[0][0];
            const randFact = await facts.random();
            const thumbnail =
                "https://cdn.discordapp.com/attachments/612935167857655818/709010675896156170/vXyTUTf_d_20200510172508859.jpg";
            await message.channel
                .send(createEmbed(message, jsonObj, thumbnail, randFact))
                .catch((error) => {
                    message.channel.send("Embed Error");
                    console.log(error);
                });
        }
    },
};
function createEmbed(message, jsonObj, thumbnail, randFact) {
    let activeCases;
    jsonObj.active_cases[0] ? activeCases = jsonObj.active_cases[0].currently_infected_patients : activeCases = 'Nil.';
    let embed = new MessageEmbed()
        .setTitle(
            `Novel-Covid19 Tracker\n${new Date(message.createdTimestamp).toDateString()}`
        )
        .setDescription(
            "Cases: " + jsonObj.cases.toLocaleString() +
            "\nDeaths: " + jsonObj.deaths.toLocaleString() +
            "\nRecovered: " + jsonObj.recovered.toLocaleString() +
            "\nActive Cases: " + activeCases.toLocaleString()
        )
        .setThumbnail(thumbnail)
        .setFooter(randFact, message.guild.iconURL());
    return embed;
}