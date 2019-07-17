require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
	message.channel.send(`ℹ | Current Version: \`${process.env.VERSION}\``);
}
module.exports.help = {
	name:"version"
}