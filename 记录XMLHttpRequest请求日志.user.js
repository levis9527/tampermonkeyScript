// ==UserScript==
// @name         记录XMLHttpRequest请求日志
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *://192.172.*.*:*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // 初始化计数器，间隔写入3条记录后换颜色
    let index = 0
    // let initColor = '#F00'
    let flag = false
    // 创建日志记录div
    var body = document.getElementsByTagName('body')[0]

    var logDiv = document.createElement('div')
    logDiv.style.position = 'fixed'
    logDiv.style.top = 0
    logDiv.style.bottom = 0
    logDiv.style.zIndex = 99999999
    logDiv.style.backgroundColor = '#FFF'
    logDiv.style.lineHeight = 2.5
    logDiv.style.wordBreak = 'break-all'
    logDiv.style.overflow = 'scroll'
    logDiv.style.display = 'none'

    body.appendChild(logDiv)
    // 创建写入日志记录的通用方法，写p标签
    function writeLog(logText) {
        var logP = document.createElement('p')
        logP.style.borderBottom = 'solid 1px'
        logP.style.backgroundColor = getColor()
        logP.innerText = logText
        logDiv.appendChild(logP)
    }
    // 获取颜色，间隔3次换一个颜色
    function getColor() {
        if (index > 300) {
            window.clearLog()
        }
        if (index % 3 == 0) {
            flag = !flag
        }
        index ++
        if (flag) {
            return '#fbd7d7'
        } else {
            return '#ddddf7'
        }
        // let colorArr = ['#F00', '#0F0', '#00F']
        // let colorStr = colorArr[index % 3]
        // index ++
        // return colorStr
    }

    window.switchLogDisplay = function() {
        let _display = logDiv.style.display
        if (_display == '') {
            logDiv.style.display = 'none'
        } else {
            logDiv.style.display = ''
        }
    }
    // 清空日志
    window.clearLog = function() {
        logDiv.innerText = ''
        index = 0
    }



    const _open = XMLHttpRequest.prototype.open;
    const _send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        // console.log('url-----', url)
        writeLog(url)
        return _open.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function (requestBody) {
        // console.log('body-----', requestBody)
        writeLog(requestBody)

        let oldCallback = this.onreadystatechange
        let newCallback = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                // console.log('test----------', this.responseText)
                writeLog(this.responseText)
            }
            oldCallback()
        }

        this.onreadystatechange = newCallback
        return _send.call(this, requestBody)
    };





//     var body = document.getElementsByTagName('body')[0]
     var div = document.createElement('div')
     div.innerHTML = '<button onClick="clearLog()">清除</button><button onClick="switchLogDisplay()">显示/隐藏</button>'

     // 加上属性
     div.style.position = 'fixed'
     div.style.top = 0
     div.style.right = 0
     div.style.zIndex = 999999999
     // 添加到body
     body.appendChild(div)


})();