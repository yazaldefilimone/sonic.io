import WebSocket from 'ws';
import { dataType, emitResponseClientType, emitResponseType, optionType } from './type';

export class CreateSonicClient {
  private sonic: WebSocket | null = null;
  constructor(private url: string) {}
  async connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sonic = new WebSocket(this.url);
      this.sonic.addEventListener('open', () => {
        resolve();
      });

      this.sonic.addEventListener('error', (error) => {
        reject(error);
      });
    });
  }

  async emit(event: string, data: any, options?: optionType): Promise<void> {
    this.isOpen();
    const isCache = options?.cache ?? false;
    const isStreams = options?.streams ?? false;
    this.sonic.send(JSON.stringify({ data, event }));
  }

  async on(event: string, options?: optionType): Promise<string> {
    this.isOpen();
    const isCache = options?.cache ?? false;
    const isStreams = options?.streams ?? false;
    return new Promise<string>((resolve, reject) => {
      this.sonic.on('message', (data) => {
        console.log({ data });
        const message = JSON.parse(data.toString());
        resolve(message);
      });
      this.sonic.addEventListener('error', (error) => {
        reject(error);
      });
    });
  }

  async to(room: string, options?: optionType): Promise<emitResponseClientType> {
    this.isOpen();
    const isCache = options?.cache ?? false;
    const isStreams = options?.streams ?? false;
    return {
      emit: async (data: dataType, options): Promise<void> => {
        this.sonic.send(JSON.stringify({ room, event: '', data }));
      },
      on: async () => {
        return new Promise<string>((resolve, reject) => {
          this.sonic.on('message', (data) => {
            const message = JSON.parse(data.toString());
            resolve(message);
          });
          this.sonic.addEventListener('error', (error) => {
            reject(error);
          });
        });
      },
    };
  }

  isOpen() {
    if (!this.sonic || this.sonic.readyState !== WebSocket.OPEN) {
      throw new Error('WebSonic is not open');
    }
  }
  error = (err?: Error) => {
    throw err ? err : Error('sonic: error');
  };
}
