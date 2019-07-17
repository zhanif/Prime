require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.member.id!=process.env.OWNER) return message.channel.send(`:no_entry: Invalid commands, aborting`);
    message.channel.send(`:red_circle: The bot has been terminated`).then(async ()=>{
        await console.log(`[INFO] ${bot.user.tag} disconnected.`);
        await bot.destroy();
    });
}

module.exports.help = {
	name:"shutdown"
}