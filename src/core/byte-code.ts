export function encodeBits(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('input is not a string');
  }
  const buffer = Buffer.from(input, 'utf8');
  let bits = '';
  for (let index = 0; index < buffer.length; index++) {
    const byte = buffer[index];
    const bitString = byte.toString(2).padStart(8, '0');
    bits += bitString;
  }
  return bits;
}
