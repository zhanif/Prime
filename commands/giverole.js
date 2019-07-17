module.exports.run = async (bot, message, args, db) => {
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.send(":no_entry: Missing permission: \`Manage Members\`");
      let rmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!rmember) return message.channel.send(`:no_entry: Missing arguments: \`Mention User\``);
      let role = args.join(" ").slice(22);
      let roleID = args[1];
      if(!role || !roleID) return message.channel.send(`:no_entry: Missing arguments: \`Mention Role\``);
      if(roleID.substring(0,1) == "<"){
        roleID = args[1].substring(3,args[1].length-1);
      }
      let theRole = message.guild.roles.find('name', role) || message.guild.roles.get(roleID);
      if(!theRole) return message.channel.send(`:no_entry: Missing arguments: \`Role not found\``);
  
      if(rmember.roles.has(theRole.id)) return message.channel.send(`:no_entry: Missing permission: \`User has role\``);
      await(rmember.addRole(theRole.id));
  
      message.channel.send(`:ballot_box_with_check: Successfully gave role to **${rmember.user.tag}**`);

}

module.exports.help = {
  name: "giverole"
}