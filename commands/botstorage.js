const Discord = require("discord.js");
require('dotenv');
const color = require('.././EmbedColor');
module.exports.run = async(bot, message, args, db) =>{
    
    db.collection('Data').find().toArray(function(err, res){
        if(err) return message.channel.send(`:no_entry: Some data has been crashed!`);
        let data = (res|| {}).length;
        db.collection('Core').find().toArray(function(err, res){
            if(err) return message.channel.send(`:no_entry: Some data has been crashed!`);
            let core = (res|| {}).length;
            db.collection('Audit').find().toArray(function(err, res){
                if(err) return message.channel.send(`:no_entry: Some data has been crashed!`);
                let audit = (res|| {}).length;
                db.collection('Starboard').find().toArray(function(err, res){
                    if(err) return message.channel.send(`:no_entry: Some data has been crashed!`);
                    let mods = (res|| {}).length;
                    db.collection('Ignore').find().toArray(function(err,res){
                        let ign = (res|| {}).length;
                        if(err) return message.channel.send(`:no_entry: Some data has been crashed!`);

                        let embed = new Discord.RichEmbed()
                        .setAuthor(`Database Info`,bot.user.avatarURL)
                        .setDescription(`MongoDB Atlas is cloud based storage in order to keep the database alive for 24/7 (Max: 512mb of RAM)\nHeroku is a cloud platform as a service (PaaS) that lets companies build, deliver, monitor, and scale apps.`)
                        .setColor(color.set('blue'))
                        .setFooter(bot.user.id)
                        .addField(`Storage Data`,`:scroll: **Server Data**: ${data}\n:computer: **Core Data**: ${core}\n:bookmark: **Audit Data**: ${audit}\n:dizzy: **Star Data**: ${mods}\n:name_badge: **Ignored Data**: ${ign}`);

                        message.channel.send(embed);
                    })
                });
            });
        });
        
    });

    message.channel.send(`:no_entry: Temporarily disabled for now`)
}

module.exports.help = {
	name:"botstorage"
}