module.exports.run = async(bot, message, args, db) =>{
	// if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: Missing permission: \`Manage Messages\`");		
	// let total = args[0];
	// if(!total) return message.channel.send(`:no_entry: Missing arguments: \`Total Messages\``);
	// if(total>99 || total.isNaN || total < 0) return message.channel.send(`:no_entry: Missing arguments: \`Amount starts from 1 to 99\``);
	// let getlimit = parseInt(total, 10);
	// getlimit = getlimit;
	// await message.channel.fetchMessages({limit: getlimit}).then(fetched=>{
	// 	message.channel.bulkDelete(fetched, true).then( result=>{
	// 		message.channel.send(`:wastebasket: Cleaned \`${result.size}\` message(s). Note: message more than 14 days can't be deleted`).then(msg => msg.delete(5000));
	// 	});
	// });

	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:no_entry: Missing permission: \`Manage Messages\``);
	let check = args[0];
	if(!check) return message.channel.send(`:no_entry: Missing arguments: \`User ID or Total Messages\``);
	if(check > 0 || check < 100){
		console.log("a");
		let getLimit = parseInt(check, 10);
		await message.channel.fetchMessages({limit: getLimit}).then((fetched) =>{
			message.channel.bulkDelete(fetched, true).then((result) =>{
				message.channel.send(`:wastebasket: Cleaned \`${result.size}\` message(s). Note: message more than 14 days can't be deleted`).then(msg => msg.delete(5000));
			});
		});
	}
	else if(message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))){
		let userTag = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		let getLimit = args[1];
		if(!userTag || !getLimit) return message.channel.send(`:no_entry: Missing argumets: \`User ID and Total Messages\``);
		if(getLimit > 99 || getLimit < 0) return message.channel.send(`:no_entry: Missing arguments: \`Amount starts from 1 to 99\``);
		await message.channel.fetchMessages({limit: 100}).then(async(resulted) =>{
			if(userTag){
				const filtered = userTag ? userTag.user.id : bot.user.id;
				resulted = resulted.filter(m => m.author.id == filtered).array().slice(0, getLimit);
				await message.channel.bulkDelete(resulted, true).then((result) =>{
					message.channel.send(`:wastebasket: Cleaned \`${result.size}\` message(s) from **${userTag.user.tag}**. Note: message more than 14 days can't be deleted`).then(msg => msg.delete(5000));
				});
			}
		});
	}
	else{
		return message.channel.send(`:no_entry: Missing arguments: \`Amount starts from 1 to 99\``);
	}
}
module.exports.help = {
	name:"clean"
}