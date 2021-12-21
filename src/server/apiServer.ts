import Koa from 'koa';
import cors from '@koa/cors';
import { Constants } from './constants';

export default class ApiServer {
	private app: Koa;

	constructor() {
		this.app = new Koa();
		this.app.use(
			cors({
				origin: Constants.App.URL,
			})
		);
	}

	public getApp() {
		return this.app;
	}
}
