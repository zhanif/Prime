module.exports.run = async(bot, message, args, db) =>{
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: Missing permission: \`Manage Messages\`");		
	let total = args[0];
	if(!total) return message.channel.send(`:no_entry: Missing arguments: \`Total Messages\``);
	if(total.isNaN || total == 0 || total < 0 || total == "") return message.channel.send(`:no_entry: Missing arguments: \`Total Messages\``);
	if(total>99) return message.channel.send(`:no_entry: Missing arguments: \`Message shouldn't more than 99\``);
	let getlimit = parseInt(total, 10);
	getlimit = getlimit;
	await message.channel.fetchMessages({limit: getlimit}).then(fetched=>{
		message.channel.bulkDelete(fetched, true).then( result=>{
			message.channel.send(`:wastebasket: Cleaned \`${result.size}\` message(s). Note: message more than 14 days can't be deleted`).then(msg => msg.delete(5000));
		});
	});
}
module.exports.help = {
	name:"clean"
}