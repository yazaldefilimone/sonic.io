import http from 'http';
import { Server as WebSocketServer } from 'ws';

type socketType<T = any> = {
  send(data: T): void;
};

type optionType = { streams?: boolean; cache?: boolean };

type toType = {
  room: string;
  options?: optionType;
};

type emitFunctionType<T = any> = (event: string, data: T, options?: optionType) => Promise<void>;

type emitResponseType = {
  emit: emitFunctionType;
};

export class CreateSonicServer {
  private server: http.Server;
  private wsServer: WebSocketServer;

  private sockets: Map<string, socketType> = new Map();
  private cache: Map<string, any>;

  constructor(server: http.Server) {
    this.cache = new Map();
    this.server = server;
    this.wsServer = new WebSocketServer({ server });

    this.wsServer.on('connection', (socket, request) => {
      const socketId = request.headers['sec-websocket-key'] as string;
      this.sockets.set(socketId, socket);

      socket.on('message', (data: string) => {
        console.log(`Message received from ${socketId}: ${data}`);
      });

      socket.on('close', () => {
        this.sockets.delete(socketId);
      });
    });
  }

  async emit(event: string, data: any): Promise<void> {
    for (const socket of this.sockets.values()) {
      socket.send(JSON.stringify({ event, data }));
    }
  }

  async to({ room, options }: toType): Promise<emitResponseType> {
    const socketsInRoom = [...this.sockets.entries()].filter(([socketId, socket]) => {
      return socketId.startsWith(`${room}#`);
    });

    return {
      emit: async (event: string, data: any): Promise<void> => {
        for (const [socketId, socket] of socketsInRoom) {
          socket.send(JSON.stringify({ event, data }));
        }
      },
    };
  }
}
