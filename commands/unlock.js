module.exports.run = async(bot, message, args, db) =>{
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:no_entry: Missing permission: \`Administrator\``);
    try{
        var msg = await message.channel.send(`Unlocking this channel...`);
        await message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        }).then(() =>{
            msg.edit(':unlock: **The Ancients** have un-locked this channel!');
        });
    }catch(e){
        return message.channel.send(`:unlock: Error: `+e)
    }
}

module.exports.help = {
	name:"unlock"
}