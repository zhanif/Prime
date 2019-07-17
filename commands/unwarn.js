const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args, db) =>{
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: Invalid permission: \`Manage Messages\`");
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send(`:no_entry: Invalid arguments: \`Mention User\``);
	if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: Ignored permission: \`Administrator\`");
	let reason = args.join(" ").slice(19) || "(No reason provided)";

    try{
        user.send(`:warning: ${reason}`);
        message.delete(1000);
        message.channel.send(`:warning: **The Ancients** have unwarned on **${user.user.tag}**!`);

        
        let date = new Date().toLocaleDateString("en-US", "Asia/Jakarta");
        date = new Date(date);
        var dates = date.getDate();
        var months = date.getMonth()+1;
        var years = date.getFullYear();
        
        function setZero(n){
            var s = n.toString();
            if (n.toString().length == 1) {
            s = "0" + n;
        }
            return s;
        }

        let auditData = {
            "uid":user.id,
            "utag": user.tag,
            "gid":message.guild.id,
            "guild": message.guild.tag,
            "mid":message.author.id,
            "mtag": message.author.tag,
            "case":"unwarn",
            "reason": reason,
            "time": setZero(dates)+"/"+setZero(months)+"/"+setZero(years)
        };
        db.collection('Audit').insertOne(auditData).catch(err =>{
            if(err) return console.log(err);
        });
        
        try{
            db.collection('Data').find({gid:message.guild.id}).toArray(function(err,result){
                if(err) return console.log(err);
                let logged = result[0].modlog;
                let timezone = result[0].timezone;
                try{
                    if(logged.toUpperCase() != "OFF"){
                        let check = message.guild.channels.get(logged);
                        if(check){
                            var date = new Date().toLocaleString("en-US", {timezone});
                            date = new Date(date);
                            var dates = date.getHours();
                            var months = date.getMinutes();
                            var years = date.getSeconds();
                            function setZero(n){
                            var s = n.toString();
                            if (n.toString().length == 1) {
                                    s = "0" + n;
                                    }
                                    return s;
                            }
                            
                            date = '['+setZero(dates)+ ':'+setZero(months)+':'+setZero(years)+']';
                            let msg = `\`${date}\` :bulb: **${message.author.tag}** unwarned **${user.user.tag}** (ID: ${user.id})\n\`[ Reason ]\` ${reason}`;
                            check.send(msg);
                        }
                    }
                }catch(e){
                    console.log(e);
                }
            });
        }catch(e){
            console.log(e);
        }
    }catch(e){
        message.channel.send(`:no_entry: Error while unwarned`);
    }
}

module.exports.help = {
	name:"unwarn"
}