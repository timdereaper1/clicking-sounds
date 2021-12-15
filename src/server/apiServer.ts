import Koa from 'koa';
import cors from '@koa/cors';

export default class ApiServer {
	private app: Koa;

	constructor() {
		this.app = new Koa();
		this.app.use(cors());
	}

	public getApp() {
		return this.app;
	}
}
