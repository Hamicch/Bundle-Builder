import cors from 'cors'
import express from 'express'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const products = JSON.parse(readFileSync(join(__dirname, '../src/data/products.json'), 'utf-8'))

const app = express()
app.use(cors())

app.get('/api/catalog', (_req, res) => {
  res.json(products)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Bundle Builder API listening on port ${port}`)
})
