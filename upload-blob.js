import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const videoPath = path.join(__dirname, 'public', 'video', 'bg-video-opt.mp4')

async function run() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Error: BLOB_READ_WRITE_TOKEN is not set in .env.local')
    process.exit(1)
  }

  if (!fs.existsSync(videoPath)) {
    console.error('Error: Video file not found at', videoPath)
    process.exit(1)
  }

  console.log('Uploading to Vercel Blob...')
  const file = fs.readFileSync(videoPath)
  
  try {
    const blob = await put('bg-video-opt.mp4', file, { 
      access: 'public',
      contentType: 'video/mp4'
    })
    console.log('Upload successful!')
    console.log('URL:', blob.url)
  } catch (err) {
    console.error('Upload failed:', err)
  }
}

run()
