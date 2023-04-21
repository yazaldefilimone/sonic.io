import WebSocket from 'ws';
import { optionType } from './type';

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
    this.sonic.send(JSON.stringify({ event, data }));
  }

  async on(event: string, options?: optionType): Promise<string> {
    this.isOpen();
    const isCache = options?.cache ?? false;
    const isStreams = options?.streams ?? false;
    return new Promise<string>((resolve, reject) => {
      this.sonic.on(event, (args) => {
        const message = JSON.parse(args.toString());
        if (message.data) {
          resolve(message.data);
        }
        resolve('');
      });
      this.sonic.addEventListener('error', (error) => {
        reject(error);
      });
    });
  }

  async to(event: string, data: any, options?: optionType): Promise<void> {
    this.isOpen();
    const isCache = options?.cache ?? false;
    const isStreams = options?.streams ?? false;

    this.sonic.send(JSON.stringify({ event, data }), this.error);
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
