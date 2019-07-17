require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.author.id != process.env.OWNER) return;
    let uid = args[0];
    if(uid.substring(0,1) == "<"){
        uid = args[0].substring(2,args[0].length-1);
    }
    if(uid == process.env.OWNER) return message.channel.send(`:no_entry: **The Ancients** can't ignore their path!`)
    db.collection('Ignore').find({uid:uid, case: "unignored"}).toArray(function(err,res){
        if(res.length != 1){
            let reason = args.join(" ").slice(args[0]+1) || "(No reason provided)";
            let ignoreData = {
                "uid":uid,
                "mid": message.author.id,
                "reason": reason
            }
            db.collection('Ignore').insertOne(ignoreData).catch(err =>{
                if(err) return message.channel.send(err);
            });
            message.channel.send(`:recycle: **The Ancients** have ignored user with (ID: ${uid})`);
        }
        else{
            message.channel.send(`:no_entry: User already ignored, aborting`);
        }
    });            
}
module.exports.help = {
	name:"ignore"
}