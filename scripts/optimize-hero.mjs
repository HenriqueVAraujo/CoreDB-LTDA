import sharp from 'sharp'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC  = join(ROOT, 'public', 'images', 'imagem-hero.png')
const OUT  = join(ROOT, 'public', 'images')

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

const variants = [
  { suffix: 'lg',  width: 1920, height: 1080 },  // desktop full
  { suffix: 'md',  width: 1024, height: 576  },  // tablet
  { suffix: 'sm',  width: 640,  height: 360  },  // mobile
]

const webpOpts  = { quality: 82, effort: 6, smartSubsample: true }
const avifOpts  = { quality: 55, effort: 6, chromaSubsampling: '4:2:0' }

async function run() {
  const meta = await sharp(SRC).metadata()
  console.log(`Source: ${meta.width}×${meta.height}, ${meta.format}, ~${(meta.size/1024/1024).toFixed(2)}MB`)

  for (const { suffix, width, height } of variants) {
    const base = sharp(SRC).resize(width, height, {
      fit: 'cover',
      position: 'centre',
      withoutEnlargement: true,
    })

    const webpPath = join(OUT, `hero-${suffix}.webp`)
    const avifPath = join(OUT, `hero-${suffix}.avif`)

    const webpInfo = await base.clone().webp(webpOpts).toFile(webpPath)
    const avifInfo = await base.clone().avif(avifOpts).toFile(avifPath)

    console.log(
      `[${suffix}] WebP ${(webpInfo.size / 1024).toFixed(1)} KB  |  AVIF ${(avifInfo.size / 1024).toFixed(1)} KB`
    )
  }

  // Também gera um WebP fallback sem resize (para next/image usar como src)
  const fallbackPath = join(OUT, 'hero-fallback.webp')
  const fallback = await sharp(SRC)
    .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(fallbackPath)
  console.log(`[fallback] WebP ${(fallback.size / 1024).toFixed(1)} KB`)

  console.log('\nPronto! Assets gerados em public/images/')
}

run().catch(console.error)
