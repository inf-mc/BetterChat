const config = JSON.parse(fs.readFileSync('./Serein/plugins/BetterChat/setting.json'));
const chatContent = new RegExp(config.ChatContent)

//监听服务器消息
serein.setListener('ServerOutput', (server, line) => {
    let id = config.ForwardGroup[server.Id]
    if (id === undefined) {
        return
    }
    if (chatContent.test(line)) {
        const msg = line.replace(chatContent, config.ForwardGroupFormat)
        for (let i = 0; i < id.length; i++) {
            serein.connection.sendMessageAsync(
                TargetType.Group,
                id[i],
                msg
            );
        }
    }
});

//监听群聊消息
serein.setListener('GroupMessageReceived', (messagePacket) => {
    var groupId = messagePacket.oneBotV11.groupId
    var serverID = config.ForwardServer[groupId]
    if (serverID === undefined) {
        return
    }
    var userId = messagePacket.oneBotV11.userId
    var rawMessage = replaceCQ(messagePacket.oneBotV11.rawMessage)
    if (!rawMessage.startsWith(config.Filtersymbol) && rawMessage != config.Filtercontent) {
        let nickname = messagePacket.oneBotV11.Sender.nickname
        let card = messagePacket.oneBotV11.Sender.card
        let text = formatText(groupId, userId, nickname, rawMessage, card)
        console.log(text)
        for (let i = 0; i < serverID.length; i++) {
            let serverstat = serein.servers[serverID[i]].info.stat
            if (serverstat.ServerUp && serverstat.CurrentPlayersInt > 0) {
                try {
                    if (serverstat.Protocol == 0) {
                        serein.servers[serverID[i]].input('tellraw @a {"rawtext":[{"text":' + JSON.stringify(text) + '}]}');
                    } else {
                        serein.servers[serverID[i]].input('tellraw @a {"text":' + JSON.stringify(text) + '}');
                    }
                } catch (err) {
                    console.error(err)
                }
            } else {
                console.warn('发送失败：' + serverID[i] + '不在线或无玩家在线')
            }
        }
    }
});

function replaceCQ(text) {
    if (text.indexOf('CQ') < 0)
        return text;
    else
        return text
            .replace(/\[CQ:at,qq=all\]/g, '@全体成员')
            .replace(/\[CQ:at,.+?name=([^,]+?).+?\]/g, '@$1')
            .replace(/\[CQ:at,qq=(\d+)\]/g, (F, K) => {
                const cachedName = getUserCache(K);
                return cachedName ? `@${cachedName}` : `@${K}`;
            })
            // 添加未处理CQ码的容错
            .replace(/\[CQ:image,summary=.*\]/g, '[动画表情]')
            .replace(/\[CQ:([^,]+?),.+?\]/g, '[CQ:$1]')
            .replace(/\[CQ:[^\]]*\]/g, (match) =>
                config.CQCode[match] || '[未知消息类型]'
            );
}

function formatText(groupId, userId, nickname, rawMessage, card) {
    if (config.EnableGameID) {
        nickname = (getUserCache(userId) ?? card) || nickname
    }
    return (config.Format || '§b[{{title}}]§r{{name}}:{{msg}}')
        .replace('{{title}}', config.GroupName[groupId])
        .replace('{{name}}', nickname)
        .replace('{{msg}}', rawMessage)
}

function getUserCache(userId) {
    return serein.bindings.records.find(x => x.userId == userId)?.gameIds?.[0] ?? null;
}