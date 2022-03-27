const axios = require('axios');
const qiniu = require('qiniu');
const emailFun = require('./email');
const {
    mac
} = require('../store');
const {
    domains,
    email
} = require('../qiniu.config');
global.count = 0;

function close(domain) {
    const AccessToken = qiniu.util.generateAccessToken(mac, `https://api.qiniu.com/domain/${domain}/offline`);
    axios.post(`https://api.qiniu.com/domain/${domain}/offline`, {}, {
        headers: {
            Authorization: AccessToken
        }
    }).then(res => {
        console.log(`停用${domain}`, res.data);
        //如果填写了域名就发送邮件提示
        if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            emailFun(domain)
        }
        //如果关闭的数量等于域名总数就关闭计时器
        global.count++;
        if (global.count == domains.length) {
            clearInterval(timer);
        };
    }).catch(err => {
        close()
    })
};
module.exports = close;