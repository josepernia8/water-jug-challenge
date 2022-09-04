import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import routes from './src/routes'
import app from './src/app'

dotenv.config()

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

export default app
