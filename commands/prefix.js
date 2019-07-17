const Discord = require('discord.js');
const color = require('.././EmbedColor');

module.exports.run = async(bot, message, args, db) =>{
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:no_entry: Invalid permission: \`Manage guild\``);
    let serverID = {gid : message.guild.id};
    let prefix = args[0];
    if(!prefix){
        var guildRole="*";
        var dataRole ="";
        db.collection('Data').find(serverID).toArray(function(err, result){
            if(err) return console.log(`[ERROR] `+err);
            dataRole = result[0].prefix;
            if(guildRole != dataRole){
                guildRole = `\`*\` (Default prefix), \`${dataRole}\``;
            }
            else{
                guildRole = "\`*\` (Default prefix)";
            }
            let embed = new Discord.RichEmbed()
            .setAuthor(`Prefix`, bot.user.avatarURL)
            .setColor(color.set('blue'))
            .setDescription(guildRole);
    
            message.channel.send(embed);
        });
    }
    else{
        if(prefix.toUpperCase() == "OFF"){
            prefix = "*";
        }
        let updatePrefix = {$set: {prefix : prefix}};
        if(args[1]) return message.channel.send(`:no_entry: Invalid arguments: \`Prefix\``);
        db.collection('Data').findOneAndUpdate(serverID, updatePrefix).catch(err =>{
            if(err) return console.log(err);
        });

        if(prefix != "*") return message.channel.send(`:gear: Successfully changed the prefix to \`${prefix}\`. Note: The default prefix (\`*\`) can't be modified`);
        if(prefix == "*") return message.channel.send(`:gear: Successfully cleared the prefix. Note: The default prefix (\`*\`) can't be cleared`);
    }
}
module.exports.help = {
	name:"prefix"
}