const Discord = require('discord.js');
const color = require('../EmbedColor');
const time = require('../EventDate');

module.exports.run = async(bot, message, args, db) =>{
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:no_entry: Missing permission: \`Manage Messages\``);
    if(!args) return message.channel.send(`:no_entry: Missing arguments: \`Message ID\``);
    let msg_id = args[0];
    db.collection('Starboard').find({msgid: msg_id}).toArray((err,res) =>{
        if(res.length>0) return;
    });
    try{
        var checkmsg = await message.channel.fetchMessage(msg_id);
    }catch(e){
        return message.channel.send(`:no_entry: Missing arguments: \`Message ID in this channel\``);
    }
    db.collection('Data').find({gid: message.guild.id}).toArray((err,res) =>{
        try{
            let starlog = res[0].starlog;
            let timezone = res[0].timezone;
            let check = message.guild.channels.get(starlog);
            if(check){
                var img = "";
                if(checkmsg.attachments.size > 0){
                    img = checkmsg.attachments.array()[0].url || '';
                }
                let embedFast = new Discord.RichEmbed()
                .setAuthor('Starboard Appeared')
                .setColor(color.set('orange'))
                .setDescription(checkmsg.content)
                .setImage(img)
                .setFooter(`react ⭐ | 10 seconds from now`);

                message.channel.send(embedFast).then(async(messaged) =>{
                    messaged.react('⭐');
                    const filter = (react, user) => react.emoji.name == '⭐' && user.id == message.author.id;
                    const collector = messaged.createReactionCollector(filter, {time: 10000});
                    collector.on('collect', reacted =>{
                        db.collection('Starboard').find({gid: message.guild.id}).toArray((err,res) =>{
                            messaged.delete();
                            message.channel.send(':ballot_box_with_check: Starboard has been posted!');
                            let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                            let saving = {
                                'case': parseInt(res.length, 10)+1,
                                'aid': checkmsg.author.id,
                                'atag': checkmsg.author.tag,
                                'time': log_time_year,
                                'msgid': checkmsg.id,
                                'cid': checkmsg.channel.id,
                                'gid': checkmsg.guild.id,
                                'guild': checkmsg.guild.name
                            }                    
                            db.collection('Starboard').insertOne(saving).then(() =>{
                                let data = `⭐ **${parseInt(res.length, 10)+1}** | **${checkmsg.author.tag}**'s message in **#${checkmsg.channel.name}** (ID: ${checkmsg.id})`;
                                let embed = new Discord.RichEmbed()
                                .setColor(color.set('orange'))
                                .setAuthor('Message Content')
                                .setDescription(checkmsg.content)
                                .setTimestamp()
                                .setImage(img)
                                .addField(`Original`, `[Click Here](https://discordapp.com/channels/${checkmsg.guild.id}/${checkmsg.channel.id}/${checkmsg.id})`);
        
                                check.send(data, embed);
                            });
                        });
                    });
                    collector.on('end', collected =>{
                        messaged.delete().catch(() => { });
                        if(collected.size > 0) return;
                        if(collected.size <= 0) return message.channel.send(`:timer: Time's up! No reaction is given`);
                    });
                }).catch(function () {

                });
            }
            else{
                return message.channel.send(':no_entry: Missing data: \`Star-Log\`');
            }
        }catch(e){
            console.log(e);
        }
    });
}
module.exports.help = {
	name:"fav"
}