require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.member.id!=process.env.OWNER) return message.channel.send(`:no_entry: Invalid commands, aborting`);
    let time = args[0];
    if(!time || time.isNan || time<0) return message.channel.send(`:no_entry: Invalid commands, aborting`);
    message.channel.send(`:red_circle: The bot has been turned off. Sleeping for ${time} minutes`).then(msg =>{
        bot.destroy();
    }).then(()=>{
        setTimeout(() => {
            db.collection('Core').find().toArray(async(err,res) =>{
                let token = res[0].token;
                  
                await bot.login(token);
                await message.channel.send(`:large_blue_circle: The bot has been turned on`);
            });
        }, time*60*1000);
    });
}

module.exports.help = {
	name:"sleep"
}