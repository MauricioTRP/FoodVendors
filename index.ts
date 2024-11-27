import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { AdminRouter, VendorRouter } from './routes'
import { MONGO_URI } from './config'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/admin', AdminRouter)
app.use('/vendors', VendorRouter)

mongoose
  .connect(MONGO_URI, {})
  .then((res) => {
    console.log('Connected')
  })
  .catch((err) => console.error('Error mongo', err))

app.listen(8000, () => {
  console.log(`App listening on port ${8000}`)
})
