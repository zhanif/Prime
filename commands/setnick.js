module.exports.run = async (bot, message, args, db) => {
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.send(":no_entry: Missing permission: \`Manage Nicknames\`");
    let userGet = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!userGet) return message.channel.send(`:no_entry: Missing arguments: \`Mention User\``);
    if(userGet.hasPermission('ADMINISTRATOR')) return message.send(":no_entry: Ignored permission: \`Administrator\`");
    if(userGet.hasPermission('MANAGE_NICKNAMES')) return message.send(":no_entry: Ignored permission: \`Manage Nicknames\`");
    let nick = args.join(" ").slice(userGet.id.length) || "";

    try{
      message.guild.members.get(userGet.id).setNickname(nick);
      message.channel.send(`:ballot_box_with_check: Successfully changed the **${userGet.user.tag}**'s nickname`);
    }catch(e){
      message.channel.send(`:no_entry: Missing bot permission`)
    }
}

module.exports.help = {
  name: "setnick"
}