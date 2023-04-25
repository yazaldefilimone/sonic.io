import { createServer } from 'node:http';
import { CreateSonicServer } from '../src/core/sonic-server';

const httpServer = createServer();
const sonicServer = new CreateSonicServer(httpServer, { inteligencie: true });

async function main() {
  await sonicServer.emit('error', 'Hello, Messages!');
  const room = await sonicServer.to('this');
  await room.emit('Hello, This!');
  await room.emit('message cached ');
}
main().then();

httpServer.listen('3000', () => {});
