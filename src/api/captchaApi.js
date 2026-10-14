import { API_BASE_URL } from './client';

const UPPERCASE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWERCASE = "abcdefghjkmnpqrstuvwxyz";
const NUMBERS = "23456789";
const ALL_CHARS = UPPERCASE + LOWERCASE + NUMBERS;

const generateLocalText = (length = 6) => {
  const chars = [
    UPPERCASE.charAt(Math.floor(Math.random() * UPPERCASE.length)),
    LOWERCASE.charAt(Math.floor(Math.random() * LOWERCASE.length)),
    NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length)),
  ];

  for (let i = 3; i < length; i++) {
    chars.push(ALL_CHARS.charAt(Math.floor(Math.random() * ALL_CHARS.length)));
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
};

const generateLocalSvg = (text) => {
  const width = 160;
  const height = 48;
  const chars = text.split('');

  let lines = '';
  for (let i = 0; i < 4; i++) {
    const x1 = Math.floor(Math.random() * width);
    const y1 = Math.floor(Math.random() * height);
    const x2 = Math.floor(Math.random() * width);
    const y2 = Math.floor(Math.random() * height);
    const color = i % 2 === 0 ? 'rgba(6,182,212,0.35)' : 'rgba(99,102,241,0.35)';
    lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" />`;
  }

  let dots = '';
  for (let i = 0; i < 26; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const r = Math.random() * 1.5 + 0.5;
    const color = i % 2 === 0 ? 'rgba(6,182,212,0.4)' : 'rgba(30,41,59,0.35)';
    dots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" />`;
  }

  let textElements = '';
  const charSpacing = (width - 24) / chars.length;
  chars.forEach((ch, idx) => {
    const x = 18 + idx * charSpacing;
    const y = 32 + (Math.random() * 4 - 2);
    const rotate = Math.floor(Math.random() * 24 - 12);
    const color = idx % 2 === 0 ? '#0284c7' : '#0f172a';
    textElements += `
      <text 
        x="${x}" 
        y="${y}" 
        font-family="'Arial', 'Helvetica', sans-serif" 
        font-size="22" 
        font-weight="900" 
        letter-spacing="2"
        fill="${color}" 
        transform="rotate(${rotate}, ${x}, ${y})"
      >
        ${ch}
      </text>
    `;
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="border-radius: 10px; background: #f8fafc; border: 1px solid #cbd5e1; display: block;">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="100%" stop-color="#f1f5f9" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" rx="10" fill="url(#bgGrad)" />
      ${lines}
      ${dots}
      ${textElements}
    </svg>
  `.trim();
};

const generateFallbackChallenge = () => {
  const text = generateLocalText(6);
  const nonce = Math.random().toString(36).substring(2, 10);
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const payload = `${text}:${expiresAt}:${nonce}`;
  
  // Safe base64 encoding in browser environment
  const encodedPayload = btoa(payload)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = ((hash << 5) - hash) + payload.charCodeAt(i);
    hash |= 0;
  }
  const token = `fb.${encodedPayload}.${Math.abs(hash).toString(16)}`;

  return {
    success: true,
    captchaToken: token,
    captchaSvg: generateLocalSvg(text),
  };
};

/**
 * Fetch a fresh security CAPTCHA challenge
 * Returns { success: boolean, captchaToken: string, captchaSvg: string }
 */
export const getCaptchaChallenge = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/captcha`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      console.warn(`[Captcha API] Server returned HTTP ${res.status}. Falling back to client-side challenge.`);
      return generateFallbackChallenge();
    }
    const data = await res.json();
    if (!data || !data.captchaToken || !data.captchaSvg) {
      return generateFallbackChallenge();
    }
    return data;
  } catch (err) {
    console.warn('[Captcha API] Backend unreachable, using fallback challenge:', err.message);
    return generateFallbackChallenge();
  }
};

