require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
        if(!message.author.id == process.env.OWNER) return;
        let status = args[0];
        if(!status){
            bot.user.setStatus('invisible');
            message.channel.send(`:bust_in_silhouette: _The bot are now ninja, invisible to all_`);
        }
        else if(status.toUpperCase() == "OFF"){
            bot.user.setStatus('online');
            bot.user.setActivity(`Type *help | https://discord.io/primebot`, {type:`watching`});
            message.channel.send(`:robot: _The bot once again visible to mortals_`);
        }
        else{
            return message.channel.send(`:no_entry: Missing arguments, aborting`);
        }
}

module.exports.help = {
	name:"invis"
}