module.exports.run = async (bot, message, args, db) => {
  if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send(":no_entry: Missing permission: \`Change Nickname\`");
  if(message.author.hasPermission("ADMINISTRATOR")) return message.channel.send(`:no_entry: Missing permission, bot can't set the owner's nickname`);
  let newNick = args.join(" ");
  if(!newNick) return message.channel.send(`:no_entry: Missing arguments: \`Nickname\``);
  try{
    message.guild.members.get(message.author.id).setNickname(newNick);
    message.channel.send(`:ballot_box_with_check: Successfully changed your nickname`);
  }catch(e){
    message.channel.send(`:no_entry: Missing bot permission`);
  }
}

module.exports.help = {
  name: "nick"
}