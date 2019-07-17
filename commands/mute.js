module.exports.run = async (bot, message, args, db) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.send(":no_entry: Missing permission: \`Manage Messages\`");
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.send(":no_entry: Missing arguments: \`Mention User\`");
    if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: Ignored permission: \`Administrator\`");
    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: Ignored permission: \`Manage Messages\`");

    let reason = args.join(" ").slice(args[0].length+1) || "[No reason provided]";

    db.collection('Data').find({gid: message.guild.id}).toArray(async(err,res) =>{
        let mutedrole = res[0].mutedrole;
        let check_role = message.guild.roles.get(mutedrole);
        if(!check_role){
            check_role = await message.guild.createRole({
                name : "muted",
                color: "#010101",
                permission: []
            });
            
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(check_role, {
                  SEND_MESSAGES: false,
                  SPEAK: false
                });
            });

            db.collection('Data').findOneAndUpdate({gid: message.guild.id},{$set: {mutedrole: check_role.id}});
        }
        user.send(`:warning: You've been muted from **${message.guild.name}** (Please follow the server rules!)`);
        try{
            db.collection('Data').find({gid:message.guild.id}).toArray(async(err2,res2) =>{
                let mutedrole = res2[0].mutedrole;
                let check_role = message.guild.roles.get(mutedrole);
                if(!check_role) return message.channel.send(`:no_entry: Error while submitting to database, please contact my creator`);
                await(user.addRole(check_role.id, `${message.author.tag}|`+reason));
                message.channel.send(`:mute: **The Ancients** have used duct-tape on **${user.user.tag}**`);
            });
        }catch(e){
            return e;
        }
    });
}

module.exports.help = {
  name: "mute"
}