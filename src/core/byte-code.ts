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

export function decodeBits(bits: string): string {
  const bytes = [];
  for (let index = 0; index < bits.length; index += 8) {
    bytes.push(parseInt(bits.slice(index, index + 8), 2));
  }
  const result = Buffer.from(bytes).toString('utf8');
  return result;
}
