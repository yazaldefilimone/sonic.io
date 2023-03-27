import http from 'http';
import { Server as WebSocketServer } from 'ws';

interface Socket {
  send(data: any): void;
}

export class CreateSonicServer {
  private server: http.Server;
  private wsServer: WebSocketServer;

  private sockets: Map<string, Socket> = new Map();

  constructor(server: http.Server) {
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

  async to(room: string): Promise<{ emit: (event: string, data: any) => Promise<void> }> {
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
