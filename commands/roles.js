const Discord = require('discord.js');
const color = require('.././EmbedColor');

module.exports.run = async(bot, message, args, db) =>{
    let roles = [];
    message.guild.roles.forEach(role =>{
        if(role.name != "@everyone"){
            roles.push(role.name);
        }
    });
    if(roles.length > 0){
        roles.sort();
		roles = `🔹 `+roles.join('\n🔹 ');
    }
    else{
        roles = "(No roles found)";
    }
	let embed = new Discord.RichEmbed()
	.setAuthor(`Role List`)
    .setColor(color.set('blue'))
    .setFooter(message.guild.id)
	.setDescription(`All roles in this guild:\n${roles}`);
	
	message.channel.send(embed);
}
module.exports.help = {
	name:"roles"
}