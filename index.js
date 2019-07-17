/*
    [ PRIME - CORE DATA ]
        
        Author          : Zan#0610
        Date Created    : Tue, 07-05-2019
        Framework       : Node.js
        Language        : Javascript
        Lifetime        : 550 Hours/Month - No Credit
        Storage         : Mongodb Atlas
        Discord Server  : discord.io/primebot
        Support E-mail  : (None)
        GitHub          : (Private)
    [ PRIME - CORE DATA ]
*/

const Discord = require('discord.js');
const fs = require('fs');
require('dotenv/config');

//External modules
const color = require(`./EmbedColor`);
const time = require(`./EventDate`);
const action = require(`./EventLog`);

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
console.log(`\n[>] Getting Database...`);

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DBDEV}:${process.env.DBPASS}@${process.env.DBURL}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err, Mdb)=> {
    console.log(`[>] Retrieving data...`);
    if(!err){
        fs.readdir('./commands', (err,files) => {
            var db = Mdb.db('Prime');
            console.log('[>] Connecting to database...');
            if (err) {
                console.log('[>] Connecting to database failed');
            }
            db.collection('Core').find().toArray((err,res) =>{
                let token = res[0].token;
                let tokenbeta = res[0].tokenbeta;
                let botPrefix = res[0].prefix;
                let botOwner = res[0].otag;
                let botCore = res[0].gid;

                let cmdFiles = files.filter(f => f.split(".").pop() === "js");
                console.log("[>] Executing commands...");
                if (cmdFiles.length === 0){
                    console.log("[>] Executing commands failed");
                    return;
                }
                cmdFiles.forEach((f,i) => {
                    let props = require(`./commands/${f}`);
                    console.log(`${i+1}. Added commands (${f})`);
                    bot.commands.set(props.help.name, props);
                });
                
                bot.on('ready', async() => {
                        let serverSize = bot.guilds.size;
                        bot.user.setStatus("online");
                        bot.user.setActivity(`Type ${botPrefix}help | https://discord.io/primebot`, {type:`watching`});
                        console.log(`\n[INFO] ${bot.user.tag} connected | Version: ${process.env.VERSION} | Last: ${serverSize} server`);
                });

                bot.on('message', async msg => {
                    if(typeof(msg) == undefined) return;
                    try{
                        if(msg.channel.type == "dm" || msg.author.bot || msg.author == bot.user) return;
                        db.collection('Ignore').find({uid: msg.author.id}).toArray((err,res) =>{
                            try{
                                if(res.length > 0) return;
                                else{
                                    db.collection('Data').find({gid:msg.guild.id}).toArray(async(err,res)=>{
                                        try{            
                                            let votechannel = res[0].votechannel ;
                                            let prefix = res[0].prefix ;
                                            let check = bot.guilds.get(msg.guild.id).channels.get(votechannel) ;
                                            if(check){
                                                if(msg.channel.id == check.id){
                                                    await msg.react('✅');
                                                    await msg.react('📝');
                                                    await msg.react('⛔');
                                                    await msg.react('🗑');
                                                } 
                                            }
                                            let msg_array = msg.content.split(" ") ;
                                            let command = msg_array[0];
                                            let args = msg_array.slice(1);
            
                                            if(!command.startsWith(prefix) && !command.startsWith(botPrefix)) return;
                                            else{
                                                if(bot.commands.get(command.slice(prefix.length)) || bot.commands.get(command.slice(botPrefix.length))){
                                                    let runCMD = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(command.slice(botPrefix.length));
            
                                                    if(runCMD){
                                                        runCMD.run(bot,msg,args,db);
                                                    }
                                                    else{
                                                        return;
                                                    }
                                                }
                                            }
                                        }catch(e){
                                            
                                        }
                                        
                                    });
                                }

                            }catch(e){

                            }
                            
                        });
                    }catch(e){
                        console.log(e);
                    }
                });

                bot.on('messageDelete', (msg) =>{
                    if(typeof(msg) == undefined) return;
                    try{
                        if(msg.channel.type =="dm"  || msg.author.bot || msg.author == bot.user) return;
                        db.collection('Data').find({gid: msg.guild.id}).toArray(async function(err, res){
                            try{
                                if(err) return console.log(err);
                                let logged = res[0].messagelog;
                                let timezone = res[0].timezone;
                                if(logged.toString().toUpperCase() != "OFF"){
                                    let check = msg.guild.channels.get(logged);
                                    if(check){
                                        let date = '['+time.get(timezone, 'hour')+ ':'+time.get(timezone, 'minute')+':'+time.get(timezone, 'second  ')+']';
                                        let logger = `\`${date}\` :wastebasket: **${msg.author.tag}** (ID: ${msg.author.id})'s message has been deleted in **#${msg.channel.name}**`;
                                        let embed = new Discord.RichEmbed()
                                        .setColor(color.set("red"))
                                        .setDescription(msg.content);
                                        check.send(logger, embed);
                                    }
                                }
                                }catch(e){

                                }
                        });
                    }catch(e){
                        console.log(e);
                    }
                });
            
                bot.on('messageDeleteBulk', (msg)=>{
                    if(typeof(msg) == undefined) return;
                    try{
                    let themsg = msg.first();
                    var i = 0;
                    msg.forEach(e=>{
                        i++;
                    });
                    if(i ==1) return;
                    db.collection('Data').find({gid: themsg.guild.id}).toArray(function(err, res){
                        try{

                        if(err) return console.log(err);
                        let logged = res[0].messagelog;
                        let timezone = res[0].timezone;
                            if(logged.toString().toUpperCase() != "OFF"){
                                let check = themsg.guild.channels.get(logged);
                                if(check){
                                    let date = '['+time.get(timezone, 'hour')+ ':'+time.get(timezone, 'minute')+':'+time.get(timezone, 'second')+']';     
                                    let mesg = `\`${date}\` :put_litter_in_its_place: **${i}** message were deleted from **#${themsg.channel.name}**`;
                                    check.send(mesg);
                                }
                            }
                        }catch(e){

                        }
                        
                        });
                    }catch(e){
                        console.log(e);
                    }            
                });

                bot.on('messageUpdate', (oldmsg, newmsg)=>{
                    if(typeof(oldmsg == undefined) && typeof(newmsg) == undefined) return;
                    try{
                        if(oldmsg.author.bot && newmsg.author.bot) return;
                        if(newmsg.channel.type =="dm" && oldmsg.channel.type == "dm") return;
                        db.collection('Data').find({gid: newmsg.guild.id}).toArray((err, res) =>{
                            try{
                            if(err) return console.log(err);
                            let logged = res[0].messagelog;
                            let timezone = res[0].timezone;
                            try{
                                let check = newmsg.guild.channels.get(logged);
                                if(check){
                                    let date = '['+time.get(timezone, 'hour')+ ':'+time.get(timezone, 'minute')+':'+time.get(timezone, 'second')+']';
                                    let mesg = `\`${date}\` :page_facing_up: **${oldmsg.member.user.tag}** (ID: ${oldmsg.member.user.id})'s message has been updated in **#${newmsg.channel.name}**`;
                                    let embed = new Discord.RichEmbed()
                                    .setColor(color.set('blue'))
                                    .addField(`Before`, oldmsg.content, true)
                                    .addField('After', newmsg.content, true);
                                    check.send(mesg, embed);
                                }
                            }catch(e){
                                console.log(e);
                            }
                            }catch(e){
                                
                            }
                            
                        });
                    }catch(e){
                        return;
                    }
                });

                bot.on('guildMemberAdd', (member) =>{
                    if(typeof(member) == undefined) return;
                    try{
                        db.collection('Data').find({gid: member.guild.id}).toArray(function(err, res){
                            try{

                            if(err) return console.log(`[ERROR] `+err);
                            try{
                                let autorole = res[0].autorole;
                                let welcomelog = res[0].welcomelog;
                                let timezone = res[0].timezone;
                                if(autorole.toString().toUpperCase() !="OFF"){
                                    let check = member.guild.roles.get(autorole);
                                    if(check){
                                        member.addRole(check);
                                    }
                                }

                                if(welcomelog.toString().toUpperCase() !="OFF"){
                                    let check = member.guild.channels.get(welcomelog);
                                    if(check){
                                        let date = '('+time.get(timezone, 'day')+ '/'+time.get(timezone, 'month')+'/'+time.get(timezone, 'year')+')';
                                        let cardEmbed = new Discord.RichEmbed()
                                        .setAuthor(`Welcome | ${member.user.tag}`)
                                        .setColor(color.set('green'))
                                        .setFooter(member.user.id, member.user.avatarURL)
                                        .setDescription(`**${member.user.tag}** has joined to this server on ${date} (**${member.guild.memberCount}** members here)`);

                                        check.send(cardEmbed);
                                    }
                                }
                            }catch(e){
                            }
                            }catch(e){
                                
                            }
                            
                        });
                    }catch(e){
                        return;
                    }
                });
                
                bot.on('guildMemberRemove', (member) =>{
                    if(typeof(member) == undefined) return;
                    try{
                        if(member.user.bot && (member.user.id == bot.user.id)) return;
                        db.collection('Data').find({gid: member.guild.id}).toArray(async(err, res) =>{
                            try{
                            
                            let welcomelog = res[0].welcomelog;
                            let modlog = res[0].modlog;
                            let timezone = res[0].timezone;
                            let check = member.guild.channels.get(welcomelog);
                            let check2 = member.guild.channels.get(modlog);
                            if(check){
                                let date = `(${time.get(timezone, "day")}/${time.get(timezone, "month")}/${time.get(timezone, "year")})`;
                                let cardEmbed = new Discord.RichEmbed()
                                .setAuthor(`Leave | ${member.user.tag}`)
                                .setColor(color.set('red'))
                                .setFooter(member.user.id, member.user.avatarURL)
                                .setDescription(`**${member.user.tag}** has left from this server on ${date} (**${member.guild.memberCount}** members here)`);
                                check.send(cardEmbed);
                            }
                            if(check2){
                                db.collection('Audit').find({gid: member.guild.id}).toArray(async(err,res)=>{
                                    try{
                                    
                                    let log_number = parseInt(res.length, 10)+1 || 0;
                                    let log_time_day = `[${time.get(timezone, 'hour')}:${time.get(timezone, 'minute')}:${time.get(timezone, 'second')}]`;
                                    let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                                    let entry = await member.guild.fetchAuditLogs({type: "MEMBER_KICK"}).then(audit => audit.entries.first());
                                    if((entry.executor.id != entry.target.id) && (entry.createdTimestamp > Date.now() - 5000)){
                                        let action_trigger = entry.executor.tag;
                                        let action_target = entry.target;
                                        let action_guild = member.guild;
                                        let action_type = "kick";
                                        let action_reason = entry.reason || "[No reason provided]";
                                        if(entry.executor.bot){
                                            if(!entry.reason) return;
                                            action_trigger = entry.reason.split("|")[0];
                                            action_reason = entry.reason.split("|")[1];
                                        }
                                        let action_log = action.log(log_time_day, log_number,action_type, action_trigger, action_target, action_reason);
                                        check2.send(action_log).then(sent =>{
                                            var storing = {
                                                'case' : log_number,
                                                'uid': action_target.id,
                                                'utag': action_target.tag,
                                                'mtag': action_trigger,
                                                'gid': action_guild.id,
                                                'guild': action_guild.name,
                                                'type': action_type,
                                                'msgid': sent.id,
                                                'time': log_time_year,
                                                'reason': action_reason                                                
                                            }

                                            db.collection('Audit').insertOne(storing);
                                        });
                                    }
                                    }catch(e){
                                        
                                    }
                                    
                                });
                            }
                            }catch(e){
                                
                            }
                            
                        });
                    }catch(e){
                        return;
                    }
                });
                
                bot.on('voiceStateUpdate', (olduser, newuser) =>{
                    if(typeof(olduser) == undefined || typeof(newmsg) == undefined) return;
                    try{
                        if(olduser.user.bot || newuser.user.bot) return;
                        db.collection('Data').find({gid: olduser.guild.id}).toArray((err,res) =>{
                            try{
                                
                                let timezone = res[0].timezone;
                                let serverlog = res[0].voicelog;
                                let check = olduser.guild.channels.get(serverlog);
                                if(check){
                                    let date2 = '['+time.get(timezone, 'day')+ ':'+time.get(timezone, 'month')+':'+time.get(timezone, 'year')+']';
                                    let mesg = "";
                                    if(olduser.voiceChannel == undefined && newuser.voiceChannel != undefined){
                                        mesg = `\`${date2}\` :arrow_forward: **${olduser.user.tag}** (ID: ${olduser.user.id}) has joined the voice channel **${newuser.voiceChannel.name}**`;
                                    }
                                    else if(olduser.voiceChannel != undefined && newuser.voiceChannel == undefined){
                                        mesg = `\`${date2}\` :pause_button: **${newuser.user.tag}** (ID: ${newuser.user.id}) has left the voice channel **${olduser.voiceChannel.name}**`;
                                    }
                                    else if(olduser.voiceChannel != undefined && newuser.voiceChannel != undefined){
                                        mesg = `\`${date2}\` :arrows_counterclockwise: **${newuser.user.tag}** (ID: ${newuser.user.id}) has moved voice channel or state from **${olduser.voiceChannel.name}** to **${newuser.voiceChannel.name}**`;
                                    }
                                    check.send(mesg);
                                }

                            }catch(e){
                                
                            }
                            
                        });
                    }catch(e){
                        return;
                    }
                });
                
                bot.on('guildBanAdd', (guilds)=>{
                    if(typeof(guilds) == undefined) return;
                    try{
                        db.collection('Data').find({gid:guilds.id}).toArray((err,res) =>{
                            try{
                            let setLog = res[0].modlog;
                            let timezone = res[0].timezone;
                            let check = guilds.channels.get(setLog);
                            if(check){
                                db.collection('Audit').find({gid: guilds.id}).toArray(async(err,res) =>{
                                    try{let log_number = parseInt(res.length, 10)+1 || 0;
                                    let log_time_day = `[${time.get(timezone, 'hour')}:${time.get(timezone, 'minute')}:${time.get(timezone, 'second')}]`;
                                    let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                                    let entry = await guilds.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());
                                    if((entry.executor.id != entry.target.id) && (entry.createdTimestamp > Date.now() - 5000)){
                                        let action_trigger = entry.executor.tag;
                                        let action_target = entry.target;
                                        let action_guild = guilds;
                                        let action_type = "ban";
                                        let action_reason = entry.reason || "[No reason provided]";
                                        if(entry.executor.bot){
                                            if(!entry.reason) return;
                                            action_trigger = entry.reason.split("|")[0];
                                            action_reason = entry.reason.split("|")[1];
                                        }
                                        let action_log = action.log(log_time_day, log_number,action_type, action_trigger, action_target, action_reason);
                                        check.send(action_log).then(sent =>{
                                            var storing = {
                                                'case' : log_number,
                                                'uid': action_target.id,
                                                'utag': action_target.tag,
                                                'mtag': action_trigger,
                                                'gid': action_guild.id,
                                                'guild': action_guild.name,
                                                'type': action_type,
                                                'msgid': sent.id,
                                                'time': log_time_year,
                                                'reason': action_reason                                        
                                            }

                                            db.collection('Audit').insertOne(storing);
                                        });
                                    }

                                    }catch(e){
                                        
                                    }
                                    
                                });
                            }

                            }catch(e){
                                
                            }
                            
                        });
                    }catch(e){
                        return;
                    }
                });

                bot.on('guildBanRemove', (guilds, users) =>{
                    if(typeof(guilds) == undefined || typeof(users) == undefined) return;
                    try{
                        if(users.id == bot.user.id) return;
                        db.collection('Data').find({gid:guilds.id}).toArray((err,res) =>{
                            try{
                            let setLog = res[0].modlog;
                            let timezone = res[0].timezone;
                            let check = guilds.channels.get(setLog);
                            if(check){
                                db.collection('Audit').find({gid: guilds.id}).toArray(async(err,res) =>{
                                    try{
                                    let log_number = parseInt(res.length, 10)+1 || 0;
                                    let log_time_day = `[${time.get(timezone, 'hour')}:${time.get(timezone, 'minute')}:${time.get(timezone, 'second')}]`;
                                    let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                                    let entry = await guilds.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());
                                    if((entry.executor.id != entry.target.id) && (entry.createdTimestamp > Date.now() - 5000)){
                                        let action_trigger = entry.executor.tag;
                                        let action_target = entry.target;
                                        let action_guild = guilds;
                                        let action_type = "unban";
                                        let action_reason = entry.reason || "[No reason provided]";
                                        if(entry.executor.bot){
                                            if(!entry.reason) return;
                                            action_trigger = action_reason.split("|")[0];
                                            action_reason = action_reason.split("|")[1];
                                        }
                                        let action_log = action.log(log_time_day, log_number,action_type, action_trigger, action_target, action_reason);
                                        check.send(action_log).then(sent =>{
                                            var storing = {
                                                'case' : log_number,
                                                'uid': action_target.id,
                                                'utag': action_target.tag,
                                                'mtag': action_trigger,
                                                'gid': action_guild.id,
                                                'guild': action_guild.name,
                                                'type': action_type,
                                                'msgid': sent.id,
                                                'time': log_time_year,
                                                'reason': action_reason                                        
                                            }

                                            db.collection('Audit').insertOne(storing);
                                        });
                                    }

                                    }catch(e){
                                        
                                    }
                                    
                                });
                            }

                            }catch(e){
                                
                            }
                            
                        });
                    }catch(e){
                        return;
                    }
                });

                bot.on('guildMemberUpdate', (olduser, newuser) =>{
                    if(typeof(olduser) == undefined || typeof(newuser) == undefined) return;
                    try{
                        if((olduser.user.id == bot.user.id) || (newuser.user.id == bot.user.id)) return;
                        db.collection('Data').find({gid: (olduser.guild.id || newuser.guild.id)}).toArray((err,res) =>{
                            try{
                            let setLog = res[0].modlog;
                            let mutedrole = res[0].mutedrole;
                            let timezone = res[0].timezone;
                            let check_log = olduser.guild.channels.get(setLog);
                            if(check_log){
                                let check_role = olduser.guild.roles.get(mutedrole);
                                if(check_role){
                                    if(olduser.roles.has(check_role.id) && !newuser.roles.has(check_role.id)){
                                        db.collection('Audit').find({gid: newuser.guild.id}).toArray(async(err,res) =>{
                                            try{
                                            let log_number = parseInt(res.length)+1;
                                            let log_time_day = `[${time.get(timezone, 'hour')}:${time.get(timezone, 'minute')}:${time.get(timezone, 'second')}]`;
                                            let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                                            let entry = await newuser.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(audit => audit.entries.first());
                                            if((entry.executor.id != entry.target.id) && (entry.createdTimestamp > Date.now() - 5000)){
                                                let action_trigger = entry.executor.tag;
                                                let action_target = entry.target;
                                                let action_guild = newuser.guild;
                                                let action_type = "unmute";
                                                let action_reason = entry.reason || "[No reason provided]";
                                                if(entry.executor.bot){
                                                    if(!entry.reason) return;
                                                    action_trigger = entry.reason.split("|")[0];
                                                    action_reason = entry.reason.split("|")[1];
                                                }
                                                let action_log = action.log(log_time_day, log_number,action_type, action_trigger, action_target, action_reason);
                                                check_log.send(action_log).then(sent =>{
                                                    var storing = {
                                                        'case' : log_number,
                                                        'uid': action_target.id,
                                                        'utag': action_target.tag,
                                                        'mtag': action_trigger,
                                                        'gid': action_guild.id,
                                                        'guild': action_guild.name,
                                                        'type': action_type,
                                                        'msgid': sent.id,
                                                        'time': log_time_year,
                                                        'reason': action_reason
                                                    }
                
                                                    db.collection('Audit').insertOne(storing);
                                                });
                                            }

                                            }catch(e){
                                                
                                            }
                                            
                                        });
                                    }
                                    else if(!olduser.roles.has(check_role.id) && newuser.roles.has(check_role.id)){
                                        db.collection('Audit').find({gid: newuser.guild.id}).toArray(async(err,res) =>{
                                            try{
                                            let log_number = parseInt(res.length)+1;
                                            let log_time_day = `[${time.get(timezone, 'hour')}:${time.get(timezone, 'minute')}:${time.get(timezone, 'second')}]`;
                                            let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                                            let entry = await newuser.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(audit => audit.entries.first());
                                            if((entry.executor.id != entry.target.id) && (entry.createdTimestamp > Date.now() - 5000)){
                                                let action_trigger = entry.executor.tag;
                                                let action_target = entry.target;
                                                let action_guild = olduser.guild;
                                                let action_type = "mute";
                                                let action_reason = entry.reason || "[No reason provided]";
                                                if(entry.executor.bot){
                                                    if(!entry.reason) return;
                                                    action_trigger = entry.reason.split("|")[0];
                                                    action_reason = entry.reason.split("|")[1];
                                                }
                                                let action_log = action.log(log_time_day, log_number,action_type, action_trigger, action_target, action_reason);
                                                check_log.send(action_log).then(sent =>{
                                                    var storing = {
                                                        'case' : log_number,
                                                        'uid': action_target.id,
                                                        'utag': action_target.tag,
                                                        'mtag': action_trigger,
                                                        'gid': action_guild.id,
                                                        'guild': action_guild.name,
                                                        'type': action_type,
                                                        'msgid': sent.id,
                                                        'time': log_time_year,
                                                        'reason': action_reason                                                    
                                                    }
                
                                                    db.collection('Audit').insertOne(storing);
                                                });
                                            }

                                            }catch(e){
                                                
                                            }
                                            
                                        });
                                    }
                                }
                            }

                            }catch(e){
                                
                            }
                            
                        });
                    }catch(e){
                        return;
                    }
                });
                
                /*
                bot.on('messageReactionAdd', async (react) =>{
                    if(typeof(react) == undefined) return;
                    try{
                        if(react.count == 10){
                            db.collection('Data').find({gid: react.message.guild.id}).toArray((err,res) =>{
                                try{
                                let setLog = res[0].starlog;
                                let timezone = res[0].timezone;
                                let check = react.message.guild.channels.get(setLog);
                                if(check){
                                    db.collection('Starboard').find({msgid: react.message.id, gid: react.message.guild.id}).toArray((err,res) =>{
                                        try{
                                        if(res.length > 0){
                                            return;
                                        }else{
                                            let log_time_year = `(${time.get(timezone, 'day')}/${time.get(timezone, 'month')}/${time.get(timezone, 'year')})`;
                                            let embed = new Discord.RichEmbed()
                                            .setAuthor(`${react.message.author.tag}`,)
                                            .setDescription(react.message.content || "[Image/Attachment Url]")
                                            .setColor(color.set("orange"))
                                            .setFooter(react.message.author.id, react.message.author.avatarURL)
                                            .addField(`Original`, `[Click Here](https://discordapp.com/channels/${react.message.guild.id}/${react.message.channel.id}/${react.message.id})`);
                                            let some_text = `:dizzy: \`${log_time_year}\` | ${react.message.channel} (ID: ${react.message.id})`
                                            check.send(some_text,embed).then(sent =>{
                                                let saving = {
                                                    'aid': react.message.author.id,
                                                    'atag': react.message.author.tag,
                                                    'time': log_time_year,
                                                    'msgid': sent.id,
                                                    'cid': react.message.channel.id,
                                                    'gid': react.message.guild.id,
                                                    'guild': react.message.guild.name
                                                }

                                                db.collection('Starboard').insertOne(saving);
                                            });
                                        }

                                        }catch(e){
                                            
                                        }
                                        
                                    });
                                }

                                }catch(e){
                                    
                                }
                                
                            });
                        }
                        else{
                            return;
                        }
                    }catch(e){
                        return;
                    }
                }); 
                */
                bot.on('guildCreate', async gData =>{
                    if(typeof(gData) == undefined) return;
                    try{
                        if(gData.memberCount < 20 && gData.id != botCore){
                            setTimeout(() => {
                                bot.guilds.get(gData.id).leave();                        
                            }, 60000);
                        }
                        else{
                            var serverData = {
                                'gid': gData.id,
                                'gname': gData.name,
                                'gowner': `${gData.owner.user.tag}`,
                                'prefix':'*',
                                'premium': 'no',
                                'autorole':'OFF',
                                'modrole':'OFF',
                                'mutedrole':'OFF',
                                'messagelog':'OFF',
                                'serverlog':'OFF',
                                'starlog':'OFF',
                                'modlog':'OFF',
                                'voicelog':'OFF',
                                'welcomelog':'OFF',
                                'timezone':'Asia/Jakarta',
                                'votechannel':'OFF',
                                'verifychannel': 'OFF',
                                'verifyAttemp': `*verify`,
                                'maxstrike':'5'
                            };
                            db.collection('Data').insertOne(serverData);
                        }   
                    }catch(e){
                        return;
                    }             
                });

                bot.on('guildDelete', async gData =>{
                    if(typeof(gData) == undefined) return;
                    try{
                        var serverID = {gid : gData.id}
                        db.collection('Data').deleteOne(serverID);
                    }catch(e){
                        return;
                    }
                });
                
                bot.login(token);
            });
        });
    }
    else{
        console.log(`[>] Retrieving data failed\n ${err}`);
    }
});