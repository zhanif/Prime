module.exports.run = async(bot, message, args, db) =>{
	if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":no_entry: Ignored permission: \`Kick Members\`");
	let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!user) return message.channel.send(`:no_entry: Missing arguments: \`Mention User\``);
	if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: Ignored permission: \`Administrator\`");
	let reason = args.join(" ").slice(19) || "(No reason provided)";
    user.send(`:warning: You've been kicked from **${message.guild.name}** (Please follow the server rules!)`);
    try{
        user.kick(`${message.author.tag}|${reason}`);
        message.channel.send(`:boot: **The Ancients** have used kick on **${user.user.tag}**!`);
    }catch(e){
        message.channel.send(`:no_entry: Error while kicking`);
    }
}

module.exports.help = {
	name:"kick"
}