import { CreateSonicClient } from '../src/core/sonic-client';

const sonic = new CreateSonicClient('ws://localhost:3000');

async function main() {
  await sonic.connect();
  const error = await sonic.on('error');
  console.log({ error });
  const erro = await sonic.to('this');
  const messages = await erro.on();
  console.log({ messages });
}

main().catch((error) => {
  console.error(error);
});
