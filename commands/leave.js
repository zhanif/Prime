require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.author.id!=process.env.OWNER) return message.channel.send(`:no_entry: Developer Only`);
    let gid = args[0];
    if(!gid) return message.channel.send(`:no_entry: Missing commands, aborting`);
    message.channel.send(`:unlock: **The Ancients** has been retired from **${bot.guilds.get(gid).name}**`);
    try{
        bot.guilds.get(gid).leave();
    }catch(e){
        return message.channel.send(`:no_entry: Error `+e);
    }
}

module.exports.help = {
	name:"leave"
}