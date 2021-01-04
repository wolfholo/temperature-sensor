/* 
 * 该文件用于导出控制器函数，
 * 
 */

/* 引入文件模块，用于搜索控制器 .js 文件 */
const fs = require('fs');

// add url-route in /controllers:

/* 将控制器注册到 router */
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            // console.log(`register URL mapping: GET ${path}`);
        }
        else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            //console.log(`register URL mapping: POST ${path}`);
        }
        else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            // console.log(`register URL mapping: PUT ${path}`);
        }
        else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            // console.log(`register URL mapping: DELETE ${path}`);
        }
        else {
            // console.log(`invalid URL: ${url}`);
        }
    }
}

/* 添加所有控制器，通过遍历 */
function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

/* 
 * 导出控制器函数
 * 职能：添加所有控制器
 * 传入参数：控制器所在目录的相对路径（非必需，默认为 controllers）
 */
module.exports = function (dir) {
    /* 获取控制器所在目录 */
    let controllers_dir = dir || 'controllers';

    /* 引入 koa-router 模块，创建 router 实例 */
    let router = require('koa-router')();

    /* 添加所有控制器 */
    addControllers(router, controllers_dir);

    /* 返回 router.routes()，将被添加为中间件执行 */
    return router.routes();
};
