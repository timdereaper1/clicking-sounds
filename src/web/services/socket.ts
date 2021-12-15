import { io } from 'socket.io-client';

export const clientSocket = io('ws://localhost:8000');
