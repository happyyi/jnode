/**
 * Created by admin on 2018/3/14.
 */
const path = require('path');
const webpack = require('webpack');
const serverCofig = require('../../build/webpack.config.server');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const ReactSSR = require('react-dom/server');
const axios = require('axios');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html').then((res) => {
            resolve(res.data)
        }).catch(reject)
    })
};

const serverCompiler = webpack(serverCofig);
const mfs = new MemoryFs();
const Module = module.constructor;
let serverBundle;
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
    if (err) {
        throw err;
    }
    stats = stats.toJson();
    stats.errors.forEach((error) => {
        console.error(error);
    });
    stats.warnings.forEach((warning) => {
        console.warn(warning);
    });
    const bundlePath = path.join(
        serverCofig.output.path,
        serverCofig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf-8')
    const m = new Module();
    m._compile(bundle, 'server-entry.js');
    serverBundle = m.exports.default;
});

module.exports = (app) => {
    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }));
    app.get('*', (req, res) => {
        getTemplate().then(template => {
            const content = ReactSSR.renderToString(serverBundle);
            res.send(template.replace('<!-- <app> -->', content));
        })
    })
};