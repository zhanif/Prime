module.exports.run = async(bot, message, args, db) =>{
    let min = args[0];
    let max = args[1];
    if(min.isNaN || max.isNaN || min > max) return message.channel.send(`:no_entry: Invalid arguments: \`Number\``);
    function randomIntFromInterval(min,max){
        let result =  Math.floor(Math.random()*(max-min+1)+min);
        if(result < min){
            result = min;
        }
        else if(result > max){
            result = max;
        }

        return result;
    }

    message.channel.send(`:gem: Result is \`${randomIntFromInterval(min,max)}\``);
}

module.exports.help = {
	name:"random"
}