// ==UserScript==
// @name         Baidu Yun
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var token_ = null;
    function token() {
        if (!token_) {
            token_ = Array.from(document.querySelectorAll('script:not([src])')).filter(x => x.textContent.includes('bdstoken'))[0].textContent.match(/bdstoken":"(.+?)"/)[1];
        }
        return token_;
    }
    function logid() {
        return btoa(Date.now() + Math.random().toString().slice(2));
    }
    window.dl = function(path, resurl) {
        if (resurl == undefined) {
            resurl = path;
            path = decodeURIComponent(location.hash.match(/path=([^&]+)/)[1]);
        }
        if (!path.endsWith('/')) path += '/';
        var data = `method=add_task&app_id=250528&source_url=${encodeURIComponent(resurl)}&save_path=${encodeURIComponent(path)}`;
        var url = `/rest/2.0/services/cloud_dl?channel=chunlei&web=1&app_id=250528&bdstoken=${token()}&logid=${logid()}&clienttype=0`;
        return fetch(url, { method: 'POST', body: data, credentials: 'include', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
    };
})();
