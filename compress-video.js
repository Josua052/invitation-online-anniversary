import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

ffmpeg.setFfmpegPath(ffmpegPath.path)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath  = path.join(__dirname, 'public', 'video', 'bg-video-web.mp4')
const outputPath = path.join(__dirname, 'public', 'video', 'bg-video-final.mp4')

console.log('Starting compression...')
console.log('Input size:', (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2), 'MB')

ffmpeg(inputPath)
  .outputOptions([
    '-vf', 'scale=480:-2',       // 270p - very light for bg video
    '-c:v', 'libx264',
    '-crf', '36',                // More aggressive compression
    '-preset', 'fast',
    '-an',
    '-movflags', '+faststart',
  ])
  .on('start', cmd => console.log('ffmpeg started'))
  .on('progress', p => process.stdout.write(`\rProgress: ${Math.round(p.percent || 0)}%`))
  .on('end', () => {
    const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)
    console.log(`\nDone! Output size: ${sizeMB} MB → ${outputPath}`)
  })
  .on('error', err => console.error('\nError:', err.message))
  .save(outputPath)
