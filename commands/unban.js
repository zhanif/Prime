module.exports.run = async(bot, message, args, db) =>{
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry: Invalid permission: \`Ban Members\`");
    let uid = args[0];
    if(!uid) return message.channel.send(`:no_entry: Invalid arguments: \`User ID\``);
    if(uid.substring(0,1) == "<"){
        uid = args[0].substring(2,args[0].length-1);
    }
    let reason = args.join(" ").slice(19) || "[No reason provided]";
    try{
        try{
        bot.guilds.get(message.guild.id).unban(uid, `${message.author.tag}|${reason}`);
        }catch(e){
            if(e) return message.channel.send(`:no_entry: Error: unknown unban`);
        }
        message.channel.send(`:flag_white: **The Ancients** have unbanned on member with (ID: ${uid})`);
    }catch(e){
        message.channel.send(`:no_entry: Error while unbanning `+e);
    }
}

module.exports.help = {
	name:"unban"
}