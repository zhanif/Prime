module.exports.run = async(bot, message, args, db) =>{
	const m = await message.channel.send("Receiving...");
   	m.edit(`:signal_strength: Latency: \`${m.createdTimestamp - message.createdTimestamp}\` ms | API Latency: \`${Math.round(bot.ping)}\` ms`);
}

module.exports.help = {
	name:"ping"
}