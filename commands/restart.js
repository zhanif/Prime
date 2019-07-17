require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.member.id!=process.env.OWNER) return message.channel.send(`:no_entry: Invalid commands, aborting`);
    message.channel.send(`:red_circle: The bot has been turned off. Restarting`).then(msg =>{
        bot.destroy();
    }).then(()=>{
        db.collection('Core').find().toArray(async(err,res) =>{
            let token = res[0].token;
            await bot.login(process.env.TOKEN);
            await message.channel.send(`:large_blue_circle: The bot has been turned on`);
        });
    });
}

module.exports.help = {
	name:"restart"
}