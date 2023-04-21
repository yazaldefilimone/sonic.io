import { Readable } from 'node:stream';
import { Server as WebSocketServer, WebSocket } from 'ws';

export type socketType<T = string> = WebSocket;

export type optionType = { streams?: boolean; cache?: boolean };

export type toType = {
  room: string;
  options?: optionType;
};

export type emitFunctionType<T = any> = (event: string, data: T, options?: optionType) => Promise<void>;

export type emitResponseType = {
  emit: emitFunctionType;
};

export type dataType = string | ArrayBuffer | Buffer | Blob | Readable;
