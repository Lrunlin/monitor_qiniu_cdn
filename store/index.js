const {
    accessKey,
    secretKey,
} = require('../qiniu.config');
const qiniu = require('qiniu');

let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
module.exports = {
    mac
}