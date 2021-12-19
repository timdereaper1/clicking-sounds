import { createServer } from 'http';
import ApiServer from './apiServer';
import { Constants } from './constants';
import ServerSocket from './serverSocket';

const apiServer = new ApiServer();
const httpServer = createServer(apiServer.getApp().callback());

const socket = new ServerSocket(httpServer);
socket.start();

httpServer.listen(Constants.Env.Port, () => {
	console.log('server started on port 8000');
});
