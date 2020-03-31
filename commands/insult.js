const insult  = require('./../assets/insult.json');
module.exports= {
	alias: "in",
	syntax: " $$$~Youre looking for a syntax?",
	description: "Just nuke that faggot already! So dont forget to mention THEM. **Becareful not to hurt yourself** ~experimental~",
	execute(message,args){
	  var len = insult.insult.length;
	  var rand = Math.floor((Math.random() * 10) % len);
	  if(!args[0])
		return message.reply(insult.insult[rand]);
	  else if(args[0] === '<@631776475858599936>')
		return message.reply(insult.insult[rand]+'\nAint insulting myself you stupid bitch!!!');
	  else 
		return message.channel.send(args.join(' ')+" "+insult.insult[rand]);
}};