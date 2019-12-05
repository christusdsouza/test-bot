module.exports= {
	alias: "in",
	syntax: " $$$~Youre looking for a syntax?",
	description: "Just nuke that faggot already! So dont forget to mention THEM. **Becareful not to hurt yourself** ~experimental~",
	execute(message,args,config){
	  len = config.insult.length;
	  var rand = Math.floor((Math.random() * 10) % len);
	  var item = "";	
	  if(args[0] == "add")
	  {
		  args.shift();
		  if(args[0])
		  {
				var item =  args.join(" ");
				config.insult.push(item);
				console.log(config.insult);
				return message.channel.send("ADDED MF");
		  }
		  return message.channel.send("You are adding nothing to the list MF, bleach your eyes ffs its ADD");
	  } 
	  console.log(config.insult);
	  if(!args[0])
		return message.reply(config.insult[rand]);
	  else
		return message.channel.send(args.join(' ')+" "+config.insult[rand]);
}};