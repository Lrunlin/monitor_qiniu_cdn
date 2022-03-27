const nodemailer = require('nodemailer');
const moment = require('moment');
const {
    email
} = require('../qiniu.config');
async function sendEmail(domain) {
    let transporter = nodemailer.createTransport({
        service: "qq",
        port: 587,
        secure: false,
        auth: {
            user: "1974109227@qq.com",
            pass: "liiijyiiayfmebga",
        },
    });
    let content = `
<div>下线域名:${domain}</div>
<div>下线时间:北京时间 ${moment().format('YYYY-MM-DD hh:ss:mm')}</div>
<a href="https://portal.qiniu.com/cdn/overview">前往七牛云</a>
`
    let mailOptions = {
        from: "1974109227@qq.com",
        to: email,
        subject: `七牛云CDN被关闭`,
        html: content,
    };
    try {
        let info = await transporter.sendMail(mailOptions)
        return true
    } catch (error) {
        return false
    }
};
module.exports = email;