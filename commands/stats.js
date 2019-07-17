const Discord = require('discord.js');
// const rcrawl = require('request-promise');
// const cheerio = require('cheerio');
// const filee = require('fs');
require('dotenv');

module.exports.run = async(bot, message, args, db) =>{
    // const option = {
    //     uri : `https://www.growtopiagame.com/detail`,
    //     transform: (body)=>{
    //         return cheerio.load(body);
    //     }
    // };
    // rcrawl(option).then(($) =>{
    //     var data = $('body').text();
    //     var splitted = JSON.parse(data);
        
    //     var online = splitted.online_user;
    //     var wotd = splitted.world_day_images.full_size;
    //     var status = ":up:";
    //     if(online<5){
    //         status = ":sos:";
    //     }
    //     var rawwotd = wotd.split("\/");
    //     var currentWOTD =rawwotd[4].substring(0,rawwotd[4].length-4);
    //     const wotdTrophy = "587070277423464459";
    //     const wotdEmoji = bot.guilds.get(process.env.DISCORDCORE).emojis.get(wotdTrophy);

    //     var date = new Date().toLocaleString("en-US", "America/Port-au-Prince");
    //     date = new Date(date);
    //     var years = date.getYear();
    //     var months = date.getMonth();
    //     var dates = date.getDate();
    //     var seconds = date.getSeconds();
    //     var minutes = date.getMinutes();
    //     var hours = date.getHours();
        
    //     function setZero(n){
    //         var s = n.toString();
    //         if (n.toString().length == 1) {
    //         s = "0" + n;
    //     }
    //         return s;
    //     }
    //     let embed = new Discord.RichEmbed()
    //     .setAuthor(`Growtopia Stats`)
    //     .setColor(`#3f96ec`)
    //     .setDescription(`:clock1: **Growtopia Time (EDT/UTC-5)**: ${setZero(dates)}/${setZero(months)}/${setZero(years)} ${setZero(hours)}:${setZero(minutes)}:${setZero(seconds)}\n:desktop: **Server status**: ${status}\n:bust_in_silhouette: **Online Users**: ${online}\n${wotdEmoji} **WOTD**: **${currentWOTD.toUpperCase()}**`);
    //     message.channel.send(embed);
    // });
    message.channel.send(`:no_entry: Start from the State Update (version 4). We disabled this feature, please check it via \`*version\``);
}
module.exports.help = {
	name:"stats"
}