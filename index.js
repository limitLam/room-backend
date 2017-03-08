import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';

//	mongoose
const DB_URL = 'mongodb://localhost/room';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);

//	工具类(中间层)
import {
	allowCrossDomain
} from './utils';

//	端口号
const PORT = process.env.PORT || 3000;

let app = express();

// models loading
import * as Modles from './app/models';

//	设置允许跨域
app.use(allowCrossDomain);

//	设置请求body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

import {
	signin
} from './app/router';

// 登录模块
app.use('/signin', signin);

app.listen(PORT, () => {
	console.log(`server running http://localhost:${PORT}`);
});