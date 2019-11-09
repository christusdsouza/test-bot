const insult = ["FUCK U PUTANG INA MO BOBO","Why now? YOU FUCK OFF YOU DUMB MOTHERFUCKER!! I'm sick of sad, whacko Billy No-Mates telling me to fuck off. Get a fucking life you weird piece of worthless shit. Ugh."]
module.exports= {
	execute(message,args,config){
		
	  len = insult.length;
	  var rand = Math.floor((Math.random() * 10) % len);
	  var item = "";	
	  if(args[0] == "add")
	  {
		  args.shift();
		  if(args[0])
		  {
				var item =  args.join(" ");
				insult.push(item);
				//console.log("Edited: "+insult);
				return message.channel.send("ADDED MF");
		  }
		  return message.channel.send("You are adding nothing to the list MF, bleach your eyes ffs its ADD");
	  } 
	  //console.log("FINAL: "+insult);
	  if(!args[0])
		return message.reply(insult[rand]);
	  else
		return message.channel.send(args.join(' ')+" "+insult[rand]);
}};
