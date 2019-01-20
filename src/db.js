import mongoose from 'mongoose'
const server = '127.0.0.1:27017'
const database = 'tsdb'

mongoose
  .connect(
    `mongodb://${server}/${database}`,
    { useNewUrlParser: true },
  )
  .then(() => {
    console.info('Database connection successful')
  })
  .catch((err) => {
    console.error('Database connection error', err)
    throw err
  })
