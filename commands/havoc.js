const MessageEmbed = require('discord.js').MessageEmbed;
const cheerio = require('cheerio');
const axios = require('axios');
let lastCmdTime;
const url = "https://sourceforge.net/projects/havoc-os/files/";
module.exports = {
    syntax: "<device-name>",
    description: `Get Havoc OS Latest ROM build info. for now its just \`device-name\`(device-codename)\nCan't find your device?\nGoto >> ${url}`,
    cooldown: '10s',
    execute(message, args) {
        if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
        else const now = message.createdTimestamp;
        if ((now - lastCmdTime) <= 10000)
            return message.reply(
                'Cooldown: ' + `${new Date((now - lastCmdTime)).getSeconds}` +
                ', Source Forge be like _Whom\'st\'d\'ve\'nt me\'nt b\'th\'t?_...')
                .then(msg => msg.delete({ timeout: 3000 }));
        
        let deviceurl = url;
        const devicename = args[0].toLowerCase() in ['gsi', 'arm'] ? args.join('').toLowerCase() : args.join('_').toLowerCase();
        switch (devicename) {
            case "gsi64":
            case "gsiarm64":
            case "arm64":
            case "gsi64ab":
            case "gsiarm64ab":
            case "arm64ab": {
                deviceurl = deviceurl + 'arm64-ab/';
                break;
            }
            case "gsi64a":
            case "gsiarm64a":
            case "arm64a":
            case "gsi64aonly":
            case "gsiarm64aonly":
            case "arm64aonly": {
                deviceurl = deviceurl + 'arm64-aonly/'
                break;
            }
            case "gsi32":
            case "arm":
            case "gsiarm32":
            case "arm32": {
                deviceurl = deviceurl + 'arm-ab/';
                break;
            }
            case "gsi32a":
            case "arma":
            case "gsiarm32a":
            case "arm32a": {
                deviceurl = deviceurl + 'arm-a/'
                break;
            } 
            default:
                deviceurl = deviceurl + devicename + '/';
        }
        let objArr = [];
        axios.get(deviceurl).then(res => {
            const $ = cheerio.load(res.data);
            const result = $('tr.file').text().trim().replace(/^[\s]+/gm, '').replace(/(downloads)/gm, 'downloads\n').split('\n');
            for (let i = 0; i < 24; i += 6) {  //fetches-top-2-updates
                objArr.push(new createObject(result[i], result[i + 1], result[i + 2], result[i + 4], deviceurl));
            }
            let embed = new MessageEmbed()
                .setTitle(`Havoc-OS for ${devicename}`)
                .setURL(deviceurl)
                .setAuthor("Havoc-OS","https://a.fsdn.com/allura/p/havoc-os/icon?1589020933?&w=90")
                .setFooter("SOURCEFORGE projects/havoc-os", "https://a.fsdn.com/con/img/sandiego/logo-180x180.png")
                .setTimestamp()
                .setColor('DD6600');

            objArr.forEach(obj => {
                embed.addField(`${obj.date} || ${obj.name}`,
                    `Size: ${obj.size} ~₪₪₪~ [${obj.weekdl}](${obj.dlurl})`, false);
            });
            message.channel.send(embed);
        }).catch(err => {
            console.log(err);
            message.reply('Oops, looks like some error occured while fetching your device repo; your device is either missing(??) or sourceforge/havoc is having some issues.\nRest assured, this error has been logged.')
                .then(msg => msg.delete({timeout: 10000}));
        });
    }
};
function createObject(name, date, size, weekdl, deviceurl) {
    this.name = name;
    this.date = date;
    this.size = size;
    this.weekdl = weekdl;
    this.dlurl = deviceurl + name + '/download/';
}