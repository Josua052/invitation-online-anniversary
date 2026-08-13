import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { fileURLToPath } from 'url'

ffmpeg.setFfmpegPath(ffmpegPath.path)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath = path.join(__dirname, 'public', 'video', 'bg-video.mp4')
const outputPath = path.join(__dirname, 'public', 'video', 'bg-video-opt.mp4')

console.log('Starting video compression...')
console.log('Input:', inputPath)
console.log('Output:', outputPath)

ffmpeg(inputPath)
  .outputOptions([
    '-vf scale=1280:-2', // 720p height, maintain aspect ratio
    '-c:v libx264',      // H.264 codec
    '-crf 28',           // Constant Rate Factor (higher = more compression, 28 is good for background)
    '-preset faster',    // Encoding speed vs compression ratio
    '-c:a aac',          // Audio codec
    '-b:a 128k',         // Audio bitrate
    '-movflags +faststart' // Move moov atom to beginning for web streaming
  ])
  .on('end', () => {
    console.log('Video compression finished successfully!')
  })
  .on('error', (err) => {
    console.error('Error during compression:', err)
  })
  .on('progress', (progress) => {
    console.log('Processing: ' + progress.percent + '% done')
  })
  .save(outputPath)
