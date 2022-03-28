# monitor_qiniu_cdn

Node.js 应用，防止七牛云 CDN 遭到 CC 攻击，每日访问量到达所设置的警戒线后停用域名，并且可以发送邮件进行提示。

# 启动

1. yarn/npm install 安装依赖
2. yarn start/npm run start 启动

# 参数

在 qiniu.config.js 中填写，里面包含注释以及示范
![参数配置](https://disk.blogweb.cn/open-source/monitor_qiniu_cdn/params.svg "参数配置")
