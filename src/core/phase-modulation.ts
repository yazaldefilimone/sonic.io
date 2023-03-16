type phaseModulationInputType = {
  dataBits: string;
  carrierFrequency: number;
  samplingRate: number;
};
import mathjs from 'mathjs';
export const phaseModulation = (input: phaseModulationInputType) => {
  const { dataBits, carrierFrequency, samplingRate } = input;
  const amplitudePortadora = 1; // amplitude da onda portadora
  const messageLength = dataBits.length; // tamanho da mensagem em bits
  // calcular o deslocamento de fase para cada bit
  const phaseShift = Math.PI / 2;
  // calcular o período da onda portadora
  const carrierPeriod = 1 / carrierFrequency;
  // calcular o intervalo de tempo entre as amostras
  const intervaloTempo = 1 / samplingRate;

  // criar um buffer para armazenar a onda modulada
  const modulatedWave = new Float32Array(messageLength * samplingRate);

  // iterar sobre os bits da mensagem
  for (let bitIndex = 0; bitIndex < messageLength; bitIndex++) {
    const bit = dataBits[bitIndex];

    // determinar a fase correspondente ao bit
    const phase = bit ? phaseShift : 0;

    // iterar sobre as amostras no período da onda portadora
    for (let waveIndex = 0; waveIndex < carrierPeriod; waveIndex += intervaloTempo) {
      const amostra = bitIndex * samplingRate + waveIndex * samplingRate;

      // calcular a amplitude da onda modulada
      const amplitudeModulada = amplitudePortadora * Math.sin(2 * Math.PI * carrierFrequency * waveIndex + phase);

      // armazenar a amplitude da onda modulada no buffer
      modulatedWave[amostra] = amplitudeModulada;
    }
  }

  return modulatedWave;
};
