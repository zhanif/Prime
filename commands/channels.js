const Discord = require('discord.js');
const color = require('.././EmbedColor');

module.exports.run = async(bot, message, args, db) =>{
    let channels = [];
    message.guild.channels.filter(x => x.type === "text").forEach(channel =>{
		channels.push(channel.name);
	});
	if(channels.length > 0){
		channels.sort();
		channels = `🔹 `+channels.join('\n🔹 ');
	}
	else{
		channels = "(No channels)"
	}
	let embed = new Discord.RichEmbed()
	.setAuthor(`Channel List`)
	.setColor(color.set('blue'))
	.setFooter(message.guild.id, message.guild.iconURL)
	.setDescription(`All channels in this guild:\n${channels}`);
	
	message.channel.send(embed);
}
module.exports.help = {
	name:"channels"
}