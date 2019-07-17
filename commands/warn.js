const Discord = require("discord.js");
const time = require('.././EventDate');
const action = require('.././EventLog');
module.exports.run = async(bot, message, args, db) =>{
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: Missing permission: \`Manage Messages\`");
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send(`:no_entry: Missing arguments: \`Mention User\``);
	if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: Ignored permission: \`Administrator\`");
    let reason = args.join(" ").slice(args[0].length+1) || "[No reason provided]";
    message.channel.send(`:warning: **The Ancients** have used warn on **${user.user.tag}**`)
    try{
        user.send(`:warning: You've been warned! \nReason: ${reason}`);
    }catch(e){
        message.channel.send(`:no_entry: Error, user has blocked the DM, but we will store it`);
    }
    db.collection('Data').find({gid: message.guild.id}).toArray((err,res) =>{
        let modlog = res[0].modlog;
        let timezone = res[0].timezone;
        let check = message.guild.channels.get(modlog);
        if(check){
            db.collection('Audit').find({gid: message.guild.id}).toArray((err,res) =>{
                let log_time_day = `[${time.get(timezone, 'hour')}:${time.get(timezone, 'minute')}:${time.get(timezone, 'second')}]`;
                let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                let log_number = parseInt(res.length, 10)+1 || 0;
                let action_trigger = message.author.tag;
                let action_target = user.user;
                let action_guild = message.guild;
                let action_type = "warn";
                let action_reason = reason || "[No reason provided]";
                let action_log = action.log(log_time_day, log_number, action_type, action_trigger, action_target, action_reason);
                check.send(action_log).then(sent =>{
                    var storing = {
                        'case' : log_number,
                        'uid': action_target.id,
                        'utag': action_target.tag,
                        'mtag': action_trigger,
                        'gid': action_guild.id,
                        'guild': action_guild.name,
                        'type': action_type,
                        'msgid': sent.id,
                        'time': log_time_year,
                        'reason': action_reason
                    }

                    db.collection('Audit').insertOne(storing);
                });
            });
        }
    });
}

module.exports.help = {
	name:"warn"
}