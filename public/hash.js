const input = new TextEncoder('utf-8').encode('some-256-bit-value!');
const alg = 'SHA-256';
const iterations = 1000;
const header = `Language: JavaScript (Native)<br>Alg: ${alg}<br>Hash iterations: ${iterations}<br>`

const hex = (buffer) => {
  const hexCodes = [];
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    const value = view.getUint32(i)
    // toString(16) will give the hex representation of the number without padding
    const stringValue = value.toString(16)
    // We use concatenation and slice for padding
    const padding = '00000000'
    const paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }

  // Join all the hex strings into one
  return hexCodes.join("");
}

const sha256 = async () => {
  const hash = await crypto.subtle.digest(alg, input);
  return hex(hash)
}

(async () => {
  const hashes = [];
  const start = new Date();
  for (let i = 0; i < iterations; ++i) {
    const hash = await sha256();
    hashes.push(hash);
  }
  const end = new Date();
  const timeMsg = `Time taken: ${end - start} ms<br>`;
  document.getElementById('out').innerHTML = header + timeMsg + hashes.join('<br>');
})()
