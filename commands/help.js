const Discord = require('discord.js');
const color = require('.././EmbedColor');
require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
	let embed = new Discord.RichEmbed()
	.setColor(color.set("blue"))
	.setAuthor(`Commands List`, bot.user.avatarURL)
	.setDescription(`🔹 en-US: [Click Here](https://github.com/Zlarex/Prime/blob/master/commands.MD)\n🔸 Indo: [Click Here](https://github.com/Zlarex/Prime/blob/master/commands-bahasa.MD)`);
	message.channel.send(embed);
}
module.exports.help = {
	name:"help"
}