/**
 * Created by admin on 2018/3/6.
 */
const express = require("express");
const ReactSSR = require("react-dom/server");

const path = require('path');
const fs = require('fs');


const app = express();
const isDev = process.env.NODE_ENV === 'development'


if(!isDev){
    const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    const serverEntry = require("../dist/server-entry").default;
    app.use("/public",express.static(path.join(__dirname,'../dist')));
    app.get('*', (req, res) => {
        const appString = ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<!-- <app> -->',appString));
    });
}else {
    const devStatic = require('./utils/devStatic');
    devStatic(app);
}


app.listen(3333, () => {
    console.log('listening port 333')
})