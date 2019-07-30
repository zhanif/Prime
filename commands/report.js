var date = require(`../EventDate`);
var logged = require('../EventLog');
module.exports.run = async (bot, message, args, db) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(user.hasPermission('ADMINISTRATOR')) return message.channel.send(`:no_entry: Ignored user permission: \`Administrator\``);
    if(!user) return message.channel.send(`:no_entry: Missing Arguments: \`@user/id\``);

    let reason = args.join(" ").slice(args[0].length+1);
    if(!reason) return message.channel.send(':no_entry: Missing Arguments: \`Reason\`');
    db.collection('Data').find({gid: message.guild.id}).toArray((err,res) =>{
        try{
            let modlog = res[0].modlog;
            let timezone = res[0].timezone;
            let check = message.guild.channels.get(modlog);
            if(check){
                try {
                    let curdate = `[${date.get(timezone,'hour')}:${date.get(timezone, 'minute')}:${date.get(timezone, 'second')}]`;
                    let reportlog = logged.log(curdate, 0, "report", message.author.tag, user.user, reason);
                    check.send(reportlog).then(() =>{
                        return message.channel.send(`:ballot_box_with_check: Successfuly reported the user!`);
                    })
                } catch (e) {
                    return message.channel.send(e);
                }
            }
        }catch(e){
            return message.channel.send(e);
        }
    });
}

module.exports.help = {
  name: "report"
}