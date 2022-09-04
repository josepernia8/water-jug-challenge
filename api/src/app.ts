import express, { Express, Request, Response } from 'express'
import routes from './routes'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => res.send('Welcome to the Water Jug Challenge API'))

// Add Routes
app.use('/api', routes)

export default app
