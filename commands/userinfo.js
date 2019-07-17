const Discord = require('discord.js');
const color = require('.././EmbedColor');

module.exports.run = async(bot, message, args, db) =>{
	
    const userMention = message.mentions.users.first() || message.author;
    const memberMention = message.mentions.members.first() || message.member;

    if(!userMention || !memberMention) return message.channel.send(`:no_entry: Invalid arguments: \`Mention user\``);
    let userinfo = {};
    userinfo.createdat = userMention.createdAt;
    userinfo.discrim = userMention.discriminator;
    userinfo.id = userMention.id;
    userinfo.uname = userMention.username;
    userinfo.avatar = userMention.avatarURL;

    const rolesOfTheMember = memberMention.roles.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')

    var myInfo = new Discord.RichEmbed()
    .setAuthor(userinfo.uname, userinfo.avatar)
    .addField("Username",userinfo.uname, true)
    .addField("Discriminator",userinfo.discrim, true)
    .addField("User ID",userinfo.id, true)
    .addField("Created At",userinfo.createdat, true)
    .addField("Roles",rolesOfTheMember, true)
    .setColor(color.set('blue'))
    .setThumbnail(userinfo.avatar);

    message.channel.send(myInfo);
}
module.exports.help = {
	name:"userinfo"
}
