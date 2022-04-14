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
    // 定义常量（存储在localStorage的键）
    const REPLACE_HOST_STORAGE_KEY = "YH_REPLACE_HOST_LIST"
    // 定义数组
    // [{"id": 1, "oldHostVal":"baidu", "newHostVal": "ali", "active": 1}, {"id": 2, "oldHostVal":"sina", "newHostVal": "tencent", "active": 0}]


    // 获取localStorage里面的指定键的数值
    // 对数值进行判断并且转换成jsonObject，一般存储的是array（提前定义好）
    // 遍历数组显示在页面上


    // 初始化时，获取localStorage，对XMLHttpRequest.prototype.open进行替换修改（替换以前的点击操作）
    // 点击只操作localStorage，并重新调用相关方法操作XMLHttpRequest.prototype.open


    const open = XMLHttpRequest.prototype.open;

    window.replaceHost = function () {
        let oldHostVal = document.getElementById("oldHost").value
        let newHostVal = document.getElementById("newHost").value

        window.addReplaceHostRule({"id": 1, "oldHostVal":oldHostVal, "newHostVal": newHostVal, "active": 1})

        window.initReplaceHostRules()
        // XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        //     // url = url.replace("192.172.9.88:8582", "127.0.0.1:8582");
        //     url = url.replace(oldHostVal, newHostVal);
        //     return open.call(this, method, url, ...rest);
        // };
        alert("修改host成功")
    }

    window.initHost = function () {
        // 重置host
        localStorage.setItem(REPLACE_HOST_STORAGE_KEY, JSON.stringify([]))
        XMLHttpRequest.prototype.open = function (method, url, ...rest) {
            return open.call(this, method, url, ...rest);
        };
        alert("重置host成功")
    }

    // 重置host列表
    window.replaceHostList = function(arr) {
        XMLHttpRequest.prototype.open = function (method, url, ...rest) {
            // url = url.replace("192.172.9.88:8582", "127.0.0.1:8582");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].oldHostVal && arr[i].newHostVal && arr[i].active){
                    url = url.replace(arr[i].oldHostVal, arr[i].newHostVal);
                }
            }
            return open.call(this, method, url, ...rest);
        };
    }
    // 添加替换规则
    window.addReplaceHostRule = function(rule) {
        var oldArr = getReplaceHostRuleJson()
        // 后期这里加上去重
        oldArr.push(rule)
        localStorage.setItem(REPLACE_HOST_STORAGE_KEY, JSON.stringify(oldArr))
    }
    // 删除替换规则
    window.delReplaceHostRule = function(id) {
        var oldArr = getReplaceHostRuleJson()
        oldArr = oldArr.filter(obj => obj.id != id)
        localStorage.setItem(REPLACE_HOST_STORAGE_KEY, JSON.stringify(oldArr))
    }
    // 禁用替换规则
    window.disableReplaceHostRule = function(id) {
        var oldArr = getReplaceHostRuleJson()
        for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i].id == id) {
                oldArr[i].active = 0
            }
        }
        localStorage.setItem(REPLACE_HOST_STORAGE_KEY, JSON.stringify(oldArr))
    }
    // 启用替换规则
    window.enableReplaceHostRule = function(id) {
        var oldArr = getReplaceHostRuleJson()
        for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i].id == id) {
                oldArr[i].active = 1
            }
        }
        localStorage.setItem(REPLACE_HOST_STORAGE_KEY, JSON.stringify(oldArr))
    }
    // 更新替换规则
    window.enableReplaceHostRule = function(rule) {
        var oldArr = getReplaceHostRuleJson()
        for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i].id == rule.id) {
                oldArr[i] = rule
                oldArr[i].active = 1
            }
        }
        localStorage.setItem(REPLACE_HOST_STORAGE_KEY, JSON.stringify(oldArr))
    }

    // 获取替换规则json
    function getReplaceHostRuleJson() {
        var rulesJsonStr = localStorage.getItem(REPLACE_HOST_STORAGE_KEY) || "[]"
        return JSON.parse(rulesJsonStr)
    }

    window.initReplaceHostRules = function() {
        var arr = getReplaceHostRuleJson()
        XMLHttpRequest.prototype.open = function (method, url, ...rest) {
            // url = url.replace("192.172.9.88:8582", "127.0.0.1:8582");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].oldHostVal && arr[i].newHostVal && arr[i].active){
                    url = url.replace(arr[i].oldHostVal, arr[i].newHostVal);
                }
            }
            return open.call(this, method, url, ...rest);
        };
    }

    // 测试使用localStorage管理规则json
    window.initReplaceHostRules()



    // 禁用替换规则

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