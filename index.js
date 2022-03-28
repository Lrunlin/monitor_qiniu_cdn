const qiniu = require('qiniu');
const moment = require('moment');
const close = require('./modules/close');
const {
    mac
} = require('./store/index');
const {
    domains,
    granularity,
    consoleLog,
    interval
} = require('./qiniu.config')

//编写Mac以及创建CDN对象
let cdnManager = new qiniu.cdn.CdnManager(mac);

function getCDNstate() {
    const time = moment().format('YYYY-MM-DD'); //只查询今天
    cdnManager.getFluxData(time, time, granularity || '5min', domains.map(item => item.domain), function (err,
        respBody, respInfo) {
        //防止因为没数据导致报错(如果没有当天的CDN数据就返回)
        if (!Object.keys(respInfo.data.data).length) {
            return false;
        }
        // 收到返回信息，对域名列表进行遍历
        Object.entries(respInfo.data.data).forEach((item, index) => {
            let _domain = item[0]; //当前域名
            let option = domains.find(_d => _d.domain == _domain) //当前域名的配置
            let _dataHub = []; //存储当前域名所有需要被累加统计的数据

            //根据范围判断需要累加的数据
            let _range = option.range;
            if (_range) {
                _range.forEach(_r => {
                    _dataHub = [..._dataHub, ...item[1][_r]]
                })
            } else {
                Object.values(item[1]).forEach(_dh => {
                    _dataHub = [..._dataHub, ..._dh]
                })
            }

            //需要统计的记录
            const count = _dataHub.reduce((total, item) => total += item, 0); //累计流量，单位B
            const networkFlow = count / 1024 / 1024 / 1024; //转为GB

            //对比默认1GB
            let = limit = option.limit || 1;
            if (count > limit * 1024 * 1024 * 1024) {
                close(_domain)
                if (consoleLog) console.log(`关闭域名:${_domain},使用流${networkFlow.toFixed(2)}GB`)
            } else {
                if (consoleLog) console.log(`已用${networkFlow.toFixed(2)}/${limit}GB`);
            };
        })
    });
};


global.timer = setInterval(() => {
    getCDNstate()
}, interval || 1000);