const MessageEmbed = require('discord.js').MessageEmbed;
const cheerio = require('cheerio');
const axios = require('axios');
let lastCmdTime;
const objArr = [];
let url = "https://sourceforge.net/projects/havoc-os/files/";
module.exports = {
    syntax: "<device-name>",
    description: `Get Havoc OS Latest ROM build info. for now its just \`device-name\`(device-codename)\nCan't find your device?\nGoto >> ${url}`,
    cooldown: '10s',
    execute(message, args) {
        if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
        else var now = message.createdTimestamp;
        if ((now - lastCmdTime) <= 10000)
            return message.reply(
                'Cooldown: ' + `${new Date((now - lastCmdTime)).getSeconds}` +
                ', Source Forge be like _Whom\'st\'d\'ve\'nt me\'nt b\'th\'t?_...')
                .then(msg => msg.delete({ timeout: 3000 }));
        const devicename = args[0].toLowerCase() in ['gsi', 'arm'] ? args.join('').toLowerCase() : args.join('_').toLowerCase();
        switch (devicename) {
            case "gsi64":
            case "gsiarm64":
            case "arm64":
            case "gsi64ab":
            case "gsiarm64ab":
            case "arm64ab": {
                url = url + 'arm64-ab/';
                break;
            }
            case "gsi64a":
            case "gsiarm64a":
            case "arm64a":
            case "gsi64aonly":
            case "gsiarm64aonly":
            case "arm64aonly": {
                url = url + 'arm64-aonly/'
                break;
            }
            case "gsi32":
            case "arm":
            case "gsiarm32":
            case "arm32": {
                url = url + 'arm-ab/';
                break;
            }
            case "gsi32a":
            case "arma":
            case "gsiarm32a":
            case "arm32a": {
                url = url + 'arm-a/'
                break;
            } 
            default:
                url = url + devicename + '/';
        }

        axios.get(url).then(res => {
            const $ = cheerio.load(res.data);
            const result = $('tr.file').text().trim();
            const stripped = result.replace(/^[\s]+/gm, '').replace(/(downloads)/gm, 'downloads\n').split('\n');
            for (let i = 0; i < 48; i += 6) {  //fetches-top-3-updates
                objArr.push(new createObject(stripped[i], stripped[i + 1], stripped[i + 2], stripped[i + 4]));
            }
        }).catch(err => {
            console.error();
            message.reply('Oops, looks like some error occured while fetching your device repo; your device is either missing(??) or sourceforge/havoc is having some issues.\nRest assured, this error has been logged.')
        });
        
        let embed = new MessageEmbed()
            .setTitle(`Havoc-OS for ${devicename}`)
            .setURL(url)
            .author('[Havoc-OS](https://sourceforge.net/projects/havoc-os/)')
            .footer('[SOURCEFORGE](https://sourceforge.net/)', 'https://a.fsdn.com/con/img/sandiego/logo-180x180.png')
            .setTimestamp()
            .setColor('DD6600')
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fraw.githubusercontent.com%2FHavoc-OS%2Fandroid_vendor_extras%2Fpie%2FXDA%2FImages%2FHavoc_Logo.png');

        objArr.forEach(obj => {
            embed.addField(`${obj.date}   [${obj.name}](${obj.url})`,
                `Size: ${obj.size}\t${obj.weekdl}`, false);
        })
        message.channel.send(embed);
    }
};
function createObject(name, date, size, weekdl) {
    this.name = name;
    this.date = date;
    this.size = size;
    this.weekdl = weekdl;
    this.url = url + name + '/download/';

}