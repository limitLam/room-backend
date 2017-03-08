import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

//	mongoose
const DB_URL = 'mongodb://localhost/room';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);

//	mongoStore
import connectMongo from 'connect-mongo';
let mongoStore = connectMongo(expressSession);

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

//	会话持久化
app.use(cookieParser());
app.use(expressSession({
	secret: 'room',
	resave: false,
	saveUninitialized: false,
	store: new mongoStore({
		url: DB_URL,
		collections: 'sessions'
	})
}))

//	路由
import router from './app/router';
router(app);

app.listen(PORT, () => {
	console.log(`server running http://localhost:${PORT}`);
});