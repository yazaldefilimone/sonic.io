import { createServer } from 'node:http';
import { CreateSonicServer } from '../src/core/sonic-server';

const httpServer = createServer();
const sonicServer = new CreateSonicServer(httpServer);

async function main() {
  console.log('hei');
  await sonicServer.emit('error', 'Hello, Messages!');
  await sonicServer.emit('this', 'Hello, This!');
}
httpServer.listen('3000', main);
