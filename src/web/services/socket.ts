import { io } from 'socket.io-client';
import { Constants } from '../constants';

export const clientSocket = io(Constants.Api.SocketURL);
