/**
 * Audio conversion utilities for handling PCM to WAV conversion
 * and base64 decoding for audio data.
 */

/**
 * Convert Raw PCM data to WAV format by adding a WAV header.
 * Used for Google Gemini TTS which returns raw PCM audio.
 * 
 * @param {ArrayBuffer} pcmData - Raw PCM audio data
 * @param {number} sampleRate - Sample rate of the audio (e.g., 24000)
 * @returns {Blob} - WAV audio blob
 */
export const addWavHeader = (pcmData, sampleRate) => {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcmData.byteLength, true);
  writeString(view, 8, 'WAVE');
  
  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);  // AudioFormat (1 for PCM)
  view.setUint16(22, 1, true);  // NumChannels (1 for mono)
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * 2, true); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  view.setUint16(32, 2, true);  // BlockAlign (NumChannels * BitsPerSample/8)
  view.setUint16(34, 16, true); // BitsPerSample
  
  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, pcmData.byteLength, true);
  
  return new Blob([header, pcmData], { type: 'audio/wav' });
};

/**
 * Convert a base64 encoded string to an ArrayBuffer.
 * Used for decoding audio data from API responses.
 * 
 * @param {string} base64 - Base64 encoded string
 * @returns {ArrayBuffer} - Decoded ArrayBuffer
 */
export const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return bytes.buffer;
};
