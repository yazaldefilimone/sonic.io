import { CreateSonicClient } from '../src/core/sonic-client';

const sonic = new CreateSonicClient('ws://localhost:3000');

async function main() {
  await sonic.connect();
  const res = await sonic.on('this');
  console.log({ res });
  await sonic.emit('error', 'hello error');
}

main().catch((error) => {
  console.error(error);
});
