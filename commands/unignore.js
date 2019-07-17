require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    if(message.author.id != process.env.OWNER) return;
    if(result.length == 1){
        let uid = args[0];
        if(uid.substring(0,1) == "<"){
            uid = args[0].substring(2,args[0].length-1);
        }
        if(res2.length == 1) return message.channel.send(`:no_entry: Can't un-ignore The Ancients!`);
        db.collection('Ignore').find({uid:uid}).toArray(function(err,res){
            if(res.length != 1){
                db.collection('Ignore').deleteOne({uid:uid}).catch(err =>{
                    if(err) return message.channel.send(err);
                });
                
                message.channel.send(`:recycle: **The Ancients** have un-ignored user with (ID: ${uid})`);
            }
            else{
                message.channel.send(`:no_entry: User already un-ignored, aborting`);
            }
        });     
    }
}
module.exports.help = {
	name:"unignore"
}