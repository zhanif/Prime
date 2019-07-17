const Discord = require('discord.js');
require('dotenv');
const color = require('.././EmbedColor');
module.exports.run = async(bot, message, args, db) =>{
	let embed = new Discord.RichEmbed()
	.setAuthor(`Inviting Prime`, bot.user.avatarURL)
	.setColor(color.set('blue'))
	.setDescription
    (`Hello there, Prime uses MongoDB Atlas to store data about server to prevent the daily Dyno restarted (hosted with Heroku).\n\nMake sure you accept and agree with the \`Administrator\` permission in order to let the bot manage your server.\n\n[>> Click Here to Invite <<](https://discordapp.com/api/oauth2/authorize?client_id=574904520828649487&permissions=8&scope=bot)`);

	message.channel.send(embed);
}
module.exports.help = {
	name:"invite"
}
