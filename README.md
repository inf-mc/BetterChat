 # BetterChat
<img src="https://img.shields.io/badge/version-1.0.1-blue.svg" alt="version">
<img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="license">
<img src="https://img.shields.io/badge/language-JavaScript-orange.svg" 
alt="language">

## 项目介绍
这是一个基于Serein JS引擎开发的插件，适用于Serein 2.1+版本。
## 插件功能
1. 支持多服务器或群聊互相对应
2. 支持自定义匹配触发服务器聊天转发格式
3. 支持自定义转发格式
4. 支持CQ码替换
5. 支持群昵称替换绑定在serein中的玩家ID

## 插件配置
1. 插件配置文件为`setting.json`，放在插件目录下。
2. 插件配置文件格式为JSON，每个配置项的说明如下：
    - `EnableGameID`：是否启用游戏ID匹配，默认值为`false`。
    - `Format`：转发格式，默认值为`{{title}} {{name}}:{{msg}}`。
    - `ChatContent`：匹配触发服务器聊天转发格式，默认值为空。
    - `ForwardGroupFormat`：转发群聊格式，默认值为空。
    - `Filtersymbol`：过滤符号，默认值为空。
    - `Filtercontent`：过滤内容，默认值为空。
    - `ForwardServer`：转发服务器列表，默认值为空。
    - `ForwardGroup`：转发群聊列表，默认值为空。
    - `GroupName`：群聊名称列表，默认值为空。
    - `CQCode`：CQ码替换列表，默认值无需修改。

3. 配置文件示例
    ``` bash
    {
        "EnableGameID": true,
        "Format": "{{title}} {{name}}:{{msg}}",
        "ChatContent": "\\[.*?]:\\s♫\\s(\\<.*\\>\\s)[\\!！](.*)",
        "ForwardGroupFormat": "$1$2",
        "Filtersymbol": "#",
        "Filtercontent": "帮助",
        "ForwardServer": {
            "12345678": [
                "serverID1",
                "serverID2"
            ]
        },
        "ForwardGroup": {
            "serverID1": [
                12345678
            ],
            "serverID2": [
                12345678,
                22345678
            ]
        },
        "GroupName": {
            "12345678": "group1",
            "22345678": "group2"
        },
        "CQCode": {
            "[CQ:face]": "[表情]",
            "[CQ:reply]": "[回复]",
            "[CQ:image]": "[图片]",
            "[CQ:video]": "[视频]",
            "[CQ:record]": "[语音]",
            "[CQ:music]": "[音乐]",
            "[CQ:redbag]": "[红包]",
            "[CQ:forward]": "[合并转发消息]",
            "[CQ:node]": "[合并转发消息]",
            "[CQ:xml]": "[XML卡片]"
        }
    }
    ```

## 插件使用
1. 插件安装完成后，在Serein中启用插件。
2. 插件配置完成后，重启Serein。
3. 插件配置完成后，在Serein中测试插件是否正常工作。

## 插件注意事项
1. 插件配置文件中`ForwardServer`和`ForwardGroup`的配置项需要根据实际情况进行配置。
2. 插件配置文件中`GroupName`的配置项需要根据实际情况进行配置。
3. 插件配置文件中`CQCode`的配置项无需修改。

## 插件贡献者
- [@MioMiko](https://github.com/MioMiko)
- [@lingran7031](https://github.com/lingran7031)

## 鸣谢
|||
| ------------ | -------------- |
|<img src="./resources/serein.png" width="120" alt="logo"> |<img src="./resources/inf-logo-x135.png" alt="logo"> |
|[serein](https://github.com/SereinDev) |[INF](https://github.com/inf-mc) |


## 插件许可证
该插件基于Apache-2.0许可证发布，您可以免费使用、修改和分发本插件的代码。
但是，您必须保留本插件的版权声明和许可证声明。
