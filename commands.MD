## 🍁 | _**Command List**_

#### Note the angle bracket `<>` is required parameter and the square bracket `[]` is optional parameter.
---
### 🛡 Moderation
| Commands | Description |
| --- | --- |
| `ban <@user/id> [reason]` | ban user from server or ban user before join the server|
| `check <@user/id>`| Display all penalties that have been received by the user|
| `kick <@user/id> [reason]` | kick user from the server |
| `mute <@user/id> [reason]` | mute the user, making them unable to speak or send messages|
| `warn <@user/id> [reason]`| give a warning to the user, the action is recorded even though the DM is blocked|
| `unban <id> [reason]`| unban user from server by id |
| `unmute <@user/id> [reason]`| unmute user, making them able to speak or send messages again |
| `unwarn <@user/id> [reason]` | delete warnings that have been received, even though DM messages cannot be deleted |

### 🗺 Activity
| Commands | Description |
| --- | --- |
| `votechannel <#channel/id>` | set the channel to be reacted by 4 reactions [✅,📝,❌,🗑] |

### 📜 Log Recorder
| Commands | Description |
| --- | --- |
| `messagelog <#channel/id/OFF>` | set the channel for logging message activity |
| `modlog <#channel/id/OFF>` | set the channel for logging moderator activity |
| `serverlog <#channel/id/OFF>` | set the channel for logging server activity |
| `starlog <#channel/id/OFF>` | set the channel for logging reaction activity |
| `voicelog <#channel/id/OFF>` | set the channel for logging voice activity |
| `welcomelog <#channel/id/OFF>` | set the channel for join or leave activity |

### 📚 Information
| Commands | Description |
| --- | --- |
| `channels` | show all channels in current server |
| `help` | display commands for Prime bot |
| `roles` | show all roles in current server |
| `serverinfo` | show the server information |
| `settings` | show the Prime settings in current server |
| `time` | show the current time |
| `userinfo [@user/id]` | show the user information |

### 🎆 Miscellaneous
| Commands | Description |
| --- | --- |
| `announce <#channel/id/HERE>` | send announcement in specific channel |
| `autorole <@role/id>` | set the autorole that given every member joined server |
| `clean <number(1-99)>` | delete message from channel |
| `delrole <@user/id> <@role/id>` | delete role from someone |
| `giverole <@user/id> <@role/id>` | give role to someone |
| `lock`| lock the current channel, changes the @every1's permission unable to `SEND_MESSAGES`|
| `modrole <@role/id>` | set the moderation role |
| `mutedrole <@role/id>` | set the role that is muted, let user cannot talk or send messages |
| `nick <new nick>` | change the current nickname |
| `prefix <new prefix>` | change the bot prefixes, default prefix can't be seted |
| `random <start(number)> <end(number)>` | generate random number between 2 number |
| `reason <number> <reason>` | change the reason for logged moderation case |
| `rolecolor <hex number>` | change the role color |
| `setnick <@user/id> [new nick]` | change the nick for specific user |
| `timezone <continent/city>` | change the current server timezone (default is **Asia/Jakarta**) |
| `unlock`| clear the @every1's permission to `SEND_MESSAGES`|

### 🎮 Bot Information
| Commands | Description |
| --- | --- |
| `about` | show about bot infomation |
| `invite` | show the bot's invitation link |
| `ping` | check API & Latency of the bot |
| `version` | check bot version |

### 🛠 Developer Only
| Commands | Description |
| --- | --- |
| `botimg <attachment>` | change bot avatar image |
| `botserver` | show all bot's server |
| `botstorage` | show the collection data usage |
| `invis [OFF]` | change status to invisible or turn off invisible mode |
| `ignore <@user/id>` | ignore specific user for talking with bot |
| `restart` | reload commands |
| `rollback <collection name>` | truncate collection by name |
| `shutdown` | shutdown the bot |
| `sleep <time>` | sleep the bot for specific time |
| `unignore <@user/id>` | unignore specific user |

