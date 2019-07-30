require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.author.id!=process.env.OWNER) return message.channel.send(`:no_entry: Developer Only`);
    message.channel.send(`:red_circle: The bot has been turned off. Restarting`).then(msg =>{
        bot.destroy();
    }).then(()=>{
        db.collection('Core').find().toArray(async(err,res) =>{
            let token = res[0].token;
            await bot.login(token);
            await message.channel.send(`:large_blue_circle: The bot has been turned on`);
        });
    });
}

module.exports.help = {
	name:"restart"
}