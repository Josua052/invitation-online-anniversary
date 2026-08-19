import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

ffmpeg.setFfmpegPath(ffmpegPath.path)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath = path.join(__dirname, 'public', 'poster', 'Poster 2.png')
const outputPath = path.join(__dirname, 'public', 'poster', 'og-poster.jpg')

console.log('Generating OG image from Poster 2.png for WhatsApp / social preview...')

ffmpeg(inputPath)
  .outputOptions([
    '-vf', 'scale=640:-1',
    '-q:v', '4',
  ])
  .on('end', () => {
    const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2)
    console.log(`OG Image created: ${sizeKB} KB → ${outputPath}`)
  })
  .on('error', (err) => {
    console.error('Error:', err.message)
  })
  .save(outputPath)
