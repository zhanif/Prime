const Discord = require("discord.js");
require('dotenv');
const color = require('.././EmbedColor');
module.exports.run = (bot, message, args, db) =>{
    if(!args[0]) return message.channel.send(`:no_entry: Missing user`);
    if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.channel.send(`:no_entry: Missing permission: \`Manage Members\``);
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send(`:no_entry: Missing user`);
    let viewuser = {uid: user.user.id, gid: message.guild.id};
    let notes = "(No account notes yet)";
    let unote = [];
    db.collection('Audit').find(viewuser).toArray(function(err, result){
        if(err) return message.channel.send(`:no_entry: Data Error: ${e}`)
        if(result.length != 0){
            for(i=0; i<result.length; i++){
                unote.push(`🔹 ${result[i].time} - **${result[i].mtag}** >> \`${result[i].type}\` (${result[i].reason})`);
                notes = unote.join("\n");
            }
        }
        if(!notes || result.length == 0){
            notes = "(No account notes yet)";
        }
        let embed = new Discord.RichEmbed()
        .setAuthor(`Check Members`)
        .setColor(color.set('blue'))
        .addField(`Account Notes`, notes)
        .setFooter(user.user.id || user, user.user.avatarURL || false);

        message.channel.send(embed);
    });
}

module.exports.help = {
	name:"check"
}