const Discord = require("discord.js");
require('dotenv');
module.exports.run = async(bot, message, args, db) =>{
    // db.collection('Mods').find({uid: message.author.id}).toArray(function(err,result){
    //     if(result.length !=1) return message.channel.send(`:no_entry: Invalid commands, aborting`);
    //     let status = args[0];
    //     if(!status){
    //         let query = {uid: message.author.id};
    //         let setData = {$set : {status: "off"}};
    //         db.collection('Mods').findOneAndUpdate(query, setData).catch(err =>{
    //             if(err) return console.log(err);
    //         });
    //         message.channel.send(`:atom: _Your atoms are suddenly aware of quantum tunneling (Ghost in Shell mod added)_`);
    //     }
    //     else if(status.toUpperCase() == "OFF"){
    //         let query = {uid: message.author.id};
    //         let setData = {$set : {status: "online"}};
    //         db.collection('Mods').findOneAndUpdate(query, setData).catch(err =>{
    //             if(err) return console.log(err);
    //         });
    //         message.channel.send(`:spy: _Your body stop shimmering and returns to normal_`);
    //     }
    //     else{
    //         return message.channel.send(`:no_entry: Invalid arguments, aborting`);
    //     }
    // });

    message.channel.send(`:no_entry: Temporarily disabled for now`);
}

module.exports.help = {
	name:"ghost"
}