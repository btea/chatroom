### 数据库表的设计

**_用户信息存储表(userList)_**  
| 用户 id(唯一标识) | 用户名(不能重复) | 用户头像 | 用户签名(可选) | 用户性别(可选) | \_id(数据库随机生成的字符串) |...|
|:----------------:|:---------------:|:-------:|:-------------:|:-------------:|:------------------------:|:---:|  
| id | nickname | avatar | sign | gender | \_id | ... |

**_房间信息存储表(roomInfo)_**  
|房间 id(唯一标识)|房主|房间头像|创建时间|公告|背景图片|总人数|成员信息|
|:------------:|:---:|:-----:|:------:|:--:|:----:|:----:|:----:|  
|roomid|id|avatar|time|notice|background|total|infos|

**_用户好友列表(userFriends)_**  
|用户 id|好友 id|好友头像|好友用户名|
|:----:|:---:|:------:|:-------:|  
|id|friendId|avatar|nickanme|

**_好友最后一次通信记录信息(friendLastChat)_**  
| 用户 id | 头像 | 用户名 | 签名 | 聊天内容 | 聊天时间 |  
|:-----:|:-----:|:-----:|:----:|:-------:|:--------:|  
|id|avatar|nickname|sign|content|time|

**_好友聊天记录(chatRecord)_**
| id 组合 | 发送方 | 接收方 | 内容 | 类型 | 发送时间 |
|:-----:|:------:|:------:|:----:|:----:|:-------:|  
|ids| from | to | content | type | time|

> ids 可以由通信双方的 id 从小到大排列组合，不管双方谁进行查询都可以查到

**_操作记录(operationList)_**