require('dotenv')
module.exports.run = async(bot, message, args, db) =>{
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry: Missing permission: \`Ban Members\`");
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(user){
            if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: Ignored user permission: \`Administrator\`");
            if(user.hasPermission("BAN_MEMBERS")||!user.bannable) return message.channel.send(":no_entry: Ignored user permission: \`Ban Members\`");
            user.send(`:warning: You've been banned from **${message.guild.name}** (Please follow the server rules!)`);
        }
        if(!user){
            user = args[0];
            if(args[0].substring(0,1) == "<"){
                user = args[0].substring(2,args[0].length-1);
            }
        }
        if(!args[0]) return message.channel.send(`:no_entry: Missing user`);

        let reason = `${message.author.tag}|`+args.join(" ").slice(args[0].length+1) || `${message.author.tag}|[No reason provided]`;
        try{
            message.guild.ban(user, reason);
            if(message.guild.members.get(user)){
                message.channel.send(`:hammer: **The Ancients** have used ban on **${user.user.tag}**!`);
            }
            else{
                message.channel.send(`:hammer: **The Ancients** have used ban on the user (ID: ${user})`);
            }
        }catch(e){
            message.channel.send(`:no_entry: Console Error: ${e}`);
        }
}

module.exports.help = {
	name:"ban"
}