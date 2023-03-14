import { encodeBits, decodeBits } from '~/core/byte-code';

describe('Byte Code', () => {
  it('Should be throw error if no receive string data', () => {
    const data = 1 as unknown as string;
    expect(() => encodeBits(data)).toThrow('input is not a string');
  });

  it('Should be transform data in bytes', () => {
    const data = 'Hello';
    const bits = encodeBits(data);
    expect(bits).toContainEqual('1');
    expect(bits).toContainEqual('0');
  });

  it('Should be transform bytes in correct data', () => {
    const data = 'Hello';
    const bits = encodeBits(data);
    const result = decodeBits(bits);
    expect(result).toBe(data);
  });
});
