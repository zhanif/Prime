const Discord = require('discord.js');
require('dotenv');
const color = require('.././EmbedColor');
module.exports.run = async(bot, message, args, db) =>{
    db.collection('Data').find({gid: message.guild.id}).toArray(function(err,res){
        let prefix = res[0].prefix;
        let autorole = res[0].autorole;
        let modrole = res[0].modrole;
        let mutedrole = res[0].mutedrole;
        let messagelog = res[0].messagelog;
        let serverlog = res[0].serverlog;
        let starlog = res[0].starlog;
        let modlog = res[0].modlog;
        let voicelog = res[0].voicelog;
        let welcomelog = res[0].welcomelog;
        let timezone = res[0].timezone;
        let votechannel = res[0].votechannel;
        
        function checkChannel(x){
            let check = message.guild.channels.get(x);
            let result;
            if(check){
                result = check;
            }
            else{
                result = "**OFF**";
            }
            return result;
        }

        function checkRole(u){
            let check = message.guild.roles.get(u);
            let result;
            if(check){
                result = check;
            }
            else{
                result = "OFF";
            }
            return result;
        }

        let embed = new Discord.RichEmbed()
        .setColor(color.set('blue'))
        .setFooter(message.guild.id, message.guild.iconURL)
        .addField(`:bar_chart: Server settings`,`Prefix: \`${prefix}\`\nAutorole: ${checkRole(autorole)}\nMod-role: ${checkRole(modrole)}\nMuted role: ${checkRole(mutedrole)}\nTimezone: **${timezone}**`, true)
        .addField(`:scroll: Log Channel`,`Message-log:${checkChannel(messagelog)}\nModeration-log: ${checkChannel(modlog)}\nServer-log: ${checkChannel(serverlog)}\nStarboard: ${checkChannel(starlog)}\nVoice-log: ${checkChannel(voicelog)}\nVote-channel: ${checkChannel(votechannel)}\nWelcome-log: ${checkChannel(welcomelog)}`, true);
        message.channel.send(`:tools: Settings in **${message.guild.name}**:`,embed);
    });
}
module.exports.help = {
	name:"settings"
}