module.exports.run = async (bot, message, args, db) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.send(":no_entry: Missing permission: \`Manage Members\`");
    let rmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rmember) return message.channel.send(`:no_entry: Missing arguments: \`Mention User\``);
    let role = args.join(" ").slice(22);
    let roleID = args[1];
    if(roleID.substring(0,1) == "<"){
      roleID = args[1].substring(3,args[1].length-1);
    }
    if(!role || !roleID) return message.channel.send(`:no_entry: Missing arguments: \`Mention Role\``);

    let theRole = message.guild.roles.find('name', role) || message.guild.roles.get(roleID);
    if(!theRole) return message.channel.send(`:no_entry: Missing arguments: \`Role not found\``);

    if(rmember.roles.has(theRole.id));
    await(rmember.removeRole(theRole.id));

    message.channel.send(`:ballot_box_with_check: Successfully removed role from **${rmember.user.tag}**`);
    
}

module.exports.help = {
  name: "delrole"
}