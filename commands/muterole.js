module.exports.run = async(bot, message, args, db) =>{
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":no_entry: Invalid permission: \`Manage Roles\`");	
    if(!args[0] || args[1]) return message.channel.send(`:no_entry: Invalid arguments: \`Mention Role\``);
    let role = args[0];
    if(args[0].substring(0,1) == "<"){
        role = args[0].substring(3,args[0].length-1);
    }
    let check = message.guild.roles.get(role) || message.guild.roles.get(args[0]);
    let isOff = args[0];
    if(isOff.toUpperCase() == "OFF"){
        isOff = "OFF";
    }
    if(!role && !check && !isOff ) return message.channel.send(`:no_entry: Invalid arguments: \`Mention Role\``);
    var idrole;
    if(isOff == "OFF"){
        idrole = "OFF";
    }
    else if(check){
        idrole = check.id;
    }
    let serverID = {gid : message.guild.id};
    let setMuterole = {$set : {mutedrole:idrole}};
    db.collection('Data').findOneAndUpdate(serverID, setMuterole).catch(err =>{
        if(err) return console.log(err);
    });
    if(idrole!="OFF") return message.channel.send(`:gear: The Muted-role has been updated to **${check.name}**`);
    if(idrole == "OFF") return message.channel.send(`:gear: The Muted-role has been turned off`);
}
module.exports.help = {
	name:"mutedrole"
}