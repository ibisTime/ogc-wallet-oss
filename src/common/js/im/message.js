import {isUndefined, getUserName, getUserId} from '../util';

const selType = webim.SESSION_TYPE.GROUP;
const subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
const businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;

// 向上翻页，获取更早的群历史消息
export const getPreGroupHistoryMsgs = function (selToID, nextMsgSeq) {
    return new Promise((resolve, reject) => {
        if (!nextMsgSeq || nextMsgSeq <= 0) {
            webim.Log.warn('该群没有历史消息可拉取了');
            resolve([[], -1]);
            return;
        }
        // 拉取最新的群历史消息
        let options = {
            'GroupId': selToID,
            'ReqMsgSeq': nextMsgSeq,
            'ReqMsgNumber': 10
        };
        webim.syncGroupMsgs(
            options,
            function (msgList) {
                console.log('11111');
                console.log(msgList);
                // for (let i = 0; i < msgList.length; i++) {
                //     let pp = msgList[i].elems;
                //     msgList.push(pp);
                // }
                // let pp = msgList.sess;
                // let dd = pp[0].impl;
                // let aa = dd.msgs;
                // msgList.elems.content.text = cc;
                if (!msgList.length) {
                    webim.Log.error('该群没有历史消息了:options=' + JSON.stringify(options));
                    resolve([[], -1]);
                    return;
                }
                resolve([msgList, msgList[0].seq - 1]);
            },
            function (err) {
                reject(err.ErrorInfo);
            }
        );
    });
};

// 获取最新的群历史消息,用于切换群组聊天时，重新拉取群组的聊天消息
export const getLastGroupHistoryMsgs = function (selToID) {
    return new Promise((resolve, reject) => {
        getGroupInfo(selToID, function (resp) {
            let nextMsgSeq = resp.GroupInfo[0].NextMsgSeq - 1;
            if (!nextMsgSeq || nextMsgSeq <= 0) {
                webim.Log.warn('该群还没有历史消息');
                resolve([[], -1]);
                return;
            }
            // 清空会话
            webim.MsgStore.delSessByTypeId(selType, selToID);
            getPreGroupHistoryMsgs(selToID, nextMsgSeq).then(function ([list, msgSeq]) {
                resolve([list, msgSeq]);
            }).catch(function (errorInfo) {
                reject(errorInfo);
            });
        }, function (errorInfo) {
            reject(errorInfo);
        });
    });
};

