// ==UserScript==
// @name         修改XMLHttpRequest请求url
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
    const open = XMLHttpRequest.prototype.open;

    window.replaceHost = function () {
        let oldHostVal = document.getElementById("oldHost").value
        let newHostVal = document.getElementById("newHost").value
        XMLHttpRequest.prototype.open = function (method, url, ...rest) {
            // url = url.replace("192.172.9.88:8582", "127.0.0.1:8582");
            url = url.replace(oldHostVal, newHostVal);
            return open.call(this, method, url, ...rest);
        };
        alert("修改host成功")
    }

    window.initHost = function () {
        XMLHttpRequest.prototype.open = function (method, url, ...rest) {
            return open.call(this, method, url, ...rest);
        };
        alert("重置host成功")
    }

    var body = document.getElementsByTagName('body')[0]
    var div = document.createElement('div')
    div.innerHTML = '<input id="oldHost" placeholder="旧host"/><input id="newHost" placeholder="新host"/><button onClick="replaceHost()">替换host</button><button onClick="initHost()">清除</button>'

    // 加上属性
    div.style.position = 'fixed'
    div.style.top = 0
    div.style.zIndex = 9999999
    // 添加到body
    body.appendChild(div)


})();