require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    let roles = args[0].substring(3,args[0].length-1);
    if(!message.member.hasPermission(`MANAGE_ROLES`) && message.author.id != process.env.OWNER) return message.channel.send(`:no_entry: Invalid permission: \`Manage roles\``);
    let findRole = message.guild.roles.get(roles);
    if(!findRole) return message.channel.send(`:no_entry: Invalid arguments: \`Mention roles\``);
    let color = args[1];
    if(color.length >7 || !color) return message.channel.send(`:no_entry: Invalid arguments: \`Hex color\``);
    if(color.substring(0,1) != "#"){
        color = "#"+color;
    }
    try{
        message.guild.roles.get(findRole.id).setColor(color);
        message.channel.send(`:ballot_box_with_check: Successfully changed the role color for **${findRole.name}**`);
    }catch(e){
        message.channel.send(`:no_entry: Invalid argument: \`Hex format\``+e);
    }
}
module.exports.help = {
	name:"rolecolor"
}