require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.author.id != process.env.OWNER) return;
    let link = message.attachments.first().url;
    if(!link) return message.channel.send(`:no_entry: Missing arguments: \`Attachment\``);
    bot.user.setAvatar(link);
    message.channel.send(`:ballot_box_with_check: Successfully updated the bot avatar`);
}
module.exports.help = {
    name:"botimg"
}