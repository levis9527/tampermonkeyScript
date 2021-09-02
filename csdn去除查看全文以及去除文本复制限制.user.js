// ==UserScript==
// @name         csdn去除查看全文以及去除文本复制限制
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  csdn去除关注可查看，去除查看更多按钮
// @author       levis9527
// @match        https://sample.blog.csdn.net/article/**
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log('执行油猴脚本')
    let article_content = document.getElementById('article_content')
    if (article_content) {
        article_content.style.removeProperty('height');
    }
    let hide_article_pos = document.getElementsByClassName('hide-article-pos')[0];
    if (hide_article_pos) {
        hide_article_pos.remove();
    }
    let reward_box_new = document.getElementsByClassName('reward-box-new')[0];
    if (reward_box_new) {
        reward_box_new.remove();
    }
    // document.getElementById('article_content').style.removeProperty('height');
    // document.getElementsByClassName('hide-article-pos')[0].remove()
    // document.getElementsByClassName('reward-box-new')[0].remove()
    // 去除文本复制限制
    var bodyList = document.getElementsByTagName('pre')
    for (let i = 0; i < bodyList.length; i++) {
        bodyList[i].style.userSelect = "text"
    }
    var codeList = document.getElementsByTagName('code')
    for (let i = 0; i < codeList.length; i++) {
        codeList[i].style.userSelect = "text"
    }
})();