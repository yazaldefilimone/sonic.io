import { encodeBits } from '~/core/byte-code';

describe('Byte Code', () => {
  it('Should be throw error if no receive string data', () => {
    const data = 1 as unknown as string;
    expect(() => encodeBits(data)).toThrow('input is not a string');
  });
});