export const addMsg = function (msg, userMap) {
    let fromAccountNick;
    let fromAccountImage = '';
    let _subType = msg.getSubType();
    // 获取会话类型，目前只支持群聊
    // webim.SESSION_TYPE.GROUP-群聊，
    // webim.SESSION_TYPE.C2C-私聊，
    let sessType = msg.getSession().type();
    let isSelfSend = msg.getIsSend(); // 消息是否为自己发的
    let fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        return;
    }
    if (isSelfSend) { // 如果是自己发的消息
        fromAccountNick = getUserName();
    } else { // 如果别人发的消息
        var info = userMap[fromAccount];
        if (info) {
            if (info.nickname) {
                fromAccountNick = info.nickname;
            } else if (msg.getFromAccountNick()) {
                fromAccountNick = msg.getFromAccountNick();
            } else {
                fromAccountNick = fromAccount;
            }
            // 获取头像
            if (info.photo) {
                fromAccountImage = info.photo;
            } else if (msg.fromAccountHeadurl) {
                fromAccountImage = msg.fromAccountHeadurl;
            }
        }
    }
    // 解析消息
    // 获取消息子类型
    // 会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    let content = '';
    switch (_subType) {
        case webim.GROUP_MSG_SUB_TYPE.COMMON: // 群普通消息
            content = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP: // 群提示消息
            return null;
    }
    return {
        isSelfSend,
        content,
        fromAccountImage,
        fromAccountNick,
        fromAccount,
        msgTime: webim.Tool.formatTimeStamp(msg.getTime())
    };
};
export const checkSendMsg = function (selToID, msgContent) {
    if (!selToID) {
        alert('你还没有选中好友或者群组，暂不能聊天');
        return false;
    }
    let msgLen = webim.Tool.getStrBytes(msgContent);
    if (msgContent.length < 1) {
        alert('发送的消息不能为空!');
        return false;
    }
    let maxLen = webim.MSG_MAX_LENGTH.GROUP;
    let errInfo = '消息长度超出限制(最多' + Math.round(maxLen / 3) + '汉字)';
    if (msgLen > maxLen) {
        alert(errInfo);
        return false;
    }
    return true;
};
export const createMsg = function (selToID, msgContent) {
    var selSess = webim.MsgStore.sessByTypeId(selType, selToID);
    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, '', Math.round(new Date().getTime() / 1000));
    }
    var isSend = true; // 是否为自己发送
    var seq = -1; // 消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296); // 消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000); // 消息时间戳
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, getUserId(), subType, getUserName());
    var textObj, faceObj, tmsg, emotionIndex, emotion, restMsgIndex;
    // 解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgContent.match(expr);
    if (!emotions || emotions.length < 1) {
        textObj = new webim.Msg.Elem.Text(msgContent);
        msg.addText(textObj);
    } else {
        for (var i = 0; i < emotions.length; i++) {
            tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
            if (tmsg) {
                textObj = new webim.Msg.Elem.Text(tmsg);
                msg.addText(textObj);
            }
            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
            emotion = webim.Emotions[emotionIndex];

            if (emotion) {
                faceObj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                msg.addFace(faceObj);
            } else {
                textObj = new webim.Msg.Elem.Text(emotions[i]);
                msg.addText(textObj);
            }
            restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
            msgContent = msgContent.substring(restMsgIndex);
        }
        if (msgContent) {
            textObj = new webim.Msg.Elem.Text(msgContent);
            msg.addText(textObj);
        }
    }
    msg.sending = 1;
    msg.originContent = msgContent;

    return msg;
};
// 发送消息(文本或者表情)
export const onSendMsg = function (selToID, msg) {
    return new Promise((resolve, reject) => {
        // 发消息处理
        handleMsgSend(selToID, msg, resolve, reject);
    });
};
// 选择图片触发事件
export const fileOnChange = function (uploadFile) {
    return new Promise((resolve, reject) => {
        var file = uploadFile.files[0];
        let fileSize = file.size;
        // 先检查图片类型和大小
        if (!checkPic(uploadFile, fileSize)) {
            reject();
            return;
        }
        // 预览图片
        let reader = new FileReader();
        reader.onload = (function (file) {
            return function (e) {
                resolve([this.result, file.name]);
            };
        })(file);
        // 预览图片
        reader.readAsDataURL(file);
    });
};
// 上传图片
export const uploadPic = function (selToID, file, onProgressCallBack) {
    return new Promise((resolve, reject) => {
        // 封装上传图片请求
        let opt = {
            'file': file, // 图片对象
            'onProgressCallBack': onProgressCallBack, // 上传图片进度条回调函数
            'To_Account': selToID, // 接收者
            'businessType': businessType // 业务类型
        };
        // 上传图片
        webim.uploadPic(opt,
            function (resp) {
                // 上传成功发送图片
                sendPic(selToID, resp, file.name);
                resolve();
            },
            function (err) {
                reject();
                alert(err.ErrorInfo);
            }
        );
    });
};

// 发送图片消息
function sendPic(selToID, images, imgName) {
    if (!selToID) {
        alert('您还没有好友，暂不能聊天');
        return;
    }
    let selSess = webim.MsgStore.sessByTypeId(selType, selToID);
    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, '', Math.round(new Date().getTime() / 1000));
    }
    let msg = new webim.Msg(selSess, true, -1, -1, -1, getUserId(), 0, getUserName());
    let imagesObj = new webim.Msg.Elem.Images(images.File_UUID, imgName.split('.')[1]);
    for (let i in images.URL_INFO) {
        let img = images.URL_INFO[i];
        let newImg;
        let type;
        switch (img.PIC_TYPE) {
            case 1: // 原图
                type = 1; // 原图
                break;
            case 2: // 小图（缩略图）
                type = 3; // 小图
                break;
            case 4: // 大图
                type = 2; // 大图
                break;
        }
        newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
        imagesObj.addImage(newImg);
    }
    msg.addImage(imagesObj);
    // 调用发送图片消息接口
    webim.sendMsg(msg, function (resp) {
    }, function (err) {
        alert(err.ErrorInfo);
    });
}

// 检查文件类型和大小
function checkPic(obj, fileSize) {
    let picExts = 'jpg|jpeg|png|bmp|gif|webp';
    let photoExt = obj.value.substr(obj.value.lastIndexOf('.') + 1).toLowerCase(); // 获得文件后缀名
    let pos = picExts.indexOf(photoExt);
    if (pos < 0) {
        alert('您选中的文件不是图片，请重新选择');
        return false;
    }
    fileSize = Math.round(fileSize / 1024 * 100) / 100; // 单位为KB
    if (fileSize > 30 * 1024) {
        alert('您选择的图片大小超过限制(最大为30M)，请重新选择');
        return false;
    }
    return true;
}

