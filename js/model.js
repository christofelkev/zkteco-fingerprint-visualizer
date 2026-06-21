export async function sha256Bytes(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash));
}

export function makeRng(bytes) {
  let seed = 2166136261;
  for (const b of bytes) {
    seed ^= b;
    seed = Math.imul(seed, 16777619);
  }

  return function() {
    seed += 0x6D2B79F5;
    let t = seed;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
