import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

ffmpeg.setFfmpegPath(ffmpegPath.path)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath  = path.join(__dirname, 'public', 'video', 'bg-video-opt.mp4')
const outputPath = path.join(__dirname, 'public', 'video', 'bg-video-web.mp4')

console.log('Starting compression...')
console.log('Input size:', (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2), 'MB')

ffmpeg(inputPath)
  .outputOptions([
    '-vf', 'scale=640:-2',       // 360p width, maintain ratio
    '-c:v', 'libx264',
    '-crf', '34',                // High compression
    '-preset', 'fast',
    '-an',                       // Remove audio (bg video needs no audio)
    '-movflags', '+faststart',   // Stream immediately
  ])
  .on('start', cmd => console.log('ffmpeg started'))
  .on('progress', p => process.stdout.write(`\rProgress: ${Math.round(p.percent || 0)}%`))
  .on('end', () => {
    const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)
    console.log(`\nDone! Output size: ${sizeMB} MB → ${outputPath}`)
  })
  .on('error', err => console.error('\nError:', err.message))
  .save(outputPath)
