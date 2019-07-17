const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.send(":no_entry: Missing permission: \`Manage Members\`");
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!user) return message.channel.send(`:no_entry: Missing arguments: \`Mention User\``);
    let reason = args.join(" ").slice(args[0].length+1) || "[No reason provided]";
    db.collection('Data').find({gid:message.guild.id}).toArray(function(err,result){
        let theRole = message.guild.roles.get(result[0].mutedrole);
        if(!theRole) return message.channel.send(`:no_entry: Missing data: \`Muted role\``);
    
        if(user.roles.has(theRole.id)){
            user.removeRole(theRole.id, `${message.author.tag}|`+reason);
            message.channel.send(`:loud_sound: **The Ancients** have unmuted on **${user.user.tag}**`);
        }
        else{
            message.channel.send(`:no_entry: Missing role: \`${theRole.name}\``);
        }
    });
}

module.exports.help = {
  name: "unmute"
}