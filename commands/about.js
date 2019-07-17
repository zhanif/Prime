const Discord = require('discord.js');
const color = require('.././EmbedColor');

module.exports.run = async(bot, message, args, db) =>{
    db.collection('Core').find().toArray((err,res) =>{
        let embed = new Discord.RichEmbed()
        .setAuthor(`About Prime`,bot.user.avatarURL)
        .setColor(color.set("blue"))
        .setDescription
        (`Moderation and utility bot made by **${res[0].otag}** for make your server more better. If you enjoy with this bot, or you want to leave some feedback, you can type \`suggest\` commands!
        \n[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=574904520828649487&permissions=8&scope=bot) | [Join Server](https://discord.gg/YnttpcR) | [Commands List](https://github.com/Zlarex/Prime/wiki/Command-List)`);

        message.channel.send(embed);
    });
}
module.exports.help = {
	name:"about"
}