// 上传文件进度条回调函数
// loadedSize-已上传字节数
// totalSize-文件总字节数
// function onFileProgressCallBack(loadedSize, totalSize) {
//   let progress = document.getElementById('upd_file_progress'); // 上传文件进度条
//   progress.value = (loadedSize / totalSize) * 100;
// }
// 发消息处理
function handleMsgSend(selToID, msg, resolve, reject) {
    webim.sendMsg(msg, function (resp) {
        resolve();
        webim.Tool.setCookie('tmpmsg_' + selToID, '', 0);
    }, function (err) {
        reject(err.ErrorInfo);
    });
}

// 把消息转换成Html
function convertMsgtoHtml(msg) {
    let elems = msg.getElems(); // 获取消息包含的元素数组
    let count = elems.length;
    let isSelfSend = msg.getIsSend();
    console.log(isSelfSend);
    let msgArr = [];
    for (let i = 0; i < count; i++) {
        let elem = elems[i];
        let type = elem.getType(); // 获取元素类型
        let content = elem.getContent(); // 获取元素对象
        let msgObj = {};
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                if (!isSelfSend) {
                    let aa = content.text;
                    let result = aa.replace('WE_B:', '');
                    content.text = result;
                };
                let eleHtml = convertTextMsgToHtml(content);
                // 转义，防XSS
                msgObj.textContent = webim.Tool.formatText2Html(eleHtml);
                msgObj.type = 'text';
                break;
            case webim.MSG_ELEMENT_TYPE.FACE:
                msgObj.textContent = convertFaceMsgToHtml(content);
                msgObj.type = 'face';
                break;
            case webim.MSG_ELEMENT_TYPE.IMAGE:
                msgObj.type = 'image';
                if (i <= count - 2) {
                    let customMsgElem = elems[i + 1]; // 获取保存图片名称的自定义消息elem
                    let imgName = customMsgElem.getContent().getData(); // 业务可以自定义保存字段，demo中采用data字段保存图片文件名
                    msgObj.textContent = convertImageMsgToHtml(content, imgName);
                    i++; // 下标向后移一位
                } else {
                    msgObj.textContent = convertImageMsgToHtml(content);
                }
                break;
            default:
                webim.Log.error('未知消息元素类型: elemType=' + type);
                break;
        }
        msgArr.push(msgObj);
    }
    return msgArr;
}
// function removeChars (source, chars) {
//     var reg = new RegExp(chars, 'WEB');
//     var result = source.replace(reg, '');
//     return result;
// }
// 解析文本消息元素
function convertTextMsgToHtml(content) {
    // let aa = content.text;
    // let result = aa.replace('WE_B:', '');
    // content.text = result;
    return content.getText();
}

// 解析表情消息元素
function convertFaceMsgToHtml(content) {
    let faceUrl = null;
    let data = content.getData();
    let index = webim.EmotionDataIndexs[data];

    let emotion = webim.Emotions[index];
    if (emotion && emotion[1]) {
        faceUrl = emotion[1];
    }
    return faceUrl || data;
}

// 解析图片消息元素
function convertImageMsgToHtml(content, imageName) {
    let smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); // 小图
    let bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); // 大图
    let oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); // 原图
    if (!bigImage) {
        bigImage = smallImage;
    }
    if (!oriImage) {
        oriImage = smallImage;
    }
    return {
        name: imageName,
        imgUrl: smallImage.getUrl() + '#' + bigImage.getUrl() + '#' + oriImage.getUrl(),
        bigImgUrl: bigImage.getUrl()
    };
}

// 读取群组基本资料-高级接口
function getGroupInfo(groupId, cbOK, cbErr) {
    var options = {
        'GroupIdList': [
            groupId
        ],
        'GroupBaseInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption',
            'ShutUpAllMember'
        ],
        'MemberInfoFilter': [
            'Account',
            'Role',
            'JoinTime',
            'LastSendMsgTime',
            'ShutUpUntil'
        ]
    };
    webim.getGroupInfo(
        options,
        function (resp) {
            if (resp.GroupInfo[0].ShutUpAllMember === 'On') {
                alert('该群组已开启全局禁言');
            }
            if (cbOK) {
                cbOK(resp);
            }
        },
        function (err) {
            alert(err.ErrorInfo);
        }
    );
};
