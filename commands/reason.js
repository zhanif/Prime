module.exports.run = async(bot, message, args, db) =>{
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:no_entry: Missing permission: \`Manage Messages\``);
    let reasonUpdate = parseInt(args[0],10);
    if(!reasonUpdate) return message.channel.send(`:no_entry: Missing case`);
    let reasonUp = args.join(" ").slice(args[0].length+1) || "[No reason provided]";

    db.collection('Audit').find({gid: message.guild.id, case: reasonUpdate}).toArray((err,res) =>{
        let check_last  = res.length;
        let msg = res[0].msgid;
        if(reasonUpdate < 0 || reasonUpdate > check_last) return message.channel.send(`:no_entry: Missing case`);
        db.collection('Audit').findOneAndUpdate({gid: message.guild.id, case: reasonUpdate}, {$set:{reason: reasonUp}}).then(() =>{
            db.collection('Data').find({gid: message.guild.id}).toArray((err,res2) =>{
                let reasonChannel = res2[0].modlog;
                let check_channel = message.guild.channels.get(reasonChannel);
                if(check_channel){
                    check_channel.fetchMessages({around: msg, limit: 1}).then(msgs =>{
                        const msged = msgs.first();
                        let content_origin = msged.content;
                        let content_noreason = content_origin.substring(0, content_origin.indexOf(content_origin.slice(content_origin.indexOf("[ Reason ]")+11)));
                        msged.edit(content_noreason+` `+reasonUp);

                        message.channel.send(`:ballot_box_with_check: Successfully updated the case ${reasonUp}`)
                    });
                }
            });
        });
    });
}

module.exports.help = {
	name:"reason"
}