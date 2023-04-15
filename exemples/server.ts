import { createServer } from 'http';
import { CreateSonicServer } from '../src/core/sonic-server';

const httpServer = createServer();

const sonicServer = new CreateSonicServer(httpServer);

async function main() {
  await sonicServer.emit('message', 'hello');

  const room = await sonicServer.to('room-1', { cache: true });

  room.emit('message', 'Hello there!!', { streams: true });
}

main().catch((error) => {
  console.log(error);
});
