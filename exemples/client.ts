import { CreateSonicClient } from '../src/core/sonic-client';

const sonic = new CreateSonicClient('ws://localhost:3000');

async function main() {
  await sonic.connect();

  await sonic.emit('message', 'Hello, world!', { streams: true });
}

main().catch((error) => {
  console.error(error);
});
