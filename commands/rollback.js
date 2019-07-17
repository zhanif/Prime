require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.member.id!=process.env.OWNER) return;
    let collection = args[0];
    if(!collection) return message.channel.send(`:no_entry: Missing arguments, aborting`)
    db.collection(collection).find().toArray((err,res) =>{
        if(res.length == 0) return message.channel.send(`:no_entry: Missing collection or nothing stored`);
        db.collection(collection).deleteMany({});
        message.channel.send(`:gear: Database Collection ${collection} has been rolled back`);
    })
}

module.exports.help = {
	name:"rollback"
}