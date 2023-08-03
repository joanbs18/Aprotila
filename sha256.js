// la función sha256 es para encriptar la contraseña
function sha256(message) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(message))
      .then(buffer => {
        let hashArray = Array.from(new Uint8Array(buffer));
        let hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
      });
}
  