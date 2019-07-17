module.exports.run = async(bot, message, args, db) =>{
    var serverID = {gid : message.guild.id}
    let err;
    db.collection('Data').find(serverID).toArray(function(err, result){
        if(err) return console.log(`[ERROR] `+err);
        let timezone = result[0].timezone;
        var date = new Date().toLocaleString("en-US", {timeZone: timezone});
        date = new Date(date);
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hours = date.getHours();
        
        function setZero(n){
            var s = n.toString();
            if (n.toString().length == 1) {
            s = "0" + n;
        }
            return s;
        }
                            
        var timenow = setZero(hours)+ ':'+setZero(minutes)+':'+setZero(seconds);    	
        message.channel.send(`:alarm_clock: Today is \`${timenow}\``);
    });
    if(err){
        console.log(err);
    }
}
module.exports.help = {
	name:"time"
}