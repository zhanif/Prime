module.exports.run = async(bot, message, args, db) =>{
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":no_entry: Invalid permission: \`Manage Roles\`");		
    if(!args[0] || args[1]) return message.channel.send(`:no_entry: Invalid arguments: \`Mention Channel\``);
    let channeled = args[0];
    if(args[0].substring(0,1) == "<"){
        channeled = args[0].substring(2,args[0].length-1);
    }
    let check = message.guild.channels.get(channeled) || message.guild.channels.get(args[0]);
    let isOff = args[0];
    if(isOff.toUpperCase() == "OFF"){
        isOff = "OFF";
    }
    if(!channeled && !check && !isOff ) return message.channel.send(`:no_entry: Invalid arguments: \`Mention Channels\``);
    var idchn;
    if(isOff == "OFF"){
        idchn = "OFF";
    }
    else if(check){
        idchn = check.id;
    }
    let serverID = {gid : message.guild.id};
    let setChannel = {$set : {welcomelog:idchn}};
    db.collection('Data').findOneAndUpdate(serverID, setChannel).catch(err =>{
        if(err) return console.log(err);
    });
    if(idchn!="OFF") return message.channel.send(`:gear: The Welcome-log has been updated to **${check.name}**`);
    if(idchn == "OFF") return message.channel.send(`:gear: The Welcome-log has been turned off`);
}
module.exports.help = {
    name:"welcomelog"
}