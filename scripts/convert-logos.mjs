import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES = join(__dirname, '..', 'public', 'images')

const logos = [
  { input: 'coredb-logo.png',       output: 'coredb-logo.webp'       },
  { input: 'coredb-logoescura.png', output: 'coredb-logoescura.webp' },
]

for (const { input, output } of logos) {
  const src = join(IMAGES, input)
  const dst = join(IMAGES, output)
  const info = await sharp(src).webp({ quality: 85, effort: 6 }).toFile(dst)
  const srcMeta = await sharp(src).metadata()
  console.log(`${input} → ${output}: ${(srcMeta.size/1024).toFixed(0)} KB → ${(info.size/1024).toFixed(0)} KB`)
}

console.log('\nPronto!')
