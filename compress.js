import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function run() {
  const input1 = path.join(__dirname, 'public', 'poster', 'Poster57 Anniversary.png')
  const output1 = path.join(__dirname, 'public', 'poster', 'Poster57 Anniversary_opt.webp')
  
  const input2 = path.join(__dirname, 'public', 'logo', 'Design Baju 57  Flower Power isi Anniversary.png')
  const output2 = path.join(__dirname, 'public', 'logo', 'Design Baju 57 Flower Power_opt.webp')

  console.log('Compressing Poster...')
  if (fs.existsSync(input1)) {
    await sharp(input1)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(output1)
    console.log('Poster compressed to', output1)
  }

  console.log('Compressing Logo...')
  if (fs.existsSync(input2)) {
    await sharp(input2)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(output2)
    console.log('Logo compressed to', output2)
  }
}

run().catch(console.error)
