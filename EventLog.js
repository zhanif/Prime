module.exports = {
    log: function(time, logNumber, type, executor, target, reason){
        if(typeof(time) == undefined || typeof(logNumber) == undefined || typeof(executor) == undefined || typeof(type) == undefined || typeof(target) == undefined || typeof(reason) == undefined) return;
        try{
            let emoji = "";
            let message =  "";
            let typeCase = type;
            if(type == "ban"){
                emoji = ":hammer:";
                typeCase = "banned";
            }
            else if(type == "mute"){
                emoji = ":mute:";
                typeCase = "muted";
            }
            else if(type == "kick"){
                emoji = ":boot:";
                typeCase = "kicked";
            }
            else if(type == "report"){
                emoji = ":round_pushpin:";
                typeCase = "reported";
            }
            else if(type == "unban"){
                emoji = ":flag_white:";
                typeCase = "unbanned";
            }
            else if(type == "unmute"){
                emoji = ":loud_sound:";
                typeCase = "unmuted";
            }
            else if(type == "warn"){
                emoji = ":warning:";
                typeCase = "warned";
            }
            if(logNumber!= 0){
                message = `\`${time}\` \`[${logNumber}]\` ${emoji} **${executor}** ${typeCase} **${target.tag}** (ID: ${target.id})`;
            }
            else{
                message = `\`${time}\` ${emoji} **${executor}** ${typeCase} **${target.tag}** (ID: ${target.id})`;
            }
            if(reason){
                message = message+`\n\`[ Reason ]\` ${reason}`;
            }

            return message;
        }catch(e){
            return;
        }
    }
}

/* Using Audit Log
    GUILD_UPDATE
    CHANNEL_CREATE
    CHANNEL_UPDATE
    CHANNEL_DELETE
    CHANNEL_OVERWRITE_CREATE
    CHANNEL_OVERWRITE_UPDATE
    CHANNEL_OVERWRITE_DELETE
    MEMBER_KICK
    MEMBER_PRUNE
    MEMBER_BAN_ADD
    MEMBER_BAN_REMOVE
    MEMBER_UPDATE
    MEMBER_ROLE_UPDATE
    ROLE_CREATE
    ROLE_UPDATE
    ROLE_DELETE
    INVITE_CREATE
    INVITE_UPDATE
    INVITE_DELETE
    WEBHOOK_CREATE
    WEBHOOK_UPDATE
    WEBHOOK_DELETE
    EMOJI_CREATE
    EMOJI_UPDATE
    EMOJI_DELETE
    MESSAGE_DELETE
*/