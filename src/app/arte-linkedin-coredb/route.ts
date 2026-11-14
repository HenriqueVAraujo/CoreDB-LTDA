import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let svgLogo: Buffer;
    try {
      svgLogo = await readFile(join(process.cwd(), 'public', 'brand', 'footer-logo-dark.svg'));
    } catch {
      const response = await fetch('https://www.coredb.com.br/brand/footer-logo-dark.svg', { cache: 'no-store' });
      if (!response.ok) throw new Error('Logo oficial indisponível');
      svgLogo = Buffer.from(await response.arrayBuffer());
    }
    // Reutiliza o ativo oficial existente; nenhum símbolo ou wordmark é redesenhado.
    const logo = await sharp(svgLogo).resize({ width: 560 }).png().toBuffer();
    const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1C2D"/><stop offset="1" stop-color="#06131F"/></linearGradient>
      <radialGradient id="halo"><stop offset="0" stop-color="#1DAEFF" stop-opacity=".26"/><stop offset="1" stop-color="#1DAEFF" stop-opacity="0"/></radialGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1DAEFF"/><stop offset="1" stop-color="#90DBFF"/></linearGradient>
    </defs>
    <rect width="1080" height="1350" fill="url(#background)"/>
    <circle cx="840" cy="870" r="490" fill="url(#halo)"/>
    <path d="M0 1230 L1080 940 M0 1280 L1080 990 M660 1350 L1080 1010" stroke="#1DAEFF" stroke-opacity=".16" fill="none" stroke-width="2"/>
    <path d="M770 570 L985 675 L985 932 L770 1037 L556 932 L556 675 Z" stroke="#1DAEFF" stroke-opacity=".7" stroke-width="4" fill="none"/>
    <path d="M556 675 L770 790 L985 675 M770 790 L770 1037" stroke="#8BD8FF" stroke-opacity=".7" stroke-width="3" fill="none"/>
    <path d="M680 727 L770 680 L862 727 L862 831 L770 878 L680 831Z" stroke="#1DAEFF" stroke-width="3" stroke-opacity=".72" fill="#0B1C2D" fill-opacity=".6"/>
    <path d="M680 727 L770 772 L862 727 M770 772 L770 878" stroke="#1DAEFF" stroke-width="3" fill="none"/>
    <circle cx="770" cy="787" r="49" fill="url(#halo)"/><circle cx="770" cy="787" r="12" fill="#FFFFFF"/>
    <ellipse cx="770" cy="805" rx="285" ry="117" transform="rotate(-22 770 805)" stroke="#1DAEFF" stroke-opacity=".65" stroke-width="4" fill="none"/>
    <circle cx="1000" cy="714" r="8" fill="#FFFFFF"/>
    <rect x="76" y="74" width="2" height="140" fill="#1DAEFF"/>
    <image x="104" y="82" width="560" height="186" href="${logoSrc}"/>
    <text x="80" y="327" font-family="Arial,DejaVu Sans,sans-serif" font-size="26" font-weight="700" letter-spacing="3.5" fill="#8BD8FF">SUSTENTAÇÃO TOTVS  ·  PROTHEUS  ·  RM  ·  FLUIG</text>
    <text x="76" y="426" font-family="Arial,DejaVu Sans,sans-serif" font-size="70" font-weight="700" fill="#FFFFFF">Sua sustentação</text>
    <text x="76" y="512" font-family="Arial,DejaVu Sans,sans-serif" font-size="70" font-weight="700" fill="#FFFFFF">pode ter uma</text>
    <text x="76" y="598" font-family="Arial,DejaVu Sans,sans-serif" font-size="74" font-weight="700" fill="#1DAEFF">proposta melhor.</text>
    <text x="80" y="680" font-family="Arial,DejaVu Sans,sans-serif" font-size="35" fill="#FFFFFF">Analisamos propostas existentes e</text>
    <text x="80" y="726" font-family="Arial,DejaVu Sans,sans-serif" font-size="35" fill="#FFFFFF">avaliamos alternativas competitivas.</text>
    <rect x="76" y="985" width="930" height="144" rx="24" fill="#122B40" stroke="#1DAEFF" stroke-opacity=".7" stroke-width="2"/>
    <text x="112" y="1046" font-family="Arial,DejaVu Sans,sans-serif" font-size="31" fill="#FFFFFF" font-weight="700">Critério técnico antes do preço.</text>
    <text x="112" y="1096" font-family="Arial,DejaVu Sans,sans-serif" font-size="26" fill="#C7E7F8">Escopo claro, qualidade e responsabilidade.</text>
    <rect x="76" y="1163" width="930" height="106" rx="16" fill="url(#accent)"/>
    <text x="112" y="1231" font-family="Arial,DejaVu Sans,sans-serif" font-size="35" font-weight="700" fill="#0B1C2D">Converse com a CoreDB · Triagem de 30 min</text>
    <text x="80" y="1316" font-family="Arial,DejaVu Sans,sans-serif" font-size="25" fill="#D2E5F3">O núcleo da continuidade.</text>
    <text x="791" y="1316" font-family="Arial,DejaVu Sans,sans-serif" font-size="25" fill="#D2E5F3">coredb.com.br</text>
    </svg>`;
    const out = await sharp(Buffer.from(svg)).png().toBuffer();
    return new Response(new Uint8Array(out), {
      headers: { 'content-type': 'image/png', 'content-disposition': 'inline; filename="coredb-linkedin-sustentacao.png"', 'cache-control': 'public, max-age=3600' },
    });
  } catch {
    return Response.json({ error: 'Não foi possível gerar a arte com o logo oficial.' }, { status: 503 });
  }
}