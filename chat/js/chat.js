/**
 * Created by zz on 2017/5/6.
 */
window.onload = function(){
    //实例并初始化我们的HiChat程序
    var chat = new Chat();
    chat.init();
};
//定义hichat类
var Chat = function(){
  this.socket = null;
};

//向原型添加业务方法
Chat.prototype = {
    init:function(){  //此方法初始化程序
        var that = this;
        //建立服务器连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已建立
        this.socket.on('connect',function(){
            //连接到服务器后，显示昵称输入框
            document.getElementById('info').textContent = '请输入你的昵称';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
        //昵称设置确定按钮
        document.getElementById('loginBtn').addEventListener('click',function(){
            var nickname = document.getElementById('nicknameInput').value;

            //检查昵称输入框是否为空
            if(nickname.trim().length != 0){
                if(nickname.trim().length > 10){
                    alert('用户昵称长度不得超过十个字符！');
                }else{
                    //不为空，发起一个login事件并将输入的昵称发送到服务器
                    that.socket.emit('login',nickname);
                }
            }else{
                //输入框获得焦点
                document.getElementById('nicknameInput').focus();
            }
        },false);//绑定事件的第三个参数，就是控制事件出发顺序是否为事件捕获 true事件捕获，false事件冒泡
        this.socket.on('nickExisted',function(){
            document.getElementById('info').textContent = '该昵称已被占用，请重新填写！';//显示昵称被占用的提示
        });
        this.socket.on('loginSuccess',function(){
            document.title = 'chat | ' + document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display = 'none';//隐藏遮罩层显聊天界面
            document.getElementById('messageInput').focus();//让消息输入框获得焦点
        });
        this.socket.on('system',function(nickname,userCount,type){
           //判断用户是连接还是离开以显示不同的信息
            var msg = nickname + (type === 'login' ? '    进入聊天室' :'   离开聊天室' );
            //var p=document.createElement('p');
            //p.textContent=msg;
            //document.getElementById('historyMsg').appendChild(p);
            //指定系统消息显示为红色
            that._displayNewMsg('system',msg,'red');
            //将在线人数显示到页面顶部
            document.getElementById('status').textContent = userCount + (userCount > 1 ? '   后宫' : 'user')+'在线';
        });

        //emit 发送事件  on 接收事件
        //发送消息
        document.getElementById('sendBtn').addEventListener('click',function(){
            var messageInput = document.getElementById('messageInput'),
                msg=messageInput.value,
                //获取颜色值
                color = document.getElementById('colorStyle').value;
            messageInput.value = "";
            messageInput.focus();
            if(msg.trim().length != 0){
                that.socket.emit('postMsg',msg,color);//把消息发送到服务器
                that._displayNewMsg('me',msg,color);//把自己的消息显示到自己的窗口中
            }
        },false);
        //接收服务器端发送的newMsg事件
        this.socket.on('newMsg',function(user,msg,color){
            that._displayNewMsg(user,msg,color);
        });


        //用户点击图片按钮后，弹出文件选择窗口供用户选择图片。
        // 之后我们可以在JavaScript代码中使用FileReader来将图片读取为base64格式的字符串形式进行发送。
        // 而base64格式的图片直接可以指定为图片的src，这样就可以将图片用img标签显示在页面了。

        // 发送图片
        document.getElementById('sendImage').addEventListener('change',function(){
           //检验是否有文件被选中
            if(this.files.length != 0 ){
                //获取文件并用FileRender读取
                var file = this.files[0],
                    reader = new FileReader();
                if(!reader){
                    that._displayNewMsg('system','!your browser is not support this.value=""');
                    return;
                }
                reader.onload = function(e){
                    //读取成功，并显示到页面并发送到服务器
                    this.value = "";
                    that.socket.emit('img', e.target.result);
                    that._displayImage('me', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },false);
        this.socket.on('newImg',function(user,imgData){
            that._displayImage(user,imgData);
        });

        //添加表情
        this._initialEmoji();
        document.getElementById('emoji').addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            emojiwrapper.style.display = 'block';
            e.stopPropagation();
        }, false);
        document.body.addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            }
        });
        document.getElementById('emojiWrapper').addEventListener('click', function(e) {
            //获取被点击的表情
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
            }
        }, false);
        //添加颜文字
        this._emoticons();
        document.getElementById('emoji-wrap').addEventListener('click',function(e){
            var emoji = document.getElementById('emoji-wraps');
            emoji.style.display = 'block';
            e.stopPropagation();
        },false);
        document.body.addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emoji-wraps');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            }
        });
        document.getElementById('emoji-wraps').addEventListener('click',function(e){
            var e=e.target;
            if(e.nodeName.toLowerCase()=='a'){
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.value = messageInput.value + e.text;
            }
        },false);

        //添加键盘事件
        document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                var nickName = document.getElementById('nicknameInput').value;
                if (nickName.trim().length != 0) {
                    if(nickName.trim().length > 10){
                        alert('用户昵称长度不得超过十个字符！');
                        document.getElementById('nicknameInput').value = '';
                        document.getElementById('nicknameInput').focus();
                    }else{
                        that.socket.emit('login', nickName);
                    }
                }
            }
        }, false);
        document.getElementById('messageInput').addEventListener('keyup', function(e) {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg', msg, color);
                that._displayNewMsg('me', msg, color);
            }
        }, false);
    },
    _displayNewMsg:function(user,msg,color){
        var container=document.getElementById('historyMsg'),
            msgToDisplay=document.createElement('p'),
            date=new Date().toTimeString().substr(0,8),
            //消息中表情转换为图片
            msg=this._showEmoji(msg)
            ;
        msgToDisplay.style.color=color;
        msgToDisplay.innerHTML=user+'<span class="timespan">(' + date + '):</span>' + msg;
        container.appendChild(msgToDisplay);
        container.scrollTop=container.scrollHeight;
    },

    _displayImage:function(user,imgData,color){
        var container=document.getElementById('historyMsg'),
            msgToDisplay=document.createElement('p'),
            date=new Date().toTimeString().substr(0,8);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
        console.log(document.getElementsByTagName('img')[0]);
    },

    //表情
    _initialEmoji: function() {
        var emojiContainer = document.getElementById('emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 7; i > 0; i--) {
            var emojiItem = document.createElement('img');
            emojiItem.src = '../content/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        }
        emojiContainer.appendChild(docFragment);
    },
    _showEmoji: function(msg) {
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
            totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="../content/emoji/' + emojiIndex + '.gif" />');
            }
        }
        return result;
    },
    //颜文字
    _emoticons:function(){
        var emoticons = document.getElementById('emoji-wraps'),
            docFragment = document.createDocumentFragment(),
            emojis=['(⌒▽⌒)','（￣▽￣）','(=・ω・=)','(｀・ω・´)','(〜￣△￣)〜','(･∀･)','(°∀°)','ﾉ(￣3￣)╮','(￣▽￣)','←_←','→_→'];
        for(var i of emojis){
            var context = document.createElement('a');
            context.textContent = i;
            docFragment.appendChild(context);
        }
        emoticons.appendChild(docFragment);
    }

};