const Discord = require('discord.js');
const color = require('.././EmbedColor');
require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.author.id != process.env.OWNER) return;
    let data = [];
    bot.guilds.forEach(x => {
        data.push(`**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})`);
    });
    if(data.length > 0){
        data.sort();
        data = `🔹 `+data.join('\n🔹 ');
    }
    else{
        data = "[No server found]";
    }
    let embed = new Discord.RichEmbed()
    .setAuthor(`Server data`, bot.user.avatarURL)
    .setColor(color.set('blue'))
    .setDescription(data);

    message.channel.send(embed);
}
module.exports.help = {
	name:"botserver"
}