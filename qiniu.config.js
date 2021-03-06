module.exports = {
    // 申请开发者Key:https://portal.qiniu.com/user/key
    accessKey: '',
    secretKey: '',
    //时间粒度  5min ／ hour ／day
    granularity: '5min',
    domains: [{
        //域名
        domain: 'cdn.blogweb.cn',
        //限制每天多少GB
        limit: 1,
        //范围统计:中国地区、海外(默认返回值，通常情况下不需要填写)
        // range: ['china', 'oversea']
        // range: ['china']
    }],
    //邮箱:系统请求下线域名后会对你所留邮箱发送提示
    email: '353575900@qq.com',
    // 是否每次请求时打印日志（默认:false）
    consoleLog: true,
    // 多长时间检测到一次（ms）,默认1000
    //!不得小于20（七牛云限制qps为100）
    interval: 1000
}