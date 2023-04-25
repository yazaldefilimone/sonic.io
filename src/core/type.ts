import { Readable } from 'node:stream';
import { Server as WebSocketServer, WebSocket } from 'ws';

export type socketType<T = string> = WebSocket;

export type optionType = { streams?: boolean; cache?: boolean };

export type toType = {
  room: string;
  options?: optionType;
};

export type emitFunctionType<T = any> = (data: T, options?: optionType) => Promise<void>;
export type onFunctionType<T = any> = (options?: optionType) => Promise<T>;

export type emitResponseType = {
  emit: emitFunctionType;
};
export type emitResponseClientType = {
  emit: emitFunctionType;
  on: onFunctionType;
};

export type dataType = string | ArrayBuffer | Buffer | Blob | Readable;
