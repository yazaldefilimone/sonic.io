import WebSocket from 'ws';

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

  async emit(event: string, data: any): Promise<void> {
    if (!this.sonic || this.sonic.readyState !== WebSocket.OPEN) {
      throw new Error('WebSonic is not open');
    }

    this.sonic.send(JSON.stringify({ event, data }));
  }
}
