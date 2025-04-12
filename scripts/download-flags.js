import fs from 'node:fs'
import https from 'node:https'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const countries = ['ng', 'ke', 'gh', 'za', 'eg', 'et', 'tz', 'ug', 'rw']

const flagsDir = path.join(__dirname, '../public/images/flags')

// Create flags directory if it doesn't exist
if (!fs.existsSync(flagsDir)) {
  fs.mkdirSync(flagsDir, { recursive: true })
}

// Download flags from flagcdn.com
countries.forEach((countryCode) => {
  const url = `https://flagcdn.com/${countryCode}.svg`
  const filePath = path.join(flagsDir, `${countryCode}.svg`)

  https
    .get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filePath)
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`Downloaded: ${countryCode}.svg`)
        })
      } else {
        console.error(`Failed to download ${countryCode}.svg`)
      }
    })
    .on('error', (err) => {
      console.error(`Error downloading ${countryCode}.svg:`, err.message)
    })
})
