const Discord = require('discord.js');
const color = require('.././EmbedColor');

module.exports.run = async(bot, message, args, db) =>{
    if(!message.member.hasPermission("SEND_MESSAGES")) return message.send(":no_entry: Missing permission: \`Send Messages\`");
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.send(":no_entry: Missing permission: \`Manage Channels\`");
    let mchannel = args[0];
    if(mchannel.substring(0,1) == "<"){
        mchannel = args[0].substring(2,args[0].length-1);
        if(!message.guild.channels.get(mchannel)) return message.channel.send(`:no_entry: Missing arguments: \`Mention channel\``);
        let messageA = args.join(" ").slice(mchannel.length+3);
        if(!messageA) return message.channel.send(`:no_entry: Missing arguments:\`Announcement message\``);
        let announceEmbed = new Discord.RichEmbed()
        .setAuthor(`Announcement`)
        .setColor(color.set('blue'))
        .setDescription(messageA)
        .setFooter(message.author.id, message.author.avatarURL);
        message.channel.send(`:ballot_box_with_check: The Announcement has been sent!`);
        message.guild.channels.get(mchannel).send(announceEmbed);
    }
    else if(mchannel.toUpperCase() == "HERE"){
        let messageA = args.join(" ").slice(5);
        if(!messageA) return message.channel.send(`:no_entry: Missing arguments:\`Announcement message\``);
        let announceEmbed = new Discord.RichEmbed()
        .setAuthor(`Announcement`)
        .setColor(color.set('blue'))
        .setDescription(messageA)
        .setFooter(message.author.id, message.author.avatarURL);
        message.channel.send(`:ballot_box_with_check: The Announcement has been sent!`);
        message.channel.send(announceEmbed);
    }
    else{
        if(!message.guild.channels.get(mchannel)) return message.channel.send(`:no_entry: Missing arguments: \`Mention channel\``);
        let messageA = args.join(" ").slice(args[0].length+1);
        if(!messageA) return message.channel.send(`:no_entry: Missing arguments:\`Announcement message\``);
        let announceEmbed = new Discord.RichEmbed()
        .setAuthor(`Announcement`)
        .setColor(color.set('blue'))
        .setDescription(messageA)
        .setFooter(message.author.id, message.author.avatarURL);
        message.channel.send(`:ballot_box_with_check: The Announcement has been sent!`);
        message.guild.channels.get(mchannel).send(announceEmbed);
    }
}
module.exports.help = {
	name:"announce"
}